/*
* 布局【侧边栏】
*/

<template>
  <a-layout-sider
    v-model="collapsed"
    :trigger="null"
    collapsible
    :style="{background: '#2a3139'}"
  >
    <div class="logo">
      <!-- <span v-show="!collapsed" class="fs-18">上海正也医药有限公司</span> -->
      <span class="fs-18 c-fff">上海正也医药有限公司</span>
    </div>
    <a-menu
      theme="light"
      mode="inline"
      :default-open-keys="openKeys"
      :default-selected-keys="selectedKeys"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <template v-for="item in sliderList">
        <a-menu-item v-if="!item.children" :key="item.route">
          <router-link :to="item.route" tag="div">
            <!-- <i class="iconfont p-r-13" :class="item.icon" /> -->
            <a-icon v-if="item.icon" class="p-r-8" :type="item.icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </a-menu-item>
        <sub-menu v-else :key="item.route" :menu-info="item" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>

import { session } from '@/utils'
import { Menu } from 'ant-design-vue'
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.route" v-bind="$props" v-on="$listeners">
         <span slot="title">
        
          <a-icon class="p-l-2" :type="menuInfo.icon" />
          <span>{{ menuInfo.name }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.route">
            <router-link :to="item.route" tag="div">
              <span class="p-l-8">{{ item.name }}</span>
            </router-link>
          </a-menu-item>
          <sub-menu v-else :key="item.route" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
}

export default {
  name: 'LayoutSider',
  components: {
    'sub-menu': SubMenu
  },
  props: {
    routeList: {
      type: Array,
      default: () => []
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sliderList: [
        {
          children: [
            {
              name: '活跃房东',
              route: '/landlord/activeLandlord'
            },
            {
              name: '已合并房东',
              route: '/landlord/mergedLandlord'

            },
            {
              name: '个人房东',
              route: '/landlord/landlordManage'
            },
            {
              name: '企业房东',
              route: '/landlord/companyLandlord'
            }
          ],
          icon: 'home',
          name: '房东管理',
          route: '/landlord/houseManage'
        },
        {
          children: [
            {
              name: '居住人',
              route: '/resident/residentManage'
            }
          ],
          icon: 'user',
          name: '居住人管理',
          route: '/resident/residentManage'
        }, {
          children: [
            {
              name: '房东活跃度',
              route: '/statistics/landlordStatistics'
            },
            {
              name: '居住人活跃度',
              route: '/statistics/residentStatistics'
            },
            {
              name: '居住人申报',
              route: '/statistics/residentReportStatistics'
            },
            {
              name: '在萧居住登记凭证',
              route: '/statistics/eCard'
            }
          ],
          icon: 'line-chart',
          name: '统计',
          route: '/statistics/landlordStatistics'
        }
      ]
    }
  },
  computed: {

    // 侧边栏选择值
    selectedKeys () {
      const path = this.$route.path.split('/')
      console.log(path)
      return [`/${path[1]}`]
    },

    // 侧边栏下拉打开值
    openKeys () {
      const path = this.$route.path.split('/')
      return [`/${path[1]}`]
    }
  },
  created () {
    // console.log(this.$route.path)
    // this.getSliderList()
  },

  methods: {
    async getSliderList () {
      const { menus, buttons } = await this.$apis.getResource()
      this.sliderList = Object.assign([], menus)
      const butStrs = buttons && buttons.map(x => x.route)
      session.setSession('permissionList', butStrs)
      if (!this.sliderList.length) this.$router.replace({ path: '/noPermission' })
    }
  }
}
</script>

<style scoped lang="less">
.slider-mode {
  display: inline-block;
  vertical-align: middle;
}

.selected {
  color: #1890ff !important;
}

.logo {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2a3139;
  img {
    height: 100%;
  }
}

.icon {
  color: inherit;
  display: inline-block;
  vertical-align: middle;
}

.text {
  color: inherit;
  display: inline-block;
  vertical-align: middle;
}
</style>

<style lang="less" >
.ant-menu-submenu-title {
  color:#fff;
  .iconfont {
    transition: font-size 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
      margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .iconfont + span {
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    opacity: 1;
  }
}
.ant-menu-inline-collapsed .ant-menu-submenu-title {
  .iconfont {
    font-size: 16px;
    line-height: 40px;
    margin: 0;
  }
  .iconfont + span {
    max-width: 0;
    display: inline-block;
    opacity: 0;
  }
}
.ant-menu-inline-collapsed .ant-menu-item {
  .iconfont {
    font-size: 16px;
    line-height: 40px;
  color:#fff;
    margin: 0;
  }
  .iconfont + span {
    max-width: 0;
    display: inline-block;
    opacity: 0;
  }
}

</style>
