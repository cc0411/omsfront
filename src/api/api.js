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
export function addHost(params) {
  return axios({
    url:`${host}/api/assets/`,
    method:'post',
    params
  })

}
//删除主机api/
export function delHost(id)  {
  return axios({
    url:`${host}/api/assets/`+assetsId+'/',
    method:'delete',
    })
}

//修改主机信息
export function updateHost(id, params) {
  return axios({
    url: `${host}/api/assets/` + assetsId + '/',
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

export function getIdcs(query) {
  return axios({
    url: `${host}/api/idc/`,
    method: 'get',
    params: query
  })
}

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
