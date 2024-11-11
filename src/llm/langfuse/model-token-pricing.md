# 使用 Langfuse 为大模型 Token 计价

本地安装 Langfuse 参考：[Langfuse 快速开始](/llm/langfuse/getting-started)

设置大模型的单价，直接插入数据库会方便一点。原因：在 Langfuse 界面里设置的大模型单价是在项目内的，不是全局的。插入 db 记录时可以设置为全局

## 安装 PostgreSQL 管理工具

参考资源：
* 国内 docker 镜像可以看：[目前国内可用Docker镜像源汇总](https://www.coderjia.cn/archives/dba3f94c-a021-468a-8ac6-e840f85867ea)
* [Setting up PostgreSQL and pgAdmin 4 with Docker](https://medium.com/@marvinjungre/get-postgresql-and-pgadmin-4-up-and-running-with-docker-4a8d81048aea)

以在 docker 中安装 pgadmin 为例。

```bash
# 修改自己的 pgadmin 用户名和密码
docker run --name pgadmin -p 5050:80 \
--network langfuse_default \
-e PGADMIN_DEFAULT_EMAIL=your_name@example.com -e PGADMIN_DEFAULT_PASSWORD=your_passwd \
-d dpage/pgadmin4
```

启动后，打开 pgadmin 管理界面： http://localhost:5050 。
* 用上面 pgadmin 的用户名和密码登录（可以选择语言：中文）。
* 添加服务器。（查看已经用 docker compose 生成的 langfuse 想着环境的 postgresql 的 ip 地址）：
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' langfuse-db-1
```

也可以选择另一种安装 pgadmin：[下载 pgAdmin 4 来安装](https://www.pgadmin.org/download/)。有 mac 和 win 版本。

## 设置 qwen 大模型价格

在 pgadmin 的 sql 工具中输入 [qwen 大模型价格](https://help.aliyun.com/zh/model-studio/getting-started/models#9f8890ce29g5u)：

```sql
INSERT INTO models(
	id, created_at, updated_at, project_id, model_name, match_pattern
	, start_date, input_price, output_price, total_price, unit, tokenizer_config, tokenizer_id
) VALUES 
(
	'cm3azlpbl000o3rpmuhabmi9y',now(),now(),null,'qwen-turbo','(?i)^(qwen-turbo)(-[\da-zA-Z]+)*$'
	,null,0.0000003,0.0000006,null,'TOKENS','{}',null
)
,(
	'cm3azj5o6000g3rpmxb3iiu8g',now(),now(),null,'qwen-plus','(?i)^(qwen-plus)(-[\da-zA-Z]+)*$'
	,null,0.0000008,0.000002,null,'TOKENS','{}',null
)
,(
	'cm3b047f2000w3rpmdnv0bxpb',now(),now(),null,'qwen-max','(?i)^(qwen-max)(-[\da-zA-Z]+)*$'
	,null,0.00002,0.00006,null,'TOKENS','{}',null
)
;
```

如图：
![pgadmin-model-input-qwen](http://static.chenlb.com/img/langfuse/pgadmin-model-input-qwen.png)


## 调用 qwen 大模型

运行代码：
```bash
python tongyi_openai_with_langfuse.py
```

::: tip 说明
在《Langfuse 快速开始》文章里的 [Langfuse 追踪 OpenAI 调用的代码](/llm/langfuse/getting-started#追踪代码)
:::

效果如图：
![langfuse-model-pricing-list](http://static.chenlb.com/img/langfuse/langfuse-model-pricing-list.png)

详情价格信息更加直观：
![langfuse-model-pricing-detail](http://static.chenlb.com/img/langfuse/langfuse-model-pricing-detail.png)


在项目的 Dashboard 界面也有对应价格统计。注意这个界面是使用 `$` 表示美元，qwen-* 大模型录入是人民币。只看数字就好了。
