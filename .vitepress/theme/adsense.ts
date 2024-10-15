import { inBrowser } from 'vitepress';

const ADSENSE_ID = 'pub-3472666461950340';

function registerAdsense() {
    // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3472666461950340" crossorigin="anonymous"></script>
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${ADSENSE_ID}`
    script.crossOrigin = 'anonymous';
    document.querySelector('head')?.append(script);
}

export function initAdsensePlugin() {
    if (inBrowser && import.meta.env.PROD) {
        registerAdsense();
    }
}