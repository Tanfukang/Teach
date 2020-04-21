import axios from 'axios';

const service = axios.create({
    baseURL: 'http://192.168.1.188:12'
    // timeout: 5000
});

service.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('userToken')
        if(token){
            config.headers.authorization = token
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
