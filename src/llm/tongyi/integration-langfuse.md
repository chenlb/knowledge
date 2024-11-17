# Tongyi 集成 Langfuse

Langfuse 是一个开源 LLM 工程平台，可帮助团队协作调试、分析和迭代其 LLM 应用程序。

可以从 [Langfuse 快速开始](/llm/langfuse/getting-started) 快速了解更多。

Tongyi 与 Langfuse 集成使用有几种方法：
* 借助 Langfuse 与 OpenAI 集成 SDK。
* 借助 Langchain 的 Tongyi 社区集成，使用的 callback 方式实现。（缺点：token 用量取不到，可以自行改进。）
* 使用 Langfuse 的装饰器（`@observe`）+ Dashscope（通义的官方 SDK）。（缺点：token 用量取不到，可以自行改进。）
* 使用 Langfuse SDK 的 API。（缺点：代码入侵相对多一点）

## 借助 OpenAI SDK

Langfuse 与 OpenAI 集成度成熟。所以使用：Langchain callback 还是 Langfuse 的装饰器都很方便。

* Langfuse 的 OpenAI 集成 SDK + `@observe`。
* Langchain 的 OpenAI 集成 SDK + Langfuse 的 Langchain Callback，也可以结合 Langfuse `@observe`、`langfuse_context.*` 方法更精准的控制上报内容。

### Langfuse 的 OpenAI 集成 SDK

安装依赖库（推荐在 Python 虚拟环境中使用）：
```bash
# langfuse python sdk
pip install langfuse
# 通义的 openai 兼容接口方法，只需要依赖 openai 即可。
pip install openai
# 方便读取 .env 配置
pip install python-dotenv
```

Langfuse 的 OpenAI 集成 SDK，结合 `@observe`：
```python{5-6,12,19}
import os
import time

from dotenv import load_dotenv
from langfuse.openai import OpenAI
from langfuse.decorators import observe

# 加载 .env 配置文件的内容
load_dotenv()


@observe()
def openai_completion(input_query: str) -> str:
    messages = [
        {'role': 'system', 'content': '你是小学语文老师。'},
        {'role': 'user', 'content': input_query}
    ]
    try:
        client = OpenAI(
            # load_dotenv() 已从 .env 文件读的，可以直接使用。
            api_key=os.getenv("DASHSCOPE_API_KEY"),
            base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
        )

        completion = client.chat.completions.create(
            # 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
            model="qwen-plus"
            , messages=messages
        )

        return completion.choices[0].message.content
    except Exception as e:
        print(f"错误信息：{e}")
        print("请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code")


if __name__ == '__main__':
    query = '请用50个字描写春天的景色。'
    r = openai_completion(query)
    print(r)
    print("等待 5 秒，等待 langfuse 异步上报。")
    time.sleep(5)
    print("end!")

```

这种方式很方便，也不需要 通义 SDK（Dashscope），功能也完善。效果如下：

![tongyi-openai-langfuse-observe](http://static.chenlb.com/img/tongyi/tongyi-openai-langfuse-observe.png)

::: tip 说明
当然，也可以使用在 `@observe` 装饰的函数内，使用 `langfuse_context.*` 实现更多上报细节的控制。

可以参数：[dashscope sdk 使用 langfuse_context 增加 token 用量上报](/llm/langfuse/tracing-examples#langfuse-context)

更多关于 `langfuse_context.*` 的细节请看官方文档：[add-additional-parameters-to-the-trace](https://langfuse.com/docs/sdk/python/example#add-additional-parameters-to-the-trace)
:::

### Langchain Callback

在 Langchain 方式来调用大模型的时间。使用 Langchain 集成的 OpenAI 和 Langfuse 的 Langchain Callback 也可以实现。

追加安装依赖库：
```bash
pip install langchain-openai
```

代码实现：
```python{5-6,13,19,24}
import os
import time

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langfuse.callback import CallbackHandler

# 加载 .env 配置
load_dotenv()

query = '请用50个字描写春天的景色。'

llm = ChatOpenAI(
        model="qwen-plus"
        , api_key=os.getenv("DASHSCOPE_API_KEY")
        , base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

langfuse_handler = CallbackHandler()

# 可以在链上追加其它任务
chain = llm

result = chain.invoke(query, config={"callbacks": [langfuse_handler]})

print(type(result))
print(result)
print("等待 5 秒，等待 langfuse 异步上报。")
time.sleep(5)
print("完成！")

```

效果：

![tongyi-openai-langchain-callback](http://static.chenlb.com/img/tongyi/tongyi-openai-langchain-callback.png)

::: tip 说明
当前的 langchain-openai 0.2.8 版本。使用 OpenAI 类，报 404 错，可能通义没有实现。只能用 ChatOpenAI 类。
:::


## 使用 DashScope SDK

DashScope 是使用通义大模型的官方 SDK。它与 Langfuse 集成度没有 OpenAI 高。正常情况取不到 token 用量数，需要增加一个代码。

### @observe 方式

代码实现请看：[dashscope sdk 使用 langfuse_context 增加 token 用量上报](/llm/langfuse/tracing-examples#langfuse-context)

核心的是使用 `langfuse_context.update_current_observation` 上报 token 用量数据。如下内容：

```python{7,10-14}
# ...
@observe(as_type="generation")
def tongyi_generation(messages: list[dict]) -> str:
    # ...
    if response.status_code == 200:
        # ...
        langfuse_context.update_current_observation(
            name="Dashscope-generation", model=model_name
            , input=messages, output=output
            , usage={
                "input": response.usage['input_tokens']
                , "output": response.usage['output_tokens']
                , "unit": "TOKENS"
            }
        )
        return output
    # ...

# ...
```

### hooks by langfarm

上报 token 用量数据是通用的方法。我把这段代码使用类似 python 装饰器的方式实现，并把它发布到 PyPI 仓库。来看下怎么使用

安装依赖：
```bash
pip intall langfarm
```

使用 DashScope 示例代码：
```python{6-8}
import os
import time

from dotenv import load_dotenv
from langfuse.decorators import observe
# from dashscope import Generation
# 改用 from langfarm.hooks.dashscope
from langfarm.hooks.dashscope import Generation

load_dotenv()


@observe(as_type="generation")
def tongyi_generation(model_name: str, query: str) -> str:
    response = Generation.call(
        api_key=os.getenv('DASHSCOPE_API_KEY'),
        model=model_name,
        prompt=query,
        result_format="message"
    )

    if response.status_code == 200:
        return response.output.choices[0].message.content
    else:
        tip = "请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code"
        raise Exception(
            f"HTTP返回码：{response.status_code}；错误码：{response.code}；错误信息：{response.message}。{tip}")


@observe(name="tongyi_hook_by_langfarm")
def dashscope_hook_call(query: str) -> str:
    output = tongyi_generation("qwen-plus", query)
    return output


if __name__ == '__main__':
    input_query = "请用50个字描写秋天的景色。"
    result = dashscope_hook_call(input_query)
    print(result)
    print("等待 2 秒，等待 langfuse 异步上报。")
    time.sleep(2)
    print("完成！")

```

核心的修改：只是修改引用包，其它一样正常使用 DashScope：
```diff
- from dashscope import Generation
+ from langfarm.hooks.dashscope import Generation
```

效果如下：

![tongyi-hook-by-langfarm](http://static.chenlb.com/img/tongyi/tongyi-hook-by-langfarm.png)


## 使用 Langchain 的 Tongyi

Langchain 社区包里有 Tongyi 在 langchain 生态里使用。同样使用 Langfuse 的 Callback 也取不到 token 用量。

追加安装 langchain 社区包 依赖：
```bash
pip install langchain-community
```

::: details  点击查看：在 Langchain 里，使用 Langfuse 实现的 Callback 来上报 Tracing 的基本代码
```python{4-5,10-11,14}
import time

from dotenv import load_dotenv
from langchain_community.llms import Tongyi
from langfuse.callback import CallbackHandler

# 加载 .env 配置
load_dotenv()

llm = Tongyi(model="qwen-plus")
langfuse_handler = CallbackHandler()

query = '请用50个字描写春天的景色。'
result = llm.invoke(query, config={"callbacks": [langfuse_handler]})

print(result)
print("等待 5 秒，等待 langfuse 异步上报。")
time.sleep(5)
print("完成！")

```
:::

要能取到 token 用量，解决方法有：
* 继承 `langfuse.callback.langchain.LangchainCallbackHandler` 覆盖 on_llm_end 方法，实现得到 token。每次使用自己实现的 Callback
* 装饰 `langfuse.callback.langchain._parse_usage` 函数。我用这种方式实现（实现已经放到 github [langfarm](https://github.com/langfarm/langfarm)，已经发布到 PyPI），使用时更方便。


我以使用第二种方案：langfarm 为示例，只需要导入语句改一下。

langfarm 上面已经安装，没有安装的可以安装：
```bash
# langfarm 0.1.1
pip install langfarm
```

代码：
```python{7}
import time

from dotenv import load_dotenv
from langchain_community.llms import Tongyi
# from langfuse.callback import CallbackHandler
# 把 langfuse.callback 换成 langfarm.hooks.langfuse.callback
from langfarm.hooks.langfuse.callback import CallbackHandler

# 加载 .env 配置
load_dotenv()

llm = Tongyi(model="qwen-plus")
langfuse_handler = CallbackHandler(trace_name="with_hooks")

query = '请用50个字描写春天的景色。'
result = llm.invoke(query, config={"callbacks": [langfuse_handler]})

print(result)
print("等待 5 秒，等待 langfuse 异步上报。")
time.sleep(5)
print("完成！")

```

核心是替换 Langfuse 实现的 `langfuse.callback` 包：
```diff
- from langfuse.callback import CallbackHandler
+ from langfarm.hooks.langfuse.callback import CallbackHandler
```

使用效果：

![tongyi-with-langfuse-callback](http://static.chenlb.com/img/langfuse/tongyi-with-langfuse-callback.png)

## 使用 Langfuse API

使用 Langfuse SDK 的 API，代码入侵相对多一点。以上方法都没法实现功能的可以直接使用 API。

详情看：[Tracing API](/llm/langfuse/tracing-api)
