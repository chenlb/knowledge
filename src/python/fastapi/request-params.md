# FastAPI 请求参数

## 路径参数

如：路径参数 `id`，使用 Python 字符串格式化语法声明。

把 `id` 路径参数传递给 `get_name_by` 函数参数

```python{6-7}
from fastapi import FastAPI

app = FastAPI()


@app.get("/names/{id}")
async def get_name_by(id):
    return {"name": f"my name is id={id}"}

```

启动运行服务：
```bash
uvicorn main:app --reload
```

访问 http://127.0.0.1:8000/names/chenlb ，返回如下：
```json
{"name":"my name is id=chenlb"}
```

如果要把 路径参数 `id` 指定类型，可以在 `get_name_by` 函数参数 里声明，如：

```python
# ...
@app.get("/names/{id}")
async def get_name_by(id: int):
    return {"name": f"my name is id={id}"}

```

再次访问 http://127.0.0.1:8000/names/chenlb ，报错：
```json{9}
{
  "detail": [
    {
      "type": "int_parsing",
      "loc": [
        "path",
        "id"
      ],
      "msg": "Input should be a valid integer, unable to parse string as an integer",
      "input": "chenlb"
    }
  ]
}
```

要输入 `id=整数` 才正常返回，如：http://127.0.0.1:8000/names/1
```json
{"name":"my name is id=1"}
```

## 查询参数

除了路径参数，还有查询参数。不参路径里声明的都可以认为是查询参数，如：

```python{3}
# ...
@app.get("/names/{id}")
async def get_name_by(id: int, show_age: bool):
    return {"name": f"my name is id={id}", "show_age": show_age}
```

访问 http://127.0.0.1:8000/names/1?show_age=true 
```json
{"name":"my name is id=1","show_age":true}
```

不加 `show_age` 参数，会报错。

不过可以为参数加上默认值，Python 的默认参数语法。

```python{3}
# ...
@app.get("/names/{id}")
async def get_name_by(id: int, show_age: bool = True):
    return {"name": f"my name is id={id}", "show_age": show_age}
```

访问 http://127.0.0.1:8000/names/1
```json
{"name":"my name is id=1","show_age":true}
```

## 请求体

请求体是客户端发送给 API 的数据。响应体是 API 发送给客户端的数据。

可以使用 Pydantic 模型来声明请求体。一般用 `POST`，也可以使用 `PUT`、`DELETE`、`PATCH` 等操作。

先用 Pydantic 定义一个请求体 `User`

```python{7-10,14}
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class User(BaseModel):
    name: str
    age: int
    email: str | None = None


@app.post("/users/")
async def create_user(user: User):
    return user

```

使用 http://127.0.0.1:8000/docs 接口文档发布请求业验证，Request body 里输入：
```json
{
  "name": "chenlb",
  "age": 18,
  "email": "abc@example.com"
}
```

::: details 点击打开：命令行 `curl` 发请求体

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/users/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "chenlb",
  "age": 18,
  "email": "abc@example.com"
}'
```
:::

小结：

使用 Pydantic 的 BaseModel 来定义请求体很方便。同时有请求输入类型检查。优点如下：

* 以 JSON 形式读取请求体
* 把请求体转换为对应的类型
* 检验数据：数据无效时返回错误信息，并指出错误数据的确切位置和内容
* 把接收的数据赋值给参数 `user`
* 自动生成 OpenAPI 接口文档。

