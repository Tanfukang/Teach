import request from './request';

let ajax = new request();

export default {
    //修改密码
    AlterPass(params){
        return ajax.get('/api/User/ModifyPassword',params)
    }
}