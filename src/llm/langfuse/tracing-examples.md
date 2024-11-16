# Langfuse Tracing 的几个使用示例

Tracing 是 Langfuse 的 LLM 调用过程追踪。主要有：输入输出内容；Token 用量；Token 计价等。

准备环境：
* 从 [Langfuse 快速开始](/llm/langfuse/getting-started) 准备 Langfuse 的本地环境。

来看下几种用法。

## observe 装饰器

安装依赖库（推荐在 Python 虚拟环境中使用）：
```bash
# langfuse python sdk
pip install langfuse
# 通义大模型
pip install dashscope
# 通义的 openai 兼容接口方法，只需要依赖 openai 即可。直接使用 dashscope 不需要 openai
pip install openai
# 方便读取 .env 配置
pip install python-dotenv
```

直接上使用 Langfuse 上报跟踪的代码，两个版：Tongyi；OpenAI：
::: code-group
```python{5-6,12,30} [Tongyi]
import os
import time

from dotenv import load_dotenv
from dashscope import Generation
from langfuse.decorators import observe

# 加载 .env 配置文件的内容
load_dotenv()


@observe(as_type="generation")
def tongyi_generation(messages: list[dict]) -> str:
    response = Generation.call(
        # load_dotenv() 已从 .env 文件读的，可以直接使用。
        api_key=os.getenv("DASHSCOPE_API_KEY"),
        # 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
        model="qwen-plus",
        messages=messages,
        result_format="message"
    )

    if response.status_code == 200:
        return response.output.choices[0].message.content
    else:
        tip = "请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code"
        raise Exception(f"HTTP返回码：{response.status_code}；错误码：{response.code}；错误信息：{response.message}。{tip}")


@observe()
def tongyi_completion(input_query: str) -> str:
    messages = [
        {'role': 'system', 'content': '你是小学语文老师。'},
        {'role': 'user', 'content': input_query}
    ]
    return tongyi_generation(messages)


if __name__ == '__main__':
    query = '请用50个字描写春天的景色。'
    r = tongyi_completion(query)
    print(r)
    print("等待 5 秒，等待 langfuse 异步上报。")
    time.sleep(5)
    print("end!")

```

```python{5-6,12} [OpenAI]
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
:::

分别运行两个版本代码，效果如下：

![tongyi-with-langfuse-observe](http://static.chenlb.com/img/langfuse/tongyi-with-langfuse-observe.png)

Langfuse 天生对 openai 做了很好的兼容。对 tongyi 取不到 token 的用量。这种情况下，还是推荐使用 openai 来调用通义大模型。

## Langchain Callback

追加安装 langchain 依赖：
```bash
pip install langchain-community
```

在 Langchain 里，使用 Langfuse 实现的 Callback 来上报 Tracing

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

同样的，Langfuse 官方的 Callback **取不到通义的 token 用量**。要能取到 token 用量，解决方法有：
* 继承 `langfuse.callback.langchain.LangchainCallbackHandler` 覆盖 on_llm_end 方法，实现得到 token。每次使用自己实现的 Callback
* 装饰 `langfuse.callback.langchain._parse_usage` 函数。我用这种方式实现（实现已经放到 github [langfarm](https://github.com/langfarm/langfarm)，已经发布到 PyPI），使用时更方便。
* 使用 [langfuse 更底层的 api](/llm/langfuse/tracing-api)。

我以使用第二种方案：langfarm 为示例，只需要导入语句改一下。

安装依赖：
```bash
# langfarm 0.1.0
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

使用效果：

![tongyi-with-langfuse-callback](http://static.chenlb.com/img/langfuse/tongyi-with-langfuse-callback.png)

## Langfuse API

详情看：[Tracing API](/llm/langfuse/tracing-api)
