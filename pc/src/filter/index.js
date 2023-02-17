import Vue from 'vue'

/* 格式化金额 */
export const moneyFormat = (money) => {
  return money ? `${(money / 100).toFixed(2)}` : ''
}

Vue.filter('moneyFormat', moneyFormat)

/* 格式化时间 */
export const dateFormat = (time, format = 'YYYY-MM-DD hh:mm:ss') => {
  return time ? moment(time).format(format) : ''
}

Vue.filter('dateFormat', dateFormat)
