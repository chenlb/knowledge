<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { AdsenseSlotOptions } from "../ads"
import { adsConfig } from "../ads.d.ts"


const googleAdsense: AdsenseSlotOptions = {}

const div_style = 'width:690px;height:120px'

if(adsConfig.adsense) {
  googleAdsense.ad_client = adsConfig.adsense.ad_client
  googleAdsense.ad_slot = 8301850861
  googleAdsense.div_style = div_style
  // googleAdsense.ad_style = `display:inline-block;${div_style}`
}

// const show_ad = adsConfig.adsense
const show_ad = false

const GoogleAdsense = show_ad
    ? defineAsyncComponent(() => import('../components/GoogleAdsense.vue'))
    : () => null
</script>

<template>
  <div class="ad-doc-after" :style="div_style">
    <GoogleAdsense v-if="show_ad" :google-adsense="googleAdsense" />
  </div>
</template>
<style scoped>
.ad-doc-after {
  margin-top: 24px;
}
</style>