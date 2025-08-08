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
        userName: string;
        password: string;
        email: string;
        token: string;
    }
    interface reqResponse {
        code: number;
        message: string;
        status: boolean;
        data: userResponse;
    }
    const reqInfo = ref<reqResponse>()
    const userInfo = ref<userResponse>()
    const login = async (data: userForm) => {
        const logInRes = await httpInstance.post<reqResponse>("v1/user/login", data)
        reqInfo.value = logInRes.data
        userInfo.value = logInRes.data.data
    }
    return {
        reqInfo,
        userInfo,
        login,
    }

}, {
    persist: true
})


export default useUserStore;

