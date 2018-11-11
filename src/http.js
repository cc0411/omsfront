import axios from 'axios'
import route from './router'
import store from './store/store';

//request拦截器，判断是否有token  存在再每个header上加token
axios.interceptors.request.use(config=> {
  // this.$Spin.show();
  if (localStorage.token) {
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
    // this.$Spin.hide()
    return response
  }, error =>{
    // 错误提醒
    console.log(error)
    this.$Message.error(error.response.data)
    const { status } = error.response
    if (status == 401) {
      this.$Message.error('token值无效，请重新登录')
      // 清除token
      localStorage.removeItem('token')

      // 页面跳转
      router.push('/login')
    }

    return Promise.reject(error)
  })


export default axios
