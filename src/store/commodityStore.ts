import {defineStore} from "pinia";
import {ref} from "vue";
import httpInstance from "../requests/http.ts";


export const useCommodityStore = defineStore("commodityStore", () => {
    interface goodsType{
        id:string;
        name:string;
        price:number;
        image:string;
        categoryId:string;
    }

    interface reqType {
        code: number;
        data: goodsType[];
        success: boolean;
        message: string | null;
        total_pages: number;
    }

    const resResponse = ref<reqType>();
    const goods = ref<goodsType[]>();

    const getGoodsList = async (categoryId: number, page: number) => {
        const resp = await httpInstance.get<reqType>(`v1/product/${categoryId}?page=${page}`);
        resResponse.value = resp.data
        goods.value = resp.data.data;
    };

    return {
        getGoodsList,
        goods,
        resResponse
    }

})



















