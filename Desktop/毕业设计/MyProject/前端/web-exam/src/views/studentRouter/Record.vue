<template>
  <div class="class">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >考试记录管理</el-breadcrumb-item>
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
      <el-table-column label="用户名"
                       min-width="180"
                       prop="user_name">
      </el-table-column>
      <el-table-column label="得分"
                       min-width="180"
                       prop="myscore">
      </el-table-column>
      <el-table-column label="总分数"
                       min-width="180"
                       prop="score">
      </el-table-column>

      <el-table-column label="操作"
                       min-width="200">
        <template slot-scope="scope">

          <el-button type="success"
                     size="mini"
                     slot="reference"
                     @click="gotoDetail(scope.row)">成绩详情 </el-button>
          <el-button type="danger"
                     size="mini"
                     slot="reference"
                     @click="deleteRecord(scope.row)">删除 </el-button>

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
import Vue from 'vue'
export default {
  data() {
    return {
      tableData: [],
      user_id: '',
      pageTotal: 0,
      currpage: 1,
      totol_page: 0,
      visible: false
    }
  },
  methods: {
    //获取考试记录(分页)
    getRecord(currpage, user_id) {
      Http.record_list({ currpage, user_id })
        .then(rst => {
          this.tableData = rst.data.result
          //修改时间格式
          //   for (let i = 0; i < this.tableData.length; i++) {
          //     this.tableData[i].start_time = this.changeTime(
          //       this.tableData[i].start_time
          //     )
          //     this.tableData[i].end_time = this.changeTime(
          //       this.tableData[i].end_time
          //     )
          //   }
          console.log(this.tableData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取权限数据数量
    getrecordcount() {
      Http.record_listcount({ user_id: this.user_id })
        .then(rst => {
          console.log(rst)
          // 获取了列表数据的总数量
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
          this.getRecord(this.currpage, this.user_id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //翻页
    pageChange(currpage) {
      this.currpage = currpage

      this.getRecord(currpage, this.user_id)
    },
    deleteRecord(info) {
      console.log(info)
      Http.record_delete(info.sign)
        .then(rst => {
          this.$message.success(rst.data.reason)
        })
        .catch(err => {
          console.log(err)
        })
      this.getrecordcount()
    },
    //查看考试详情
    gotoDetail(info) {
      console.log(info)
      this.$router.push({ name: 'RecordDetail', params: info })
    }
  },
  mounted() {
    this.user_id = Vue.localStorage.get('token')
    this.getrecordcount()
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
