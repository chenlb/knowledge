# Linux & Mac 常用命令

## 端口相关

### 查看端口被那个进程占用

比如 Mac 查看 8080 端口被那个进程占用

```bash
# 格式：lsof -i :端口
# -P 用数字显示端口
# -n 不使用主机名，用 ip 显示
lsof -Pn -i :8080
```

输出：

```console
COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
nginx   49352 chenlb    6u  IPv4 0xa307c62d2d572fc7      0t0  TCP *:8080 (LISTEN)
nginx   54626 chenlb    6u  IPv4 0xa307c62d2d572fc7      0t0  TCP *:8080 (LISTEN)
```

比如 Linux 查看端口被那个进程占用
::: code-group
```bash [运行]
# -n 不使用主机名，用 ip 显示
# -t 只查看 tcp
# -l 只看监听的端口
# -p 显示进程ID/名
netstat -ntlp
```

```console [使用说明]
Usage: netstat [-ral] [-tuwx] [-enWp]

Display networking information

        -r      Routing table
        -a      All sockets
        -l      Listening sockets
                Else: connected sockets
        -t      TCP sockets
        -u      UDP sockets
        -w      Raw sockets
        -x      Unix sockets
                Else: all socket types
        -e      Other/more information
        -n      Don't resolve names
        -W      Wide display
        -p      Show PID/program name for sockets
```
:::

输出：

```console
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 127.0.0.11:45045        0.0.0.0:*               LISTEN      -
tcp        0      0 172.19.0.3:3000         0.0.0.0:*               LISTEN      7/next-server (v14.
```

### 查看开启了那些端口

Linux 开启了那些端口，如上。


Mac 开启了那些端口：

::: code-group
```bash [运行]
# -n 不使用主机名，用 ip 显示
# -L 只看监听的端口
netstat -anL

# -p 协议类型 tcp
# netstat -an -p tcp | grep LISTEN
```

```console [使用说明]
Usage:	netstat [-AaLlnW] [-f address_family | -p protocol]
	netstat [-gilns] [-f address_family]
	netstat -i | -I interface [-w wait] [-abdgRtS]
	netstat -s [-s] [-f address_family | -p protocol] [-w wait]
	netstat -i | -I interface -s [-f address_family | -p protocol]
	netstat -m [-m]
	netstat -r [-Aaln] [-f address_family]
	netstat -rs [-s]
```
:::

结果：

```console
Current listen queue sizes (qlen/incqlen/maxqlen)
Listen         Local Address
0/0/128        *.8080
```
