<template>
  <div class="home-page">
    <div class="sparate" />
    <div class="img1"><img src="../../assets/image/home1.png"></div>
    <div class="sparate" />
    <div class="img2"><img src="../../assets/image/home2.png"></div>
    <div class="sparate" />
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style  lang="less" scoped>
.home-page {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  height: calc(100vh - 64px);
  .sparate,
  .img1,
  .img2 {
    flex: none;
  }
  .sparate {
    width: 9.6%;
  }
  .img1 {
    width: 31.2%;
  }
  .img2 {
    width: 40%;
  }
  .img1,
  .img2 {
    img {
      width: 100%;
    }
  }
}
</style>
