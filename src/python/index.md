# Python 快速开始

## 安装

### 从 macbook 的 brew 安装

brew 环境请看 [brew 的安装](/pc/macbook-env#brew)

::: code-group
```bash [python]
# 当前最新版本是 13
brew install python
```

```bash [python@12]
# 指定 python 12 版本
brew install python@12
```

```bash [python@11]
# 指定 python 11 版本
brew install python@11
```
:::

如果没有 mac 的 brew 环境，可以下载来安装： [Python 官网下载](https://www.python.org/downloads/)

## 验证安装

查看 Python 版本
```bash
python3 -V
```

结果如下：
```console
Python 3.13.0
```

python 相关命令指向什么版本：
```bash
ls -lh /usr/local/bin/python*
```

我当前的环境：
```console{2}
lrwxr-xr-x  1 chenlb  wheel    10B 12 19  2023 /usr/local/bin/python -> python3.11
lrwxr-xr-x  1 chenlb  wheel    42B 10 19 22:44 /usr/local/bin/python3 -> ../Cellar/python@3.13/3.13.0_1/bin/python3
lrwxr-xr-x  1 chenlb  wheel    49B 10 19 22:44 /usr/local/bin/python3-config -> ../Cellar/python@3.13/3.13.0_1/bin/python3-config
lrwxr-xr-x  1 chenlb  wheel    44B 10 19 22:48 /usr/local/bin/python3.10 -> ../Cellar/python@3.10/3.10.15/bin/python3.10
lrwxr-xr-x  1 chenlb  wheel    51B 10 19 22:48 /usr/local/bin/python3.10-config -> ../Cellar/python@3.10/3.10.15/bin/python3.10-config
lrwxr-xr-x  1 chenlb  wheel    44B 10 19 22:49 /usr/local/bin/python3.11 -> ../Cellar/python@3.11/3.11.10/bin/python3.11
lrwxr-xr-x  1 chenlb  wheel    51B 10 19 22:49 /usr/local/bin/python3.11-config -> ../Cellar/python@3.11/3.11.10/bin/python3.11-config
lrwxr-xr-x  1 chenlb  wheel    45B 10 19 22:49 /usr/local/bin/python3.12 -> ../Cellar/python@3.12/3.12.7_1/bin/python3.12
lrwxr-xr-x  1 chenlb  wheel    52B 10 19 22:49 /usr/local/bin/python3.12-config -> ../Cellar/python@3.12/3.12.7_1/bin/python3.12-config
lrwxr-xr-x  1 chenlb  wheel    45B 10 19 22:44 /usr/local/bin/python3.13 -> ../Cellar/python@3.13/3.13.0_1/bin/python3.13
lrwxr-xr-x  1 chenlb  wheel    52B 10 19 22:44 /usr/local/bin/python3.13-config -> ../Cellar/python@3.13/3.13.0_1/bin/python3.13-config
```

## 试用 Python

命令行终端输入：
```bash
python3

# 再输入
# print('hello python')

# 退出
# quit()
```

运行情况：

```console{3,5}
Python 3.13.0 (main, Oct  7 2024, 05:02:14) [Clang 15.0.0 (clang-1500.3.9.4)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> print('hello python')
hello python
>>> quit()
```

## Python IDE

IDE(**I**ntegrated **D**evelopment **E**nvironment) 是集成开发环境。

### PyCharm CE 社区版

PyCharm CE 版本是免费的，基本 python 开发够用了。使用体验好。

[下载 PyCharm Community Edition](https://www.jetbrains.com/pycharm/download)

官方资料比较多的[学习资料](https://www.jetbrains.com/pycharm/learn/)

安装 PyCharm CE 后，创建项目，可以开始开发代码。

### 创建项目

如：first-python

![创建 Python 项目](http://static.chenlb.com/img/ide/pycharm-first-create-project.jpg)

### 创建 python 文件并运行

如：hello.py

![创建 hello.py](http://static.chenlb.com/img/ide/pycharm-create-python-file.jpg)

![编写 hello.py](http://static.chenlb.com/img/ide/pycharm-run-python-file.jpg)
