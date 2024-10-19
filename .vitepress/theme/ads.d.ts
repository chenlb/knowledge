export interface GoogleAdsenseOptions {
    ad_client: string
}

export interface AdsenseSlotOptions extends GoogleAdsenseOptions {
    ad_slot: bigint
    ad_style: string
    div_style: string

    // 自适应尺寸
    ad_format: string
    full_width_responsive: boolean
}

export interface AdsConfig {
    adsense?: GoogleAdsenseOptions
}

const adsConfig: AdsConfig = {
    adsense: {
        ad_client: 'ca-pub-3472666461950340'
    }
}

export { adsConfig }
