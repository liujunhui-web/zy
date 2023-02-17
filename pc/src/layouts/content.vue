/*
* 布局【主体内容】
*/

<template>
  <a-layout-content>
    <router-view class="layouts-content-wrap overflow-y-auto" style="height:calc(100vh - 211px)" />
  </a-layout-content>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>
