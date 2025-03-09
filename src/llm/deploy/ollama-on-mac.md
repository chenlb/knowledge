# 用 ollama 在 mac 上部署大模型

环境
* macbook pro m1
* 内存：16GB
* 系统版本：macOS Sonoma 14.2.1

## 安装 ollama

到[官网下载 ollama](https://ollama.com/)，解压后，把 ollama.app 移动到 “应用程序” 。

双击 ollama.app 打开。任务栏有 “ollama” 图标 <img src="https://ollama.com/public/ollama.png" width="20" style="display: inline;" alt="ollama icon" />

在终端验证是否安装成功。

```bash
ollama -h
```

::: details ollama -h 查看命令参数
```console
Large language model runner

Usage:
  ollama [flags]
  ollama [command]

Available Commands:
  serve       Start ollama
  create      Create a model from a Modelfile
  show        Show information for a model
  run         Run a model
  stop        Stop a running model
  pull        Pull a model from a registry
  push        Push a model to a registry
  list        List models
  ps          List running models
  cp          Copy a model
  rm          Remove a model
  help        Help about any command

Flags:
  -h, --help      help for ollama
  -v, --version   Show version information

Use "ollama [command] --help" for more information about a command.
```
:::

## 运行大模型

在 ollama 官网找对应的[模型](https://ollama.com/search)。

例如 找到 deepseek-r1:7b，（复制运行命令）：

![ollama-select-deepseek-r1:7b](http://static.chenlb.com/img/ollama/ollama-select-deepseek-r1-7b.png)

打开终端运行

```bash
ollama run deepseek-r1:7b
```

![ollama-run-deepseek-r1:7b](http://static.chenlb.com/img/ollama/ollama-run-deepseek-r1-7b.png)

::: tip 备注
我 mac m1 16G 内存可以跑 ollama deepseek-r1:14b 模型。
:::

## chatbox 界面与模型对话

chatbox 是与大模型对话的界面，有多个设置的版本，个人免费使用，比较好用。到[官网下载](https://chatboxai.app/zh)

安装后，打开 chatbox，配置本地 ollama 模型，并运行：
* 选择 OLLAMA API
* 选择型名：deepseek-r1:7b
* 保存设置

![chatbox-set-ollama](http://static.chenlb.com/img/ollama/chatbox-set-ollama.png)

新对话，右下角选择刚设置的模型名

与 deepseek-r1:7b 模型对话

![chatbox-invoke-deepseek-r1:7b](http://static.chenlb.com/img/ollama/chatbox-invoke-deepseek-r1-7b.png)

::: details deepseek-r1:7b 的思考过程
嗯，液体表面为什么会存在张力呢？我记得以前学过的，可能和分子有关吧。液态的物质，比如水、油等等，都是由原子或分子组成的液体状态。那张力是什么呢？好像指的是表面层中的分子之间的作用力。

首先，我想想分子排列的情况。固体里分子是紧密排列的，而液体的分子则松散一些，可以移动。那么在液面附近，分子是怎么分布的呢？可能液面附近的分子比较少，而在内部的分子比较密集吧？这样的话，表面层里的分子之间的作用力就会比液体内部的大，或者说作用范围不一样。

为什么会产生这种张力呢？是不是因为分子之间的吸引力在表面表现得更明显了？比如，在液体表面，分子之间的作用主要是分子间引力，而在内部，这种引力可能被平衡掉了。这可能导致表面层有一个拉伸的趋势，也就是所谓的表面张力。

表面张力看起来像是一个力作用在液面的周界上，试图减少表面积。这有点像薄膜一样，受力后会收缩，比如滴水形成球形就是因为它有最小的表面积。这也解释了为什么一些小东西能浮在水面上，因为表面张力可以支持一定的重量。

还有例子吗？比如说，用细针或者吸管蘸取液体不容易刺破水面，就是因为表面张力的存在。当把细针放在液面时，即使针的尖端很锋利，表面张力也会阻止它穿透液体表面，除非施加足够的压力。

可能我还漏掉了一些点，比如表面张力的影响因素是什么？是不是温度、物质种类和表面杂质都有关系呢？是的，一般来说，温度越高，分子运动越活跃，表面张力可能会减小。而含有表面活性剂的液体，因为它们会增加表面积，所以会降低表面张力。

另外，表面张力在自然界中有很多应用，比如形成水滴、形成露珠等等。这也说明了为什么它是一个重要的物理现象。

总结一下，液体表面有张力是因为液面附近的分子排列较为稀疏，而内部的分子比较密集，导致表面层的分子之间主要存在分子间引力，并且这些引力在表面表现得更加明显，形成了一个试图减少表面积的力，也就是表面张力。
:::

结果

```text
液体表面张力的存在主要是由于液面附近的分子排列较稀疏，而在液体内部分子较为密集。这种结构差异导致表面层的分子之间的相互作用主要表现为分子间引力，并且这些引力在表面表现得更为明显，从而形成了试图减少表面积的力量，即表面张力。

这个现象解释了多种自然现象和实际应用，如水滴形成、小物体浮于液面以及使用细针蘸取液体而不刺破表面等。此外，表面张力还受到温度、物质种类和表面杂质等因素的影响。
```

::: tip 备注
deepseek-r1 带推理，首字用了 8 秒返回。过后输出 token 还算流畅。

同样的方法配置 qwen2.5:7b。首字返回 1.5 秒。
::: 