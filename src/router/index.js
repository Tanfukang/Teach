import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            redirect: '/classmannagement'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../views/back/Home'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/classmannagement',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../views/back/base/ClassMannagement'),
                    meta: { title: '班级管理' }
                },
                {
                    path: '/StudentMannagement',
                    component: () => import(/* webpackChunkName: "icon" */ '../views/back/base/StudentMannagement.vue'),
                    meta: { title: '学生管理' }
                },
                {
                    path: '/TeacherMannagement',
                    component: () => import(/* webpackChunkName: "table" */ '../views/back/base/TeacherMannagement.vue'),
                    meta: { title: '老师管理' }
                },
                {
                    path: '/ChangePassword',
                    component: () => import(/* webpackChunkName: "tabs" */ '../views/back/base/ChangePassword.vue'),
                    meta: { title: '修改密码' }
                },
                {
                    path: '/Paper',
                    component: () => import(/* webpackChunkName: "form" */ '../views/back/test/Paper.vue'),
                    meta: { title: '老师出卷' }
                },
                {
                    // 试卷管理
                    path: '/PaperMannagement',
                    component: () => import(/* webpackChunkName: "editor" */ '../views/back/test/PaperMannagement.vue'),
                    meta: { title: '试卷管理' }
                },
                {
                    // 安排测试
                    path: '/OnTest',
                    component: () => import(/* webpackChunkName: "markdown" */ '../views/back/test/OnTest.vue'),
                    meta: { title: '安排测试' }
                },
                {
                    // 批阅试卷
                    path: '/ReadPaper',
                    component: () => import(/* webpackChunkName: "upload" */ '../views/back/test/ReadPaper.vue'),
                    meta: { title: '批阅试卷' }
                },
                {
                    // 测试成绩
                    path: '/TestgRade',
                    component: () => import(/* webpackChunkName: "chart" */ '../views/back/test/TestgRade.vue'),
                    meta: { title: '测试成绩' }
                }
            
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../views/back/Login'),
            meta: { title: '登录' }
        }
    ]
});
