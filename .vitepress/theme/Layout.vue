<script lang="ts" setup>
import { nextTick, onMounted, watch } from 'vue';

import mediumZoom from 'medium-zoom';
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import AdsenseHomeImage from './layout-slots/home-hero-image.vue'
import AdsenseDoc from './layout-slots/doc-before.vue'
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
      <AdsenseHomeImage />
    </template>
    <template #doc-before>
      <AdsenseDoc />
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
