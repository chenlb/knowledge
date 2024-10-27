import { defineConfig } from 'vitepress'
import { nav, sidebar } from './site-meta.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Chenlb Knowledge",
  description: "计算机、互联网相关技术的知识累积。",
  srcDir: './src',
  outDir: './dist',
  cacheDir: './.vitepress/.vite',
  sitemap: {
    hostname: 'http://chenlb.com'
  },
  themeConfig: {
    logo: '/logo.svg',
    darkModeSwitchLabel: '主题',
    darkModeSwitchTitle: '切换到深色模式',
    docFooter: {
      next: '下一页',
      prev: '上一页',
    },
    lastUpdated: {
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium',
      },
      text: '最后更新于',
    },
    lightModeSwitchTitle: '切换到浅色模式',
    outline: {
      label: '页面导航',
      level: [2, 4]
    },
    returnToTopLabel: '回到顶部',
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,

    sidebar: sidebar,
    sidebarMenuLabel: '菜单',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chenlb/knowledge' },
    ],

    footer: {
      message: '基于 MIT 许可发布.',
      copyright: 'Copyright © 2024-present <a href="https://github.com/chenlb" target="_blank">chenlb</a><br/><a href="https://beian.miit.gov.cn" target="_blank">浙ICP备2024130284号</a>',
    }
  }
})
