# 通义千问（DashScope）快速开始

百炼支持通过API调用大模型，DashScope SDK、涵盖OpenAI兼容接口、HTTP等接入。

这里先使用 DashScope SDK 来演示。

## 获取API Key

1、如果没有阿里云账号，先注册一个。

2、开通百炼：前往[百炼控制台](https://bailian.console.aliyun.com)，如果页面顶部显示以下消息，需要**开通百炼的模型服务，以获得免费额度**。如果未显示该消息，则表示您已经开通。
![开通百炼](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5298748271/p856749.png)


3、获取API Key：在控制台的右上角选择API-KEY，然后创建API Key，用于通过API调用大模型。
![获取API Key](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9198748271/p856753.png)

## Python 使用 DashScope

### 准备工作
* [Python 安装](/python/)，DashScope 需要 Python 3.8 以上。
* [配置好 PyPI 国内镜像](/python/base/env#pypi-国内镜像) （可选，但推荐。）
* [了解虚拟环境](/python/base/env) （可选，但推荐。）

### 创建环境

这里用命令行创建，也可以使用 PyCharm IDE 来创建项目（可以看[PyCharm IDE 示例](/python/#python-ide)）

::: code-group
```bash [Mac OS]
# 假设在 ～/Projects 目录下
mkdir example-llm
cd example-llm

# 创建 python 虚拟环境（目录为 .venv）
python3 -m venv .venv

# 激活虚拟环境
source .venv/bin/activate

# 安装通义的 DashScope SDK
pip install dashscope
# 安装 python-dotenv，用于加载 .env 配置，DashScope 的 API Key 放到这个文件
pip install python-dotenv
```
:::


### 设置 API Key
创建 `.env` 文件，放入刚才获取API Key
```dotenv
# 改成自己的 API Key
DASHSCOPE_API_KEY="sk-5c56...d29f"
```

### 调用大模型 API

编码写调用大模型代码，`hello_tongyi.py`：
```python{6,8,12,16,18,24}
import os
from dashscope import Generation
from dotenv import load_dotenv

# 加载 .env 配置文件的内容
load_dotenv()

query = '你是谁？'

messages = [
    {'role': 'system', 'content': 'You are a helpful assistant.'},
    {'role': 'user', 'content': query}
]
response = Generation.call(
    # load_dotenv() 已从 .env 文件读的，可以直接使用。
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    # 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
    model="qwen-plus",
    messages=messages,
    result_format="message"
)

if response.status_code == 200:
    print(response.output.choices[0].message.content)
else:
    print(f"HTTP返回码：{response.status_code}")
    print(f"错误码：{response.code}")
    print(f"错误信息：{response.message}")
    print("请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code")
```

运行：
```bash
python hello_tongyi.py
```

返回：
```text
我是通义千问，由阿里云开发的AI助手。我可以回答各种问题、提供信息和与用户进行对话。有什么我可以帮助你的吗？
```