/** 
 * @description 事件触发后等待指定时间才执行，若在等待期内再次触发，则重新计时。确保连续触发只执行最后一次。
 */
export function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as T;
}
