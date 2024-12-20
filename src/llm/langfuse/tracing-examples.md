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

Langfuse 天生对 openai 做了很好的兼容。对 tongyi 取不到 token 的用量（因为 langfuse 没有对 tongyi 进行集成），需要额外处理。


### langfuse_context

由于上面 tongyi 使用 `@observe()` 后缺少 token 用量数据。好在 Langfuse 还提供了一些函数来处理其它信息的上报，使用 `langfuse_context` 的相关方法：
* `langfuse_context.update_current_observation` - 更新当前的 observation 相关属性
* `langfuse_context.update_current_trace` - 更新 trace 相关属性

改造上面的示例：
```python{7,27-35}
import os
import time

from dotenv import load_dotenv
from dashscope import Generation
from langfuse.decorators import observe
from langfuse.decorators import langfuse_context

# 加载 .env 配置文件的内容
load_dotenv()


@observe(as_type="generation")
def tongyi_generation(messages: list[dict]) -> str:
    model_name = "qwen-plus"
    response = Generation.call(
        # load_dotenv() 已从 .env 文件读的，可以直接使用。
        api_key=os.getenv("DASHSCOPE_API_KEY"),
        # 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
        model=model_name,
        messages=messages,
        result_format="message"
    )

    if response.status_code == 200:
        output = response.output.choices[0].message.content
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
    else:
        tip = "请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code"
        raise Exception(f"HTTP返回码：{response.status_code}；错误码：{response.code}；错误信息：{response.message}。{tip}")


@observe(name="tongyi_completion_v2")
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

效果:

![tongyi-with-langfuse-observe-v2](http://static.chenlb.com/img/langfuse/tongyi-with-langfuse-observe-v2.png)

::: tip 说明
更多关于 `langfuse_context.*` 的细节请看官方文档：[add-additional-parameters-to-the-trace](https://langfuse.com/docs/sdk/python/example#add-additional-parameters-to-the-trace)
:::

## Langchain Callback

详情看：[使用-langchain-的-tongyi](/llm/tongyi/integration-langfuse.html#使用-langchain-的-tongyi)

## Langfuse API

详情看：[Tracing API](/llm/langfuse/tracing-api)
