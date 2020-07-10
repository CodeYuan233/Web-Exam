<template>
  <div class="limit">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item separator-class="el-icon-arrow-right">权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addUser">
      <el-button type="primary"
                 @click="showMain('LimitAdd')"><i class="el-icon-circle-plus-outline"></i> 添加权限</el-button>
    </div>
    <el-table :data="tableData"
              style="width: 100%"
              border>
      <el-table-column label="序号"
                       min-width="100">
        <template slot-scope="scope">

          <span style="margin-left: 10px">{{ scope.$index+(currpage-1)*5 +1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="路由名"
                       min-width="180"
                       prop="limitname">

      </el-table-column>
      <el-table-column label="标题"
                       min-width="180"
                       prop="title">
      </el-table-column>

      <el-table-column label="操作"
                       min-width="180">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="limitUpdate(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="limitDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background
                   :page-size='5'
                   layout="prev, pager, next"
                   :total="pageTotal"
                   :current-page="currpage"
                   @current-change='pageChange'
                   class="pagement">
    </el-pagination>
  </div>
</template>
<script>
import Http from '@/ajax/http.js'
export default {
  data() {
    return {
      tableData: [],
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
    getlimit(currpage) {
      Http.limit_list(currpage)
        .then(rst => {
          this.tableData = rst.data.result
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取权限数据数量
    getlimitcount() {
      Http.limit_count()
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
          this.getlimit(this.currpage)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //翻页
    pageChange(currpage) {
      this.currpage = currpage

      this.getlimit(currpage)
    },
    //删除权限
    limitDel(id) {
      Http.limit_del(id)
        .then(rst => {
          this.$message({
            message: rst.data.reason,
            type: 'success'
          })
          this.getlimitcount()
        })
        .catch(err => {
          console.log(err)
        })
    },
    //修改权限
    limitUpdate(info) {
      this.$router.push({ name: 'LimitAdd', params: info })
    }
  },
  mounted() {
    this.getlimitcount()
  }
}
</script>
<style lang="less">
.limit {
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
