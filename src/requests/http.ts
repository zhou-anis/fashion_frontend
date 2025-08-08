import axios from "axios";

// 创建http请求实例
const httpInstance = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 5000,
})

// 请求拦截器

httpInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
)

// 响应拦截器
httpInstance.interceptors.response.use(
    res => {
        return res;
    },
    (error) => {
        return Promise.reject(error);
    }
)


export default httpInstance;








