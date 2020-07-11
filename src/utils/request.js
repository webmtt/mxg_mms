import axios from "axios";

// 手动创建一个 axios 对象, 参考: https://github.com/axios/axios#creating-an-instance
const request = axios.create({
    // 请求配置参考: https://github.com/axios/axios#request-config
    // 根据不同环境设置 baseURL, 最终发送请求时的URL为: baseURL + 发送请求时写URL ,
    // 比如 get('/test'), 最终发送请求是: /dev-api/test
    // baseURL: '/dev-api',
    // baseURL: '/',
    // 根目录下的 .env.development 与 .env.production 中配置 VUE_APP_BASE_API
    baseURL: process.env.VUE_APP_BASE_API, // "/dev-api"
    timeout: 5000 // 请求超时
})

// request.get('/db.json').then(response => {
//     console.log(response.data);
// })

//请求拦截器
// Add a request interceptor
request.interceptors.request.use(config => {
    // Do something before request is sent
    //请求的拦截
    return config;
}, error => {
    // Do something with request error
    //出现异常
    return Promise.reject(error);
});

//响应拦截器
// Add a response interceptor
request.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default request  //导出自定义创建axios对象