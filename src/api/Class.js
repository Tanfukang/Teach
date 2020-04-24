import request from './request';

let ajax = new request();

export default ({
    // 获取所有的班级信息
    ClassAll(params){
        return ajax.get('/api/Class/GetAllClass',params)
    },
    //获取所有课程
    AllCourse(params){
        return ajax.get('/api/Class/GetAllCourse',params)
    },
    //获取所有老师
    Allteacher(params){
        return ajax.get('/api/User/GetTeachers',params)
    },
    //添加班级
    AddClass(data){
        return ajax.post('/api/Class/AddClass',data)
    },
    //修改班级
    AlterClass(data){
        return ajax.post('/api/Class/ModifyClass',data)
    }
})