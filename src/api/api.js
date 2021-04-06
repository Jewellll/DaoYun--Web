import axios from 'axios';
import http from '../store/http'


let base = ''; //http://localhost:8443/api

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return http.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return http.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return http.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return http.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return http.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return http.get(`${base}/user/add`, { params: params }); };

//教师管理
export const getTeacherListPage = params => { return http.get(`${base}/teacher/listpage`, { params: params }); };

export const editTeacher = params => { return http.get(`${base}/teacher/edit`, { params: params }); };

export const addTeacher = params => { return http.get(`${base}/teacher/add`, { params: params }); };

export const removeTeacher = params => { return http.get(`${base}/teacher/remove`, { params: params }); };

export const batchRemoveTeacher = params => { return http.get(`${base}/teacher/batchremove`, { params: params }); };

