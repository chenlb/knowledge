# Python 字符串

## 普通字符串

使用单引号 ```'``` 或 双引号 ```"``` 表示。

```python
>>> print('hello world!')
hello world!
>>> print("hello world!")
hello world!
>>> 
```

## 转义

使用 ```\``` 表示转义特殊字符的字符串，例如：```\n``` 表示换行。

在 Python 字符串前面加 ```r``` 表示原始字符串，不进行转义。

```python{4}
>>> print('hello\nworld!')
hello
world!
>>> print(r'hello\nworld!')
hello\nworld!
>>> 
```

## 多行字符串

使用3个双引号 ```"""``` 包括起多行字符串。好有处有：
* 多行的内容不用加 ```\n```。
* 内容有单引号(```'```)或双引号(```"```)时，不需要使用 ```\``` 来转义  

```python{2}
txt = """第一行
第二行，有"双引号"
第三行
"""
print(txt)
```

输出如下：
```text:line-numbers
第一行
第二行，有"双引号"
第三行
```

## f 字符串

字符串前面加 ```f``` 或 ```F```。表示对字符串里的变量进行填充。也叫格式化字符串。

变量（或叫参数）用大括号 ```{}```括起来。 

```python{2}
>>> name = 'chenlb'
>>> print(f'hello {name}!')
hello chenlb!
>>> 
```
