# FastAPI 是什么？

FastAPI 是一个用于构建 API 的现代、快速（高性能）的 web 框架，使用 Python 并基于标准的 Python 类型提示。

关键特性:

* **快速**：可与 NodeJS 和 Go 并肩的极高性能（归功于 Starlette 和 Pydantic）。最快的 Python web 框架之一。
* **高效编码**：提高功能开发速度约 200％ 至 300％。
* **更少 bug**：减少约 40％ 的人为（开发者）导致错误。
* **智能**：极佳的编辑器支持。处处皆可自动补全，减少调试时间。
* **简单**：设计的易于使用和学习，阅读文档的时间更短。
* **简短**：使代码重复最小化。通过不同的参数声明实现丰富功能。bug 更少。
* **健壮**：生产可用级别的代码。还有自动生成的交互式文档。
* **标准化**：基于（并完全兼容）API 的相关开放标准：[OpenAPI](https://github.com/OAI/OpenAPI-Specification) (以前被称为 Swagger) 和 [JSON Schema](https://json-schema.org/)。

## 快速开始

预备知识：
* [Python 安装](/python/)
* [Python 虚拟环境；pip 及国内镜像](/python/env)

### 安装

```shell
# 创建虚拟环境
python3 -m venv ~/Projects/fastapi-examples/.venv

# 激活虚拟环境
cd ~/Projects/fastapi-examples
source .venv/bin/activate

# 安装 fastapi
pip install fastapi

# 安装 ASGI 服务器，用于运行 fastapi 程序。
pip install "uvicorn[standard]"
```

### 示例

创建一个 `main.py` 文件并写入以下内容:
```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root(q: str = "World"):
    return {"Hello": q}
```

### 运行

```shell
uvicorn main:app --reload
```

::: details 点击打开运行结果：
```text
INFO:     Will watch for changes in these directories: ['~/Projects/fastapi-examples']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [50182] using WatchFiles
INFO:     Started server process [50185]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```
:::

浏览器打开：http://127.0.0.1:8000/
```json
{"Hello":"World"}
```

加入参数 `q`，浏览器打开：http://127.0.0.1:8000/?q=your_name
```json
{"Hello":"your_name"}
```

## 交互式 API 文档

让人惊艳的是 交互式 API 文档：http://127.0.0.1:8000/docs

接口列表

![接口列表](//static.chenlb.com/img/fastapi/first-fastapi-api-list.png)

执行接口

![执行接口](//static.chenlb.com/img/fastapi/first-fastapi-invoke-api.png)

