/**
 * @description: 数字补0操作
 * @param {*} num 数字
 * @param {*} n 多少位数字
 * @return {*}
 */
export function prefixInteger(num, n) {
  return num.toString().padStart(n, '0')
}

/**
 * @description: 处理数字
 * @param {*} num
 * @return {*}
 */
export function handleNum(num) {
  if (num > 100000000) {
    //处理大于亿
    num = (num / 100000000).toFixed(0)
    return num + '亿'
  } else if (num > 10000) {
    //处理大于万
    num = (num / 10000).toFixed(0)
    return num + '万'
  } else {
    return num
  }
}
