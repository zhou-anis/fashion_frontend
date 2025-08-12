import {defineStore} from "pinia";
import httpInstance from "../requests/http.ts";
import {ref} from "vue";


// defineStore里面的箭头函数不能加 async !!!!

const useUserStore = defineStore("user", () => {
    interface userForm {
        username: string;
        password: string;
    }
    interface userResponse {
        username: string;
        email: string;
        token: string;
    }
    interface reqResponse {
        code: number;
        message: string;
        status: boolean;
        data: userResponse;
    }

    const reqInfo = ref<reqResponse | {}>()
    const userInfo = ref<userResponse | {}>()
    const isLogin = ref<boolean>(false);
    const login = async (data: userForm) => {
        const logInRes = await httpInstance.post<reqResponse>("v1/user/login", data)
        isLogin.value = true
        reqInfo.value = logInRes.data
        userInfo.value = logInRes.data.data
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

