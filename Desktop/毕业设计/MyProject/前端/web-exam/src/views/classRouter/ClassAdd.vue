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
                 label-width="90px"
                 style="width:70%;margin:50px auto;">
          <el-form-item label="所属老师">

            <el-select v-model="form.teacher_id"
                       placeholder="无"
                       style="
                       width:100%"
                       filterable>
              <el-option label="无"
                         value="0"
                         disabled></el-option>
              <!-- 循环渲染权限列表 -->
              <template v-for="item in teachers">
                <el-option :label="item.username"
                           :value="item.id"
                           :key="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="班级名"
                        prop="classname">
            <el-input v-model="form.classname"></el-input>
          </el-form-item>
          <el-form-item label="班级介绍"
                        prop="class_info">
            <el-input v-model="form.class_info"></el-input>
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
    getUserList() {
      Http.user_alllist()
        .then(rst => {
          this.teachers = rst.data.result
          // 新增的时候初始化下拉列表的默认选中项目，默认为列表的第一个数据
          //   if (this.form.role == '0') {
          //     this.form.role = rst.result[0].id
          //   }
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
      Http.class_upd(param)
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
    addclass() {
      if (this.form.teacher_id == 0) {
        this.$message('请选择一个所属老师')
      } else {
        Http.class_add(this.form)
          .then(rst => {
            // element-ui 的Message消息提示
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
      }
    },

    // 验证表单
    onSubmit() {
      this.$refs['form'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          // 判断id如果为空则当前提交为新增
          if (this.id == '') {
            console.log(this.form)
            this.addclass(this.form)
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
      teachers: [],
      form: {
        teacher_id: '0', //班级所属的老师id
        classname: '', //班级名
        class_info: ''
      },
      rules: {
        classname: [
          { required: true, message: '请输入班级名称', trigger: 'blur' }
        ],
        class_info: [
          { required: true, message: '请输入班级信息', trigger: 'blur' }
        ]
      },
      id: ''
    }
  },
  created() {
    //   初始化用户下拉框
    this.getUserList()
  },
  mounted() {
    //   this.$route.params传递的是update更新的数据

    let {
      id = '',
      teacher_id = '0',
      classname = '',
      class_info = ''
    } = this.$route.params

    this.form.classname = classname
    // pid表示当前节点的父节点_id
    this.form.teacher_id = teacher_id
    this.form.class_info = class_info
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