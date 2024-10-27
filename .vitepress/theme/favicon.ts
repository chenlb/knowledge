import { inBrowser } from 'vitepress';


function registerFavicon() {
    const link = document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = '/favicon.png';
    link.setAttribute('sizes', '32x32');
    document.querySelector('head')?.append(link);
}

export function initFaviconPlugin() {
    if (inBrowser) {
        registerFavicon();
    }
}