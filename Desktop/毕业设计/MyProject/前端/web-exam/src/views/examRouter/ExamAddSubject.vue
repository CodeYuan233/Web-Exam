<template>
  <div class="subject">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/class' }">题库管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs type="border-card"
             @tab-click="changeType"
             v-model="activeName">
      <el-tab-pane label="选择题"
                   name="选择题"
                   :lazy="true">
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

          <el-table-column label="题目名称"
                           min-width="180"
                           prop="subject_stem">
          </el-table-column>
          <el-table-column label="题目类型"
                           min-width="180"
                           prop="type">
          </el-table-column>
          <el-table-column label="分值"
                           min-width="180"
                           prop="score">
          </el-table-column>

          <el-table-column label="操作"
                           min-width="240">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showDialog(scope.row)">
                预览
              </el-button>
              <el-button size="mini"
                         type="success"
                         @click="addsubject(scope.row)">
                选择
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="判断题"
                   name="判断题"
                   :lazy="true">
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

          <el-table-column label="题目名称"
                           min-width="180"
                           prop="subject_stem">
          </el-table-column>
          <el-table-column label="题目类型"
                           min-width="180"
                           prop="type">
          </el-table-column>
          <el-table-column label="分值"
                           min-width="180"
                           prop="score">
          </el-table-column>

          <el-table-column label="操作"
                           min-width="240">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showDialog(scope.row)">
                预览
              </el-button>
              <el-button size="mini"
                         type="success"
                         @click="addsubject(scope.row)">
                选择
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="填空题"
                   name="填空题"
                   :lazy="true">
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

          <el-table-column label="题目名称"
                           min-width="180"
                           prop="subject_stem">
          </el-table-column>
          <el-table-column label="题目类型"
                           min-width="180"
                           prop="type">
          </el-table-column>
          <el-table-column label="分值"
                           min-width="180"
                           prop="score">
          </el-table-column>

          <el-table-column label="操作"
                           min-width="240">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showDialog(scope.row)">
                预览
              </el-button>
              <el-button size="mini"
                         type="success"
                         @click="addsubject(scope.row)">
                选择
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-dialog title="题目预览"
                 :visible.sync="dialogTableVisible">
        <el-card class="box-card">
          <p>题目：{{ showIt.subject_stem }}</p>
          <p style="text-align:right">{{showIt.score}}分</p>
          <template v-if="showIt.selectionA">
            <div class="text item">A.{{ showIt.selectionA }}</div>
            <div class="text item">B.{{ showIt.selectionB }}</div>
            <div class="text item">C.{{ showIt.selectionC }}</div>
            <div class="text item">D.{{ showIt.selectionD }}</div>
          </template>
          <p>答案：{{ showIt.answer }}</p>
        </el-card>
      </el-dialog>
      <el-pagination background
                     :page-size="5"
                     layout="prev, pager, next"
                     :total="pageTotal"
                     :current-page="currpage"
                     @current-change="pageChange"
                     class="pagement">
      </el-pagination>
    </el-tabs>
  </div>
</template>
<script>
import Http from '@/ajax/http.js'
import Vue from 'vue'
export default {
  data() {
    return {
      tableData: [],
      pageTotal: 0,
      currpage: 1,
      totol_page: 0,
      type: '选择题',
      activeName: '选择题',
      dialogTableVisible: false,
      showIt: '',
      exam_id: ''
    }
  },
  methods: {
    //路由跳转方法
    showMain(routerName) {
      this.$router.push({ name: routerName })
    },
    //获取权限列表(分页)
    getsubject(currpage) {
      if (this.type == '选择题') {
        Http.selsubject_list(currpage)
          .then(rst => {
            this.tableData = rst.data.result
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this.type == '判断题') {
        Http.judgesubject_list(currpage)
          .then(rst => {
            this.tableData = rst.data.result
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this.type == '填空题') {
        Http.fillsubject_list(currpage)
          .then(rst => {
            this.tableData = rst.data.result
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    //获取题目数据数量
    getsubjectcount() {
      if (this.type == '选择题') {
        Http.selsubject_alllist()
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
            this.getsubject(this.currpage)
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this.type == '判断题') {
        Http.judgesubject_alllist()
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
            this.getsubject(this.currpage)
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this.type == '填空题')
        Http.fillsubject_alllist()
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
            this.getsubject(this.currpage)
          })
          .catch(err => {
            console.log(err)
          })
    },
    //翻页
    pageChange(currpage) {
      this.currpage = currpage

      this.getsubject(currpage)
    },
    //删除权限
    subjectDel(id) {
      let type = this.type
      Http.subject_del(type, id)
        .then(rst => {
          this.$message({
            message: rst.data.reason,
            type: 'success'
          })
          this.getsubjectcount()
        })
        .catch(err => {
          console.log(err)
        })
    },
    

    changeType(val) {
      this.type = val.name
      console.log(this.type)
      this.getsubjectcount()
    },
    //添加试题
    addsubject(info) {
      let { id, type } = info
      let subject_id = id
      let param = { exam_id: this.exam_id, subject_id, type }
      console.log(param)
      Http.examadd_subject(param)
        .then(rst => {
            this.$message({
            message: rst.data.reason,
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    showDialog(table) {
      this.dialogTableVisible = true

      this.showIt = table
    }
  },
  mounted() {
    this.getsubjectcount()
    this.exam_id = Vue.localStorage.get('exam_id')
    console.log(this.exam_id)
  }
}
</script>
<style lang="less">
.subject {
  height: 100%;
  width: 100%;
  position: relative;
  .box-card {
    p {
      text-align: left;
    }
    .text {
      font-size: 14px;
      text-align: left;
    }
    .item {
      padding: 18px 0;
    }
    .box-card {
      width: 480px;
    }
  }
  .addUser {
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
    // position: absolute;
    // bottom: 100px;
  }
  .el-icon-arrow-right:before {
    color: #606266;
  }
  .el-breadcrumb {
    padding: 10px;
  }
}
</style>
