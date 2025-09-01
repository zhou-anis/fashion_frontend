import {defineStore} from "pinia";
import httpInstance from "../requests/http.ts";
import {ref} from "vue";

export interface commodity {
    id: number;
    name: string;
    image: string;
    price: number;
}
interface resType {
    code: number;
    data: commodity;
    success: boolean;
}


const useDetailStore = defineStore("detailStore", () => {

    const resp = ref<resType>();
    const item = ref<commodity>();
    const getDetail = async (id: number) => {
        const res = await httpInstance.get<resType>(`/v1/product/${id}`);
        resp.value = res.data
        item.value = res.data.data
    }

    return {
        getDetail,
        resp,
        item,
    }

})

export default useDetailStore;