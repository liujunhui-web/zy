<template>
  <section class="page-login-wrap">
    <img
      src="@/assets/image/background.svg"
      class="w-100p h-100p position-absolute t-0 l-0 z-index-1"
      alt=""
    >
    <div class="w-100p display-flex flex-column align-items-center  position-absolute z-index-9">
      <h3 class="fs-24 fw-bold" />
      <span class="c-999">由于刚到上海，接了一份一周的兼职工作。原本计划17号下午请假完成这次的面试题，但是今天我堂哥家里有急事，我需要帮忙，所以项目可能完不成。找到一个之前废弃的小项目，结构差不多，如果贵司觉得能合格可以联系我，谢谢!</span>
      <a-input
        v-model="userName"
        class="m-t-36 w-300 h-36"
        placeholder="请输入用户名"
      >
        <a-icon
          slot="prefix"
          type="text"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
      <a-input
        v-model="passWord"
        class="m-t-24 w-300 h-36"
        placeholder="请输入密码"
        type="password"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
      <a-button
        class="m-t-24 bg-0089FF c-fff w-300 h-36"
        @click="submit"
      >
        输入任意字符登录
      </a-button>
    </div>
  </section>
</template>
<script>
import { session } from '@/utils'
export default {
  data () {
    return {
      userName: '',
      passWord: ''
    }
  },
  mounted () {

  },
  methods: {
    submit () {
      const { userName, passWord } = this
      console.log(userName, passWord)
      if (userName && passWord) {
        session.setSession('token', '123')
        this.$router.push({
          name: 'activeLandlord'
        })
        /*
        this.$apis.login({
          userName,
          passWord
        }).then(res => {
          console.log(res)
          if (res.code === 0) {
            session.setSession('token', '123')
            // session.setSession('createUserId', res.data.id)
            this.$router.push({
              name: 'activeLandlord'
            })
            this.$message.success('登录成功!')
          } else {
            this.$message.error(res.msg)
          }
        }) */
      } else {
        this.$message.error('账号或密码不能为空!')
      }
    }
  }
}
</script>

<style scoped lang="less">
.page-login-wrap {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  text-align: center;
  background-color: #fff;
}
.c-999 {
  color: #999;
}
</style>
