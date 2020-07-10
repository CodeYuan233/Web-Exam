<template>
  <div class="subjectList">
    <div class="subjects">
      <template v-for="(subject,index) in subjectList">
        <el-card class="box-card"
                 :value='subject'
                 :key='index'
                 :id="index">
          <div slot="header"
               class="clearfix">
            <p><b style="font-size:18px;color:#409EFF">{{subject.type}}<span v-if="subject.answer.split(',').length>1">（多选题）</span></b></p>
            <span><b style="font-size:18px">{{index+1}} . </b>{{subject.subject_stem}}</span>
          </div>
          <template v-if="subject.selectionA">
            <div class="text item">
              A：{{subject.selectionA}}
            </div>
            <div class="text item">
              B：{{subject.selectionB}}
            </div>
            <div class="text item">
              C：{{subject.selectionC}}
            </div>
            <div class="text item">
              D：{{subject.selectionD}}
            </div>
            <div class="text item">
              <b style="line-height:30px">作答：</b>
              <el-checkbox-group v-model="exam_record.answer[index]">

                <el-checkbox v-for="select in selections"
                             :label="select"
                             :key="select"
                             border>{{select}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
          <template v-if="subject.type =='判断题'">
            <div class="text item">
              你的答案：
              <el-radio-group v-model="exam_record.answer[index]">
                <el-radio label="正确">正确</el-radio>
                <el-radio label="错误">错误</el-radio>
              </el-radio-group>
            </div>
          </template>
          <template v-if="subject.type =='填空题'">
            <div class="text item">
              你的答案：
              <el-input type="textarea"
                        v-model="exam_record.answer[index]"
                        placeholder="若不止一处填空，请以逗号（，）隔开答案"
                        @blur="showinfo"></el-input>
            </div>
          </template>

        </el-card>

      </template>
    </div>
    <div class="examInfo">
      <div class="showTime">
        {{timeMsg}}
      </div>
      <div class="gotoSubject">
        <template v-for="(subject,index) in subjectList">
          <div :key="index"
               :value='subject'
               :class="{done:(exam_record.answer[index]&&Number(exam_record.answer[index])!=0)}"
               @click="gotoSubject(index)">
            {{index+1}}
          </div>
        </template>
      </div>
      <div class="exam_info">用户名：{{user_info.username}}</div>
      <div class="exam_info">考试名称：{{exam_info.exam_name}}</div>
      <div class="exam_info">考试要求：{{exam_info.exam_info}}</div>
      <div style="overflow:hidden">
        <div class="exam_info onsave"
             @click="onSave">保存</div>
        <div class="exam_info onsubmit"
             @click="onSubmit">提交</div>
      </div>
    </div>
  </div>

</template>
<script>
import Http from '@/ajax/http.js'
import Vue from 'vue'
export default {
  data() {
    return {
      subjectList: [],
      user_info: '',
      exam_info: '',
      exam_id: '',
      score: 0,
      myscore: 0,
      maxtime: 60 * 60,
      timer: '',
      timeMsg: '',
      exam_record: {
        answer: [[]]
      },
      record: {},
      selections: ['A', 'B', 'C', 'D']
    }
  },
  mounted() {
    this.exam_id = Vue.localStorage.get('exam_id')
    this.getExamInfo()

    //获取 用户保存的考试信息

    if (JSON.parse(Vue.localStorage.get('exam_record'))) {
      this.exam_record = JSON.parse(Vue.localStorage.get('exam_record'))
      this.maxtime = Number(Vue.localStorage.get('maxtime'))
      console.log(this.exam_record)
    }
    if (Vue.localStorage.get('timer')) {
      this.timer = Vue.localStorage.get('timer')
      clearInterval(this.timer)
    }

    //初始化信息
    this.getSubjects()

    this.getUserInfo()
    this.CountDown()
  },
  methods: {
    //获取考试题目
    getSubjects() {
      let type = '选择题'
      Http.subject_byid({ type, exam_id: this.exam_id })
        .then(rst => {
          if (rst.data.error_code == 0) {
            this.subjectList = rst.data.result
          }
          type = '判断题'
          Http.subject_byid({ type, exam_id: this.exam_id })
            .then(rst => {
              if (rst.data.error_code == 0) {
                this.subjectList = this.subjectList.concat(rst.data.result)
              }
              type = '填空题'
              Http.subject_byid({ type, exam_id: this.exam_id })
                .then(rst => {
                  if (rst.data.error_code == 0) {
                    this.subjectList = this.subjectList.concat(rst.data.result)
                    // this.subjectList[0].type == '填空题'
                    //   ? (this.exam_record.answer = [])
                    //   : (this.exam_record.answer = [[]])
                  }
                  console.log(this.subjectList)
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取考试信息
    getExamInfo() {
      let id = this.exam_id
      Http.exam_byid(id)
        .then(rst => {
          this.exam_info = rst.data.result[0]
          this.maxtime = this.exam_info.exam_time * 60
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取用户信息
    getUserInfo() {
      let id = Vue.localStorage.get('token')
      Http.user_info(id)
        .then(rst => {
          this.user_info = rst.data.result[0]
        })
        .catch()
    },
    //倒计时
    CountDown() {
      console.log(this.maxtime)
      this.timer = setInterval(() => {
        if (Vue.localStorage.get('maxtime')) {
          this.maxtime = Number(Vue.localStorage.get('maxtime'))
        }
        let maxtime = this.maxtime
        if (maxtime >= 0) {
          let minutes = Math.floor(maxtime / 60)
          let seconds = Math.floor(maxtime % 60)
          this.timeMsg = minutes + '分' + seconds + '秒'

          if (maxtime == 5 * 60) {
            alert('还剩5分钟')
          }
          this.maxtime--
          Vue.localStorage.set('maxtime', this.maxtime)
          Vue.localStorage.set('timer', this.timer)
        } else {
          clearInterval(this.timer)
          alert('时间到，考试结束结束!')
          this.onSubmit()
        }
      }, 1000)
    },
    //答题卡跳转
    gotoSubject(index) {
      document.getElementById(index).scrollIntoView()
    },
    //保存试卷
    onSave() {
      let msg = JSON.stringify(this.exam_record)
      Vue.localStorage.set('exam_record', msg)
      msg = Vue.localStorage.get('exam_record')
      
      console.log(JSON.parse(msg))
      alert('保存成功！')
      this.$router.replace({name:'ExamList'})
    },
    //提交试卷
    onSubmit() {
      this.judgeExam()
      clearInterval(this.timer)
      //清除localStorage 中存储的临时数据
      Vue.localStorage.remove('exam_id')
      Vue.localStorage.remove('timer')
      Vue.localStorage.remove('maxtime')
      alert('提交考试成功！')
      this.$router.push({ name: 'ExamList' })
    },
    //判卷
    judgeExam() {
      this.record.sign = new Date().getTime() + Vue.localStorage.get('token')

      for (let i = 0; i < this.subjectList.length; i++) {
        //存储需要的数据
        this.record.exam_id = this.exam_id
        this.record.subject_id = this.subjectList[i].id
        this.record.user_id = Vue.localStorage.get('token')
        this.record.answer = this.exam_record.answer[i]
        //判题
        if (this.subjectList[i].type == '判断题') {
          if (this.exam_record.answer[i] == this.subjectList[i].answer) {
            this.record.isright = true
            this.record.score = this.subjectList[i].score
          } else {
            this.record.isright = false
            this.record.score = 0
          }
        } else if (this.subjectList[i].type == '填空题') {
          console.log(this.exam_record)
          let arr2 = this.exam_record.answer[i].split('，') //用户答案
          let arr1 = this.subjectList[i].answer.split('，') //答案
          console.log(arr1, arr2)
          let score = 0
          for (let j = 0; j < arr2.length; j++) {
            if (arr1[j] == arr2[j]) {
              score = score + this.subjectList[i].score / arr1.length
            }
          }
          if (score == this.subjectList[i].score) {
            console.log('全对', score)
            this.record.isright = true
            this.record.score = score
          } else if (score == 0) {
            console.log('全错', score)
            this.record.isright = false
            this.record.score = score
          } else {
            console.log('半错', score)
            this.record.isright = true
            this.record.score = score
          }
        } else if (this.subjectList[i].type == '选择题') {
          let arr = this.subjectList[i].answer.split(',')
          let num = 0
          if (this.exam_record.answer[i].length <= arr.length) {
            for (let j = 0; j < this.exam_record.answer[i].length; j++) {
              let val = arr.indexOf(this.exam_record.answer[i][j])
              if (val != -1) {
                num++
              }
            }
            if (num == arr.length) {
              console.log('全对')
              this.record.isright = true
              this.record.score = this.subjectList[i].score
            } else if (num == this.exam_record.answer[i].length) {
              console.log('半错')
              this.record.isright = true
              this.record.score = 1
            } else {
              console.log('全错1 ')
              this.record.isright = false
              this.record.score = 0
            }
          } else {
            console.log('全错2')
            this.record.isright = false
            this.record.score = 0
          }
        }

        this.myscore = this.myscore + this.record.score
        this.score = this.score + this.subjectList[i].score
        console.log(this.record)
        Http.record_add(this.record)
          .then(rst => {
            console.log(rst)
          })
          .catch(err => {
            console.log(err)
          })
      }

      Http.userrecord_add({
        exam_id: this.record.exam_id,
        score: this.score,
        myscore: this.myscore,
        user_id: this.record.user_id,
        exam_name: this.exam_info.exam_name,
        sign: this.record.sign,
        user_name: this.user_info.username
      })
        .then(rst => {
          console.log(rst)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showinfo() {
      console.log(this.exam_record)
    }
  }
}
</script>
<style lang="less" scoped>
.subjectList {
  text-align: left;
  .examInfo {
    border-radius: 20px;
    width: 400px;
    position: fixed;
    top: 200px;
    right: 100px;
    background-color: #333;
    .showTime {
      width: 300px;
      height: 100px;
      font-size: 38px;
      line-height: 80px;
      text-align: center;
      margin: 0 auto;
      color: #fff;
    }
    .gotoSubject {
      border-radius: 10px;
      width: 300px;
      height: 400px;
      background-color: #eee;
      margin: 0 auto;
      div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        float: left;
        overflow: hidden;
        border: 1px solid #333;
        text-align: center;
        cursor: pointer;
        line-height: 30px;
        margin: 10px;
        background-color: #fff;
      }
      .done {
        background-color: green;
        color: white;
      }
    }
    .exam_info {
      width: 100%;
      margin-left: 50px;
      font-size: 20px;
      line-height: 40px;
      color: #fff;
    }
    .onsubmit {
      float: left;
      width: 100px;
      text-align: center;
      border: 1px solid #333;
      border-radius: 10px;
      background-color: lightblue;
      margin: 20px 30px;
      color: black;
    }
    .onsave {
      float: left;
      width: 100px;
      color: black;
      text-align: center;
      border: 1px solid #333;
      border-radius: 10px;
      background-color: greenyellow;
      margin: 20px 40px;
    }
  }
  span {
    font-size: 16px;
  }
  .text {
    font-size: 16px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 480px;
    height: 500px;
  }
}
</style>