# Nginx 使用汇总

## 安装

::: code-group
```bash [Linux]
yum install nginx

# 配置文件在
# /etc/nginx/nginx.conf
```

```bash [Mac]
brew install nginx

# 配置文件在
# /usr/local/etc/nginx/nginx.conf
```
:::

## nginx.conf 配置

主要是设置访问网站的主目录。修改 ```/etc/nginx/nginx.conf``` 文件：

```nginx{38} [Linux]
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /home/xxx/web;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
    
    # ...
}
```

## 启动

::: code-group
```bash [Linux]
# 测试 conf 文件配置是否正确
nginx -t

# 修改配置后生效
nginx -s reload

# 停止 nginx 服务
nginx -s quit

# 开机自动启动
systemctl enable nginx
```
:::
