// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SiteLayout from './Layout.vue'

import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import { toRefs } from "vue";
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: SiteLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
  setup() {
    // Get frontmatter and route
    const { frontmatter } = toRefs(useData());
    const route = useRoute();

    // Obtain configuration from: https://giscus.app/
    giscusTalk({
          repo: 'chenlb/knowledge',
          repoId: 'R_kgDOM4fKBQ',
          category: 'Announcements', // default: `General`
          categoryId: 'DIC_kwDOM4fKBc4Cjw8h',
          mapping: 'pathname', // default: `pathname`
          inputPosition: 'top', // default: `top`
          lang: 'zh-CN', // default: `zh-CN`
          homePageShowComment: false, // Whether to display the comment area on the homepage, the default is false
          lightTheme: 'light', // default: `light`
          darkTheme: 'light', // default: `transparent_dark`
          strict: "0",
          reactionsEnabled: '1',
          emitMetadata: '0',
          // ...
        }, {
          frontmatter, route
        },
        // Whether to activate the comment area on all pages.
        // The default is true, which means enabled, this parameter can be ignored;
        // If it is false, it means it is not enabled.
        // You can use `comment: true` preface to enable it separately on the page.
        true
    );
  }
} satisfies Theme
