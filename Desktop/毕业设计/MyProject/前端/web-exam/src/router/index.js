import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// 权限路由
import Limit from '../views/limitRouter/Limit.vue'
import LimitAdd from '../views/limitRouter/LimitAdd.vue'
// 角色路由
import Role from '../views/roleRouter/Role.vue'
import RoleAdd from '../views/roleRouter/RoleAdd.vue'
//用户路由
import UserAdd from '../views/userRouter/UserAdd.vue'
import User from '../views/userRouter/User.vue'
//班级路由
import ClassAdd from '../views/classRouter/ClassAdd.vue'
import Class from '../views/classRouter/Class.vue'
//考试路由
import ExamAdd from '../views/examRouter/ExamAdd.vue'
import Exam from '../views/examRouter/Exam.vue'
import ExamManage from '../views/examRouter/ExamManage.vue'
import ExamAddSubject from '../views/examRouter/ExamAddSubject.vue'
//题目路由
import SubjectAdd from '../views/subjectRouter/SubjectAdd.vue'
import Subject from '../views/subjectRouter/Subject.vue'

//学生参与考试路由
import ExamList from '../views/studentRouter/ExamList.vue'
import EnterExam from '../views/studentRouter/EnterExam.vue'
import RecordList from '../views/studentRouter/RecordList.vue'
import RecordDetail from '../views/studentRouter/RecordDetail.vue'
import Record from '../views/studentRouter/Record.vue'


//登录路由
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      //权限路由
      {
        path: '/limit',
        name: 'Limit',
        component: Limit
      },
      {
        path: '/limitAdd',
        name: 'LimitAdd',
        component: LimitAdd
      },
      //角色路由
      {
        path: '/role',
        name: 'Role',
        component: Role
      },
      {
        path: '/roleadd',
        name: 'RoleAdd',
        component: RoleAdd
      },
      //用户路由
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/useradd',
        name: 'UserAdd',
        component: UserAdd
      },
      //班级路由
      {
        path: '/class',
        name: 'Class',
        component: Class
      },
      {
        path: '/classadd',
        name: 'ClassAdd',
        component: ClassAdd
      },
      //考试路由
      {
        path: '/exam',
        name: 'Exam',
        component: Exam
      },
      {
        path: '/examadd',
        name: 'ExamAdd',
        component: ExamAdd
      },
      {
        path: '/exammanage',
        name: 'ExamManage',
        component: ExamManage
      },
      {
        path: '/examaddsubject',
        name: 'ExamAddSubject',
        component: ExamAddSubject
      },

      //学生参与考试路由
      {
        path: '/examlist',
        name: 'ExamList',
        component: ExamList
      },
      {
        path: '/enterexam',
        name: 'EnterExam',
        component: EnterExam
      },
      {
        path: '/recordlist',
        name: 'RecordList',
        component: RecordList
      },
      {
        path: '/recorddetail',
        name: 'RecordDetail',
        component: RecordDetail
      },
      {
        path: '/record',
        name: 'Record',
        component: Record
      },
      //题目路由
      {
        path: '/subject',
        name: 'Subject',
        component: Subject
      },
      {
        path: '/subjectadd',
        name: 'SubjectAdd',
        component: SubjectAdd
      },
      {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
      }

    ]
  },
  //   登录
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

// 登录拦截
router.beforeEach((to, from, next) => {
  // 判断localStorage中是否有token，如果有则继续后面的页面请求，否则没有，没有的话，访问的是登录页面则继续访问，如果既没有token且访问的也不是登录页面，则拦截，跳转到登录页面
  let token = Vue.localStorage.get('token')
  if (token) {
    next()
  } else if (to.path != '/login'&&to.path != '/register' ) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
export default router
