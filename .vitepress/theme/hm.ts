import { inBrowser } from 'vitepress';

const SITE_ID = '655673970173b659474f94d21d942aaa';

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
