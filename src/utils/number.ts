/**
 * @description: 数字补0操作
 * @param {*} num 数字
 * @param {*} n 多少位数字
 * @return {*}
 */
export function prefixInteger(num, n) {
  return num.toString().padStart(n, '0')
}
