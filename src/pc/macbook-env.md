# Macbook 基础环境

## vim 配置

```bash
# vi ~/.vimrc
# 语法高亮
syntax on
# 显示行号
set number
# 显示光标所在位置的行号和列号
set ruler
```

## iTerm2

iTerm2 是一个比较好用的终端，可以进行一下配色。

```bash
# 旧版 mac
# vi ~/.bash_profile
# 新版 mac
# vi ~/.zshrc
# 增加配色
export CLICOLOR=1
export LSCOLORS=gxfxcxdxbxegedabagacad
```

## brew

brew 是一个在 mac 中很好用的软件管理工具。

官方主页：http://brew.sh/

brew 文档：http://docs.brew.sh/

使用[中科大Homebrew镜像](https://mirrors.ustc.edu.cn/help/brew.git.html)

镜像地址配置：
```bash
# vi ~/.zshrc

export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
# brew 4.0 及之后的版本使用新的元数据 JSON API 接口
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
```

安装 brew：

运行如下脚本

::: code-group
```bash [中科大安装脚本]
# 初次安装 Homebrew / Linuxbrew 时，可以使用中科大每日同步的安装脚本文件。
/bin/bash -c "$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)"
```

```bash [官方安装脚本]
/bin/bash -c "$(curl -fsSL https://github.com/Homebrew/install/raw/HEAD/install.sh)"
```
:::

使用 brew 安装 python：

```bash
brew install python@3.11
```

想要 brew 不要安装软件时，不需要自动更新其它软件，进行如下配置：

```bash
# vi ~/.zshrc 
export HOMEBREW_NO_AUTO_UPDATE=false
```

更新 brew 自身

```bash
brew update
```