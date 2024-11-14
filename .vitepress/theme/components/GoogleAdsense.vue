<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useData } from 'vitepress'
import type { AdsenseSlotOptions } from "../ads";

const { page } = useData()
const props = defineProps<{
  googleAdsense: AdsenseSlotOptions
}>()

const adsenseOptions = props.googleAdsense
const ad_format = adsenseOptions.ad_format? adsenseOptions.ad_format : 'auto'
const full_width_responsive = adsenseOptions.full_width_responsive? 'true' : 'false'

const _id = `slot_${adsenseOptions.ad_slot}`
const _id_dev = `ad-div-${_id}`

const container = ref()

const my_time = ref(Date.now())


function create_adsense(): HTMLElement {
  const adsense_div = document.createElement('div')
  adsense_div.id = _id
  if(adsenseOptions.div_style) {
    // 自动尺寸
    // adsense_div.setAttribute('style', `${adsenseOptions.div_style}`)
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseOptions.ad_client}`
  script.crossOrigin = 'anonymous';
  adsense_div.appendChild(script)

  const ins = document.createElement('ins');
  ins.setAttribute('class', 'adsbygoogle')
  if(adsenseOptions.ad_style) {
    ins.setAttribute('style', `${adsenseOptions.ad_style}`)
  } else {
    ins.setAttribute('style', 'display:block')
    ins.setAttribute('data-ad-format', `${ad_format}`)
    ins.setAttribute('data-full-width-responsive', `${full_width_responsive}`)
  }

  ins.setAttribute('data-ad-client', `${adsenseOptions.ad_client}`)
  ins.setAttribute('data-ad-slot', `${adsenseOptions.ad_slot}`)

  adsense_div.appendChild(ins)

  const script_end = document.createElement('script');
  script_end.innerHTML = "(adsbygoogle = window.adsbygoogle || []).push({});"
  adsense_div.appendChild(script_end)

  return adsense_div
}

function apply_adsense(): void {
  my_time.value = Date.now()
  const adsense_code = create_adsense()
  container.value.appendChild(adsense_code)
  // console.log(`apply_adsense ${my_time.value}`)
}

function init() {
  apply_adsense()
}

function refresh(): void {
  // ;(window as any).location.reload(_id)
  // console.log('remove adsense', _id)
  document.querySelector(`#${_id}`).remove()
  apply_adsense()
}

function close_ad(): void {
  document.querySelector(`#${_id}`).remove()
  // console.log('close_ad, isInitialized =', adsenseOptions.ad_slot)
}

watch(() => page.value.relativePath, () => {
    refresh()
    // console.log("current patch=", page.value.relativePath, my_time.value, adsenseOptions.ad_slot)
})

// no need to account for option changes during dev, we can just
// refresh the page
if (adsenseOptions) {
  onMounted(() => {
    // if the page is loaded when aside is active, load carbon directly.
    // otherwise, only load it if the page resizes to wide enough. this avoids
    // loading carbon at all on mobile where it's never shown
    // console.log('mounted', adsenseOptions.ad_slot)
    init()
  })
}
</script>
<template>
  <div class="ad-container" :id="_id_dev" ref="container" />
</template>
<style scoped>
.ad-container {

}
</style>