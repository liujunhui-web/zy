import Vue from 'vue'
import Vuex from 'vuex'
import demo from './modules/demo.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}, // 用户信息
    landlordInfo: {},
    houseInfo: {},
    roomInfo: {}
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
    },
    setLandlordInfo (state, payload) {
      state.landlordInfo = payload
    },
    setHouseInfo (state, payload) {
      state.houseInfo = payload
    },
    setRoomInfo (state, payload) {
      state.roomInfo = payload
    }
  },
  actions: {
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo
    },
    getLandlordInfo: state => {
      return state.landlordInfo
    },
    getHouseInfo: state => {
      return state.houseInfo
    },
    getRoomInfo: state => {
      return state.roomInfo
    }
  },
  modules: {
    demo
  }
})
