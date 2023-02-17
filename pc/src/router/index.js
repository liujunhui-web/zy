import Vue from 'vue'
import VueRouter from 'vue-router'
import Layouts from '@/layouts/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: Layouts,
    redirect: {
      path: '/home/index',
      name: 'homeIndex',
      exemptLogin: true
    }
  },
  {
    path: '/landlord',
    name: 'landlord',
    meta: {
      title: '房东管理'
    },
    component: Layouts,
    redirect: {
      name: 'activeLandlord'
    },
    children: [{
      path: '/landlord/landlordManage',
      name: 'landlordManage',
      meta: {
        title: '个人房东'
      },
      component: () => import('@/views/landlordManage/landlordManage')
    },
    {
      path: '/landlord/companyLandlord',
      name: 'companyLandlord',
      meta: {
        title: '企业房东'
      },
      component: () => import('@/views/landlordManage/companyLandlord')
    }, {
      path: '/landlord/activeLandlord',
      name: 'activeLandlord',
      meta: {
        title: '活跃房东'
      },
      component: () => import('@/views/landlordManage/activeLandlord')
    },
    {
      path: '/landlord/mergedLandlord',
      name: 'mergedLandlord',
      meta: {
        title: '已合并房东'
      },
      component: () => import('@/views/landlordManage/mergedLandlord')
    }
    ]
  },
  {
    path: '/resident',
    name: 'resident',
    meta: {
      title: '居住人管理'
    },
    component: Layouts,
    redirect: {
      name: 'residentManage'
    },
    children: [{
      path: '/resident/residentManage',
      name: 'residentManage',
      meta: {
        title: '居住人'
      },
      component: () => import('@/views/residentManage/residentManage')
    }]
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {
      title: '统计'
    },
    component: Layouts,
    redirect: {
      name: 'landlordStatistics'
    },
    children: [{
      path: '/statistics/landlordStatistics',
      name: 'landlordStatistics',
      meta: {
        title: '房东活跃度'
      },
      component: () => import('@/views/statistics/landlord/landlordStatistics')
    },
    {
      path: '/statistics/residentStatistics',
      name: 'residentStatistics',
      meta: {
        title: '居住人活跃度'
      },
      component: () => import('@/views/statistics/resident/residentStatistics')
    },
    {
      path: '/statistics/residentReportStatistics',
      name: 'residentReportStatistics',
      meta: {
        title: '居住人申报'
      },
      component: () => import('@/views/statistics/resident/residentReportStatistics')
    },
    {
      path: '/statistics/eCard',
      name: 'residentECard',
      meta: {
        title: '在萧居住登记凭证'
      },
      component: () => import('@/views/statistics/eCard/eCard')
    }]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/index')
  },
  {
    path: '*',
    redirect: {
      name: 'activeLandlord'
    }
  }
]

const router = new VueRouter({
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes
})

export default router
