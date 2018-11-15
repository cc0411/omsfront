import axios from 'axios'
import router from './router'
import store from './store/store';
import { Message, Loading } from 'element-ui';

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//request拦截器，判断store中是否有token  存在再每个header上加token
axios.interceptors.request.use(config=> {
  startLoading()

  if (store.state.userInfo.token) {
    config.headers.Authorization = `JWT ${store.state.userInfo.token}`;
  }
  return config;
},error=>{
  return Promise.reject(error);
}
);
//response拦截器
axios.interceptors.response.use(
  response => {
    endLoading()
    return response
  }, error =>{
    // 错误提醒
  if(error.response){
    endLoading()
    switch (error.response.status){
      case 401:
       Message.error('token值无效，请重新登录')
        // 清除token
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        // 页面跳转
        router.push('/login')


    }
  }
    return Promise.reject(error)
  })



// export default axios
