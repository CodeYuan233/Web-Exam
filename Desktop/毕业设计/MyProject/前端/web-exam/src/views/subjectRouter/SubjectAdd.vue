<template>
  <div class="subadd">
    <template>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/subject' }">题库管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增题目</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <template>
      <el-tabs v-model="activeName"
               type="card"
               @tab-click="typeChange"
               :before-leave='checktab'>
        <el-tab-pane label="选择题"
                     name="选择题">
          <template>
            <div class="useraddform">
              <el-form ref="form"
                       :model="form"
                       :rules="rules"
                       label-width="90px"
                       style="width:70%;margin:50px auto;">

                <el-form-item label="题目描述"
                              prop="subject_stem">
                  <el-input v-model="form.subject_stem"></el-input>
                </el-form-item>
                <el-form-item label="选项A"
                              prop="selectionA">
                  <el-input v-model="form.selectionA"></el-input>
                </el-form-item>
                <el-form-item label="选项B"
                              prop="selectionB">
                  <el-input v-model="form.selectionB"></el-input>
                </el-form-item>
                <el-form-item label="选项C"
                              prop="selectionC">
                  <el-input v-model="form.selectionC"></el-input>
                </el-form-item>
                <el-form-item label="选项D"
                              prop="selectionD">
                  <el-input v-model="form.selectionD"></el-input>
                </el-form-item>
                <el-form-item label="答案"
                              prop="answer">
                  <div>
                    <el-checkbox-group v-model="form.answer">
                      <el-checkbox v-for="select in selections"
                                   :label="select"
                                   :key="select">{{select}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-form-item>
                <el-form-item label="答案解析"
                              prop="subject_info">
                  <el-input v-model="form.subject_info"></el-input>
                </el-form-item>
                <el-form-item label="分值"
                              prop="score">
                  <el-input type="number"
                            v-model="form.score"></el-input>
                </el-form-item>

                <el-form-item style="text-align:right;">
                  <el-button type="primary"
                             @click="onSubmit">确认提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="判断题"
                     name="判断题"> <template>
            <div class="useraddform">
              <el-form ref="form2"
                       :model="form2"
                       :rules="rules2"
                       label-width="90px"
                       style="width:70%;margin:50px auto;">

                <el-form-item label="题目描述"
                              prop="subject_stem">
                  <el-input v-model="form2.subject_stem"></el-input>
                </el-form-item>

                <el-form-item label="答案"
                              prop="answer">
                  <div>
                    <el-radio-group v-model="form2.answer">
                      <el-radio label="正确">正确</el-radio>
                      <el-radio label="错误">错误</el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
                <el-form-item label="答案解析"
                              prop="subject_info">
                  <el-input v-model="form2.subject_info"></el-input>
                </el-form-item>
                <el-form-item label="分值"
                              prop="score">
                  <el-input type="number"
                            v-model="form2.score"></el-input>
                </el-form-item>

                <el-form-item style="text-align:right;">
                  <el-button type="primary"
                             @click="onSubmit2">确认提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </template></el-tab-pane>
        <el-tab-pane label="填空题"
                     name="填空题">
          <template>
            <div class="fillsubject">
              <el-form ref="form3"
                       :model="form3"
                       :rules="rules3"
                       label-width="90px"
                       style="width:70%;margin:50px auto;">

                <el-form-item label="题目描述"
                              prop="subject_stem">
                  <el-input v-model="form3.subject_stem"></el-input>
                </el-form-item>

                <el-form-item label="答案"
                              prop="answer">
                  <el-input v-model="form3.answer"></el-input>
                </el-form-item>
                <el-form-item label="答案解析"
                              prop="subject_info">
                  <el-input v-model="form3.subject_info"></el-input>
                </el-form-item>
                <el-form-item label="分值"
                              prop="score">
                  <el-input type="number"
                            v-model="form3.score"></el-input>
                </el-form-item>

                <el-form-item style="text-align:right;">
                  <el-button type="primary"
                             @click="onSubmit3">确认提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </template>

  </div>
</template>
<script>
import Http from '@/ajax/http.js'
export default {
  methods: {
    
    updateselsubject() {
      let param = {
        id: this.id,
        ...this.form
      }
      console.log(param)
      Http.selsubject_update(param)
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
    addselsubject() {
      Http.selsubject_add(this.form)
        .then(rst => {
          console.log(rst)
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
    updatejudgesubject() {
      let param = {
        id: this.id,
        ...this.form2
      }
      Http.judgesubject_update(param)
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
    addjudgesubject() {
      Http.judgesubject_add(this.form2)
        .then(rst => {
          console.log(rst)
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
    updatefillesubject() {
      let param = {
        id: this.id,
        ...this.form3
      }
      Http.fillsubject_update(param)
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
    addfillsubject() {
      Http.fillsubject_add(this.form3)
        .then(rst => {
          console.log(rst)
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
    //切换tab 更改类型
    typeChange(val) {
      this.form.type = val.name
      this.form2.type = val.name
      this.form3.type = val.name
    },
    //更新时禁止 跳转
    checktab() {
      

      if (this.id != '') {
        return false
      }
    },
    // 验证表单
    onSubmit2() {
      this.$refs['form2'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          // 判断id如果为空则当前提交为新增
          if (this.id == '') {
            console.log(this.form2)
            this.addjudgesubject(this.form2)
          } else {
            //   如果id不为空，则当前提交为修改
            this.updatejudgesubject()
          }
        } else {
          this.$message.error('请完善表单内容后提交！')
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmit() {
      this.$refs['form'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          // 判断id如果为空则当前提交为新增
          if (this.id == '') {
            this.form.type = this.type
            console.log(this.form)
            this.addselsubject(this.form)
          } else {
            //   如果id不为空，则当前提交为修改
            this.updateselsubject()
          }
        } else {
          this.$message.error('请完善表单内容后提交！')
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmit3() {
      this.$refs['form3'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          // 判断id如果为空则当前提交为新增
          if (this.id == '') {
            this.addfillsubject(this.form3)
          } else {
            //   如果id不为空，则当前提交为修改
            this.updatefillesubject()
          }
        } else {
          this.$message.error('请完善表单内容后提交！')
          console.log('error submit!!')
          return false
        }
      })
    },
    //数据初始化
    reData() {
      if (this.$route.params.type == '选择题') {
        let {
          id = '',
          subject_stem = '',
          selectionA = '',
          selectionB = '',
          selectionC = '',
          selectionD = '',
          subject_info = '',
          answer = [],
          score = '',
          type = ''
        } = this.$route.params

        this.form.subject_stem = subject_stem
        this.form.selectionA = selectionA
        this.form.selectionB = selectionB
        this.form.selectionC = selectionC
        this.form.selectionD = selectionD
        this.form.subject_info = subject_info
        this.form.answer = answer.split(',')
        this.form.score = score
        this.form.type = type
        this.id = id
      } else if (this.$route.params.type == '判断题') {
        let {
          id = '',
          subject_stem = '',
          subject_info = '',
          answer = '',
          score = '',
          type = ''
        } = this.$route.params
       
        this.form2.subject_stem = subject_stem
        this.form2.subject_info = subject_info
        this.form2.answer = answer
        this.form2.score = score
        this.form2.type = type
        this.id = id
      } else if (this.$route.params.type == '填空题') {
        let {
          id = '',
          subject_stem = '',
          subject_info = '',
          answer = '',
          score = '',
          type = ''
        } = this.$route.params
        this.form3.subject_stem = subject_stem
        this.form3.subject_info = subject_info
        this.form3.answer = answer.split(',').toString()
        this.form3.score = score
        this.form3.type = type
        this.id = id
      }
    }
  },
  data() {
    return {
      selections: ['A', 'B', 'C', 'D'],
      type: '选择题',

      //选择题表单数据
      form: {
        subject_stem: '',
        selectionA: '',
        selectionB: '',
        selectionC: '',
        selectionD: '',
        subject_info: '',
        answer: [],
        score: '',
        type: this.type
      },
      //判断题
      form2: {
        subject_stem: '',
        subject_info: '',
        answer: [],
        score: '',
        type: this.type
      },
      //填空题表单
      form3: {
        subject_stem: '',
        subject_info: '',
        answer: '',
        score: '',
        type: this.type
      },
      //表单验证规则
      rules: {
        subject_stem: [
          { required: true, message: '请输入题目题干', trigger: 'blur' }
        ],
        selectionA: [
          { required: true, message: '请输入选项', trigger: 'blur' }
        ],
        selectionB: [
          { required: true, message: '请输入选项', trigger: 'blur' }
        ],
        selectionC: [
          { required: true, message: '请输入选项', trigger: 'blur' }
        ],
        selectionD: [
          { required: true, message: '请输入选项', trigger: 'blur' }
        ],
        answer: [{ required: true, message: '请输入答案', trigger: 'blur' }],
        subject_info: [
          { required: true, message: '请输入试题解析', trigger: 'blur' }
        ]
      },
      rules2: {
        subject_stem: [
          { required: true, message: '请输入题目题干', trigger: 'blur' }
        ],
        answer: [{ required: true, message: '请输入答案', trigger: 'blur' }],
        subject_info: [
          { required: true, message: '请输入试题解析', trigger: 'blur' }
        ]
      },
      rules3: {
        subject_stem: [
          { required: true, message: '请输入题目题干', trigger: 'blur' }
        ],
        answer: [{ required: true, message: '请输入答案', trigger: 'blur' }],
        subject_info: [
          { required: true, message: '请输入试题解析', trigger: 'blur' }
        ]
      },
      id: '',
      activeName: '选择题'
    }
  },
  created() {
    //   选中对应标签页
    let{type} =this.$route.params
    this.activeName = type
    console.log(type)
  },
  mounted() {
    //   this.$route.params传递的是update更新的数据
    if(this.$route.params.answer){
        this.reData()
    }
    
    
  }
}
</script>
<style lang="less">
.subadd {
  background-color: #fff;
  width: 60%;
  min-width: 500px;
  .breadcrumb {
    height: 50px;
    display: flex;
    align-items: center;
  }
  .el-tabs__item.is-active {
    background-color: #fff;
  }
}
</style>