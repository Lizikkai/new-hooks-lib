import { ref, computed, unref } from 'vue'
export enum EnvEnum {
    /** 企微环境 */
    WxWork = 'wxwork',
    /** 微信环境 */
    Wx = 'wx',
    /** 浏览器环境 */
    Browser = 'browser',
}

/** 
 * @title 微信环境hooks返回值类型
 */
export type PlatformEnvReturn = {
  /** 是企业微信环境 */
  isWxWork: boolean;
  /** 是普通浏览器环境 */
  isBrowser: boolean;
  /** 是微信环境 */
  isWeChat: boolean;
  /** user Agent */
  userAgent: string;
  /** 环境类型 */
  envType: EnvEnum;
}

export function usePlatformEnv(): PlatformEnvReturn {
    const userAgent = ref<string>(window.navigator.userAgent.toLowerCase())
    const isWxWork = computed(() => {
        return /wxwork/i.test(unref(userAgent))
    })

    const isWeChat = computed(() => {
        return (/micromessenger/i.test(unref(userAgent)) && !/wxwork/i.test(unref(userAgent)))
    })

    const isBrowser = computed(() => {
        return !unref(isWxWork) && !unref(isWeChat)
    })

    const envType = computed(() => {
        if(isWxWork.value) return EnvEnum.WxWork
        if(isWeChat.value) return EnvEnum.Wx
        return EnvEnum.Browser
    })


    return {
        isWxWork: unref(isWxWork),
        isWeChat: unref(isWeChat),
        isBrowser: unref(isBrowser),
        userAgent: unref(userAgent),
        envType: unref(envType)
    }
}

