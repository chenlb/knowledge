# Python 开发环境

## 虚拟环境

虚拟环境是一个 Python 环境，这样安装了 Python 解释器、库的环境和脚本与其它环境任何库隔离开来，互不影响。 

新的虚拟环境有自己的 pip 来安装库，有自己的库文件夹。

虚拟环境带来的好处：
* 开发环境包含在你的项目中，并且不干扰系统安装的 Python 或其他虚拟环境。
* 可以为不同的 Python 版本创建一个新的虚拟环境。
* 依赖的软件包独立自主控制。

虚拟环境是通过独立的目录来存储独立的相关库，通过这个目录放到项目目录下的 ```.venv``` 或 ```venv``` 目录。

建议使用 ```.venv``` 目录，有个好处是 mac\linux 系统默认会隐藏 ```.``` 前缀的目录。

### 创建虚拟环境

通过执行 venv 指令来创建虚拟环境。从 Python 3.3 开始版本带 venv 工具。

通过下以下命令创建：
```bash
# 比如项目目录在 ~/Projects/first-python
# 我的 python3 软链到 Python 3.13；python 软链到 Python 3.11 
python3 -m venv ~/Projects/first-python/.venv
```

创建后，相关命令放到 .venv/bin 目录下。可以看下与系统环境的区别

```bash:line-numbers{9,13,16}
chenlb@Chenlb-Pro first-python % ls -a
.        ..       .idea    .venv    hello.py

# 系统的 python 是 3.11 版本
chenlb@Chenlb-Pro first-python % python -V
Python 3.11.10

# python3 创建的虚拟环境是 3.13 版本 
chenlb@Chenlb-Pro first-python % .venv/bin/python -V
Python 3.13.0

# 激活虚拟环境，可以直接 .venv/bin 的命令，不用加相对路径。
chenlb@Chenlb-Pro first-python % source .venv/bin/activate

# 激活后直接用 python 命令。
(.venv) chenlb@Chenlb-Pro first-python % python -V
Python 3.13.0
(.venv) chenlb@Chenlb-Pro first-python %
```

::: tip 说明：
* 在命令行终端，每次打开窗口时都需要激活一下，才可以省去 .venv/bin 路径。
* 在 PyCharm 的 IDE 上的终端不需要每次激活，激活一次即可。推荐 PyCharm 工具来开发。
:::

如果要撤销激活，运行如下命令：
```bash{2}
# 在激活的命令行，输入 deactivate
(.venv) chenlb@Chenlb-Pro my-venv % deactivate
chenlb@Chenlb-Pro my-venv %
```

前面没有 ```(.venv)``` 显示了。

### 删除虚拟环境

如果不想使用虚拟环境，或需要重新创建。可以删除它。

```bash
# 直接删除 .venv 目录
rm -r .venv
```

## 使用pip管理包

pip(**P**ackage **I**nstaller for **P**ython)，是 python 的包管理工具，包括：查找、下载（从 [PyPi 源](https://pypi.org/)）、安装、卸载。

::: tip 说明：
Python 2.7.9 + 或 Python 3.4+ 以上版本都自带 pip 工具。
:::

### PyPI 国内镜像

pip 默认从 [PyPI 源](https://pypi.org/) 下载，这个源在国外，国内使用会比较慢。不过有组织和机构有开放的国内镜像源。

PyPI(**P**ython **P**ackage **I**ndex)是Python编程语言的软件存储库。开发者可以通过PyPI查找和安装由Python社区开发和共享的软件，也可以将自己开发的库上传至PyPI。

国内 PyPI 镜像源有：
* [中科大 PyPI](https://mirrors.ustc.edu.cn/help/pypi.html)
* [清华 PyPI](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/)
* [阿里云 PyPI](https://developer.aliyun.com/mirror/pypi/)

全局配置，在 ```~/.pip/pip.conf``` 文件输入如下内容：


::: code-group
```bash [中科大]
[global]
timeout = 60
index-url = https://mirrors.ustc.edu.cn/pypi/simple

[install]
trusted-host = mirrors.ustc.edu.cn
```

```bash [清华]
[global]
timeout = 60
index-url = https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple

[install]
trusted-host = mirrors.tuna.tsinghua.edu.cn
```

```bash [阿里云]
[global]
timeout = 60
index-url = http://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host = mirrors.aliyun.com
```

```bash [多个源做主备]
[global]
timeout = 60
index-url = http://mirrors.aliyun.com/pypi/simple/ https://mirrors.ustc.edu.cn/pypi/simple

[install]
trusted-host = mirrors.aliyun.com mirrors.ustc.edu.cn
```
:::

### pip 安装包

以安装 requests (是一个流行的 HTTP 工具库) 为例：

```bash
pip install requests
```

运行结果：
```bash
Looking in indexes: http://mirrors.aliyun.com/pypi/simple/
Collecting requests
  Downloading http://mirrors.aliyun.com/pypi/packages/f9/9b/335f9764261e915ed497fcdeb11df5dfd6f7bf257d4a6a2a686d80da4d54/requests-2.32.3-py3-none-any.whl (64 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 64.9/64.9 kB 3.1 MB/s eta 0:00:00
Collecting charset-normalizer<4,>=2 (from requests)
  Downloading http://mirrors.aliyun.com/pypi/packages/4f/cd/8947fe425e2ab0aa57aceb7807af13a0e4162cd21eee42ef5b053447edf5/charset_normalizer-3.4.0-cp313-cp313-macosx_10_13_x86_64.whl (125 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 125.3/125.3 kB 2.2 MB/s eta 0:00:00
Collecting idna<4,>=2.5 (from requests)
  Downloading http://mirrors.aliyun.com/pypi/packages/76/c6/c88e154df9c4e1a2a66ccf0005a88dfb2650c1dffb6f5ce603dfbd452ce3/idna-3.10-py3-none-any.whl (70 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 70.4/70.4 kB 2.5 MB/s eta 0:00:00
Collecting urllib3<3,>=1.21.1 (from requests)
  Downloading http://mirrors.aliyun.com/pypi/packages/ce/d9/5f4c13cecde62396b0d3fe530a50ccea91e7dfc1ccf0e09c228841bb5ba8/urllib3-2.2.3-py3-none-any.whl (126 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 126.3/126.3 kB 16.2 MB/s eta 0:00:00
Collecting certifi>=2017.4.17 (from requests)
  Downloading http://mirrors.aliyun.com/pypi/packages/12/90/3c9ff0512038035f59d279fddeb79f5f1eccd8859f06d6163c58798b9487/certifi-2024.8.30-py3-none-any.whl (167 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 167.3/167.3 kB 4.2 MB/s eta 0:00:00
Installing collected packages: urllib3, idna, charset-normalizer, certifi, requests
Successfully installed certifi-2024.8.30 charset-normalizer-3.4.0 idna-3.10 requests-2.32.3 urllib3-2.2.3

[notice] A new release of pip is available: 23.2.1 -> 24.2
[notice] To update, run: pip install --upgrade pip
```

使用 pip 后，可以 requests 它所依赖的其它包也会自动下载，放到虚拟环境中。不影响其它项目。

查看 pip 的安装情况：
```bash
pip list
```

运行结果：
```bash                 
Package            Version
------------------ ---------
certifi            2024.8.30
charset-normalizer 3.4.0
idna               3.10
pip                24.2
requests           2.32.3
urllib3            2.2.3
```

查看单个已经安装包的情况：
```bash
pip show requests
```

运行结果：
```bash
Name: requests
Version: 2.32.3
Summary: Python HTTP for Humans.
Home-page: https://requests.readthedocs.io
Author: Kenneth Reitz
Author-email: me@kennethreitz.org
License: Apache-2.0
Location: /Users/chenlb/PycharmProjects/first-python/.venv/lib/python3.13/site-packages
Requires: certifi, charset-normalizer, idna, urllib3
Required-by: 
```

freeze 可以生成 pip install 能识别的格式
```bash
pip freeze > requirements.txt
```

requirements.txt 内容如下：
```text
certifi==2024.8.30
charset-normalizer==3.4.0
idna==3.10
requests==2.32.3
urllib3==2.2.3
```

### requirement 依赖包说明

requirement 是依赖包，项目需要安装的依赖包描述，它有自己的格式。

一些 [requirement 的示例](https://pip.pypa.io/en/latest/reference/requirement-specifiers/)，如；
```text
SomeProject
SomeProject == 1.3
SomeProject >= 1.2, < 2.0
SomeProject[foo, bar]
SomeProject ~= 1.4.2
SomeProject == 5.4 ; python_version < '3.8'
SomeProject ; sys_platform == 'win32'
requests [security] >= 2.8.1, == 2.8.* ; python_version < "2.7"
```

感兴趣可以查看 [requirement 完整说明](https://peps.python.org/pep-0508/)

### requirements.txt 批量依赖

在依赖很多的项目中，一个个依赖安装，很烦杂。因此有了批量依赖包的描述。通常使用 requirements.txt 文件。

pip 可以从 requirements.txt 读取依赖来安装

如：requests 包放到 requirements.txt 文件里，加一个 python-dotenv 包（方便读取 .env 配置文件的工具包），requirements.txt 内容如下：
```text
requests
python-dotenv
```

从 requirements.txt 安装依赖：
```bash
pip install -r requirements.txt
```

安装后：
```bash
pip list
```

运行结果：
```bash{8-9}
Package            Version
------------------ ---------
certifi            2024.8.30
charset-normalizer 3.4.0
idna               3.10
pip                24.2
python-dotenv      1.0.1
requests           2.32.3
urllib3            2.2.3
```

关于 requirements.txt 更多说明，请看 [reqrequirements.txt 文件格式说明](https://pip.pypa.io/en/latest/reference/requirements-file-format/#requirements-file-format) 。
