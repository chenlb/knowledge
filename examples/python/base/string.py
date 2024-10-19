# 普通字符串
print('\n# 普通字符串')
print('hello world!')
print("hello world!")

# \, r 字符串
print('\n# \, r 字符串')
print('hello\nworld!')
print(r'hello\nworld!')

# 多行字符串
print('\n# 多行字符串')
txt = """第一行
第二行，有"双引号"
第三行
"""
print(txt)

# f字符串
print('\n# f字符串')
name = 'chenlb'
# 字符串使用 name 变量（或叫参数）填充。
print(f'hello {name}!')
