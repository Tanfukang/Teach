import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import 'element-ui/lib/theme-chalk/display.css'; //某些条件下隐藏元素
import './assets/css/icon.css';
import 'babel-polyfill';
import Cookie from './utils/Cookie.js';
import Base64 from './utils/Base64.js';
import { request }  from './api/request.js';

Vue.prototype.request = request;
Vue.prototype.Cookie = Cookie;
Vue.prototype.Base64 = Base64;
// Vue.prototype.service = service;



// axios.defaults.baseURL = 'http://192.168.1.188:12' //默认请求地址
// axios.defaults.headers.authorization = 'application/x-www-form-urlencoded' //默认请求头

// let token = sessionStorage.getItem('userToken')
// if (token) {
//     axios.defaults.headers.authorization = token
// }

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.use(ElementUI, {
    size: 'small'
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 教学管理系统`;
    const role = sessionStorage.getItem('userData');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');