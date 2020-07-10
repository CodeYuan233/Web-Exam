import Vue from 'vue'

// 权限接口
const LIMIT_ADD = '/admin/addlimit' //新增权限
const LIMIT_LIST = '/admin/getlimit' //查询权限
const LIMIT_ALLLIST = '/admin/getlimitall' //查询权限
const LIMIT_DEL = '/admin/deletelimit' //删除权限
const LIMIT_UPD = '/admin/updatelimit' //修改权限
const LIMIT_COUNT = '/admin/getlimitcount' //获取权限列表的数量

// 角色接口
const ROLE_ADD = '/admin/addrole' //新增角色
const ROLE_LIST = '/admin/getrole' //分页查询角色列表
const ROLE_ALLLIST = '/admin/getroleall' //查询所有角色
const ROLE_DEL = '/admin/deleterole' //删除角色
const ROLE_COUNT = '/admin/getrolecount' //查询所有角色的条数
const ROLE_UPD = '/admin/updaterole' //更新角色
const ROLE_BYID = '/admin/getrolebyid' //根据id获取角色
const ROLE_MANY = '/admin/getrolemany' //根据id获取角色

// 用户接口
const USER_ADD = '/admin/adduser' //新增用户
const USER_LIST = '/admin/getuser' //用户列表分页查询
const USER_ALLLIST = '/admin/getuserall' //查询所有用户
const USER_DEL = '/admin/deleteuser' //删除用户
const USER_COUNT = '/admin/getusercount' //查询用户列表的条数
const USER_UPD = '/admin/updateuser' //更新用户
const USER_LOGIN = '/admin/login' //用户登录
const USER_REGIST = '/admin/regist' //用户登录
const USER_LIMITS = '/admin/getuserbyid' //获取指定id用户的权限信息
const USER_INFO = '/admin/getuserinfo' //获取指定id用户的信息
const UPDATE_EXPIRES = 'admin/updateexpire' //更新 用户token过期时间

// 班级接口
const CLASS_ADD = '/admin/addclass' //新增班级
const CLASS_LIST = '/admin/getclass' //分页查询班级列表
const CLASS_ALLLIST = '/admin/getclassall' //查询所有班级
const CLASS_DEL = '/admin/deleteclass' //删除班级
const CLASS_UPD = '/admin/updateclass' //更新班级
const CLASS_BYID = '/admin/getclassbyid' //根据id获取班级
const CLASS_MANY = '/admin/getclassmany' //根据id获取班级

// 考试接口
const EXAM_ADD = '/admin/addexam' //新增考试
const EXAM_LIST = '/admin/getexam' //分页查询考试列表
const EXAM_ALLLIST = '/admin/getexamall' //查询所有考试
const EXAM_DEL = '/admin/deleteexam' //删除考试
const EXAM_UPD = '/admin/updateexam' //更新考试
const EXAM_BYID = '/admin/getexambyid' //根据id获取考试
const EXAM_MANY = '/admin/getexammany' //根据id获取考试
const EXAM_ADD_SUBJECT = '/admin/examaddsubject' //给考试添加试题
const EXAM_GET_SUBJECT = '/admin/getexamsubjects' //给考试添加试题
const EXAM_SUBJECT_DEL = '/admin/deleteexamsubject' //删除考试中的题目
const RECORD_ADD = '/admin/addrecord' //添加考试记录
const RECORD_USER_ADD = '/admin/adduserrecord' //添加考试记录
const RECORD_LIST = '/admin/recordlist' //分页查询考试记录
const RECORD_USER_LIST = '/admin/userrecordlist' //分页查询考试记录
const RECORD_LIST_COUNT = '/admin/recordlistcount' //查询所有考试记录
const RECORD_DELETE = '/admin/recorddelete' //查询所有考试记录

// 题目接口
const SUBJECT_FILL_ADD = '/admin/addfillsubject' //新增题目
const SUBJECT_SEL_ADD = '/admin/addselsubject' //新增题目
const SUBJECT_JUDGE_ADD = '/admin/addjudgesubject' //新增题目
const SUBJECT_SEL_UPDATE = '/admin/updateselsubject' //新增题目
const SUBJECT_JUDGE_UPDATE = '/admin/updatejudgesubject' //新增题目
const SUBJECT_FILL_UPDATE = '/admin/updatefillsubject' //新增题目

const SUBJECT_SEL_LIST = '/admin/getselsubject' //分页查询选择题目列表
const SUBJECT_SEL_ALLLIST = '/admin/getselsubjectall' //查询所有选择题目
const SUBJECT_JUDGE_LIST = '/admin/getjudgesubject' //分页查询判断题目列表
const SUBJECT_JUDGE_ALLLIST = '/admin/getjudgesubjectall' //查询所有判断题目
const SUBJECT_FILL_LIST = '/admin/getfillsubject' //分页查询填空题目列表
const SUBJECT_FILL_ALLLIST = '/admin/getfillsubjectall' //查询所有填空题目
const SUBJECT_DEL = '/admin/deletesubject' //删除题目
const SUBJECT_UPD = '/admin/updatesubject' //更新题目
// const SUBJECT_BYID = '/admin/getsubjectbyid' //根据id获取题目
const SUBJECT_MANY = '/admin/getsubjectmany' //根据id获取题目

class Http {
  static common({
    url = '',
    method = 'GET',
    params = {},
    data = {},
    baseURL = '/api'
  } = {}) {
    return Vue.axios({
      url,
      //   method是请求方法
      method,
      //   baseURL将于url做字符串拼接合并
      baseURL,
      //   params是get携带的参数
      params,
      //   data是post携带的参数
      data
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
    })
  }

  /*******************************权限接口********************************** */
  // 新增权限
  static limit_add({ id, pid, limitname, title } = {}) {
    return this.common({
      url: LIMIT_ADD,
      method: 'POST',
      data: { id, pid, limitname, title }
    })
  }
  // 查询权限列表(分页查询)
  static limit_list(currpage) {
    return this.common({
      url: LIMIT_LIST,
      params: { currpage }
    })
  }
  // 查询权限列表（查询所有）
  static limit_alllist() {
    return this.common({
      url: LIMIT_ALLLIST
    })
  }
  // 查询权限列表数量
  static limit_count() {
    return this.common({
      url: LIMIT_COUNT,
      method: 'POST'
    })
  }
  // 删除权限
  static limit_del(id) {
    return this.common({
      url: LIMIT_DEL,
      method: 'POST',
      data: { id }
    })
  }
  // 修改权限
  static limit_upd({ id, pid, limitname, title } = {}) {
    return this.common({
      url: LIMIT_UPD,
      method: 'POST',
      data: { id, pid, limitname, title }
    })
  }
  /*******************************角色接口********************************** */
  // 新增角色
  static role_add({ rolename, limits } = {}) {
    return this.common({
      url: ROLE_ADD,
      method: 'POST',
      data: { rolename, limits }
    })
  }
  // 分页查询角色
  static role_list(currpage) {
    return this.common({
      url: ROLE_LIST,
      params: { currpage }
    })
  }
  // 查询角色列表（查询所有）
  static role_alllist() {
    return this.common({
      url: ROLE_ALLLIST
    })
  }
  //根据id查询角色
  static role_byid(id) {
    return this.common({
      url: ROLE_BYID,
      params: { id }
    })
  }

  // 查询角色列表数量
  static role_count() {
    return this.common({
      url: ROLE_COUNT
    })
  }
  // 删除角色
  static role_del(id) {
    return this.common({
      url: ROLE_DEL,
      method: 'POST',
      data: { id }
    })
  }
  // 修改角色
  static role_upd({ id, rolename, limits } = {}) {
    return this.common({
      url: ROLE_UPD,
      method: 'POST',
      data: { id, rolename, limits }
    })
  }
  //批量查询角色
  static role_many(data) {
    return this.common({
      url: ROLE_MANY,
      method: 'POST',
      data: data
    })
  }

  /*******************************用户接口********************************** */
  // 新增用户
  static user_add({ username, password, role_id } = {}) {
    return this.common({
      url: USER_ADD,
      method: 'POST',
      data: { username, password, role_id }
    })
  }
  // 新增学生用户
  static student_add({
    username,
    password,
    nickname,
    email,
    role_id = 1012//学生用户的id
  } = {}) {
    return this.common({
      url: USER_ADD,
      method: 'POST',
      data: { username, nickname, email, password, role_id }
    })
  }
  // 分页查询用户
  static user_list(currpage) {
    return this.common({
      url: USER_LIST,
      params: { currpage }
    })
  }
  // 查询用户列表（查询所有）
  static user_alllist() {
    return this.common({
      url: USER_ALLLIST
    })
  }
  // 查询用户列表数量
  static user_count() {
    return this.common({
      url: USER_COUNT
    })
  }
  // 删除用户
  static user_del(id) {
    return this.common({
      url: USER_DEL,
      method: 'POST',
      data: { id }
    })
  }
  // 修改用户
  static user_upd({ id, username, password, role_id } = {}) {
    return this.common({
      url: USER_UPD,
      method: 'POST',
      data: { id, username, password, role_id }
    })
  }
  // 用户登录
  static user_login({ username, password } = {}) {
    return this.common({
      url: USER_LOGIN,
      method: 'POST',
      data: { username, password }
    })
  }
  // 用户注册
  static user_regist( username) {
    return this.common({
      url: USER_REGIST,
      method: 'POST',
      data: { username}
    })
  }
  //更新token过期时间
  static update_expire(id, expires) {
    return this.common({
      url: UPDATE_EXPIRES,
      params: { id, expires }
    })
  }
  // 获取用户权限信息
  static user_limits(id) {
    return this.common({
      url: USER_LIMITS,
      params: { id }
    })
  }
  //获取用户信息
  static user_info(id) {
    return this.common({
      url: USER_INFO,
      params: { id }
    })
  }

  /******************************* 班级接口********************************** */
  // 新增班级
  static class_add({ classname, class_info, teacher_id } = {}) {
    return this.common({
      url: CLASS_ADD,
      method: 'POST',
      data: { classname, teacher_id, class_info }
    })
  }
  // 分页查询班级
  static class_list(currpage) {
    return this.common({
      url: CLASS_LIST,
      params: { currpage }
    })
  }
  // 查询班级列表（查询所有）
  static class_alllist() {
    return this.common({
      url: CLASS_ALLLIST
    })
  }
  //根据id查询班级
  static class_byid(id) {
    return this.common({
      url: CLASS_BYID,
      params: { id }
    })
  }
  // 删除班级
  static class_del(id) {
    return this.common({
      url: CLASS_DEL,
      method: 'POST',
      data: { id }
    })
  }
  // 修改班级信息
  static class_upd({ id, classname, teacher_id, class_info } = {}) {
    return this.common({
      url: CLASS_UPD,
      method: 'POST',
      data: { id, classname, teacher_id, class_info }
    })
  }
  //批量查询班级
  static class_many(data) {
    return this.common({
      url: CLASS_MANY,
      method: 'POST',
      data: data
    })
  }

  /******************************* 考试接口********************************** */
  // 新增考试
  static exam_add({
    exam_name,
    start_time,
    end_time,
    exam_info,
    exam_state,
    teacher_id,
    exam_time
  } = {}) {
    return this.common({
      url: EXAM_ADD,
      method: 'POST',
      data: {
        exam_name,
        start_time,
        end_time,
        exam_info,
        exam_state,
        teacher_id,
        exam_time
      }
    })
  }
  static examadd_subject({ exam_id, subject_id, type } = {}) {
    return this.common({
      url: EXAM_ADD_SUBJECT,
      method: 'POST',
      data: { exam_id, subject_id, type }
    })
  }
  // 分页查询考试
  static exam_list(currpage) {
    return this.common({
      url: EXAM_LIST,
      params: { currpage }
    })
  }
  // 查询考试列表（查询所有）
  static exam_alllist() {
    return this.common({
      url: EXAM_ALLLIST
    })
  }
  //根据id查询考试
  static exam_byid(id) {
    return this.common({
      url: EXAM_BYID,
      params: { id }
    })
  }
  // 删除考试
  static exam_del(id) {
    return this.common({
      url: EXAM_DEL,
      method: 'POST',
      data: { id }
    })
  }
  // 修改考试信息
  static exam_upd({
    id,
    teacher_id,
    start_time,
    end_time,
    exam_info,
    exam_name,
    exam_time
  } = {}) {
    return this.common({
      url: EXAM_UPD,
      method: 'POST',
      data: { id, teacher_id, exam_name, start_time, end_time, exam_info ,exam_time}
    })
  }
  //批量查询考试
  static exam_many(data) {
    return this.common({
      url: EXAM_MANY,
      method: 'POST',
      data: data
    })
  }

  //添加考试记录
  static record_add({
    exam_id,
    answer,
    score,
    isright,
    user_id,
    subject_id,
    sign
  } = {}) {
    return this.common({
      url: RECORD_ADD,
      method: 'POST',
      data: {
        exam_id,
        answer,
        score,
        isright,
        user_id,
        subject_id,
        sign
      }
    })
  }
  //添加考试记录显示RECORD_USER_ADD
  static userrecord_add({
    exam_id,
    score,
    myscore,
    user_id,
    exam_name,
    sign,
    user_name
  } = {}) {
    return this.common({
      url: RECORD_USER_ADD,
      method: 'POST',
      data: {
        exam_id,
        score,
        myscore,
        user_id,
        exam_name,
        sign,
        user_name
      }
    })
  }
  //查询考试记录
  static record_listcount({ user_id } = {}) {
    return this.common({
      url: RECORD_LIST_COUNT,
      method: 'POST',
      data: {
        user_id
      }
    })
  }
  static record_list({ currpage,user_id} = {}) {
    return this.common({
      url: RECORD_LIST,
      method: 'POST',
      data: {
        user_id,
        currpage
      }
    })
  }
  static record_detail( sign) {
    return this.common({
      url: RECORD_USER_LIST,
      method: 'POST',
      data: {
        sign
      }
    })
  }
  static record_delete( sign) {
    return this.common({
      url: RECORD_DELETE,
      method: 'POST',
      data: {
        sign
      }
    })
  }
  
  /******************************* 题目接口********************************** */
  // 新增选择题目
  static selsubject_add({
    answer,
    type,
    subject_stem,
    subject_info,
    selectionA,
    selectionB,
    selectionC,
    selectionD,
    score
  } = {}) {
    return this.common({
      url: SUBJECT_SEL_ADD,
      method: 'POST',
      data: {
        type,
        subject_stem,
        subject_info,
        selectionA,
        selectionB,
        selectionC,
        selectionD,
        answer,
        score
      }
    })
  }
  // 新增填空题目
  static fillsubject_add({
    answer,
    type,
    subject_stem,
    subject_info,
    score
  } = {}) {
    return this.common({
      url: SUBJECT_FILL_ADD,
      method: 'POST',
      data: { type, subject_stem, subject_info, answer, score }
    })
  }
  // 新增判断题目
  static judgesubject_add({
    answer,
    type,
    subject_stem,
    subject_info,
    score
  } = {}) {
    return this.common({
      url: SUBJECT_JUDGE_ADD,
      method: 'POST',
      data: { answer, type, subject_stem, subject_info, score }
    })
  }
  //更新题目
  static selsubject_update({
    id,
    answer,
    type,
    subject_stem,
    subject_info,
    selectionA,
    selectionB,
    selectionC,
    selectionD,
    score
  } = {}) {
    return this.common({
      url: SUBJECT_SEL_UPDATE,
      method: 'POST',
      data: {
        id,
        type,
        subject_stem,
        subject_info,
        selectionA,
        selectionB,
        selectionC,
        selectionD,
        answer,
        score
      }
    })
  }
  // 修改填空题目
  static fillsubject_update({
    id,
    answer,
    type,
    subject_stem,
    subject_info,
    score
  } = {}) {
    return this.common({
      url: SUBJECT_FILL_UPDATE,
      method: 'POST',
      data: { id, type, subject_stem, subject_info, answer, score }
    })
  }
  // 修改判断题目
  static judgesubject_update({
    id,
    answer,
    type,
    subject_stem,
    subject_info,
    score
  } = {}) {
    return this.common({
      url: SUBJECT_JUDGE_UPDATE,
      method: 'POST',
      data: { id, answer, type, subject_stem, subject_info, score }
    })
  }

  // 分页查询题目
  static selsubject_list(currpage) {
    return this.common({
      url: SUBJECT_SEL_LIST,
      params: { currpage }
    })
  }
  // 查询题目列表（查询所有）
  static selsubject_alllist() {
    return this.common({
      url: SUBJECT_SEL_ALLLIST
    })
  }
  // 分页查询题目
  static judgesubject_list(currpage) {
    return this.common({
      url: SUBJECT_JUDGE_LIST,
      params: { currpage }
    })
  }
  // 查询题目列表（查询所有）
  static judgesubject_alllist() {
    return this.common({
      url: SUBJECT_JUDGE_ALLLIST
    })
  }
  // 分页查询题目
  static fillsubject_list(currpage) {
    return this.common({
      url: SUBJECT_FILL_LIST,
      params: { currpage }
    })
  }
  // 查询题目列表（查询所有）
  static fillsubject_alllist() {
    return this.common({
      url: SUBJECT_FILL_ALLLIST
    })
  }
  //根据id查询题目
  static subject_byid({ exam_id, type } = {}) {
    return this.common({
      url: EXAM_GET_SUBJECT,
      params: { exam_id, type }
    })
  }
  // 删除题库中题目
  static subject_del(type, id) {
    return this.common({
      url: SUBJECT_DEL,
      method: 'POST',
      data: { type, id }
    })
  }
  // 删除考试中的题目
  static examsubject_del({ type, subject_id, exam_id }) {
    return this.common({
      url: EXAM_SUBJECT_DEL,
      method: 'POST',
      data: { type, subject_id, exam_id }
    })
  }
  // 修改题目信息
  static subject_upd({ id, subjectname, limits } = {}) {
    return this.common({
      url: SUBJECT_UPD,
      method: 'POST',
      data: { id, subjectname, limits }
    })
  }
  //批量查询题目
  static subject_many(data) {
    return this.common({
      url: SUBJECT_MANY,
      method: 'POST',
      data: data
    })
  }
}

export default Http
