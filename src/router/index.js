import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

 const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            component: () => import('../views/back/Login'),
            meta: { title: '登录' }
        },
        {
            path: '/',
            redirect: '/classmannagement'
        },
        {
            path: '/',
            component: () => import( '../views/back/Home'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/classmannagement',
                    component: () => import( '../views/back/base/ClassMannagement'),
                    meta: { title: '班级管理' }
                },
                {
                    path: '/StudentMannagement',
                    component: () => import('../views/back/base/StudentMannagement.vue'),
                    meta: { title: '学生管理' }
                },
                {
                    path: '/UserMannagement',
                    component: () => import( '../views/back/base/UserMannagement.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/RoleMannagement',
                    component: () => import( '../views/back/base/RoleMannagement.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/ChangePassword',
                    component: () => import( '../views/back/base/ChangePassword.vue'),
                    meta: { title: '修改密码' }
                },
                {
                    path: '/Paper',
                    component: () => import( '../views/back/test/Paper.vue'),
                    meta: { title: '老师出卷' }
                },
                {
                    // 试卷管理
                    path: '/PaperMannagement',
                    component: () => import('../views/back/test/PaperMannagement.vue'),
                    meta: { title: '试卷管理' }
                },
                {
                    // 安排测试
                    path: '/OnTest',
                    component: () => import('../views/back/test/OnTest.vue'),
                    meta: { title: '安排测试' }
                },
                {
                    // 批阅试卷
                    path: '/ReadPaper',
                    component: () => import( '../views/back/test/ReadPaper.vue'),
                    meta: { title: '批阅试卷' }
                },
                {
                    // 测试成绩
                    path: '/TestgRade',
                    component: () => import('../views/back/test/TestgRade.vue'),
                    meta: { title: '测试成绩' }
                }
            
            ]
        }
    ]
});

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 教学管理系统`;
    const role = localStorage.getItem('userToken');
    if (!role && to.path !== '/login') {
        next('/login');
    }else {
        next();
    }
});

export default  router