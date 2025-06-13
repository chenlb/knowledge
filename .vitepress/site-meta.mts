const nav = [
    { text: '首页', link: '/' },
    {
        text: 'Python',
        items: [
            {
                items: [
                    { text: 'Python 编程', link: '/python/' },
                    { text: 'Logging', link: '/python/advanced/logging'},
                    { text: 'UV', link: '/python/advanced/uv' },
                    { text: 'Poetry', link: '/python/advanced/poetry' },
                    { text: 'FastAPI', link: '/python/fastapi/' },
                ]
            }
        ]
    },
    {
        text: '大模型',
        items: [
            {
                text: '模型服务',
                items: [

                    { text: '通义', link: '/llm/tongyi/getting-started' },
                ]
            },
            {
                text: '模型部署',
                items: [
                    { text: 'CUDA', link: '/llm/deploy/cuda-install-on-windows' },
                    { text: 'Ollama', link: '/llm/deploy/ollama-on-mac' },
                    { text: 'vLLM', link: '/llm/deploy/debian-install-vllm' },
                ]
            },
            {
                text: 'LLM 生态',
                items: [
                    { text: 'Dify', link: '/llm/dify/install-dify' },
                    { text: 'Langfuse', link: '/llm/langfuse/' },
                    { text: '通义集成 Langfuse', link: '/llm/tongyi/integration-langfuse' },

                ]
            }
        ]
    },
    {
        text: '互联网',
        items: [
            {
                items: [
                    { text: 'Nginx', link: '/internet/nginx' },
                    { text: 'Linux 常用命令', link: '/internet/linux-command' },
                    {text: 'OAuth2', link: '/internet/oauth2'},
                ]
            }
        ]
    },
    {
        text: '电脑办公',
        items: [
            {
                items: [
                    { text: 'Macbook', link: '/pc/macbook-env'  },
                    { text: 'Linux On WSL', link: '/pc/linux-on-wsl'  },
                    { text: 'Debian', link: '/pc/debian-best-setting'  },
                ]
            }
        ]
    },
    { text: '关于', link: '/about/' },
]

const sidebar = {
    "/python/fastapi/":[
        {
            text: '简介',
            collapsed: false,
            items: [
                {text: 'FastAPI 是什么？', link: '/python/fastapi/'},
                {text: '快速开始', link: '/python/fastapi/getting-started'},
                {text: '请求参数', link: '/python/fastapi/request-params'},
                {text: '最佳实践', link: '/python/fastapi/best-practice'},
            ]
        }
    ],
    "/python/": [
        {
            text: 'Python 基础',
            collapsed: false,
            items: [
                {text: '快速开始', link: '/python/'},
                {text: '开发环境', link: '/python/base/env'},
                {text: '字符串', link: '/python/base/string'},
            ]
        },
        {
            text: 'Python 进阶',
            collapsed: false,
            items: [
                {text: '日志记录', link: '/python/advanced/logging'},
                {text: 'UV：依赖和项目管理', link: '/python/advanced/uv'},
                {text: 'Poetry：依赖和包管理', link: '/python/advanced/poetry'},
                {text: '插件化', link: '/python/advanced/plugin'},
                {text: '安装常见错误', link: '/python/advanced/install-errors'}
            ]
        },
        {
            text: '精选库',
            collapsed: false,
            items: [
                {text: 'dotenv：读取配置', link: '/python/best/dotenv'},
                {text: 'Jinja2：模板引擎', link: '/python/best/jinja2'},
            ]
        }
    ],
    "/llm/tongyi/": [
        {
            text: "通义",
            collapsed: false,
            items: [
                {text: '简介', link: '/llm/tongyi/'},
                {text: '快速开始', link: '/llm/tongyi/getting-started'},
                {text: '兼容 OpenAI', link: '/llm/tongyi/compatible-openai'},
                {text: '集成 Langfuse', link: '/llm/tongyi/integration-langfuse'},
            ]
        }
    ],
    "/llm/dify/": [
        {
            text: "部署",
            collapsed: false,
            items: [
                {text: '本地部署 Dify', link: '/llm/dify/install-dify'},
            ]
        }
    ],
    "/llm/deploy/": [
        {
            text: "Ollama",
            collapsed: false,
            items: [
                {text: '在 Mac 部署', link: '/llm/deploy/ollama-on-mac'},
            ]
        },
        {
            text: "vLLM",
            collapsed: false,
            items: [
                {text: 'vllm + modelscope', link: '/llm/deploy/debian-install-vllm'},
            ]
        },
        {
            text: "环境",
            collapsed: false,
            items: [
                {text: '在Windows中安装CUDA', link: '/llm/deploy/cuda-install-on-windows'},
            ]
        }
    ],
    "/llm/langfuse/": [
        {
            text: "Langfuse",
            collapsed: false,
            items: [
                {text: '简介', link: '/llm/langfuse/'},
                {text: '快速开始', link: '/llm/langfuse/getting-started'},
                {text: 'Token 计价', link: '/llm/langfuse/model-token-pricing'},
                {text: 'Tracing 使用示例', link: '/llm/langfuse/tracing-examples'},
            ]
        },
        {
            text: "进阶",
            collapsed: false,
            items: [
                {text: 'Tracing API', link: '/llm/langfuse/tracing-api'},
                {text: 'Custom OAuth2', link: '/llm/langfuse/custom-oauth2'},
            ]
        }
    ],
    "/internet/": [
        {
            text: "服务器",
            items: [
                {text: 'Nginx', link: '/internet/nginx'},
                { text: 'Linux 常用命令', link: '/internet/linux-command' },
            ]
        },
        {
            text: "架构",
            items: [
                {text: 'OAuth2', link: '/internet/oauth2'},
            ]
        }
    ],
    "/pc/": [
        {
            text: "Mac",
            items: [
                {text: 'Macbook 基础环境', link: '/pc/macbook-env'},
            ]
        },
        {
            text: "Linux",
            items: [
                {text: 'Linux On WSL', link: '/pc/linux-on-wsl'},
                {text: 'Debian', link: '/pc/debian-best-setting'},
            ]
        }
    ]
    ,
    "/about/": [
        {text: '关于我', link: '/about/'},
        {text: '关于本站', link: '/about/site'},
    ]
}

export {nav, sidebar}