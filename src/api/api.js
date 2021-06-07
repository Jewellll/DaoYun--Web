import axios from 'axios';
import http from '../store/http'


let base = ''; //http://localhost:8443/api

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const requestPhoneLogin = params => { return axios.post(`${base}/phoneLogin`, params).then(res => res.data); };

export const requestMss = params => { return axios.post(`${base}/sendMss`, params).then(res => res.data); };

export const editUserInfo = params => { return axios.post(`${base}/editUser`, params).then(res => res.data); };

export const requireRegister = params => { return axios.post(`${base}/register`, params).then(res => res.data); };

//用户管理

export const getUserListPage = params => { return http.post(`${base}/user/listpage`, params); };

export const removeUser = params => { return http.post(`${base}/user/remove`, params ).then(res => res.data); };

export const batchRemoveUser = params => { return http.post(`${base}/user/batchremove`, params ).then(res => res.data); };

export const editUser = params => { return http.post(`${base}/user/edit`,  params ).then(res => res.data); };

export const addUser = params => { return http.post(`${base}/user/add`,  params ).then(res => res.data); };

//教师管理
export const getTeacherListPage = params => { return http.post(`${base}/teacher/listpage`, params); };

export const editTeacher = params => { return http.post(`${base}/teacher/edit`,  params); };

export const addTeacher = params => { return http.post(`${base}/teacher/add`,  params); };

export const removeTeacher = params => { return http.post(`${base}/teacher/remove`,  params); };

export const batchRemoveTeacher = params => { return http.post(`${base}/teacher/batchremove`,  params); };

//学生管理
export const getStudentListPage = params => { return http.post(`${base}/student/listpage`,  params); };

export const editStudent = params => { return http.post(`${base}/student/edit`,  params ); };

export const addStudent = params => { return http.post(`${base}/student/add`,  params ); };

export const removeStudent = params => { return http.post(`${base}/student/remove`,  params); };

export const batchRemoveStudent = params => { return http.post(`${base}/student/batchremove`,  params); };

//课程管理
export const getCourseListPage = params => { return http.post(`${base}/course/listpage`,  params ); };

export const editCourse = params => { return http.post(`${base}/course/edit`,  params); };

export const addCourse = params => { return http.post(`${base}/course/add`,  params); };

export const removeCourse = params => { return http.post(`${base}/course/remove`,  params); };

export const batchRemoveCourse = params => { return http.post(`${base}/course/batchremove`, params ); };

//字典管理

export const getDictory = params => { return http.post(`${base}/dictionaries/dicName`,  params ).then(res => res.data);; };

export const getDicListPage = params => { return http.post(`${base}/dictionaries/listpage`,  params ).then(res => res.data);; };

export const getDicDetail = params => { return http.post(`${base}/dictionaries/dicDetail`,  params ).then(res => res.data); };

export const editDic = params => { return http.post(`${base}/dictionaries/code`, params ).then(res => res.data); };

export const addDic = params => { return http.post(`${base}/dictionaries/id`,  params ).then(res => res.data); };

export const removeDic = params => { return http.post(`${base}/dictionaries/remove`,  params).then(res => res.data); };

export const removeDicDetail = params => { return http.post(`${base}/dictionaries/removeDic`,  params).then(res => res.data); };

export const batchRemoveDic = params => { return http.post(`${base}/dictionary/batchremove`,  params ).then(res => res.data); };

export const editDictionary = params => { return http.post(`${base}/dictionary/edit`, params ).then(res => res.data); };

//系统参数管理

export const getParaListPage = params => { return http.post(`${base}/systemManage/listpage`,  params); };

export const editPara = params => { return http.post(`${base}/systemManage/edit`,  params ); };

export const addPara = params => { return http.post(`${base}/systemManage/add`,  params ); };

export const removePara = params => { return http.post(`${base}/systemManage/remove`, params); };

export const batchRemovePara = params => { return http.post(`${base}/systemManage/batchremove`,  params ); };

