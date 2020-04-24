import axios from 'axios';
import router from '../router/index';
import Cookies from '../utils/Cookie';
import Base64 from '../utils/Base64';

axios.defaults.baseURL = 'http://192.168.1.188:12';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;


export const request = (config) => {
    return axios(config);
};

async function TokenData(config,cookies){
    let _this = this;
    let Userpwd = JSON.parse(Base64.decode(cookies));
    return await request({
        url: '/api/OAuth/authenticate',
        method: 'GET',
        params: {
            userMobile: Userpwd.username,
            userPassword: Userpwd.password
        }
    })
    .then(res=>{
        let userToken = res.data.token_type + ' ' + res.data.access_token;
        localStorage.setItem('userToken', userToken);
      
    })
    return axios(config);
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
                        localStorage.removeItem('user')
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
        console.log(error);
        return Promise.reject(error.response.data);
    }
);