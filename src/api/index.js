import vue from '../main'
import router from '../router/index'
import axios from 'axios';
import Cookie from '../util/Cookie'
let Base64 = require("js-base64").Base64;


function HttpRequest (baseUrl,config) {
  // let that = this;
      // 基路径
      let _baseUrl = baseUrl || {};//不传值默认为空
      //配置信息
      // let _config = config || {};
      // console.log(_config)
      //构建axios实例
      var _axios = axios.create(config);
      //设置基路径
      _axios.defaults.baseURL = _baseUrl;

  //设置api的前缀
  _axios.defaults.baseURL = "http://192.168.1.188:12/";
  //请求前附令牌
  _axios.interceptors.request.use((config) => {
    config.headers.Authorization = Cookie.getCookie('token');/**附令牌到请求头 */
    return config;
  }, (error) => Promise.reject(error))

  /**GET请求方式 */
  this.get = (url, queryObj) => {
    let index = url.indexOf('?');
    let timespan = new Date().getTime();
    url = (index == -1) ? (url + "?timespan=" + timespan) : (url + "&timespan=" + timespan);
    return _axios.get(url, {
      params: {
        ...(queryObj || {})
      }
    })
  }
  /**POST请求方式 */
  this.post = (url, data, queryObj) => {
    let index = url.indexOf('?');
    let timespan = new Date().getTime();
    url = (index == -1) ? (url + "?timespan=" + timespan) : (url + "&timespan=" + timespan);
    return _axios.post(url, data || {}, {
      params: {
        ...(queryObj || {})
      }
    })
  }

  /**合并请求 */
  this.all = (...data) => {
    return axios.all(data).then(axios.spread((...res) => {
      return res.map((item) => item.data)
    }))
  }
  /**权限管理 响应拦截 */
  _axios.interceptors.response.use((response) => response,
    (error) => {
      const api = error.config.url.toLocaleLowerCase();
      if (error.response.status === 401 && !api.endsWith('/oauth/authenticate')) {
        const result = checkRemember();
        if (result) {
          return reGetToken(result, error);
        }
        reLogin();//重新登录
      }
      return Promise.reject(error);//错误就返回
    }
  )
  /**重新登录 */
  function reLogin() {
    Cookie.removeCookie('token')
    const fullPath = vue.$route.fullPath;
    const path = vue.$route.path
    if ("/login" !== path) {
      router.replace("/login?returnUrl=" + fullPath)
    }
  }
  // /**记住密码和用户名 */
  function checkRemember() {
    var cookie = Cookie.getCookie('cookie');//从cookie获取登录用户信息
    if (cookie) {
      try {
        return JSON.parse(Base64.decode(cookie));//解密 将string转成json格式
      } catch (error) {
        return null;
      }
    }
    return null//没有获取cookie就返回null
  }
  // /**刷新令牌重新获取token */
  async function reGetToken(cookie, error) {
    const res = await _axios.get('/api/OAuth/authenticate', {
      params: {
        userMobile: cookie.userMobile,
        userPassword: cookie.userPassword,
      }
    }).catch(() => {
      /**清空Cookie*/
      Cookie.removeCookie('cookie');
      reLogin()//失败就重新登录
    });
    if (res && res.status == 200 && res.data) {
      const token = `${res.data.token_type} ${res.data.access_token}`;
      Cookie.setCookie("token", token, { maxAge: 60 * 20 });
      const { config } = error;
      return await _axios(config);//重新把token令牌附到请求头
    }
    return Promise.reject(error);
  }

}

export default  HttpRequest;