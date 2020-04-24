import axios from 'axios';
import router from '../router';
import Cookies from '../utils/Cookie';
import Base64 from '../utils/Base64';

export default function request(){

axios.defaults.baseURL = 'http://192.168.1.188:12';      //默认地址
axios.defaults.headers.post['Content-Type'] = 'application/json';   //默认请求头
axios.defaults.timeout = 5000;

  /**GET请求方式 */
  this.get = (url, queryObj) => {
    let index = url.indexOf('?');
    let timespan = new Date().getTime();
    url = (index == -1) ? (url + "?timespan=" + timespan) : (url + "&timespan=" + timespan);
    return axios.get(url, {
      params: {
        ...(queryObj || {})
      }
    })
  }
  /**POST请求方式 */
  this.post = (url, data, queryObj) => {
    let index = url.indexOf('?');
    let timespan = new Date().getTime();
    url = (index == -1) ? (url + "?timespan=" + timespan) : (url + "&timespan=" + timespan);
    return axios.post(url, data || {}, {
      params: {
        ...(queryObj || {})
      }
    })
  }

  /**合并请求 */
  this.all = (...data) => {
    return axios.all(data).then(axios.spread((...res) => {
      return res.map((item) => item.data)
    }))
  }

// 重新刷新token
async function TokenData(config,cookies){
    let _this = this;
    let Userpwd = JSON.parse(Base64.decode(cookies));
    return await axios.get('/api/OAuth/authenticate', {
        params:{
            userMobile: Userpwd.username,
            userPassword: Userpwd.password
        }     
    })
    .then(res=>{
        let userToken = res.data.token_type + ' ' + res.data.access_token;
        localStorage.setItem('userToken', userToken);
      
    })
    .catch(error=>{
        return axios(config);
    })
    
}

//请求拦截器
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('userToken')

        if (token) {
            config.headers.authorization = token
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

//响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response; 
        } else {
            Promise.reject();
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                  let cookies = Cookies.getCookie(('user'))
                    if (cookies) {
                        TokenData(error.config.url,cookies)
                        return axios(error.config)
                    } else {
                        localStorage.removeItem('userToken')
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }
            }
        }
        return Promise.reject(error.response.data);
    }
);
}

