<template>
  <div class="registback">

    <el-form ref="registForm"
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
      <el-form-item label="姓名"
                    prop="nickname">
        <el-input type="text"
                  placeholder="请输入姓名"
                  v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input type="email"
                  placeholder="请输入邮箱"
                  v-model="form.email" />
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  placeholder="请输入密码"
                  v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   v-on:click="onSubmit('registForm')"
                   style="width:100%">立即注册</el-button>
      </el-form-item>
      <div class="gotoLogin"
           @click="gotoLogin">
        已有帐号？点击登陆
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
     var validateEmail = (rule,value,callback)=>{
         const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
          if(mailReg.test((value))){
              callback()
          }
          else{
              callback(new Error('请输入正确的邮箱格式'))
          }
      }
     var validateUsername = (rule,value,callback)=>{
         const nameReg = /^[a-zA-Z0-9_-]+/
          if(nameReg.test((value))){
              callback()
          }
          else{
              callback(new Error('用户名只能以字母，数字，下划线，减号组成'))
          }
      }
    return {
      form: {
        username: '',
        password: '',
        email: '',
        nickname: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' },
          { min: 3, max: 12, message: '账号长度在3-12个字符之间' },
           {validator:validateUsername,trigger:'blur'}
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ],
        email: [{ required: true, message: '邮箱不可为空', trigger: 'blur' },
        {validator:validateEmail,trigger:'blur'}],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    gotoLogin() {
      console.log(1)
      this.$router.push({ name: 'Login' })
    },
    Regist() {
      //存储一个student标识，用于通过后台登陆拦截
      Vue.localStorage.set('student', 'student')
      Http.user_regist(this.form.username)
        .then(rst => {
          console.log(rst)
          if (rst.data.result.length > 0) {
            this.$message.error('用户名已存在！')
          } else {
            Http.student_add(this.form)
              .then(rst => {
                if (rst.data.error_code == 0) {
                  this.$message.success('注册成功！已为您跳转到登录页！')
                  this.$router.push({ name: 'Login' })
                }
              })
              .catch(err => {
                console.log(err)
              })
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
          this.Regist()
        } else {
          this.$message.error('请输入正确格式的信息')
          return false
        }
      })
    }
  },
  mounted() {
       
  }
}
</script>

<style lang="less" scoped>
.gotoLogin {
  text-align: right;
  color: cornflowerblue;
  cursor: pointer;
}
.registback {
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
  color: #409eff;
}
</style>  