// import axios from '@/http'
import axios from 'axios'
let  host = 'http://127.0.0.1:8000';
export const Login = params => {
  return axios.post(`${host}/login/`, params)
};

//获取用户信息
export const getUserDetail = () => { return axios.get(`${host}/api/users/1/`) }

//修改用户信息
export const updateUserInfo = params => { return axios.patch(`${host}/api/users/1/`, params) }


//添加主机
export const addHost = params => {return axios.post(`${host}/api/assets/`, params)}

//删除主机api/
export function delHost(id)  {
  return axios({
    url:`${host}/api/assets/`+id+'/',
    method:'delete',
    })
}

//修改主机信息
export function updateHost(id, params) {
  return axios({
    url: `${host}/api/assets/` + id + '/',
    method:'putch',
    params
  })
}

//获取主机列表信息
export function getHosts(params) {
  return axios({
    url: `${host}/api/assets/`,
    method: 'get',
    params
  })
}



export function addIdc(data) {
  return axios({
    url: `${host}/api/idc/`,
    method: 'post',
    data
  })
}
//获取机房信息
export const getIdcs = () => { return axios.get(`${host}/api/idc/`) }

export function putIdc(id, data) {
  return axios({
    url: `${host}/api/idc/` + id + '/',
    method: 'put',
    data
  })
}

export function deleteIdc(id) {
  return axios({
    url: `${host}/api/idc/` + id + '/',
    method: 'delete'
  })
}


export function addRole(data) {
  return axios({
    url: `${host}/api/role/`,
    method: 'post',
    data
  })
}
//获取角色信息
export const getIRoles = () => { return axios.get(`${host}/api/role/`) }

export function putRole(id, data) {
  return axios({
    url: `${host}/api/role/` + id + '/',
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return axios({
    url: `${host}/api/role/` + id + '/',
    method: 'delete'
  })
}


export function addBusinessUnit(data) {
  return axios({
    url: `${host}/api/businessunit/`,
    method: 'post',
    data
  })
}
//获取角色信息
export const getBusinessUnits = () => { return axios.get(`${host}/api/businessunit/`) }

export function putBusinessUnit(id, data) {
  return axios({
    url: `${host}/api/businessunit/` + id + '/',
    method: 'put',
    data
  })
}

export function deleteBusinessUnit(id) {
  return axios({
    url: `${host}/api/businessunit/` + id + '/',
    method: 'delete'
  })
}
