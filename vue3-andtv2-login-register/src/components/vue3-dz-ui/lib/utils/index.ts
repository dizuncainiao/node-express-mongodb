/**
 * 判断是否为数值类型
 * @param val
 */
export function isNumber (val: any) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * 返回有效的数值
 * @param n
 */
export function getNumber (n: string) {
  return typeof parseFloat(n) === 'number' && !!parseFloat(n) ? parseFloat(n) : n
}

/**
 * 判断是否为 空字符串
 * @param str
 * @returns {boolean|boolean}
 */
export function isEmptyStr (str: any) {
  return typeof str === 'string' && !str.length
}
