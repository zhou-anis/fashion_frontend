import axios from "axios";
import useUserStore from "../store/userStore.ts";
import router from "../route";
import { ElMessage } from 'element-plus'


// 创建http请求实例
const httpInstance = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 5000,
})

// 请求拦截器

httpInstance.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        const token = userStore.userInfo?.token;
        if (token) {
            config.headers.Authorization = `FH ${token}`;
        }
        else {
            console.log("No user found");
        }
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

        const userStore = useUserStore();

        if (error.response.status === 401) {
            console.log(error.status);
            userStore.logout();
            router.push("/login");
            ElMessage.warning('请先登录')
        }
        return Promise.reject(error);
    }
)


export default httpInstance;








