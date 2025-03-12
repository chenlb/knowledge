# 在 Windows 中用 wsl 使用 Linux

[WSL (Windows Subsystem for Linux) 介绍](https://learn.microsoft.com/zh-cn/windows/wsl/)请看官网

## 在 wsl 安装 Debian

开启 wsl 功能：
* 适应于 Linux 的 Windows 子系统
* Windows 虚拟机监控程序平台

![pre-set-wsl](http://static.chenlb.com/img/win/wsl/pre-set-wsl.png)

否则会出现如下报错：

```console
Installing, this may take a few minutes...
WslRegisterDistribution failed with error: 0x8007019e
Error: 0x8007019e ??????? Linux ? Windows ????

Press any key to continue...
```

## 下载安装 Debian

Microsoft store 下载和安装 Debian 或 Ubuntu。（说明：推荐用 Microsoft store 安装。用 wsl 命令安装有可能报错。）

![download-debian-on-win-store](http://static.chenlb.com/img/win/wsl/download-debian-on-win-store.png)

下载后启动，如果出现如下错误

```console
Installing, this may take a few minutes...
WslRegisterDistribution failed with error: 0x800701bc
Error: 0x800701bc WSL 2 ?????????????????? https://aka.ms/wsl2kernel

Press any key to continue...
```

就更新 最新版的 wsl。
```bash
# PowerShell 运行。
wsl --update
```

启动：在程序列表双击 Debian 或 Ubuntu。安装并要求输入用户名和密码
::: code-group
```console{4-6} [Debian]
Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username: chenlb
New password:
Retype new password:
passwd: password updated successfully
Installation successful!
User account already exists, skipping creation
chenlb@chenlb-ai:~$
```

```console{4-6} [Ubuntu-22.04]
Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username: chenlb
New password:
Retype new password:
passwd: password updated successfully
Installation successful!
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

Welcome to Ubuntu 22.04.5 LTS (GNU/Linux 5.15.167.4-microsoft-standard-WSL2 x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Tue Mar 11 20:39:41 CST 2025

  System load:  0.07                Processes:             31
  Usage of /:   0.1% of 1006.85GB   Users logged in:       0
  Memory usage: 1%                  IPv4 address for eth0: 172.30.208.210
  Swap usage:   0%


This message is shown once a day. To disable it please create the
/home/chenlb/.hushlogin file.
chenlb@chenlb-ai:~$
```
:::

::: tip 说明
启方式有：
1、程序里找到操作系统双击
2、命令行 ```wsl``` 直接启动，或 ```wsl -d Debian``` (如果之前安装过其它 Linux 的话)
:::

::: details 如果报错：无法解析服务器的名称或地址
```console
PS C:\Users\Administrator> wsl -l -o
无法从“https://raw.githubusercontent.com/microsoft/WSL/master/distributions/DistributionInfo.json”中提取列表分发。无法解析服务器的名称或地址
错误代码: Wsl/WININET_E_NAME_NOT_RESOLVED
```

或用命令行安装 Linux 子系统，报错。

```console
PS C:\Users\Administrator> wsl --install -d Debian
适用于 Linux 的 Windows 子系统已安装。

无法解析服务器的名称或地址
```

有两种方式解决：
1、改 hosts
```bash
# 改域名映射ip，可比在 ip138.com 进行域名到ip的查询, 写在 hosts 如：
185.199.111.133 raw.githubusercontent.com
```
2、使用科学上网。
:::

## 查看系统版本信息

```console
$ cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"
NAME="Debian GNU/Linux"
VERSION_ID="12"
VERSION="12 (bookworm)"
VERSION_CODENAME=bookworm
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
```