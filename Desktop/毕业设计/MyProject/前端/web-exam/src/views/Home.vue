<template>
  <div class="home">
    <el-container class="container">
      <el-header class="header">
        <div class="title">欢 迎 使 用<span style="color:#409EFF"> 优 学 云</span> 在 线 考 试 系 统</div>
        <div class="signout">欢迎你,{{user_info.username}}
          <el-button style="color:white;background-color:black"
                     size="mini"
                     @click="signOut">退出</el-button>
        </div>
      </el-header>
      <el-container class="sub-container">
        <el-aside width="200px"
                  class="aside">
          <!-- 侧栏导航 -->
          <el-row class="tac">
            <el-col :span="12">
              <el-menu default-active="1"
                       class="el-menu-vertical-demo"
                       background-color="#000"
                       text-color="#fff"
                       active-text-color="#ffd04b">

                <template v-for='(limit,index) in limits'>
                  <el-submenu :index='limit.id'
                              :key='limit.id'>
                    <template slot="title">
                      <i class="el-icon-s-grid"
                         style="color:#fff"></i>
                      <span>{{limit.title}}</span>
                    </template>
                    <template v-for='item in limit.children'>

                      <el-menu-item :index='item.id'
                                    :key='item.id'
                                    @click="showMain(item.limitname)"><i v-if="index==0" class="el-icon-user-solid" ></i><i v-if="index==1" class="el-icon-document" ></i><i v-if="index==2" class="el-icon-s-order" ></i>{{item.title}}</el-menu-item>
                    </template>
                  </el-submenu>
                </template>

              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <!-- 内容区 -->
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Http from '@/ajax/http.js'
import Vue from 'vue'
export default {
  name: 'Home',
  components: {},
  data: function() {
    return {
      defaultOpeneds: [], //默认展开数组
      limits: [],
      user_info: ''
    }
  },
  mounted() {
    let id = ''
    id = Vue.localStorage.get('token')
    this.getLimitCount(id)
    this.getUserInfo(id)
  },
  methods: {
    //路由跳转方法
    showMain(routerName) {
      this.$router.replace({ name: routerName })
    },
    //处理用户权限数据
    dealTreeData(limits) {
      let topLev = []
      let secondLev = []
      //id转字符串 防止前台报错
      limits.forEach(limit => {
        limit.id = limit.id.toString()
      })
      // 当前循环的作用是把权限列表里面的顶级节点和二级节点分隔开
      limits.forEach(limit => {
        if (limit.pid == '0') {
          limit.children = []
          // 将顶级节点的_id赋值给默认要展开的对象数组
          this.defaultOpeneds.push(limit.id)
          topLev.push(limit)
        } else {
          secondLev.push(limit)
        }
      })
      // 双重循环用来寻找子节点指定的父级节点
      for (let i = 0; i < secondLev.length; i++) {
        var child = secondLev[i]
        for (let j = 0; j < topLev.length; j++) {
          let top = topLev[j]
          // 字节点的pid应该等于父节点的_id
          if (child.pid == top.id) {
            top.children.push(child)
          }
        }
      }

      this.limits = topLev
      console.log(this.limits)
    },
    getLimitCount(id) {
      Http.user_limits(id)
        .then(rst => {
          this.dealTreeData(rst.data.result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUserInfo(id) {
      Http.user_info(id)
        .then(rst => {
          console.log(rst)
          this.user_info = rst.data.result[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    signOut() {
      Vue.localStorage.remove('token')
      Vue.localStorage.remove('exam_record')
      if(Vue.localStorage.get('timer')){
          clearInterval(Vue.localStorage.get('timer'))
      }
      Vue.localStorage.remove('timer')
      Vue.localStorage.remove('maxtime')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style lang="less">
.home {
  height: 100%;
  .container {
    //   margin-bottom: 40px;
    overflow: hidden;
    height: 100%;
    background-image: url(../assets/image/backimg.jpg);
    background-size: 100%;
    background-repeat: no-repeat;

    .header {
      background-color: #000;
      color: #fff;
      text-align: center;
      line-height: 60px;
      position: relative;
      .signout {
        position: absolute;
        right: 20px;
        top: 10px;
        width: 150px;
        line-height: 40px;
        border: 1px solid #fff;
        color: white;
      }
      .title {
        font-size: 30px;
        font-weight: bold;
      }
    }
    .aside {
      width: 20%;
      background-color: #333;
      color: #eee;
      text-align: center;
      line-height: 200px;
      .el-col {
        width: 100%;
        .el-submenu__title {
          min-width: 200px;
        }
      }
    }

    .main {
      background-image: url(../assets/image/backimg2.png);
      background-size: 100%;
      background-repeat: no-repeat;
      background-position-y: 100%;
      background-color: #eee;
      color: #333;
      text-align: center;
    //   .el-form{
    //       background-color: white;
    //       padding: 20px;
    //       border-radius: 20px;
    //   }
    }
  }
}
</style>
