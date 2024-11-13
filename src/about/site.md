# 关于本站

本站使用 [vitepress](https://vitepress.dev/zh/) 搭建，使用 md 格式写文档。

## 常用代码高亮

常用：

|         代码         |                   Key                   |
|:------------------:|:---------------------------------------:|
|        CSV         |                  `csv`                  |
|        Diff        |                 `diff`                  |
|     Dockerfile     |          `docker`、`dockerfile`          |
|       dotEnv       |                `dotenv`                 |
|        HTML        |                 `html`                  |
|      ini/conf      |           `ini`、`properties`            |
|        Java        |                 `java`                  |
|     JavaScript     |            `js`、`javascript`            |
|       Jinja        |                 `jinja`                 |
|        JSON        |                 `json`                  |
| JSON with Comments |                 `jsonc`                 |
|     JSON Lines     |                 `jsonl`                 |
|       LaTeX        |                 `latex`                 |
|      Log file      |                  `log`                  |
|      Markdown      |             `md`、`markdown`             |
|       Nginx        |                 `nginx`                 |
|       Python       |              `python`、`py`              |
|       Shell        | `bash`、`sh`、`shell`、`zsh`、`shellscript` |
|   Shell Session    |        `console`、`shellsession`         |
|        SQL         |                  `sql`                  |
|        TOML        |                 `toml`                  |
|        TSV         |                  `tsv`                  |
|     TypeScript     |            `ts`、`typescript`            |
|        Vue         |                  `vue`                  |
|      Vue HTML      |               `vue-html`                |
|        YAML        |              `yaml`、`yml`               |

更从支持的代码：[Shiki 代码高亮列表](https://shiki.style/languages#bundled-languages)

## 图片点击放大

安装 `medium-zoom`
```bash
npm install medium-zoom
```

自定义布局，增加 medium-zoom。如 `.vitepress/theme/Layout.vue`
```vue{19,11-22,26}
<script lang="ts" setup>
import { nextTick, onMounted, watch } from 'vue';

import mediumZoom from 'medium-zoom';
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

const { Layout } = DefaultTheme;
const route = useRoute();

const initZoom = () => {
  mediumZoom('.VPDoc img', { background: 'var(--vp-c-bg)' });
};

watch(
    () => route.path,
    () => nextTick(() => initZoom()),
);

onMounted(() => {
  initZoom();
});
</script>

<template>
  <Layout />
</template>

<style>
.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 2147483647;
}
</style>
```

使用自定义布局，使用 medium-zoom 生效。编辑 `.vitepress/theme/index.ts`
```ts{3,7}
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SiteLayout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout: SiteLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
```

## 评论

[Giscus](https://github.com/apps/giscus) 是一个基于 GitHub Discussion 的评论系统，优点很多：

* 免费
* 不需要后端，使用 GitHub Discussion
* 安装方案
* 美观
* 支持 markdown

安装请看：[Giscus 评论使用教程](https://vitepress.yiov.top/plugin.html#%E8%AF%84%E8%AE%BA)

本站使用 [`@T-miracle/vitepress-plugin-comment-with-giscus`](https://github.com/T-miracle/vitepress-plugin-comment-with-giscus) 的插件：

```bash
npm install vitepress-plugin-comment-with-giscus
```

在 `.vitepress/theme/index.ts` 中填入下面代码：
```ts{4-6,14-44}
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SiteLayout from './Layout.vue'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import { toRefs } from "vue";

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
          repo: 'your github repository',
          repoId: 'your repository id',
          category: 'Announcements', // default: `General`
          categoryId: 'your category id',
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
```

不需要插入其它代码。 效果见本页文档底部。
