<script lang="ts" setup>
import { nextTick, onMounted, watch } from 'vue';

import mediumZoom from 'medium-zoom';
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import AdsenseDocAfter from './layout-slots/doc-after.vue'
import AdsenseAside from './layout-slots/aside-ads-before.vue'

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
  <Layout>
    <template #home-hero-image>
      <img class="VPImage image-src" src="http://static.chenlb.com/img/logo/vitepress-logo-large.webp"  alt="logo"/>
    </template>
    <template #doc-after>
      <AdsenseDocAfter />
    </template>
    <template #aside-ads-before>
      <AdsenseAside />
    </template>
  </Layout>
</template>

<style>
.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 2147483647;
}
ins.adsbygoogle[data-ad-status="unfilled"] {
  display: none !important;
}
</style>
