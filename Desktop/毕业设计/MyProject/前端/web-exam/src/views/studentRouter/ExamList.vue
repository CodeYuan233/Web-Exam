<template>
  <div class="class">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/class' }">我的考试</el-breadcrumb-item>
    </el-breadcrumb>

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

          <el-popconfirm placement="bottom"
                         width="200"
                         v-model="visible"
                         title="确定现在进入考试吗"
                         @onConfirm='EnterExam(scope.row)'
                         @onCancel='visible=false'>
            <div style="text-align: right; margin: 0">
              <el-button size="mini"
                         type="text">取消</el-button>
              <el-button type="primary"
                         size="mini">确定</el-button>
            </div>
            <el-button type="success"
                       slot="reference"
                       v-if="!scope.row.end">开始考试 </el-button>

          </el-popconfirm>
          <el-button type="danger"
                     slot="reference"
                     v-if="scope.row.end">已结束 </el-button>
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
      totol_page: 0,
      visible: false
    }
  },
  methods: {
    //路由跳转方法
    showMain(routerName) {
      this.$router.push({ name: routerName })
    },
    //获取考试列表(分页)
    getExam(currpage) {
      Http.exam_list(currpage)
        .then(rst => {
          this.tableData2 = rst.data.result
          console.log(rst, '123')
          for (let i = 0; i < this.tableData2.length; i++) {
            let timenow = new Date().getTime()
            if (
              Number(this.tableData2[i].start_time) <= timenow &&
              Number(this.tableData2[i].end_time) >= timenow
            ) {
              //   this.tableData2.push(this.tableData2[i])
              this.tableData2[i].end = false
            } else {
              this.tableData2[i].end = true
            }
          }
          this.tableData = this.tableData2
          console.log(this.tableData)
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
       
          // 获取了列表数据的总数量
          this.pageTotal = rst.data.result.length
          // 根据总数量计算分页的总页码
          let totol_page = Math.ceil(this.pageTotal / 5)
          // 判断如果当前页大于分页的总页码时，把总页码赋值给当前页；否则当前页不变
          this.currpage =
            this.currpage > totol_page ? totol_page : this.currpage
          // 如果数据库没有任何数据，则保持currpage为1
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

    //修改权限
    EnterExam(info) {
      console.log(info)
      let exam_id = Vue.localStorage.get('exam_id')
      if (exam_id != info.id) {
        console.log(123)
        Vue.localStorage.remove('exam_id')
        Vue.localStorage.remove('exam_record')
        Vue.localStorage.remove('maxtime')
      }

      Vue.localStorage.set('exam_id', info.id)
      this.$router.push({ name: 'EnterExam', params: info })
    }
  },
  mounted() {
    this.getexamcount()
  }
}
</script>
<style lang="less" scoped>
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
