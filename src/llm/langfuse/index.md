# Langfuse：一个开源 LLM 工程平台

Langfuse 是一个开源 LLM 工程平台，可帮助团队协作调试、分析和迭代其 LLM 应用程序。

## 核心功能 - 开发

* 可观察性：检测应用程序并开始将跟踪记录引入 Langfuse。
  * 跟踪应用程序中的所有 LLM 调用和所有其他相关逻辑。
  * 适配 Python 和 JS/TS 的异步 SDK
  * 支持 Python 的 @observe() 装饰器，使得基本无入侵的跟踪 LLM 调用。
  * 与 OpenAI SDK、Langchain、LlamaIndex、LiteLLM、Flowise 和 Langflow 集成
  * 支持 API （Python、JS/TS、HTTP） 方便自定义集成。
* Langfuse UI：检查和调试复杂的日志和用户会话（演示、跟踪、会话）
* Prompt 管理：从 Langfuse 内部管理、版本控制和部署 Prompt。
* Prompt 工程：使用 LLM Playground 测试和迭代您的 Prompt。

## 核心功能 - 监控

* 分析：跟踪指标（LLM 成本、延迟、质量）并从仪表板和数据导出中获取指标。
* 评估：收集并计算完成 LLM 的分数
  * 在 Langfuse 中运行 model-based 的评估
  * 收集用户反馈（打分）
  * 在 Langfuse 中做数据标注

## 核心功能 - 测试

* 做实验：在部署新版本之前跟踪和测试应用程序行为
  * 支持数据集功能，可让您在部署之前测试预期的输入和输出对以及基准性能。
  * 跟踪应用程序中的版本和发布。

## 资源

* [Langfuse 官方该当](https://langfuse.com/docs)