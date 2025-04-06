# OAuth2

## 原理

原理介绍请看阮一峰的相关文章：
* [理解OAuth 2.0](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)
* [OAuth 2.0 的一个简单解释](https://www.ruanyifeng.com/blog/2019/04/oauth_design.html)
* [OAuth 2.0 的四种方式](https://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)
* [GitHub OAuth 第三方登录示例教程](https://www.ruanyifeng.com/blog/2019/04/github-oauth.html)


## Sa-Token 的 OAuth2.0 模块

OAuth2.0 四种模式

基于不同的使用场景，OAuth2.0 设计了四种模式：
* 授权码（Authorization Code）：OAuth2.0 标准授权步骤，Server 端向 Client 端下放 ```Code``` 码，Client 端再用 ```Code``` 码换取授权 ```Access-Token```。
* 隐藏式（Implicit）：无法使用授权码模式时的备用选择，Server 端使用 URL 重定向方式直接将 ```Access-Token``` 下放到 Client 端页面。
* 密码式（Password）：Client 端直接拿着用户的账号密码换取授权 ```Access-Token```。
* 客户端凭证（Client Credentials）：Server 端针对 Client 级别的 Token，代表应用自身的资源授权。

Sa-Token 实现了这种四种模式

相关资源请看官网：
* [Sa-Token-OAuth2.0 模块](https://sa-token.cc/doc.html#/oauth2/readme)
* [搭建OAuth2-Server](https://sa-token.cc/doc.html#/oauth2/oauth2-server)
* [OAuth2 开启 OIDC 协议 （OpenID Connect）](https://sa-token.cc/doc.html#/oauth2/oauth2-oidc)
* [OAuth2-Server 端前后台分离](https://sa-token.cc/doc.html#/oauth2/oauth2-h5)
* [和 jwt 集成](https://sa-token.cc/doc.html#/plugin/jwt-extend)

## 制作 OAuth2 Mock Server

我参考 Sa-Token [搭建OAuth2-Server](https://sa-token.cc/doc.html#/oauth2/oauth2-server) 的示例，实现的功能如下：
* 配置 sa-token-jwt 签发 OIDC id_token 令牌
  * 实现 RS256 签名的 SaJwtTemplate。可以配置 ```rs256_public_key.pem```, ```rs256_private_key.pem```。
  * 按 ```rs256_public_key.pem``` 启动时自动生成 ```jwks.json```，用 nginx 提供服务，方便 oauth2 client 按 解密 id_token。
  * nginx 配置 ```/.well-known/openid-configuration``` uri 映射到 openid-configuration.json （jwks_uri 指向 jwks.json），方便 oauth2 client 使用jwks.json解密 id_token。
* h5 前端页面
  * 开启 oauth2-server h5 功能，SaOAuth2ServerH5Controller。
  * ```/client/oauth2-client.html``` 是 client 的 h5 页面，OAuth2 Server 授权页地址默认使用 oauth2-server 的 h5 页面。
  * ```/server/oauth2-authorize.html``` 是 server 的 h5 页面。
* client 配置信息从 clients.json 读取，方便 mock 测试。
* 用户信息从 users.json 读取，方便 mock 测试。
* 使用 username 作为用户唯一标识，方便 oidc 不暴露 user id。
* 定义 scope：
  * userinfo：改名为 profile
  * profile：输出 name，nickname，picture 字段
  * email：输出 email 字段
  * 输出一致：```/oauth2/userinfo``` 接口和 id_token 的 profile 和 email 内容输出一致。 

资料：
* 实现的代码请看：[github 代码 chenlb/oauth2-server](https://github.com/chenlb/oauth2-server)
* [JWK 生成 Java 版](https://connect2id.com/products/nimbus-jose-jwt/examples/jwk-generation)
* [JWT 在线 Debugger](https://jwt.io/)

同时把这些代码制作 docker 镜像 ```chenlb/oauth2-server:0.0.2```，方便直接使用。

::: tip chenlb/oauth2-server 镜像说明：
* 内置 nginx 服务
  * 提供 h5 前端页面服务，用于：```/client/oauth2-client.html```，```/server/oauth2-authorize.html```。
  * 提供 openid 相关服务：```/.well-known/openid-configuration```，```/oidc/jwks.json``` (启动时按 ```/app/pem/rs256_public_key.pem``` 自动生成)。
* java 程序放到 ```/app``` 目录；nginx 提供服务的目录：```/app/web```
* client 配置信息放在 ```/app/mock/clients.json```；用户信息从 ```/app/mock/users.json``` 读取（docker run -v 参数来设置）。
* 私钥/公钥从 ```/app/pem``` 目录读取。(docker run -v 参数来设置)

::: 

## 启动 OAuth2 Mock Server

以 ```~/oauth2-server``` 工作目录为例。

生成私钥/公钥：
* 私钥用于 jwt 签名，输出 id_token
* 公钥用于生成 jwks.json。

```bash
# 演示目录
mkdir ~/oauth2-server
cd ~/oauth2-server

# 保存私钥/公钥使用 
mkdir -p pem
cd pem

# 参考：https://tongqijie.com/post/rs256-rsa-with-sha-256-si-yao-he-gong-yao-sheng-cheng-fang-fa-zjc22re2
# 生成私钥
openssl genrsa -out rs256_private_key.pem 2048

# 生成公钥
# 用于 http://sa-oauth-server.com:9080/.well-known/openid-configuration 返回 jwks_uri 连接返回 jwks.json 内容。
openssl rsa -pubout -in rs256_private_key.pem -out rs256_public_key.pem
```

配置 mock 用户
```bash
cd ~/oauth2-server
mkdir -p mock
cd mock

# 在 users.json 保存登录用户
vi users.json
```

users.json 文件内容格式如下，按自己的需求修改：

```json
[
  {
    "username": "user_xxx",
    "password": "pw_yyy_change_me",
    "nickname": "这里写昵称",
    "avatar": "http://xxx.com/avatar.jpg",
    "email": "admin@example.com"
  }
]
```

::: details 默认 clients.json 文件内容如下：
```json
[
  {
    "client_id": "my_client_id_1001",
    "client_secret": "aaaa-bbbb-cccc-dddd-eeee",
    "allow_redirect_uris": [
      "*"
    ],
    "contract_scopes": ["openid","email","profile","oidc","unionid"],
    "allow_grant_types": [
      "authorization_code",
      "refresh_token"
    ],
    "subject_id": "my_org_id_001"
  }
]
```

可以自行修改。然后 docker 启动时用 -v 参数引用
:::

启动 docker

```bash
# 也可以自定义 client 配置
# -v ~/oauth2-server/mock/clients.json:/app/mock/clients.json \

docker run --name oauth2-mock-server -d \
    -p 9080:9080 -p 8000:8000 \
    -v ~/oauth2-server/mock/users.json:/app/mock/users.json \
    -v ~/oauth2-server/pem:/app/pem \
    chenlb/oauth2-server:0.0.2
```

## 打开 H5 OAuth2 Client 测试

设置 hosts 文件，将 sa-oauth-server.com 映射到本机 ip （推荐内网 ip，不是 127.0.0.1），如：
```bash
# vi /etc/hosts
# 假设内网 ip 为 192.168.0.10 
192.168.0.10       sa-oauth-server.com
```

H5 OAuth2 Client 测试界面地址：http://sa-oauth-server.com:9080/client/oauth2-client.html
