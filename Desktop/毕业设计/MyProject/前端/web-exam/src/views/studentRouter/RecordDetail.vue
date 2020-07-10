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
            <span><b style="font-size:18px">{{index+1}} . </b>{{subject.subject_stem}}</span>（{{subject.score}}分）
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
              <b style="line-height:30px">你的答案：{{record[index].answer}}</b>

            </div>
            <div class="text item">
              <b style="line-height:30px">答案：{{subject.answer}}</b>

            </div>
            <p class="isRight"
               v-if="record[index].isright=='true'">正确 </p>
            <p class="isFalse"
               v-if="record[index].isright=='false'">错误 </p>
            <div class="text item">
              <b style="line-height:40px ">得分：{{record[index].score}}</b>

            </div>
          </template>
          <template v-if="subject.type =='判断题'">
            <div class="text item">
              你的答案：{{record[index].answer}}

            </div>
            <div class="text item">
              答案：{{subject.answer}}

            </div>
            <p class="isRight"
               v-if="record[index].isright=='true'">正确 </p>
            <p class="isFalse"
               v-if="record[index].isright=='false'">错误 </p>
            <div class="text item">
              <b style="line-height:40px ">得分：{{record[index].score}}</b>

            </div>
          </template>
          <template v-if="subject.type =='填空题'">
            <div class="text item">
              你的答案：{{record[index].answer}}

            </div>
            <div class="text item">
              答案：{{subject.answer}}   

            </div>
            <p class="isRight"
               v-if="record[index].isright=='true'">正确 </p>
            <p class="isFalse"
               v-if="record[index].isright=='false'">错误 </p>
            <div class="text item">
              <b style="line-height:40px ">得分：{{record[index].score}}</b>

            </div>
          </template>

        </el-card>

      </template>
    </div>
    <div class="examInfo">

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
      <div class="exam_info">考试总分：{{score}}</div>
      <div class="exam_info">学生分数：{{myscore}}</div>

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
      sign: '',
      score: 0,
      myscore: 0,
      exam_record: {
        answer: [[]]
      },
      record: [],
      selections: ['A', 'B', 'C', 'D']
    }
  },
  mounted() {
    //信息
    this.exam_id = this.$route.params.exam_id
    if(!this.exam_id){
        this.$router.replace({name:'Record'})
    }
    this.score = this.$route.params.score
    this.myscore = this.$route.params.myscore
    this.sign = this.$route.params.sign
    this.maxtime
    //初始化信息
    this.getSubjects()
    this.getExamInfo()
    this.getUserInfo()
    this.getRecords(this.sign)
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
                  }
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
          console.log(rst)
          this.exam_info = rst.data.result[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取用户考试记录
    getRecords(sign) {
      Http.record_detail(sign)
        .then(rst => {
          console.log(rst)
          this.record = rst.data.result
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
          console.log(this.user_info)
        })
        .catch()
    },
    //答题卡跳转
    gotoSubject(index) {
      document.getElementById(index).scrollIntoView()
    }
  }
}
</script>
<style lang="less" scoped>
.subjectList {
  text-align: left;
  .examInfo {
    width: 400px;
    border-radius: 20px;
    padding-top: 20px;
    position: fixed;
    top: 200px;
    right: 100px;
    background-color: #aaa;
    .showTime {
      width: 300px;
      height: 100px;
      font-size: 38px;
      line-height: 80px;
      text-align: center;
      margin: 0 auto;
    }
    .gotoSubject {
      width: 300px;
      height: 400px;
      background-color: #333;
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
      }
    }
    .exam_info {
      width: 100%;
      margin-left: 50px;
      font-size: 20px;
      line-height: 40px;
    }
    .onsubmit {
      float: left;
      width: 100px;
      text-align: center;
      border: 1px solid #333;
      border-radius: 10px;
      background-color: lightblue;
      margin: 20px 30px;
    }
    .onsave {
      float: left;
      width: 100px;
      text-align: center;
      border: 1px solid #333;
      border-radius: 10px;
      background-color: greenyellow;
      margin: 20px 40px;
    }
  }
  .isRight {
    color: lawngreen;
    font-size: 20px;
  }
  .isFalse {
    color: red;
    font-size: 20px;
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