<template>
  <a-config-provider v-bind="configProvider">
    <div id="app">
      <transition>
        <router-view />
      </transition>
    </div>
  </a-config-provider>
</template>

<script>

import zhCN from 'ant-design-vue/es/locale-provider/zh_CN'
export default {
  name: 'App',
  data () {
    return {
      configProvider: {
        locale: zhCN,
        renderEmpty: () => {
          return <no-data/>
        }
      }
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
