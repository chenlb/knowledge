# Jinja2：一个快速的 Python 模板引擎

Jinja 是一个快速、富有表现力、可扩展的模板引擎。模板中的特殊占位符允许编写类似于 Python 语法的代码。然后向模板传递数据以渲染最终文档。

有以下特点：
* 模板可以继承
* 模板中可以定义和导入宏
* HTML 模板可以使用自动转义，防止XSS。
* 沙箱环境可以安全地渲染不受信任的模板。
* 支持异步生成模板。
* I18N 国际化。
* 模板即时编译为优化的 Python 代码并缓存，也可以提前编译
* 异常指向模板中的正确行，调试更容易。
* 可扩展的过滤器、测试、函数，甚至语法。


## Jinja 代码内容

默认使用如下字符内的才是 Jinja 的 代码内容：

```jinja
{% ... %} ## 用于语句
{{ ... }} ## 用于输出到模板的表达式
{# ... #} ## 表示注释
```

## 快速开始

安装：

推荐在[虚拟环境](/python/base/env)下安装。

```bash
pip install Jinja2
```

使用模板，如 `use_jinja2.py`：

```python{6-8,12}
from jinja2 import Template

items = ["one", "two", "three"]

template = """<ul>
{% for item in items %}
    <li>{{ item }}</li>
{% endfor %}
</ul>"""

t = Template(template)
result = t.render(items=items)
print(result)
```

运行：
```bash
python use_jinja2.py
```

输出：
```html
<ul>

    <li>one</li>

    <li>two</li>

    <li>three</li>

</ul>

```

但是第 2、4、6、8 行是空的，是因为 jinja 的语法也占了行，需要去除 jinja 语法占的行，有两个方式：

1、使用 `trim_blocks=True` 参数创建模板。
```python
# ...
t = Template(template, trim_blocks=True)
# ...
```

2、在模板语法代码场景里使用 `-` 减号，如下。
```jinja{2,4}
<ul>
{%- for item in items %}
    <li>{{ item }}</li>
{%- endfor %}
</ul>
```

## 过滤器

变量内容有时候需要格式什么的，可以通过过滤器修改。过滤器与变量之间用管道符号 (|) 分隔，如：

```jinja
{{ items | join(', ') | title }}
```

实现功能，items 数组的内容使用 `, ` 接口，再使用 title（首字线大写） 过滤。

输出如下：
```text
One, Two, Three
```

全部内置过滤器请看：[官网 List of Builtin Filters](https://jinja.palletsprojects.com/en/stable/templates/#list-of-builtin-filters)


再来一个 join 模板填充的例子，官方有个 tojson() 过滤器。

模板内容：
```jinja
{"value": {{ my_text | tojson }}}
```

模板渲染代码：
```python{5-7,9}
import json

from jinja2 import Template

my_text = """第一行
第二行，"我是引号"
第三行"""

template = '{"value": {{ my_text | tojson }}}'

t = Template(template, trim_blocks=True)
result = t.render(my_text=my_text)
print(result)

json_ = json.loads(result)
print("成功加载为 json，内容是：", json_)
print(f"前后内容是否一致：{json_['value'] == my_text}")

```

输出内容：
```text
{"value": "\u7b2c\u4e00\u884c\n\u7b2c\u4e8c\u884c\uff0c\"\u6211\u662f\u5f15\u53f7\"\n\u7b2c\u4e09\u884c"}
成功加载为 json，内容是： {'value': '第一行\n第二行，"我是引号"\n第三行'}
前后内容是否一致：True
```

模板生成的 json 内容是合格，但是 tojson 没法使用更多的参数来控制，比如 ascii 处理。想处理人可读性强一点，怎么办呢？

好在 jinja 提供了自定义过滤器。可以自己实现。

## 自定义过滤器

想要的功能：
* 不要把中文转码。
* 使用过滤器后前后不增加 `"` 号。这样方便更直观写json模板。

代码如下：

```python{6-10,14,16,24}
import json

from jinja2 import Environment


def to_json(value: str) -> str:
    # 中文不转码
    json_value = json.dumps(value, ensure_ascii=False)
    # 去掉前后的 " 双引号
    return json_value[1:-1]


# 创建一个 jinja 环境
env = Environment()
# 注册自定义过滤器
env.filters['json'] = to_json

my_text = """第一行
第二行，"我是引号"
第三行"""

# 模板中使用自定义过滤器
# 同时单独使用 " 双引号把值括起来，这样更加直观。
template = '{"value": "{{ my_text | json }}"}'
t = env.from_string(template)
result = t.render(my_text=my_text)
print(result)

json_ = json.loads(result)
print("成功加载为 json，内容是：", json_)
print(f"前后内容是否一致：{json_['value'] == my_text}")

```

主要是：
* 实现想要的功能定义一个函数
* 创建一个 jinja 环境
* 把这个函数注册为自定义过滤器

输出结果：
```text
{"value": "第一行\n第二行，\"我是引号\"\n第三行"}
成功加载为 json，内容是： {'value': '第一行\n第二行，"我是引号"\n第三行'}
前后内容是否一致：True
```

第一行打印出来的 json 可读性更强了。
