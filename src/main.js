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
import  less  from 'less';
import Cookie from './utils/Cookie.js';
import Base64 from './utils/Base64.js';         //加解密


Vue.prototype.Cookie = Cookie;
Vue.prototype.Base64 = Base64;

Vue.config.productionTip = false;
Vue.use(VueAxios, axios,less);

Vue.use(ElementUI, {
    size: 'small'
});



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');