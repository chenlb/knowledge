<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { AdsenseSlotOptions } from "../ads"
import { adsConfig } from "../ads.d.ts"


const googleAdsense: AdsenseSlotOptions = {}

const div_style = 'width:1152px;height:120px;'

if(adsConfig.adsense) {
  googleAdsense.ad_client = adsConfig.adsense.ad_client
  googleAdsense.ad_slot = 3801671952
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
  <div class="blank"/>
  <div class="container ad-home-after" :style="div_style">
    <GoogleAdsense v-if="show_ad" :google-adsense="googleAdsense" />
  </div>
</template>
<style scoped>
.blank {
  margin: 24px auto;
}
.ad-home-after {
  margin: 0 auto;
}
</style>