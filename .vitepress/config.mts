import { defineConfig } from 'vitepress'
import { nav, sidebar } from './site-meta.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "chenlb 的知识库",
  description: "计算机、互联网相关技术的知识累积。",
  srcDir: './src',
  outDir: './dist',
  cacheDir: './.vitepress/.vite',
  sitemap: {
    hostname: 'http://chenlb.com'
  },
  markdown: {
    lineNumbers: true
  },
  ignoreDeadLinks: [
    // ignore all localhost links
    /^https?:\/\/localhost/,
  ],
  head: [
    [
        'script',
      {
        async: '',
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3472666461950340',
        crossOrigin: 'anonymous'
      }
    ],[
      'script', {
        charset: 'utf-8',
        id: 'LA_COLLECT',
        src: '//sdk.51.la/js-sdk-pro.min.js'
      }
    ],[
      'script', {},
      'LA.init({id:"3KKmyFdMIc01NBWw",ck:"3KKmyFdMIc01NBWw",autoTrack:true,hashMode:true})'
    ]
    // google analytics
    ,[
      'script', {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-XWCE7Q5QDS'
      }
    ],[
      'script', {},
      "window.dataLayer = window.dataLayer || [];\n" +
      "function gtag(){dataLayer.push(arguments);}\n" +
      "gtag('js', new Date());\n" +
      "gtag('config', 'G-XWCE7Q5QDS');"
    ]
  ],
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
      copyright: 'Copyright © 2024-present <a href="https://github.com/chenlb" target="_blank">chenlb</a>.' +
          '&nbsp;&nbsp;<a href="https://beian.miit.gov.cn" target="_blank">浙ICP备2024130284号</a>' +
          '<br/><img style="display:inline;margin:0 5px;width:16px;" src="/beian.png" sizes="32x32" alt="浙公网安备33011002017913" />' +
          '<a href="https://beian.mps.gov.cn/#/query/webSearch?code=33011002017913" rel="noreferrer" target="_blank">浙公网安备33011002017913</a>',
    }
  }
})
