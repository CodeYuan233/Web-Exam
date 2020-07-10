<template>
  <div class="useradd">
    <template>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增用户</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="useraddform">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px"
                 style="width:70%;margin:50px auto;">
          <el-form-item label="角色">

            <el-select v-model="form.role_id"
                       placeholder="无"
                       style="
                       width:100%">
              <el-option label="无"
                         value="0"
                         disabled></el-option>
              <!-- 循环渲染权限列表 -->
              <template v-for="item in roles">
                <el-option :label="item.rolename"
                           :value="item.id"
                           :key="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名"
                        prop="title">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop='username'>
            <el-input v-model="form.password"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item style="text-align:right;">
            <el-button type="primary"
                       @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import Http from '@/ajax/http.js'
export default {
  methods: {
    getRoleList() {
      Http.role_alllist()
        .then(rst => {
          this.roles = rst.data.result
          // 新增的时候初始化下拉列表的默认选中项目，默认为角色列表的第一个数据
          
          if (this.form.role == '0') {
            this.form.role = rst.result[0].id
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateuser() {
      let param = {
        id: this.id,
        ...this.form
      }
      Http.user_upd(param)
        .then(rst => {
          console.log(this.param)
          this.$message({
            message: rst.data.reason,
            type: 'success'
          })
          this.$router.go(-1)
        })
        .catch(err => {
          this.$message.error('错了哦，这是一条错误消息')
          console.log(err)
        })
    },
    // 提交表单
    adduser() {
      Http.user_add(this.form)
        .then(rst => {
          // element-ui 的Message消息提示
          if (this.form.id == '') {
            this.$message('请选择一个角色')
          } else {
            console.log(rst)
            this.$message({
              message: rst.data.reason,
              type: 'success'
            })
            this.$router.go(-1)
          }
        })
        .catch(err => {
          this.$message.error('错了哦，这是一条错误消息')
          console.log(err)
        })
    },
    // 验证表单
    onSubmit() {
      this.$refs['form'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          // 判断id如果为空则当前提交为新增
          if (this.id == '') {
            this.adduser(this.form)
          } else {
            //   如果id不为空，则当前提交为修改
            this.updateuser()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  data() {
    return {
      roles: [],
      form: {
        role_id: '0', //用户的角色id
        username: '', //用户名
        password: '' //用户密码
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          {
            type: 'String',
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      id: ''
    }
  },
  created() {
    //   初始化上级权限下拉框
    this.getRoleList()
  },
  mounted() {
    //   this.$route.params传递的是update更新的数据
    let {
      id = '',
      role_id = '0',
      password = '',
      username = ''
    } = this.$route.params

    this.form.password = password
    this.form.username = username
    // pid表示当前节点的父节点_id
    this.form.role_id = role_id
    this.id = id
    console.log(this.form)
    // console.log(this.selectData)
  }
}
</script>
<style lang="less">
.useradd {
  .breadcrumb {
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>