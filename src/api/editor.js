import request from './request';

let ajax = new request();

export default {
    //修改密码
    AlterPass(data){
        return ajax.post('/api/Question/UploadImg',data)
    }
}