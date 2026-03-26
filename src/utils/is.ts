const getTag = (value: any): string => {
  return Object.prototype.toString.call(value);
};

export const isObjectLike = (value: any): boolean => {
  return value !== null && typeof value === "object";
};

export const isObject = (value: any): boolean => {
  const type = typeof value;
  return value != null && (type == "object" || type == "function");
};

const MAX_SAFE_INTEGER = 9007199254740991;
export const isLength = (value: any): boolean => {
  return (
    typeof value === "number" &&
    value > -1 &&
    value % 1 === 0 &&
    value <= MAX_SAFE_INTEGER
  );
};

const asyncTag = "[object AsyncFunction]",
  funcTag = "[object Function]",
  genTag = "[object GeneratorFunction]",
  proxyTag = "[object Proxy]";

export const isFunction = (value: any): boolean => {
  if (!isObject(value)) return false;
  const tag = getTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
};
