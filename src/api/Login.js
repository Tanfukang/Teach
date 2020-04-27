import request from './request';

let ajax = new request();

export default {
    //登陆
    Login(params){
        return ajax.get('/api/OAuth/authenticate',params)
    }
}