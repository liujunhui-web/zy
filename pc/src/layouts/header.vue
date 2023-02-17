/*
* 布局【顶部】
*/

<template>
  <a-layout-header class="layout-header-wrap" style="color:#fff; background: #2a3139; padding: 0;box-shadow:0px 1px 4px 0px rgba(0,21,41,0.12);z-index: 99;">
    <a-row
      type="flex"
      justify="start"
      align="top"
      class="p-l-16"
    >
      <!-- <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="changeCollapsed"
      /> -->
      <div class="user m-l-16">
        <img :src="userImgSrcState || avatar">
        <span class="m-l-8">
          <!-- {{ userNameState }} -->
          首页
        </span>
      </div>
      <div class="user m-l-16">
        <img :src="userImgSrcState || avatar">
        <span class="m-l-8">
          <!-- {{ userNameState }} -->
          主数据
        </span>
      </div>
      <div class="user m-l-16">
        <img :src="userImgSrcState || avatar">
        <span class="m-l-8">
          <!-- {{ userNameState }} -->
          辖区管理
        </span>
      </div>
      <div class="user m-l-16">
        <img :src="userImgSrcState || avatar">
        <span class="m-l-8">
          <!-- {{ userNameState }} -->
          消讯通
        </span>
      </div>
    </a-row>
  </a-layout-header>
</template>

<script>
import { mapState } from 'vuex'
import { session } from '@/utils/index'
import avatar from '@/assets/image/avatar.png'

export default {
  name: 'LayoutHeader',
  props: {
    collapsed: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      avatar
    }
  },
  computed: {
    ...mapState({
      userNameState: state => state.userInfo?.username || session.getSession('userInfo')?.username,
      userImgSrcState: state => state.userInfo?.avatar || session.getSession('userInfo')?.avatar
    })
  },
  methods: {
    changeCollapsed () {
      this.$emit('update:collapsed', !this.collapsed)
    }
  }
}
</script>

<style scoped lang="less">
.layout-header-wrap {
  background: #fff;
  padding: 0;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
}

.user {
   cursor:pointer;
  text-align: center;
  padding-right: 24px;
  img, span {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0 0 2px #d4d4d4;
  }
}
</style>
