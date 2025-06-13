# FastAPI 最佳实践

## 自定义

### 更换 Swagger UI 前端资源

国内前端资源CDN镜像：https://www.bootcdn.cn/swagger-ui/

```python{4,13-14,23}
from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html

app = FastAPI(docs_url=None, redoc_url=None)


@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title + " - Swagger UI",
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url,
        swagger_js_url="https://cdn.bootcdn.net/ajax/libs/swagger-ui/5.24.0/swagger-ui-bundle.min.js",
        swagger_css_url="https://cdn.bootcdn.net/ajax/libs/swagger-ui/5.24.0/swagger-ui.min.css",
    )


@app.get("/redoc", include_in_schema=False)
async def redoc_html():
    return get_redoc_html(
        openapi_url=app.openapi_url,
        title=app.title + " - ReDoc",
        redoc_js_url="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js",
    )

@app.get("/users/{username}")
async def read_user(username: str):
    return {"message": f"Hello {username}"}

```

分别打开 docs 和 redoc，就很快了。
* docs - http://localhost:8000/docs
* redoc - http://localhost:8000/redoc