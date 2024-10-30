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

还可以为参数加上默认值，Python 的默认参数语法。




## 请求体

