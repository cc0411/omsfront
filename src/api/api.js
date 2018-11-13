import axios from '@/http'

let  host = 'http://127.0.0.1:8000';
export const Login = params => {
  return axios.post(`${host}/login/`, params)
};

//获取用户信息
export const getUserDetail = () => { return axios.get(`${host}/api/users/1/`) }

//修改用户信息
export const updateUserInfo = params => { return axios.patch(`${host}/api/users/1/`, params) }


//添加主机
export const addHosts = params => {return axios.post(`${host}/assets/`, params)}

//删除主机
export const delHosts = addressId => {return axios.delete(`${host}/assets/`+assetsId+'/')}

//修改主机信息
export const updateHosts = (addressId, params) => {return axios.patch(`${host}/assets/`+assetsId+'/', params)}

//获取主机列表
export const getHosts = () => {return axios.get(`${host}/assets/`)}
