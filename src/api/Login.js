import request from './request';

let ajax = new request();

export default ({
    Login(params){
        return ajax.get('/api/OAuth/authenticate',params)
    }
})