
import router from './router'
import { session } from '@/utils'

router.beforeEach(async (to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) { document.title = to.meta.title }

  // meta.exemptLogin = true 的路由白名单的页面不走登录拦截
  if (to.meta ?.exemptLogin) {
    next()
    return
  }
  if (session.getSession('token')) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // const redirect = decodeURIComponent(from.query.redirect || to.path)
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
