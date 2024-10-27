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
]

const sidebar = {
    "/python/fastapi/":[
        {text: 'FastAPI 简介', link: '/python/fastapi/'},
    ],
    "/python/": [
        {text: 'Python 快速开始', link: '/python/'},
        {
            text: 'Python 基础',
            items: [
                {text: '字符串', link: '/python/base/string'},
                {text: '开发环境', link: '/python/base/env'},
            ]
        },
        {
            text: 'Python 进阶',
            items: [
                {text: '依赖和包管理：Poetry', link: '/python/advanced/poetry'},
                {text: '插件化', link: '/python/advanced/plugin'}
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
}

export {nav, sidebar}