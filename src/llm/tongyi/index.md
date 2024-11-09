# 通义（Tongyi）简介

通义大模型是阿里云自主研发的通义大模型，凭借万亿级超大规模数据训练和领先的算法框架，
实现全模态高效精准的模型服务调用。

* [通义官网](https://tongyi.aliyun.com)
* [通义产品介绍文档](https://www.aliyun.com/product/tongyi)

通义大模型部署在阿里云的推理服务上，使用通义大模型需要使用模型服务来调用。阿里云的模型服务也叫 DashScope。

## 支持的大模型

|                    |   通义千问-Max    | 通义千问-Plus  |   通义千问-Turbo   |   Qwen-Long   |
|:------------------:|:-------------:|:----------:|:--------------:|:-------------:|
|        适合场景        | 适合复杂任务，推理能力最强 | 效果、速度、成本均衡 | 适合简单任务，速度快、成本低 | 支持长达千万字文档，成本低 |
|  调用模型名<br/>（稳定版）   |   qwen-max    | qwen-plus  |   qwen-turbo   |   qwen-long   |
| 最大上下文<br/>（Token数） |    32,768     |  131,072   |    131,072     |  10,000,000   |
| 最低输入价<br/>（千Token） |     0.02元     |  0.0008元   |    0.0003元     |    0.0005元    |
| 最低输出价<br/>（千Token） |       0.06元        |      0.002元      |        0.0006元        |       0.002元        |

::: info Token 说明
Token是指模型处理和生成文本时的基本单元，中文的Token通常是一个字或词，英文的Token通常是一个单词、子词或词组。
:::

除了上述文生文的通义大模型，百炼还支持图像理解与生成、音视频理解与生成、数学领域、法律领域等方面的通义大模型。

同时，百炼也支持众多主流的第三方大模型，例如Llama、ChatGLM、零一万物、Stable Diffusion等。

详细信息，请看[模型总览](https://help.aliyun.com/zh/model-studio/getting-started/models)。

## 百炼：大模型服务平台

阿里云的[大模型服务平台百炼](https://help.aliyun.com/zh/model-studio/getting-started/what-is-model-studio)是一站式的大模型开发及应用构建平台。不论是开发者还是业务人员，都能深入参与大模型应用的设计和构建。您可以通过简单的界面操作，在5分钟内开发出一款大模型应用，或在几小时内训练出一个专属模型，从而将更多精力专注于应用创新。

集如下功能：
* 模型调用（DashScope），中文名是`灵积`。2024年9月开始合并到百炼平台。
* 模型调优，或叫微调。
* 模型测评
* 模型部署
* 数据中心，包括：模型数据；知识库；数据集（训练数据，评测数据等）
* 应用构建，包括：智能体应用、工作流应用；智能体编排应用；应用组件；应用分享；应用观测；Assistant API 等。
* 应用广场
