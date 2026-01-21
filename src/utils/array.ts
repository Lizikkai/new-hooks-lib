export const chunk = <T>(array: T[], size: number = 1): T[][] => {
  let result: T[][] = [];
  if (!Array.isArray(array)) return [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

/**
 * @description 移除数组中的假值（false, null, 0, "", undefined, NaN）
 * @param array Array<any>
 * @returns Array<any>
 */
export const compact = <T>(array: T[]): T[] => {
  let result: T[] = [];
  if (!Array.isArray(array)) return [];
  result = array.filter(Boolean);
  return result;
};

/**
 * @description 创建一个新数组，将所有参数连接起来，支持指定展开深度
 * @param deepSize 展开深度，默认为1（展开一层），设置为Infinity可完全展平
 * @param values 要连接的值（可以是数组或单个值）
 * @returns 连接后的新数组
 * @example
 * concat(1, 1, 2, [3]); // [1, 2, 3] - 默认展开1层
 * concat(1, [1], 2, [3, [4]]); // [1, 2, 3, [4]] - 展开1层
 * concat(2, [1, [2, [3]]]); // [1, 2, [3]] - 展开2层
 * concat(Infinity, [1, [2, [3]]]); // [1, 2, 3] - 完全展平
 */
export const concat = <T>(deepSize: number = 1, ...values: any[]): T[] => {
  let result: T[] = [];

  const flatten = (value: any, depth: number): void => {
    if (Array.isArray(value) && depth > 0) {
      value.forEach((item) => flatten(item, depth - 1));
    } else {
      result.push(value);
    }
  };

  values.forEach((value) => flatten(value, deepSize));
  return result;
};

export const difference = <T>(array: T[], values: T[]): T[] => {
  return array.filter((item) => !values.includes(item));
};

export const drop = <T>(array: T[], dropNum: number = 1): T[] => {
  let result: T[] = [];
  if (!Array.isArray(array)) return [];
  result = array.slice(dropNum);
  return result;
};

export const dropRight = <T>(array: T[], dropNum: number = 1): T[] => {
  let result: T[] = [];
  if (!Array.isArray(array)) return [];
  result = array.slice(0, array.length - dropNum);
  return result;
};
/**
 * @description 深度扁平化数组
 */
export const flattenDeep = <T>(array: T[]): T[] => {
  let result: T[] = [];
  if (!Array.isArray(array)) return [];
  const flatten = (value: any, depth: number = Infinity): void => {
    if (Array.isArray(value) && depth > 0) {
      value.forEach((item) => flatten(item, depth - 1));
    } else {
      result.push(value);
    }
  };
  array.forEach((item) => flatten(item));
  return result;
};
