export function promiseAll<const T extends readonly unknown[]>(
  promises: T,
): Promise<{ [K in keyof T]: Awaited<T[K]> }>;
export function promiseAll<T>(
  promises: Iterable<T | PromiseLike<T>>,
): Promise<Awaited<T>[]>;
export function promiseAll(promises: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!promises || typeof promises[Symbol.iterator] !== "function") {
      reject(new TypeError("Argument is not iterable"));
      return;
    }

    const promiseArray = Array.from(promises);
    const results = new Array(promiseArray.length);
    const total = promiseArray.length;

    if (total === 0) {
      resolve([]);
      return;
    }

    let completedCount = 0;
    promiseArray.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          completedCount++;
          if (completedCount === total) {
            resolve(results);
          }
        },
        (error) => {
          reject(error);
        },
      );
    });
  });
}
