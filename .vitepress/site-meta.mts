const nav = [
    { text: '首页', link: '/' },
    {
        text: 'Python',
        items: [
            {
                items: [
                    { text: 'Python 编程', link: '/python/' },
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
                text: 'LLM 生态',
                items: [

                    { text: 'Langfuse', link: '/llm/langfuse/' },

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
                ]
            }
        ]
    },
    { text: '电脑办公', link: '/pc/macbook-env' },
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
                {text: 'Poetry：依赖和包管理', link: '/python/advanced/poetry'},
                {text: '插件化', link: '/python/advanced/plugin'}
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
            ]
        }
    ],
    "/internet/": [
        {
            text: "服务器",
            items: [
                {text: 'Nginx', link: '/internet/nginx'},
            ]
        }
    ],
    "/pc/": [
        {text: 'Macbook 基础环境', link: '/pc/macbook-env'},
    ]
    ,
    "/about/": [
        {text: '关于我', link: '/about/'},
        {text: '关于本站', link: '/about/site'},
    ]
}

export {nav, sidebar}