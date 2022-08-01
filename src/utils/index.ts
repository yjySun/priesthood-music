/**
 * @description: 处理音乐时长的时间(毫秒)
 * @param {*} time
 * @return {*}
 */
export function handleMusicTimeMS(time): string {
  if (!time || typeof time !== 'number') {
    return '00:00'
  }

  const seconds = Math.floor((time / 1000))
  let m: number | string = Math.floor(seconds / 60)
  let s: number | string = Math.floor(seconds % 60)
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return m + ':' + s
}

/**
 * @description: 处理音乐时长的时间(秒)
 * @param {*} time
 * @return {*}
 */
export function handleMusicTimeSeconds(time): string {
  if (!time || typeof time !== 'number') {
    return '00:00'
  }

  let m: number | string = Math.floor(time / 60)
  let s: number | string = Math.floor(time % 60)
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return m + ':' + s
}
