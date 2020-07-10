<template>
  <div class="user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>

    </el-breadcrumb>
    <div class="addUser">
      <el-button type="primary"
                 @click="showUserAdd()"><i class="el-icon-circle-plus-outline"></i> 添加用户</el-button>
    </div>
    <template v-if="checkData">
      <el-table :data="tableData"
                style="width: 100%"
                border
                v-cloak>
        <el-table-column label="序号"
                         min-width="100">
          <template slot-scope="scope">

            <span style="margin-left: 10px">{{ scope.$index+(currpage-1)*5 +1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户名"
                         min-width="180"
                         prop="username">

        </el-table-column>
        <el-table-column label="角色"
                         min-width="180"
                         prop="role.rolename">

        </el-table-column>
        <el-table-column label="操作"
                         min-width="180">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="updateUser(scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
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
    updateUser(row) {
      this.$router.push({ name: 'UserAdd', params: row })
      console.log(row)
    },
    // 删除
    deleteUser(id) {
      Http.user_del(id)
        .then(rst => {
          this.getUserCount()

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
    showUserAdd() {
      this.$router.push({ name: 'UserAdd' })
    },
    // 获取用户列表
    getUserList(currpage) {
      Http.user_list(currpage)
        .then(rst => {
          if (rst.data.result) {
            this.newData = rst.data.result
          }
          //通过遍历获取各个用户的角色
          for (let i = 0; i < this.newData.length; i++) {
            this.dealUserlist(this.newData, i)
          }

          //改的想吐  ，原来是因为vue自身的一些缺陷，（这样写数据展示有延迟，但就这样了）
          this.tableData = this.newData
          for (let i = 0; i < this.newData.length; i++) {
            this.$set(this.tableData[i], 'role', this.newData[i].role)
            if (i == this.newData.length - 1) {
              this.checkData = true
              
            } else {
              this.checkData = false
            }
          }
          
        })
        .catch(err => {
          console.log(err)
        })
    },
    //整理数据        通过role_id获取角色名和权限数组,写入newData中的role
    dealUserlist(data, index) {
      Http.role_byid(data[index].role_id)
        .then(rst => {
          data[index].role = rst.data.result[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取用户列表
    getUserCount() {
      Http.user_count()
        .then(rst => {
          // 获取了用户列表数据的总数量
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
          // 根据当前页请求用户列表的数据，用于列表渲染
          this.getUserList(this.currpage)
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
      this.getUserList(currpage)
    }
  },
  created() {
    // 获取用户列表的数量，给分页用
    this.getUserCount()
  },
  data() {
    return {
      checkData: false,
      newData: [], //提前请求数据，方便后面整理数据
      tableData: [], //渲染列表的数据源
      currpage: 1, //分页的当前页
      pageTotal: 0, //用户列表的总条数（注意不是总页码）
      
    }
  }
}
</script>
<style lang="less">
.user {
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
