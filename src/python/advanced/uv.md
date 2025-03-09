# uv : 一个极速的 Python 包和项目管理工具

## 介绍

官方介绍，uv 是 Rust 写的、极快的 Python 包和项目管理工具。 

比 Poetry 还快，官方给测试：

<div align=center>
    <img src="http://static.chenlb.com/img/python/uv-is-faster.svg" alt="uv" />
</div>
<div style="text-align: center;font-style:italic;">
Installing <a href="https://trio.readthedocs.io/" target="_blank">Trio</a>'s dependencies with a warm cache.
</div>

## 特性

* 🚀 一个工具（uv）代替 pip、pip-tools、pipx、poetry、pyenv、twine、virtualenv 等.
* ⚡️ 比 pip 快 10 到 100 倍。 
* 🗂️ 通过统一的 .lock 文件，提供全面的项目管理。 
* ❇️ 支持直接使用依赖配置运行脚本。 
* 🐍 安装和管理 Python 各版本。 
* 🛠️ 支持运行和安装已经发布的 Python 包。 
* 🔩 提供 pip 兼容的 CLI 接口。 
* 🏢 支持 Cargo 风格的工作空间，可以方便扩展项目。 
* 💾 通过全局缓存依赖，使得磁盘空间利用率商。 
* ⏬ uv 本身可以通过 curl 或 pip 安装，不需要 Rust 和 Python。 
* 🖥️ 支持 macOS, Linux, 和 Windows.


[官网介绍](https://docs.astral.sh/uv/)

## 安装

安装方式有：
* brew 安装（mac 推荐，[设置 brew 国内镜像](/pc/macbook-env.html#brew)）
* pip 安装（方便）
* 下载安装（使用下载工具，如：迅雷）
* curl 安装（很慢）


::: code-group

```bash [brew 安装]
brew install uv
```

```bash [pip 安装]
pip install uv
```

```bash [下载安装]
# 在 github 的 releases 页面下载, Assets 或 Download uv 列表
# 如 https://github.com/astral-sh/uv/releases/tag/0.6.5
# 找到对应平台的压缩包下载，推荐下载工具，如：迅雷
# 比 curl 安装要好。
```

```bash [curl 安装]
# 可以用 UV_INSTALL_DIR 环境变量 指定安装目录，如：
# curl -LsSf https://astral.sh/uv/install.sh | env UV_INSTALL_DIR="/usr/local/bin" sh

# github 源 比官网源好一点。
# 建设最新版本。从 https://github.com/astral-sh/uv/releases 查看
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/astral-sh/uv/releases/download/0.6.5/uv-installer.sh | sh

# 官网源
# 国内很慢，很难安装
curl -LsSf https://astral.sh/uv/install.sh | sh
```

:::

## 指定 PyPI 源

把如下内容放到 ```~/.config/uv/uv.toml``` 或 ```/etc/uv/uv.toml``` 中，内容：
```toml
[[index]]
url = "http://mirrors.aliyun.com/pypi/simple/"
default = true
extra-index-url = [
    "https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple"
    , "https://mirrors.ustc.edu.cn/pypi/simple"
]
```

## 使用 uv
创建一个项目，并安装依赖：

```bash
uv init uv-demo
cd uv-demo

# 安装 requests 包
uv add requests
# 可以指定版本
# uv add requests==2.32.3

# 查看更多参数
# uv add -h
```

效果如下
```console
% uv add requests
Using CPython 3.11.10 interpreter at: /usr/local/opt/python@3.11/bin/python3.11
Creating virtual environment at: .venv
Resolved 6 packages in 1.00s
Prepared 5 packages in 128ms
Installed 5 packages in 24ms
 + certifi==2025.1.31
 + charset-normalizer==3.4.1
 + idna==3.10
 + requests==2.32.3
 + urllib3==2.3.0
```

pyproject.toml 如下：
```toml{8}
[project]
name = "uv-demo"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [
    "requests>=2.32.3",
]
```

查看依赖树
```bash
uv tree
```

结果如下：
```console
% uv tree
Resolved 6 packages in 8ms
uv-demo v0.1.0
└── requests v2.32.3
    ├── certifi v2025.1.31
    ├── charset-normalizer v3.4.1
    ├── idna v3.10
    └── urllib3 v2.3.0
```

## 运行 Python

```bash
# uv 加上依赖来运行。
uv run main.py

# 也可以激活虚拟环境
source ./.venv/bin/activate
# 已经使用虚拟环境
python main.py
```

## pip 的方式使用

```uv pip``` 可以按 pip 方式来管理依赖。

* 不需要创建项目。
* 不需要 pyproject.toml 文件。

```bash
# 使用 /etc/uv/uv.toml 或 ~/.config/uv/uv.toml 配置的 PyPI 源
# 安装 requests
# --index 参数可以改变uv.toml 配置的 PyPI源
uv pip install requests
```


## 发布

TODO