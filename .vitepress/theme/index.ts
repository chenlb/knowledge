// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { initHmPlugin } from './hm';
import AsideAdsBefore from "./layout-slots/aside-ads-before.vue";
import DocAfter from "./layout-slots/doc-after.vue";
import HomeAfter from "./layout-slots/home-after.vue";
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'aside-ads-before': () => h(AsideAdsBefore),
      'doc-after': () => h(DocAfter),
      'home-features-after': () => h(HomeAfter),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    // 百度统计
    initHmPlugin();
  }
} satisfies Theme
