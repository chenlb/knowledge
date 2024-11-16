# Langfuse 快速开始

使用 docker 来本地部署 langfuse

前提条件：
* 需要 docker 和 docker compose。 Docker Desktop 安装了就有。
* 假设会使用 docker。

## 本地部署

从 docker compose 启动。

```bash
# 下载源码，主要是 docker-compose.yml 配置
git clone https://github.com/langfuse/langfuse.git
cd langfuse
 
# 启动 postgresql 和 langfuse server
docker compose up
```

1、访问地址：http://localhost:3000，打开界面，注册用户。
![](http://static.chenlb.com/img/langfuse/langfuse-sign-up.png)


2、新建组织 -> 选择用户 -> 新建项目。创建成本后会到项目设备界面。
![](http://static.chenlb.com/img/langfuse/langfuse-new-project.png)


3、进入 API Keys，新建 API Key。复制好 两个Key：Public Key 和 Secret Key，保存到项目根目录的 `.env` 下来。如下：

```dotenv
LANGFUSE_SECRET_KEY=sk-lf-691f5667-xxxx-xxxx-xxxx-8de68eda2ae0
LANGFUSE_PUBLIC_KEY=pk-lf-3b959d86-xxxx-xxxx-xxxx-fbeadd019744
LANGFUSE_HOST="http://localhost:3000"
```

![](http://static.chenlb.com/img/langfuse/langfuse-project-new-api-key.png)


4、点击左则导航栏 Dashboard，可以预览。
![](http://static.chenlb.com/img/langfuse/langfuse-dashboard.png)

## Tracing OpenAI

### 环境准备

先安装 langfuse 和 openai，推荐在[虚拟环境](/python/base/env)安装。
```bash
# python-dotenv 读取 .env 配置文件
pip install python-dotenv
# 安装 langfuse 和 openai
pip install langfuse openai
```


这里使用 阿里云的通义模型服务（更多请看：[DashScope 可以兼容 OpenAI 接口](/llm/tongyi/compatible-openai)），在国内使用 OpenAI 接口就很方便了，实际是调用通义大模型。

准备配置（项目根目录下的 `.env` 文件）：
* 阿里云通义的 API Key
* 前面保存的 Langfuse 项目的 API Key

```dotenv
# 改成自己的 API Key
DASHSCOPE_API_KEY="sk-5c56...d29f"

# langfuse key
LANGFUSE_SECRET_KEY=sk-lf-691f5667-xxxx-xxxx-xxxx-8de68eda2ae0
LANGFUSE_PUBLIC_KEY=pk-lf-3b959d86-xxxx-xxxx-xxxx-fbeadd019744
LANGFUSE_HOST="http://localhost:3000"
```

### 追踪代码

写使用 Langfuse 追踪 OpenAI 调用的代码，如 `tongyi_openai_with_langfuse.py`。

```python{4-5,12}
import os
import time

from langfuse.openai import OpenAI
from langfuse.decorators import observe
from dotenv import load_dotenv

# 加载 .env 配置文件的内容
load_dotenv()


@observe()
def get_completion(input_query: str) -> str:
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

    r = get_completion(query)
    print(r)
    print("等待 5 秒，等待 langfuse 异步上报。")
    time.sleep(5)
    print("end!")

```

::: tip 使用 Langfuse 关键代码

* 使用 `langfuse.openai` 替换 `openai` 包
* 对大模型调用的方法加 `@observe()` 装饰器。

```diff
import os

- from openai import OpenAI
+ from langfuse.openai import OpenAI
+ from langfuse.decorators import observe
from dotenv import load_dotenv

# ...
+ @observe()
def get_completion(input_query: str) -> str:
    # ...
```
:::

### 运行效果

运行代码：
```bash
python tongyi_openai_with_langfuse.py
```

输出结果：
```console
春回大地，万物复苏。嫩绿的草儿从土里探出头来，五彩斑斓的花儿争奇斗艳，蜜蜂蝴蝶在花间翩翩起舞，一派生机勃勃的景象。
```

Langfuse 界面效果，打开 Tracing -> Traces 界面：

**Trace 列表**
![langfuse tracing openai list](http://static.chenlb.com/img/langfuse/langfuse-tracing-openai-1.png)

**Trace 详情**
![langfuse tracing openai detail](http://static.chenlb.com/img/langfuse/langfuse-tracing-openai-2.png)

**具体一次大模型调用**
![langfuse tracing openai generation](http://static.chenlb.com/img/langfuse/langfuse-tracing-openai-3.png)
