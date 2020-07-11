import Vue from "vue";
import Router from "vue-router";
// 默认导入目录下的 index.vue 文件，等价于 ./views/login/index.vue
import Login from '../views/login'


Vue.use(Router);

export default new Router({
  routes: [
    {
      // 登录页
      path: '/login',
      name: 'login', //路由名称
      component: Login
    }
  ],
});