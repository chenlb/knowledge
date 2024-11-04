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