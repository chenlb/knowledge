# python-dotenv 读取配置

dotenv 可以加载 `.env` 文件的 KV 值到环境变量。可以使用 `os.getenv('xxx')` 可以取得对应的值。读取配置很方便。

## 安装使用

安装（建议在[虚拟环境](/python/base/env.html#虚拟环境)下安装）：
```bash
pip install python-dotenv
```

`.env` 的文件内容，示例如下：
```dotenv
user=chenlb
# 可以引用已经定义过的变量。
domain=${user}.com
```

读取配置：
```python
import os

from dotenv import load_dotenv

load_dotenv()
print(os.getenv('domain'))
```

输出如下：
```console
chenlb.com
```

## 多个文件可覆盖

场景：多个环境有对应有，开发环境 `.env.dev`、预发环境 `.env.pre`、正式环境 `.env.prod`

想要实现的功能是，在什么环境下创建对应的 `.env.*` 文件，并取对应的变量值放到文件里。

::: code-group
```dotenv [.env.dev]
url=http://local.${domain}/
```

```dotenv [.env.pre]
url=http://pre.${domain}/
```

```dotenv [.env.prod]
url=http://${domain}/
```
:::

读取配置 python 代码：
```python{4,10-16}
import os

from dotenv import load_dotenv
from dotenv import dotenv_values

load_dotenv()

config = {
    **dotenv_values('.env'),
    # 调用 load_dotenv() 后，.env.* 可以使用 .env 定义的变量。
    # 有 .env.dev 即加载，可以没有。本地开发：项目目录下 增加 .env.dev 文件。
    **dotenv_values('.env.dev'),
    # 有 .env.pre 即加载，可以没有。预发环境：项目目录下 增加 .env.pre 文件。
    **dotenv_values('.env.pre'),
    # 有 .env.prod 即加载，可以没有。正式环境：项目目录下 增加 .env.prod 文件。
    **dotenv_values('.env.prod')
}

print(config.get('url'))

```

对应环境创建对应文件，输出如下：
::: code-group
```console [.env.dev]
http://local.chenlb.com/
```

```console [.env.pre]
http://pre.chenlb.com/
```

```console [.env.prod]
http://prod.chenlb.com/
```
:::

## 使用 pydantic-settings 读配置

使用 pydantic-settings 库后，读取配置可以实例化使用。借助 IDE 工具防止 使用 key 时编写错了。

安装 pydantic-settings
```bash
pip install pydantic-settings
```

使用 pydantic-settings，先创建 `config.py`

```python{11,21}
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

# .env.* 文件有引用 .env 的变量需要加。如果没有引用不需要加。
load_dotenv()


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        # 覆盖链 `.env.prod` -> `.env.pre` -> `.env.dev` -> `.env`
        env_file=('.env', '.env.dev', '.env.pre', '.env.prod')
        , extra='ignore'
    )

    user: str
    domain: str
    url: str


# 创建配置实例
settings = Settings()
```

使用 `config.py` 中的配置：
```python{1}
from config import settings

print(settings.url)
```

类似 python-dotenv 配置，读取配置的优先级顺序 `.env.prod` -> `.env.pre` -> `.env.dev` -> `.env` 。

在对应环境放 `.env.<dev|pre|prod>` 文件。

详情，可以看 `pydantic-settings` 官方说明：[dotenv-env-support](https://docs.pydantic.dev/latest/concepts/pydantic_settings/#dotenv-env-support)
