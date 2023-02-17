import moment from 'moment'
/**
 * 默认函数
 */
export function onSuccess (resolve, result) {
  resolve(result)
}

export function onFail (reject, url, parmas, err) {
  reject(err)
}
/**
   *
   * @param {Number} value  权限数字
   */
export function cantUse (value) {
  if (!value) return false
  const permissionList = session.getSession('permissionList') || []
  return !permissionList.includes(value)
  //   return false
}

// SessionStorage
export const session = {
  getSession (key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  setSession (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  destroy (key) {
    sessionStorage.removeItem(key)
  }
}

// LocalStorage
export const localSession = {
  getLocal (key) {
    return JSON.parse(localStorage.getItem(key))
  },

  setLocal (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  destroy (key) {
    localStorage.removeItem(key)
  }
}
// 判断数据类型
export function isString (string) {
  return typeof (typeof string === 'string') && string.constructor === String
}

// 时间格式化
export const dateFormat = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  return time ? moment(time).format(format) : ''
}
