# Langfuse 使用自定义 OAuth2 登录

## 准备 OAuth2 Server

如果现在系统中有 OAuth2 Server，就跳过这一节的内容。 没有就先 Mock 一个 OAuth2 Server，参考 [制作 OAuth2 Mock Server](/internet/oauth2.html#制作-oauth2-mock-server)。

OAuth2 Server 需要 ```/.well-known/openid-configuration``` 服务。不一定需要 jwks_uri。

## 配置 Custom OAuth2

Langfuse 的启动 docker compose

docker-compose-oauth2.yml

```yaml{18-32}
services:
  langfuse-server:
    image: langfuse/langfuse:2
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres
      - NEXTAUTH_SECRET=mysecret
      - SALT=mysalt
      - ENCRYPTION_KEY=0000000000000000000000000000000000000000000000000000000000000000 # generate via `openssl rand -hex 32`
      - NEXTAUTH_URL=http://localhost:3000
      - TELEMETRY_ENABLED=${TELEMETRY_ENABLED:-true}
      - LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES=${LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES:-false}

      # login with custom oauth2 server (https://github.com/chenlb/oauth2-server)
      - AUTH_CUSTOM_CLIENT_ID=my_client_id_1001
      - AUTH_CUSTOM_CLIENT_SECRET=aaaa-bbbb-cccc-dddd-eeee
      # sa-oauth-server.com point to local lan ip
      - AUTH_CUSTOM_ISSUER=http://sa-oauth-server.com:9080
      - AUTH_CUSTOM_NAME=Login with My OAuth2 Mock Server
      - AUTH_CUSTOM_SCOPE=profile email
      # 不使用 id_token，使用 /oauth2/userinfo 接口获取用户信息
      - AUTH_CUSTOM_ID_TOKEN=false
      # 有些 oauth2 server 请求 /oauth2/token 会要求 state。AUTH_CUSTOM_ID_TOKEN=false 时，也支持 state
      - AUTH_CUSTOM_CHECKS=nonce
      # 过滤掉 /oauth2/token 返回的字段，这些字段 langfuse 不支持。
      - AUTH_IGNORE_ACCOUNT_FIELDS=refresh_expires_in,client_id
      - AUTH_CUSTOM_ALLOW_ACCOUNT_LINKING=true
      - AUTH_DISABLE_USERNAME_PASSWORD=true

  postgres:
    image: postgres
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 3s
      timeout: 3s
      retries: 10
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=postgres
    ports:
      - "5432:5432"
    volumes:
      - /tmp/langfuse_oauth2/pg_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    restart: always
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "5050:80"
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@example.com
      - PGADMIN_DEFAULT_PASSWORD=admin

```

启动 langfuse 相关服务：
```bash
mkdir -p /tmp/langfuse_oauth2
docker compose -f docker-compose-oauth2.yml -p langfuse-oauth2 up -d
```

打开 http://localhost:3000 效果如下：

<img src="//static.chenlb.com/img/langfuse/langfuse-login-with-my-oauth2-server.png" width="600" alt="langfuse oauth2 server" />


## 使用 ID_TOKEN

其它不变，只改少量配置。

使用 id_token 后。需要 ```/.well-known/openid-configuration``` 提供 jwks_uri。

::: details jwks_uri 内容示例如下：

* ```n``` 是用 rs256_public_key.pem 生成，[可以参考 OAuth2 Mock Server 源码](https://github.com/chenlb/oauth2-server/blob/main/src/main/java/com/chenlb/oauth2/server/satoken/SaTokenConfigure.java)。
* ```/.well-known/openid-configuration``` 可以参考 Google 的 https://accounts.google.com/.well-known/openid-configuration
* ```jwks_uri``` 的内容，也可以参考 Google 的 https://www.googleapis.com/oauth2/v3/certs

```json
{
  "keys": [
    {
      "kty": "RSA",
      "e": "AQAB",
      "use": "sig",
      "kid": "1780042674",
      "alg": "RS256",
      "n": "3hPfH2v6mmrBV0tirJV34yw6apUQ5284ECD7zdwuPi-hKgGgshr9VEM2mRTc-DkWYCr3PXXhqGafacOdZjf_5cqIywmhQymyrfqHRI8qRG_Aeu03Mu-UHtsaiypLEDchFdhdtw2phBXA_o2u7bqI22v-ptXa7e5osiQgHUraaUai4ej8a_cRqJS0QpZgDvz93C2hOUun76uoHvyYF5ZRjosW8TWmQmBGgzGv_bteu9gaiC1ryTHpSs_3pQL9vajZ027arkXNbzUSeNCwvjbs9jPC8iMAEW3VRDphwtrTThgxHESWWG8V6wZ5OjpwuVTTubJmyVZybxpu4GiAwX-zUQ"
    }
  ]
}
```
::: 

把上面两项改为如下内容：

```dotenv{4-5}
# 增加 oidc
# 各个 oauth2 server 不一样。需要能输出 id_token 内容。
# 基于 SaToken 制作的 oauth2 server 是 oidc，其实也可以自定义。
AUTH_CUSTOM_SCOPE=oidc profile email
AUTH_CUSTOM_ID_TOKEN=true

# 基于 SaToken 制作的 oauth2 server，目前只能是 nonce。
#AUTH_CUSTOM_CHECKS=nonce
```


## 其它参数说明

AUTH_CUSTOM_* 的其它参数说明

如果 OAuth2 Server 的 ```/oauth2/token``` 和 ```/oauth2/userinfo``` 接口不支持 GET 方法，需要使用 POST 方法。

```dotenv
# 默认是 client_secret_basic
AUTH_CUSTOM_CLIENT_AUTH_METHOD=client_secret_post
```


## 支持头像

官方的 Langfuse 目前 v2 和 v3 还不支持 Custom OAuth2 头像。如果感兴趣改的话，需要修改一下源码，自行编辑。

源码修改，参考两个 PR：
* [feat: custom sso add picture claim for v2](https://github.com/langfuse/langfuse/pull/6349/files)
* [feat: custom sso add picture claim for v3](https://github.com/langfuse/langfuse/pull/6350/files)

官方不一定会合并这个PR，可以 clone https://github.com/chenlb/langfuse 的 v2_by_chenlb 分支。

修改源码后，制作 docker 镜像，参考 https://github.com/chenlb/langfuse/blob/v2_by_chenlb/web/Dockerfile_by_chenlb

主要修改：
* 依赖 alinux3 (Alibaba Cloud Linux 3)
* 使用 npm 淘宝镜像源


支持头像的 Langfuse 2.x 我已经制作了 docker 镜像 ```chenlb/langfuse:2```。使用步骤：
* 把上面的 docker-compose-oauth2.yml 文件中的 langfuse-server 镜像改为 chenlb/langfuse:2。
* 停了 langfuse-server 服务，重新启动 （用上面的 docker compose 命令）。
* 访问 http://localhost:5050 pgadmin4，清空 users 表的数据。
* 确保 OAuth2 Mock Server 的 /app/mock/users.json 文件里有 avatar 字段。
* 访问 http://localhost:3000，点击登录，选择 My OAuth2 Mock Server，登录成功后，应该有显示为头像。
