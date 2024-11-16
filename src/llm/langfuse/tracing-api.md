# Langfuse Tracing API

## 主要概念

主要的对象有：
* trace： 通常表示单个请求或操作。它包含函数的整体输入和输出，以及有关请求的元数据，例如用户、会话和标签。
* observation：每个 trace 可以包含多个观察结果，以记录执行的各个步骤。它可以嵌套。不同的 observation 类型：
  * event：事件是基本构建块。它们用于 trace 中的离散事件。
  * span：表示 trace 工作单元的范围。
  * generation：用于记录大模型。它们包含模型名、Prompt、Output、Token 用量等。

类图：

![langfuse-tracing-class-diagram](http://static.chenlb.com/img/langfuse/langfuse-tracing-class-diagram.png)

主要有这几个接口

跟踪内容如：
```console
TRACE
|
|-- SPAN: Retrieval
|   |
|   |-- GENERATION: Vector DB Query Creation
|   |
|   |-- SPAN: Data Fetching
|   |
|   |-- EVENT: Data Summary Creation
|
|-- GENERATION: Output Generation
```

对应的使用的接口：
```python
trace = langfuse.trace(name = "llm-feature")
retrieval = trace.span(name = "retrieval")
retrieval.generation(name = "query-creation")
retrieval.span(name = "vector-db-search")
retrieval.event(name = "db-summary")
trace.generation(name = "user-output");
```

## 使用 API 示例

安装 langfuse
```bash
pip install langfuse
```

配置 langfuse 相关 sdk key 请看：[Langfuse 快速开始的环境准备](/llm/langfuse/getting-started#环境准备)

使用 langfuse api 上报 trace

```python{6,12,17-21,33-40,53-58,69-70}
import os
import time

from dotenv import load_dotenv
from dashscope import Generation
from langfuse import Langfuse
from langfuse.client import StatefulTraceClient

# 加载 .env 配置文件的内容
load_dotenv()

langfuse_sdk = Langfuse()


def tongyi_generation(messages: list[dict], trace: StatefulTraceClient) -> str:
    model_name = "qwen-plus"
    generation = trace.generation(
        name="Tongyi-generation"
        , model=model_name
        , input=messages
    )
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
        generation.end(
            output=output
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


def tongyi_completion(input_query: str) -> str:
    messages = [
        {'role': 'system', 'content': '你是小学语文老师。'},
        {'role': 'user', 'content': input_query}
    ]
    trace = langfuse_sdk.trace(
        name="tongyi-langfuse-api"
        , input=messages
    )
    output = tongyi_generation(messages, trace)
    trace.update(output=output)
    return output


if __name__ == '__main__':
    query = '请用50个字描写春天的景色。'
    r = tongyi_completion(query)
    print(r)
    print("等待 5 秒，等待 langfuse 异步上报。")
    time.sleep(5)

    if langfuse_sdk:
        langfuse_sdk.shutdown()
    print("end!")

```

效果如图：

![langfuse-tracing-use-api](http://static.chenlb.com/img/langfuse/langfuse-tracing-use-api.png)
