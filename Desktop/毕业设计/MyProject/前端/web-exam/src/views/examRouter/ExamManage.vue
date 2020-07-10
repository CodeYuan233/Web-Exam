
<template>
  <div class="subject">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/class' }">题库管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addUser">
      <el-button type="primary"
                 @click="showMain('ExamAddSubject')"><i class="el-icon-circle-plus-outline"></i> 添加题目</el-button>
    </div>
    <el-tabs type="border-card"
             @tab-click="changeType"
             v-model="activeName">
      <el-tab-pane label="选择题"
                   name="选择题"
                   :lazy='true'>
        <el-table :data="tableData"
                  style="width: 100%"
                  border>
          <el-table-column label="序号"
                           min-width="100">
            <template slot-scope="scope">

              <span style="margin-left: 10px">{{ scope.$index+(currpage-1)*5 +1 }}</span>
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
                         type="success"
                         @click="showDialog(scope.row)">预览</el-button>
              <el-button size="mini"
                         @click="subjectUpdate(scope.row)">编辑</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="subjectDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="判断题"
                   name="判断题"
                   :lazy='true'>
        <el-table :data="tableData"
                  style="width: 100%"
                  border>
          <el-table-column label="序号"
                           min-width="100">
            <template slot-scope="scope">

              <span style="margin-left: 10px">{{ scope.$index+(currpage-1)*5 +1 }}</span>
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
                         type="success"
                         @click="showDialog(scope.row)">预览</el-button>
              <el-button size="mini"
                         @click="subjectUpdate(scope.row)">编辑</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="subjectDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="填空题"
                   name="填空题"
                   :lazy='true'>
        <el-table :data="tableData"
                  style="width: 100%"
                  border>
          <el-table-column label="序号"
                           min-width="100">
            <template slot-scope="scope">

              <span style="margin-left: 10px">{{ scope.$index+(currpage-1)*5 +1 }}</span>
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
                         type="success"
                         @click="showDialog(scope.row)">预览</el-button>
              <el-button size="mini"
                         @click="subjectUpdate(scope.row)">编辑</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="subjectDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-dialog title="题目预览"
                 :visible.sync="dialogTableVisible">
        <el-card class="box-card">
          <p>题目：{{showIt.subject_stem}}</p>
          <template v-if="showIt.selectionA">
            <div class="text item">
              A.{{showIt.selectionA}}
            </div>
            <div class="text item">
              B.{{showIt.selectionB}}
            </div>
            <div class="text item">
              C.{{showIt.selectionC}}
            </div>
            <div class="text item">
              D.{{showIt.selectionD}}
            </div>
          </template>
          <p>答案：{{showIt.answer}}</p>
        </el-card>
      </el-dialog>

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

    getsubjects() {
      let exam_id = this.exam_id
      let type = this.type
      console.log(exam_id, type)
      Http.subject_byid({ exam_id, type })
        .then(rst => {
          this.tableData = rst.data.result
          if (rst.data.error_code == 101) {
            this.tableData = []
          }
          console.log(rst)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //删除权限
    subjectDel(id) {
      let type = this.type
      let exam_id = this.exam_id
      Http.examsubject_del({ type, exam_id, subject_id: id })
        .then(rst => {
          this.$message({
            message: rst.data.reason,
            type: 'success'
          })
          this.getsubjects()
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeType(val) {
      this.type = val.name
      console.log(this.type)
      this.getsubjects()
    },
    //修改权限
    subjectUpdate(info) {
      this.$router.push({ name: 'SubjectAdd', params: info })
    },
    showDialog(table) {
      this.dialogTableVisible = true

      this.showIt = table
    }
  },
  mounted() {
    this.exam_id = Vue.localStorage.get('exam_id')
    this.getsubjects()
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
