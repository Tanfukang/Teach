import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.188:12'; 
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (config) => {
  return axios(config);
};

axios.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('userToken')
        
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

axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            //return response.data;
            return response;//那就直接返回这个josn所有数据，不需要做剔除了
        } else {
            Promise.reject();
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
            }
        }
        console.log(error);
        return Promise.reject(error.response.data);
    }
);
