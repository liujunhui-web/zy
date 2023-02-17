import {
  get,
  post,
  binary, // post 上传文件 (二进制文件)
  form, // post 表单
  temp, // 临时post 拼接URL
  put, // 上传文件
  download // 下载文件
} from '@/http/interceptor'
const root = process.env.NODE_ENV === 'production' ? 'https://dingbutler.365hy.com:8093/xsga-merge/merge' : '/api'

// 用于定义按钮控制的url - 业务模块
const apiUrl = {
  login: root + '/login',
  selByName: root + '/selByName',
  selHouse: root + '/selHouse',
  mergeHouse: root + '/mergeHouse',
  selHouseRoom: root + '/selHouseRoom',
  mergeHouseRoom: root + '/mergeHouseRoom',
  delOwner: root + '/delOwner',
  selPeople: root + '/selPeople',
  selAllPostdocs: root + '/selAllPostdocs',
  selPostdocs: root + '/selPostdocs',
  mergePostdocs: root + '/mergePostdocs',
  delPostdocs: root + '/delPostdocs',
  selUserLogin: root + '/selUserLogin',
  delUserLogin: root + '/delUserLogin',
  updAddress: root + '/updAddress',
  delHouse: root + '/delHouse',
  addHouserRsident: root + '/addHouserRsident',
  selHouseOwnerStatistics: root + '/selHouseOwnerStatistics',
  selResidentStatistics: root + '/selResidentStatistics',
  selDeclareStatistics: root + '/selDeclareStatistics',
  mergeAllHouseRoom: root + '/mergeAllHouseRoom',
  selResidenceCardStatistics: root + '/selResidenceCardStatistics'
}

export default {
  /* demo -- start */
  // 调用方式1（推荐使用）  this.$apis.demoGet({id: 1, sex: 2})
  // 调用方式1 不需要逐个import api必须统一写在这份文件内统一管理
  demoGet: get('/api/isDemo/getApi'),
  demoPost: post('/apiisDemo/postApi'),
  demoBinary: binary('isDemo/binaryApi'),
  demoForm: form('isDemo/formApi'),
  demoTemp: temp('isDemo/tempApi'),
  demoPut: put('isDemo/tempApi'),
  demoDownload: download('isDemo/tempApi'),
  /* demo -- end */

  apiUrl,
  /* 登录 */
  login: post(apiUrl.login),
  /* 查询房东 */
  selByName: post(apiUrl.selByName),
  /* 查询房屋 */
  selHouse: post(apiUrl.selHouse),
  /* 合并房屋 */
  mergeHouse: post(apiUrl.mergeHouse),
  /* 查询房间 */
  selHouseRoom: post(apiUrl.selHouseRoom),
  /* 合并房间 */
  mergeHouseRoom: post(apiUrl.mergeHouseRoom),
  /* 删除已合并房东 */
  delOwner: post(apiUrl.delOwner),
  /* 查询居住人 */
  selPeople: post(apiUrl.selPeople),
  // 重复居住人列表
  selAllPostdocs: post(apiUrl.selAllPostdocs),
  // 重复居住人
  selPostdocs: post(apiUrl.selPostdocs),
  // 居住人合并
  mergePostdocs: post(apiUrl.mergePostdocs),
  // 合并完成
  delPostdocs: post(apiUrl.delPostdocs),
  // 查询当天登录用户
  selUserLogin: post(apiUrl.selUserLogin),
  // 删除活跃
  delUserLogin: post(apiUrl.delUserLogin),
  // 修改地址
  updAddress: post(apiUrl.updAddress),
  // 删除房屋
  delHouse: post(apiUrl.delHouse),
  // 重新申报
  addHouserRsident: post(apiUrl.addHouserRsident),
  // 房东统计
  selHouseOwnerStatistics: post(apiUrl.selHouseOwnerStatistics),
  // 居住人统计
  selResidentStatistics: post(apiUrl.selResidentStatistics),
  // 申报统计
  selDeclareStatistics: post(apiUrl.selDeclareStatistics),
  // 房间去重
  mergeAllHouseRoom: post(apiUrl.mergeAllHouseRoom),
  // 居住凭证统计
  selResidenceCardStatistics: post(apiUrl.selResidenceCardStatistics)
}
