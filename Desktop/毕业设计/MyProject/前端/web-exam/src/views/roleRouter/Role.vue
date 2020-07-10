<template>
  <div class="role">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页 </el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addUser">
      <el-button type="primary"
                 @click="showMain('RoleAdd')"><i class="el-icon-circle-plus-outline"></i> 添加角色</el-button>
    </div>
    <el-table :data="tableData"
              style="width:800px "
              border>
      <el-table-column label="序号"
                       min-width="100">
         <template slot-scope="scope">

          <span style="margin-left: 10px">{{ scope.$index+(currpage-1)*5 +1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色名"
                       min-width="180"
                       prop="rolename">
        
      </el-table-column>

      <el-table-column label="操作"
                       min-width="180">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="updateRole(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="deleteRole(scope.row)">删除</el-button>
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
  methods: {
    // 编辑
    updateRole(row) {
      this.$router.push({ name: 'RoleAdd', params: row })
    },
    // 删除
    deleteRole(row) {
      Http.role_del(row.id)
        .then(rst => {
        //   console.log(rst)
          this.getRoleCount()

          this.$message({
            message: rst.data.reason,
            type: 'success'
          })
        })
        .catch(err => {
          this.$message.error('错了哦，这是一条错误消息')
          console.log(err)
        })
    },
    // 新增路由跳转
    showMain() {
      this.$router.push({ name: 'RoleAdd' })
    },
    // 获取权限列表
    getRoleList(currpage) {
      Http.role_list(currpage)
        .then(rst => {
          this.tableData = rst.data.result
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取权限列表
    getRoleCount() {
      Http.role_count()
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
          // 根据当前页请求权限列表的数据，用于列表渲染
          this.getRoleList(this.currpage)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 分页页面点击事件
    pageChange(currpage) {
      // 分页器点击后获得page参数，表示当前点击的页码
      // 把页码赋值给当前页
      this.currpage = currpage
      // 根据当前页请求数据
      this.getRoleList(currpage)
    }
  },
  created() {
    // 获取权限列表的数量，给分页用
    this.getRoleCount()
  },
  data() {
    return {
      tableData: [], //渲染列表的数据源
      currpage: 1, //分页的当前页
      pageTotal: 0 //权限列表的总条数（注意不是总页码）
    }
  }
}
</script>
<style lang="less">
.role {
  height: 100%;
  width: 100%;
  position: relative;
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
