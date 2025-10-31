/** 
 * @description 事件触发后等待指定时间才执行，若在等待期内再次触发，则忽略。确保在指定时间内只执行一次。
 */
export function useThrottle<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  } as T;
}
