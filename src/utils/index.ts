/**
 * @description: 处理音乐时长的时间
 * @param {*} time
 * @return {*}
 */
export function handleMusicTime(time): string {
  const seconds = parseInt((time / 1000).toFixed(0))
  let m: number | string = Math.floor(seconds / 60)
  let s: number | string = Math.floor(seconds % 60)
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return m + ':' + s
}
