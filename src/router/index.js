import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            redirect: '/ClassMannagement'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../views/back/Home'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/ClassMannagement',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/ClassMannagement.vue'),
                    meta: { title: '班级管理' }
                },
                {
                    path: '/StudentMannagement',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/StudentMannagement.vue'),
                    meta: { title: '学生管理' }
                },
                {
                    path: '/TeacherMannagement',
                    component: () => import(/* webpackChunkName: "table" */ '../components/TeacherMannagement.vue'),
                    meta: { title: '老师管理' }
                },
                {
                    path: '/ChangePassword',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/ChangePassword.vue'),
                    meta: { title: '修改密码' }
                },
                {
                    path: '/Paper',
                    component: () => import(/* webpackChunkName: "form" */ '../components/Paper.vue'),
                    meta: { title: '老师出卷' }
                },
                {
                    // 试卷管理
                    path: '/PaperMannagement',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/PaperMannagement.vue'),
                    meta: { title: '试卷管理' }
                },
                {
                    // 安排测试
                    path: '/OnTest',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/OnTest.vue'),
                    meta: { title: '安排测试' }
                },
                {
                    // 批阅试卷
                    path: '/ReadPaper',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/ReadPaper.vue'),
                    meta: { title: '批阅试卷' }
                },
                {
                    // 测试成绩
                    path: '/TestgRade',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/TestgRade.vue'),
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
