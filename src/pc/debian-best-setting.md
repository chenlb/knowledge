# Debian 最佳设置

## 使用国内镜像源

更新镜像配置（[使用清华大学的源](https://mirrors.tuna.tsinghua.edu.cn/help/debian/)）
```bash
sudo mv /etc/apt/sources.list /etc/apt/sources.list.bak
sudo vi /etc/apt/sources.list

# 目前 vi 还不好用，方向键 变成了输入乱的字符。
# 按一次 i，直接粘贴如下内容
```

```/etc/apt/sources.list``` 内容：
```bash
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb http://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware

deb http://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware

deb http://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
deb http://mirrors.tuna.tsinghua.edu.cn/debian-security bookworm-security main contrib non-free non-free-firmware
```

::: details 先用 http 而不是 https
直接用 https 会报错。先更新好镜像源，再下载支持 https。

直接使用 https 报错，如下： 
```console
W: Failed to fetch https://mirrors.tuna.tsinghua.edu.cn/debian/dists/bookworm/InRelease  Certificate verification failed: The certificate is NOT trusted. The certificate issuer is unknown.  Could not handshake: Error in the certificate verification. [IP: 101.6.15.130 443]
W: Failed to fetch https://mirrors.tuna.tsinghua.edu.cn/debian/dists/bookworm-updates/InRelease  Certificate verification failed: The certificate is NOT trusted. The certificate issuer is unknown.  Could not handshake: Error in the certificate verification. [IP: 101.6.15.130 443]
W: Failed to fetch https://mirrors.tuna.tsinghua.edu.cn/debian/dists/bookworm-backports/InRelease  Certificate verification failed: The certificate is NOT trusted. The certificate issuer is unknown.  Could not handshake: Error in the certificate verification. [IP: 101.6.15.130 443]
W: Failed to fetch https://mirrors.tuna.tsinghua.edu.cn/debian-security/dists/bookworm-security/InRelease  Certificate verification failed: The certificate is NOT trusted. The certificate issuer is unknown.  Could not handshake: Error in the certificate verification. [IP: 101.6.15.130 443]
W: Some index files failed to download. They have been ignored, or old ones used instead.
```

```bash
# 先使用 http 的源。进一步更新update
sudo apt update
# 再安装支持  https 的库
sudo apt install apt-transport-https ca-certificates -y
```
:::

## 安装完整版 vim

最小安装，vi 还不好用，方向键 变成了输入乱的字符。需要重新安装。

参考：[解决 Debian 下使用 vi 时方向键乱码，退格键不能使用的问题](https://www.uskvm.com/p/32.html)

安装完整版 vim：
```bash
sudo apt update
sudo apt remove vim-common -y
sudo apt install vim -y
```

## 镜像源改为 https

```bash
sudo vi /etc/apt/sources.list
# 把4个http地址改为 https

# 退出后更新
sudo apt update
```