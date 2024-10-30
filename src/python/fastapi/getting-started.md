# 快速开始

预备知识：
* [Python 安装](/python/)
* [Python 虚拟环境；pip 及国内镜像](/python/base/env)

## 安装

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

## 示例

创建一个 `main.py` 文件并写入以下内容:
```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root(q: str = "World"):
    return {"Hello": q}
```

## 运行

```shell
uvicorn main:app --reload
```

::: details 点击打开运行结果：
```log
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

