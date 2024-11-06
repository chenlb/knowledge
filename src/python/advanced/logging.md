# logging : Python 日志记录工具

logging 是 python 的日志记录模块，以下示例来展示基本用法。

## 记录日志

日志等级有：`DEBUG`、`INFO`、`WARNING`、`ERROR`。

需要记录日志地方，在代码里进行进行打点，如 `examples/log/log_example.py`：

```python{3,7}
import logging

logger = logging.getLogger(__name__)


def do_something(q: str):
    logger.info("查询参数 q=%s", q)

```

## 日志配置

::: details 有两种格式 `yaml`、`conf` 配置日志。
python 3.2 引入使用字典来保存配置信息，可以使用 `yaml`、`json` 格式来配置。
:::


::: code-group
```yaml [logging.yaml]
version: 1
formatters:
  simple:
    format: '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
handlers:
  console:
    class: logging.StreamHandler
    level: DEBUG
    formatter: simple
    stream: ext://sys.stdout
loggers:
  examples:
    level: DEBUG
    handlers: [console]
    # 关闭日志传播。即打日志到此为止，不会重复在其它地方打。
    propagate: no
root:
  level: DEBUG
  handlers: [console]
```

```ini [logging.conf]
[loggers]
keys=root,examples

[handlers]
keys=consoleHandler

[formatters]
keys=simpleFormatter

[logger_root]
level=DEBUG
handlers=consoleHandler

[logger_examples]
level=DEBUG
handlers=consoleHandler
qualname=examples
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=DEBUG
formatter=simpleFormatter
args=(sys.stdout,)

[formatter_simpleFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
```
:::

## 配置生效

使用 yaml 格式的日志配置文件，需要安装 `pyyaml`
```bash
pip install pyyaml
```

一般在启动程序里流入日志配置，如 `main.py`

::: code-group
```python{2,6-10} [yaml 格式]
import logging.config
import yaml

from examples.log.log_example import do_something

# 读取 yaml 格式的日志配置
# 与 conf 二选一
with open('logging.yaml') as f:
    log_config = yaml.full_load(f)
    logging.config.dictConfig(log_config)

logger = logging.getLogger(__name__)


def main():
    do_something('study_log')
    logger.info("do main()")


if __name__ == "__main__":
    main()

```

```python{5-7} [conf 或 ini 格式]
import logging.config

from examples.log.log_example import do_something

# 读取 conf 或 ini 格式的日志配置
# 与 yaml 二选一
logging.config.fileConfig("logging.conf")

logger = logging.getLogger(__name__)


def main():
    do_something('study_log')
    logger.info("do main()")


if __name__ == "__main__":
    main()

```
:::

输出：
```log
2024-11-04 23:55:21,097 - examples.log.log_example - DEBUG - 查询参数 q=study_log
2024-11-04 23:55:21,097 - __main__ - INFO - do main()
```

## 日志文件滚动保存

大多数情况下，日志要输出到文件保存。有问题时，方便查询。长时间保存文件磁盘空间又会不够。需要定期清理。

好在 Python 内置了相关类来处理：`TimedRotatingFileHandler`。先来看下有那些参数：

|     参数      |  默认值  |          说明          |
|:-----------:|:-----:|:--------------------:|
| backupCount |   0   |       日志保留文件数量       |
|    when     |   h   | 时间间隔的类型：天=`D`、小时=`H` |
|  interval   |   1   |         时间间隔         |
|  encoding   | None  |       日志文件字符编码       |
|     utc     | False | 是否使用 UTC 时间；否则使用本地时间 |

更多参数说明请看[官方文档](https://docs.python.org/zh-cn/3.13/library/logging.handlers.html#logging.handlers.TimedRotatingFileHandler)。

常用的是按天滚动，保留 7 天日志，配置如下：

```yaml{11-16,23,30}
version: 1
disable_existing_loggers: False
formatters:
  simple:
    format: '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
handlers:
  console:
    class: logging.StreamHandler
    formatter: simple
    stream: ext://sys.stdout
  file_handler:
    formatter: simple
    class: logging.handlers.TimedRotatingFileHandler
    # 不会自动创建 logs 目录，需要创建好。
    filename: logs/examples.log
    when: 'D'
    backupCount: 7
loggers:
  examples:
    level: DEBUG
    handlers:
      - console
      - file_handler
    # 关闭日志传播。即打日志到此为止，不会重复在其它地方打。
    propagate: no
root:
  level: INFO
  handlers:
    - console
    - file_handler
```

## 日志格式化变量

|     变量     |        格式        |                        说明                         |
|:----------:|:----------------:|:-------------------------------------------------:|
|  asctime   |  `%(asctime)s`   |           形式为 '2024-11-06 23:00:19,385'           |
| levelname  | `%(levelname)s`  | 日志级别（'DEBUG'，'INFO'，'WARNING'，'ERROR'，'CRITICAL'） |
|   lineno   |   `%(lineno)d`   |               发出日志记录调用所在的源行号（如果可用）。               |
|  message   |  `%(message)s`   |             记入日志的消息，即 msg % args 的结果。             |
|    name    |    `%(name)s`    |    日志记录器名称。logging.getLogger(`xxx`) 中的 xxx 部分     |
| threadName | `%(threadName)s` |              线程名（如果可用），程序有多线程任务时比较有用              |

更多请看[官方 LogRecord 属性说明](https://docs.python.org/zh-cn/3.13/library/logging.html#logrecord-attributes)

来修改下格式看看：
```yaml{4}
# ...
formatters:
  simple:
    format: '%(asctime)s [%(levelname)s/%(threadName)s/%(name)s(%(lineno)d)] - %(message)s'
# ...
```

输出日志如下：
```log
2024-11-06 23:17:38,483 [DEBUG/MainThread/examples.log.log_example(7)] - 查询参数 q=study_log
2024-11-06 23:17:38,483 [INFO/MainThread/__main__(21)] - do main()
```