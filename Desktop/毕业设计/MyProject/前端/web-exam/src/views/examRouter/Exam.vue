<template>
  <div class="class">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >考试管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addUser">
      <el-button type="primary"
                 @click="showMain('ExamAdd')"><i class="el-icon-circle-plus-outline"></i> 添加考试</el-button>
    </div>
    <el-table :data="tableData"
              style="width: 100%"
              border>
      <el-table-column label="序号"
                       min-width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.$index + (currpage - 1) * 5 + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="考试名称"
                       min-width="180"
                       prop="exam_name">
      </el-table-column>
      <el-table-column label="考试信息"
                       min-width="180"
                       prop="exam_info">
      </el-table-column>
      <el-table-column label="开始时间"
                       min-width="180"
                       prop="start_time">
      </el-table-column>
      <el-table-column label="截止时间"
                       min-width="180"
                       prop="end_time">
      </el-table-column>

      <el-table-column label="操作"
                       min-width="200">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="ExamUpdate(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="success"
                     @click="SubjectUpdate(scope.row)">题目</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="classDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   :page-size="5"
                   layout="prev, pager, next"
                   :total="pageTotal"
                   :current-page="currpage"
                   @current-change="pageChange"
                   class="pagement">
    </el-pagination>
  </div>
</template>
<script>
import Http from '@/ajax/http.js'
import moment from 'moment'
import Vue from 'vue'
export default {
  data() {
    return {
      tableData: [],
      tableData2: [],
      pageTotal: 0,
      currpage: 1,
      totol_page: 0
    }
  },
  methods: {
    //路由跳转方法
    showMain(routerName) {
      this.$router.push({ name: routerName })
    },
    //获取权限列表(分页)
    getExam(currpage) {
      Http.exam_list(currpage)
        .then(rst => {
          this.tableData = rst.data.result
          this.tableData2 = rst.data.result
          //修改时间格式
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].start_time = this.changeTime(
              this.tableData[i].start_time
            )
            this.tableData[i].end_time = this.changeTime(
              this.tableData[i].end_time
            )
          }
          console.log(this.tableData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取考试数据数量
    getexamcount() {
      Http.exam_alllist()
        .then(rst => {
          // 获取了权限列表数据的总数量
          this.pageTotal = rst.data.result.length
          // 根据总数量计算分页的总页码
          let totol_page = Math.ceil(this.pageTotal / 5)
          // 判断如果当前页大于分页的总页码时，把总页码赋值给当前页；否则当前页不变
          this.currpage =
            this.currpage > totol_page ? totol_page : this.currpage
          // 如果数据库没有任何数据，则保持currpage为1，否则(page-1)*limit会报错
          if (this.currpage == 0) {
            this.currpage = 1
          }
          this.getExam(this.currpage)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //处理时间格式
    changeTime(nS) {
      nS = Number(nS)
      return moment(nS).format('YYYY-MM-DD h:mm:ss')
    },
    //翻页
    pageChange(currpage) {
      this.currpage = currpage

      this.getExam(currpage)
    },
    //修改考试题库
    SubjectUpdate(info) {
      Vue.localStorage.set('exam_id', info.id)
      this.$router.push({ name: 'ExamManage', params: info })
    },

    classDel(id) {
      Http.exam_del(id)
        .then(rst => {
          this.$message({
            message: rst.data.reason,
            type: 'success'
          })
          this.getexamcount()
        })
        .catch(err => {
          console.log(err)
        })
    },
    //修改权限
    ExamUpdate(info) {
      console.log(info)
      info.start_time = moment(info.start_time).format('x')
      info.end_time = moment(info.end_time).format('x')
      this.$router.push({ name: 'ExamAdd', params: info })
    }
  },
  mounted() {
    this.getexamcount()
  }
}
</script>
<style lang="less">
.class {
  height: 100%;
  width: 100%;
  position: relative;
  .addUser {
    // position: absolute;
    // top: -6px;
    // right: 0;
    width: 120px;

    .el-button {
      width: 100%;
      border-radius: 16px 16px 0 0;
    }
  }
  .el-table {
    border-radius: 0 10px 10px 10px;
    .cell {
      text-align: center;
    }
  }
  .pagement {
    width: 100%;
    position: absolute;
    bottom: 100px;
  }
  .el-icon-arrow-right:before {
    color: #606266;
  }
  .el-breadcrumb {
    padding: 10px;
  }
}
</style>
