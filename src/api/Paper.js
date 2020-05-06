import request from './request';

let ajax = new request();

export default {
    //获取问题的类型
    problemTypes(params){
        return ajax.get('/api/TestPaper/GetQuestionType',params)
    },
    //制作试卷
    makePaper(params,data){
        return ajax.post('/api/TestPaper/MakeTestPaper',params,data)
    },
    //添加题目到试卷
    addTopic(data){
        return ajax.post('/api/TestPaper/AddQuestionToTestPaper',data)
    },
    //获取试卷信息
    getPaperInfo(params){
        return ajax.get('/api/TestPaper/GetTestPaper',params)
    },
    //获取所有的试卷
    getPaper(params){
        return ajax.get('/api/TestPaper/GetTestPaper',params)
    },
    //修改试卷内容
    changePaper(data){
        return ajax.post('/api/TestPaper/AddQuestionToTestPaper',data)
    },
    // 修改分值
    changeScorer(data){
        return ajax.post('/api/TestPaper/ModifyScore',data)
    },
    //从试卷上删除题目
    deleteTopic(data){
        return ajax.post('/api/TestPaper/RemoveQuestionFromTestPaper',data)
    },
    //修改题目
    deleteTopic(data){
        return ajax.post('/api/TestPaper/ModifyQuestion',data)
    },
    //分页获取试卷列表
    getPaperList(params){
        return ajax.get('/api/TestPaper/GetTestPaperList',params)
    },
    //删除试卷
    deletPaper(data){
        return ajax.post('/api/TestPaper/RemoveTestPaper',data)
    },
    //安排测试任务
    planTest(data){
        return ajax.post('/api/TestPaper/SetTest',data)
    },
    //分页获取测试任务表
    getTest(params){
        return ajax.post('/api/TestPaper/GetTestTask',params)
    },
    //删除测试任务
    deleteTest(data){
        return ajax.post('/api/TestPaper/RemoveTestTask',data)
    },
    //修改测试任务,修改试卷，班级，测试时间
    changeAll(data){
        return ajax.post('/api/TestPaper/ModifyTestTask',data)
    }
}