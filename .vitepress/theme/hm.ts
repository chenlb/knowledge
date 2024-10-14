import { inBrowser } from 'vitepress';

const SITE_ID = 'e96eb8d0dc519a852d11bc1b97ff28e7';

declare global {
  interface Window {
    _hmt: any;
  }
}

function registerAnalytics() {
  window._hmt = window._hmt || [];
  const script = document.createElement('script');
  script.innerHTML = `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?${SITE_ID}";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })()`;
  document.querySelector('head')?.append(script);
}

export function initHmPlugin() {
  if (inBrowser && import.meta.env.PROD) {
    registerAnalytics();
  }
}
