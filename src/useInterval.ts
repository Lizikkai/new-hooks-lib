import { onUnmounted } from "vue";

// 延时器的时间默认1s调用一次
export function useInterval(runner: () => void, delay = 1000) {
  // 定义一个延时器id
  let timer: Nullable<NodeJS.Timeout> = null;
  function tick() {
    // 传入的回调函数
    runner();
    timer = setTimeout(() => {
      tick();
    }, delay);
  }
  // 卸载的时候自动关闭这个延时器
  onUnmounted(() => {
    stop();
  });
  function start() {
    // 先停止之前的定时器，避免重复启动
    stop();
    tick();
  }
  // 停止的方法
  function stop() {
    // 如果已经存在这个延时器了 清除定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  return { stop, start };
}
