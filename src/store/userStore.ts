import {defineStore} from "pinia";
import httpInstance from "../requests/http.ts";
import {ref} from "vue";


interface userForm {
    username: string;
    password: string;
}
interface userResponse {
    username: string | null;
    email: string | null;
    token: string;
    is_active: boolean;
}
interface reqResponse {
    code: number;
    message: string;
    success: boolean;
    data: userResponse;
}

// defineStore里面的箭头函数不能加 async !!!!

const useUserStore = defineStore("user", () => {

    const reqInfo = ref<reqResponse | {}>()
    const userInfo = ref<userResponse | {}>()
    const isLogin = ref<boolean>(false);
    const login = async (data: userForm) => {
        const logInRes = await httpInstance.post<reqResponse>("/v1/user/login", data)
        if (logInRes.data.code === 200) {
            isLogin.value = true
            console.log(logInRes.data)
            reqInfo.value = logInRes.data
            userInfo.value = logInRes.data.data
        }
        else {
            console.log('登陆失败')
        }
    }

    const logout = (): void => {
        userInfo.value = {}
        reqInfo.value = {}
        isLogin.value = false
    }

    return {
        isLogin,
        reqInfo,
        userInfo,
        login,
        logout,
    }

}, {
    persist: true
})


export default useUserStore;

