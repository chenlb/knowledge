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
                {text: '依赖管理', link: '/python/base/deps'}
            ]
        },
        {
            text: 'Python 进阶',
            items: [
                {text: '插件化', link: '/python/advanced/plugin'}
            ]
        }
    ],
    "/pc/": [
        {text: 'Macbook 基础环境', link: '/pc/macbook-env'},
    ]
}

export {nav, sidebar}