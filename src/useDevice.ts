// 获取用户代理字符串
const userAgent = window.navigator.userAgent.toLowerCase()
const deviceRxg = /android|mobile|iphone|ipad|ipod|blackberry|windows phone|webos|opera mini|iemobile|symbian/i

/** 
 * @description 判断是否为移动设备
 * @returns {boolean} 是否为移动设备
 */
function isMobile(): boolean {
    return deviceRxg.test(userAgent)
}

/**
 * @description 判断是否为PC设备
 * @returns {boolean} 是否为PC设备
 */
function isPC(): boolean {
    return !isMobile()
}

export const useDevice = () => {
    return {
        isMobile: isMobile(),
        isPC: isPC()
    }
}