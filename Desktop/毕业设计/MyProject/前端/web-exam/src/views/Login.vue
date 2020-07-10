<template>
  <div class="loginback">

    <el-form ref="loginForm"
             :model="form"
             :rules="rules"
             label-width="80px"
             class="login-box">
      <h2 class="login-title">优学云<span style="color:black;font-size:24px"> 在线考试系统</span></h2>
      <el-form-item label="账号"
                    prop="username">
        <el-input type="text"
                  placeholder="请输入账号"
                  v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  placeholder="请输入密码"
                  v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   v-on:click="onSubmit('loginForm')"
                   style="width:100%">登录</el-button>
      </el-form-item>
      <div class="gotoRegist"
           @click="gotoRegist">
        还没有账号？注册一个
      </div>
    </el-form>

  </div>
</template>

<script>
import Http from '@/ajax/http.js'
import Vue from 'vue'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不可为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    gotoRegist() {
      this.$router.push({ name: 'Register' })
    },
    login() {
      Http.user_login(this.form)
        .then(rst => {
          // console.log(rst)
          let { error_code, result } = rst.data
          if (error_code == 0 && result.length > 0) {
            // 存储token，用于后面的所有页面请求
            Vue.localStorage.set('token', result[0].id)
            // 存储username，用于Home页面的右上角显示
            Vue.localStorage.set('username', this.form.username)
            Vue.localStorage.remove('student')
            // 跳转到Home页面
            this.$router.replace({ name: 'Home' })
          } else {
            this.$message.error('用户名或密码错误')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          this.$message.error('请输入正确的用户名和密码')
          return false
        }
      })
    }
  },
  mounted() {
    if (JSON.stringify(this.$route.params) != '{}') {
      console.log('来自请求拦截')
      let { error_code = 0, reason = '' } = this.$route.params.data

      if (error_code != 0) {
        // 删除当前登录的用户
        Vue.localStorage.remove('username')
        // 删除本地token
        Vue.localStorage.remove('token')
        this.$message.error(reason)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.gotoRegist {
  text-align: right;
  color: cornflowerblue;
  cursor: pointer;
}
.loginback {
  overflow: hidden;
  height: 100%;
  background-image: url(../assets/image/backimg.jpg);
  background-size: 100%;
  background-repeat: no-repeat;
}
.login-box {
  border: 1px solid #dcdfe6;
  width: 450px;
  margin: 180px auto;
  background-color: white;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
  font-size: 30px;
  color: #409EFF;
}
</style>  