import request from './request';

let ajax = new request();

export default {
    //获取所有角色
    AllUser(params){
        return ajax.get('/api/UserType/GetUserRoles',params)
    },
    //获取所有老师
    AllTeacher(params){
        return ajax.get('/api/User/GetTeachers',params)
    },
    //新增用户
    addUser(data){
        return ajax.post('/api/User/AddTeacher',data)
    },
    //删除老师
    DeleteTeacher(data){
        return ajax.post('/api/User/RemoveTeacher',{},data)
    },
    //修改老师
    AlterTeacher(data){
        return ajax.post('/api/User/ModifyTeacher',data)
    },
    OrderUerRoleNo(data){
        return ajax.post('/api/UserType/OrderUerRoleNo',data)
    },
}