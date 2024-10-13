import { defineConfig } from 'vitepress'
import { nav, sidebar } from './site-meta.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Chenlb Knowledge",
  description: "计算机、互联网相关技术的知识累积。",
  srcDir: './src',
  outDir: './dist',
  cacheDir: './.vitepress/.vite',
  themeConfig: {
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
    },
    returnToTopLabel: '回到顶部',
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,

    sidebar: sidebar,
    sidebarMenuLabel: '菜单',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chenlb/knowledge' },
    ]
  }
})
