/**
 * @description 该hooks的使用场景是，按钮倒计时，验证码场景或者几秒后才能进行下一步
 */
import { ref, onBeforeUnmount } from "vue";

export function useCountDown(duration: number, manual: boolean = true) {
  
  /** 倒计时时间 */
  const durationRef = ref(duration);
  /** 是否可以手动触发倒计时 */
  const canManualTrigger = ref(manual);
  let timeId: Nullable<NodeJS.Timeout> = null;

  function start() {
    stop();
    durationRef.value = duration
    canManualTrigger.value = false // 开始倒计时时禁用按钮

    function countDown() {
        durationRef.value -= 1
        if (durationRef.value <= 0) {
            canManualTrigger.value = true // 倒计时结束后允许再次触发
        }else {
            timeId = setTimeout(countDown, 1000)
        }
    }
    countDown()
  }

  function stop() {
    if (timeId) {
      clearTimeout(timeId);
      timeId = null;
    }
    canManualTrigger.value = manual;
  }

  onBeforeUnmount(stop)

  return {
    duration: durationRef,
    canManualTrigger,
    start,
    stop,
  }
}
