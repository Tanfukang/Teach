import request from './request';

let ajax = new request();

export default {
    //获取所有角色
    allRole(params){
        return ajax.get('/api/UserType/GetUserRoles',params)
    },
    //添加角色
    addRole(data){
        return ajax.post('/api/UserType/AddUserRole',{},data)
    },
    //删除角色
    DeleteRole(data){
        return ajax.post('/api/UserType/RemoveUserRole',{},data)
    },
    //修改角色名
    AlterRole(data){
        return ajax.post('/api/UserType/ModifyUserRole',{},data)
    },
    //角色排序
    OrderRole(data){
        return ajax.post('/api/UserType/OrderUserRoleNo',data)
    }
}