# 通义兼容 OpenAI 接口

通义千问模型提供了与OpenAI兼容的使用方式，对现在使用了 OpenAI 接口的应用，切换成通义大模型会比较方便。

现在通义大模型能力上来了，也就是更聪明了，很多场景都可以切换成通义来实现。好处就是国内访问方便，Token 成本估计也会比较低。

## 环境准备

* 使用通义的环境请看：[通义千问（DashScope）快速开始](/llm/tongyi/getting-started)，写好 `.env` 的 `DASHSCOPE_API_KEY`
* 安装 openai
```bash
# 在 example-llm 项目里 安装 openai


# 命令行
# cd ~/Project/example-llm
# 如果没有激活虚拟环境，还需要激活下。激活过了可以跳过。
source .venv/bin/activate

# 如果在 PyCharm IDE 里可以直接在控制台执行（原因是 IDE 自动激活了虚拟环境）
pip install openai

# 如果安装 python-dotenv
# pip install python-dotenv
```

## 使用 OpenAI

通义能兼容 OpenAI 接口最核心的是实现 OpenAI 提交的服务器端接口。这个服务端的地址是：

::: code-group
```text [OpenAI SDK]
https://dashscope.aliyuncs.com/compatible-mode/v1
```

```text [Http 客户端 POST]
https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
```
:::

使用 OpenAI 实现调用通义大模型服务的代码，跟正常使用 OpenAI 环境，只是设置 `base_url` 、使用通义的 API Key 和 使用通义的模型名。

`hello_tongyi_openai.py` 内容如下：

```python{7,19-20,25}
import os

from openai import OpenAI
from dotenv import load_dotenv

# 加载 .env 配置文件的内容
load_dotenv()

query = '你是谁？'

messages = [
    {'role': 'system', 'content': 'You are a helpful assistant.'},
    {'role': 'user', 'content': query}
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

    print(completion.choices[0].message.content)
except Exception as e:
    print(f"错误信息：{e}")
    print("请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code")
```

运行：
```bash
python hello_tongyi_openai.py
```
