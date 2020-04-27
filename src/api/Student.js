import request from './request';

let ajax = new request();

export default{
    // 所有班级信息
    AllClass(params){
        return ajax.get('/api/Class/GetAllClass',params)
    },
    // 班级所有信息
    ClassAll(params){
        return ajax.get('/api/Student/GetClassStudent',params)
    },
    //添加学生
    AddStudent(data){
        return ajax.post('/api/Student/AddStudent',data)
    },
    //删除学生
    DeleteStudent(params){
        return ajax.get('/api/Student/RemoveStudent',params)
    },
    //修改学生
    AlterStudent(data){
        return ajax.post('/api/Student/ModifyStudent',data)
    } 
}