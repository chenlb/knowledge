<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { AdsenseSlotOptions } from "../ads"
import { adsConfig } from "../ads.d.ts"


const googleAdsense: AdsenseSlotOptions = {}

const div_style = 'width:560px;height:350px'

if(adsConfig.adsense) {
  googleAdsense.ad_client = adsConfig.adsense.ad_client
  googleAdsense.ad_slot = 1250867523
  googleAdsense.div_style = div_style
  googleAdsense.ad_style = `display:inline-block;${div_style}`
}

const show_ad = adsConfig.adsense
// const show_ad = false

const GoogleAdsense = show_ad
    ? defineAsyncComponent(() => import('../components/GoogleAdsense.vue'))
    : () => null
</script>

<template>
  <div class="ad-home-hero-image">
    <GoogleAdsense v-if="show_ad" :google-adsense="googleAdsense" />
  </div>
</template>
<style scoped>

</style>