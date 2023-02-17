<template>
  <div>
    <a-layout :style="{ minHeight: '100vh' }">
      <!-- 侧边栏 -->
      <LayoutSider :collapsed.sync="collapsed" :route-list="routeList" />
      <a-layout>
        <!-- 顶部 -->
        <LayoutHeader :collapsed.sync="collapsed" />
        <!-- 面包屑 -->
        <div v-if="getBreadName && getBreadName !== '首页'" class="breadcrumb">
          <a-breadcrumb v-if="breadcrumbList.length">
            <a-breadcrumb-item v-for="item of breadcrumbList" :key="item.path">
              {{ item.name }}
            </a-breadcrumb-item>
          </a-breadcrumb>
          <h3 class="fs-20 m-0 m-t-16">{{ getBreadName }}</h3>
        </div>
        <!-- 内容 -->
        <LayoutContent />
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import LayoutSider from '@/layouts/sider'
import LayoutHeader from '@/layouts/header'
import LayoutContent from '@/layouts/content'

export default {
  name: 'App',
  components: {
    LayoutSider,
    LayoutHeader,
    LayoutContent
  },
  data () {
    return {
      getBreadName: '',
      collapsed: false,
      routeList: this.$router.options.routes,
      breadcrumbList: []
    }
  },
  watch: {
    $route (to, from) {
      this.getBreadcrumbList()
      this.getBreadName = this.$router?.history?.current?.meta?.title
    }
  },
  mounted () {
    this.getBreadcrumbList()
    this.getBreadName = this.$router?.history?.current?.meta?.title
  },
  methods: {
    // 获取面包屑数据
    getBreadcrumbList () {
      const arr = []
      const list = this.$route?.matched?.filter((item) => {
        return item?.name !== '/'
      })

      list.forEach((item) => {
        arr.push({
          path: item.path,
          name: item?.meta?.title ?? ''
        })
      })

      this.breadcrumbList = arr
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-layout-sider {
  box-shadow:0px 0px 24px 0px rgba(0,0,48,0.04);
}

/deep/ .ant-layout-sider-children {
  height: 0;
}

.breadcrumb {
  background: #fff;
  padding: 16px 32px;
  color:rgba(0,0,0,0.85);
}
</style>
