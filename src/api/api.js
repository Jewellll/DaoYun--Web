import axios from 'axios';
import http from '../store/http'

let base = ''; //http://localhost:8443/api

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
// 忘记密码短信验证
export const requestCheck = params => { return axios.post(`${base}/check`, params).then(res => res.data); };

export const requestPhoneLogin = params => { return axios.post(`${base}/phoneLogin`, params).then(res => res.data); };
// 短信
export const requestMss = params => { return axios.post(`${base}/sendMss`, params).then(res => res.data); };
//注册短信
export const registerMss = params => { return axios.post(`${base}/register/sendMss`, params).then(res => res.data); };
// 忘记密码
export const requireForget = params => { return axios.post(`${base}/forget`, params).then(res => res.data); };
// 修改个人信息
export const editUserInfo = params => { return axios.post(`${base}/editUser`, params).then(res => res.data); };
// 注册
export const requireRegister = params => { return axios.post(`${base}/register`, params).then(res => res.data); };

//用户管理

export const getUserListPage = params => { return http.post(`${base}/user/listpage`, params).then(res => res.data); };

export const removeUser = params => { return http.post(`${base}/user/remove`, params ).then(res => res.data); };

export const batchRemoveUser = params => { return http.post(`${base}/user/batchremove`, params ).then(res => res.data); };

export const editUser = params => { return http.post(`${base}/user/edit`,  params ).then(res => res.data); };

export const addUser = params => { return http.post(`${base}/user/add`,  params ).then(res => res.data); };

//教师管理
export const getTeacherListPage = params => { return http.post(`${base}/teacher/listpage`, params).then(res => res.data); };

export const editTeacher = params => { return http.post(`${base}/teacher/edit`,  params).then(res => res.data); };

export const addTeacher = params => { return http.post(`${base}/teacher/add`,  params).then(res => res.data); };

export const removeTeacher = params => { return http.post(`${base}/teacher/remove`,  params).then(res => res.data); };

export const batchRemoveTeacher = params => { return http.post(`${base}/teacher/batchremove`,  params).then(res => res.data); };

//学生管理
export const getStudentListPage = params => { return http.post(`${base}/student/listpage`,  params).then(res => res.data); };

export const editStudent = params => { return http.post(`${base}/student/edit`,  params ).then(res => res.data); };

export const addStudent = params => { return http.post(`${base}/student/add`,  params ).then(res => res.data); };

export const removeStudent = params => { return http.post(`${base}/student/remove`,  params).then(res => res.data); };

export const batchRemoveStudent = params => { return http.post(`${base}/student/batchremove`,  params).then(res => res.data); };

//课程管理
export const getCourseListPage = params => { return http.post(`${base}/course/listpage`,  params ).then(res => res.data); };

export const editCourse = params => { return http.post(`${base}/course/edit`,  params).then(res => res.data); };

export const addCourse = params => { return http.post(`${base}/course/add`,  params).then(res => res.data); };

export const removeCourse = params => { return http.post(`${base}/course/remove`,  params).then(res => res.data); };

export const batchRemoveCourse = params => { return http.post(`${base}/course/batchremove`, params ).then(res => res.data); };

export const changeState = params => { return http.post(`${base}/course/state`, params ).then(res => res.data); };

//字典管理

export const getDictory = params => { return http.post(`${base}/dictionaries/dicName`,  params ).then(res => res.data); };

export const getDicListPage = params => { return http.post(`${base}/dictionaries/listpage`,  params ).then(res => res.data); };

export const saveEdit = params => { return http.post(`${base}/dictionaries/saveEdit`,  params ).then(res => res.data); };

export const getDicDetail = params => { return http.post(`${base}/dictionaries/dicDetail`,  params ).then(res => res.data); };

export const editDic = params => { return http.post(`${base}/dictionaries/code`, params ).then(res => res.data); };

export const addDic = params => { return http.post(`${base}/dictionaries/id`,  params ).then(res => res.data); };

export const removeDic = params => { return http.post(`${base}/dictionaries/remove`,  params).then(res => res.data); };

export const removeDicDetail = params => { return http.post(`${base}/dictionaries/removeDic`,  params).then(res => res.data); };

export const batchRemoveDic = params => { return http.post(`${base}/dictionary/batchremove`,  params ).then(res => res.data); };

export const editDictionary = params => { return http.post(`${base}/dictionary/edit`, params ).then(res => res.data); };

//用户管理

export const getMenuListPage = params => { return http.post(`${base}/menu/listpage`, params).then(res => res.data); };

export const removeMenu = params => { return http.post(`${base}/menu/remove`, params ).then(res => res.data); };

export const batchRemoveMenu = params => { return http.post(`${base}/menu/batchremove`, params ).then(res => res.data); };

export const editMenu = params => { return http.post(`${base}/menu/edit`,  params ).then(res => res.data); };

export const addMenu = params => { return http.post(`${base}/menu/add`,  params ).then(res => res.data); };

//系统参数管理

export const getParaListPage = params => { return http.post(`${base}/systemManage/listpage`,  params).then(res => res.data); };

export const editPara = params => { return http.post(`${base}/systemManage/edit`,  params ).then(res => res.data); };

export const addPara = params => { return http.post(`${base}/systemManage/add`,  params ).then(res => res.data); };

export const removePara = params => { return http.post(`${base}/systemManage/remove`, params).then(res => res.data); };

export const batchRemovePara = params => { return http.post(`${base}/systemManage/batchremove`,  params ).then(res => res.data); };

// 角色管理
//根据用户id找菜单
export const requestMenu = params => { return axios.post(`${base}/role/userMenu`, params).then(res => res.data); };
//根据角色id找菜单
export const requestMenuByRoleId = params => { return axios.post(`${base}/role/roleMenu`, params).then(res => res.data); };

export const getRole = params => { return axios.post(`${base}/role/getRole`, params).then(res => res.data); };


export const getAllMenus = params => { return axios.post(`${base}/role/getMenu`, params).then(res => res.data); };
//根据角色id和菜单id分配菜单
export const distributeMenu = params => { return axios.post(`${base}/role/setMenu`, params).then(res => res.data); };

export const requestAddRole = params => { return axios.post(`${base}/role/add`, params).then(res => res.data); };

export const requestEditRole = params => { return axios.post(`${base}/role/edit`, params).then(res => res.data); };

export const requestRemoveRole = params => { return axios.post(`${base}/role/remove`, params).then(res => res.data); };
