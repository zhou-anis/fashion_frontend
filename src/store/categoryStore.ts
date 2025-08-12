import {defineStore} from "pinia";
import {ref} from "vue";
import httpInstance from "../requests/http.ts";


export const categoryStore = defineStore("categoryStore", () => {
    interface FirstCateType {
        id: number;
        name: string;
    }

    interface cateType {
        id: number;
        category_name: string;
        image: string;
        url: string;
    }
    interface reqType {
        code: number;
        message: string;
        first_cate_name: string;
        data: cateType[];
        success: boolean;
    }

    const categoryList = ref<reqType>();
    const cateList = ref<cateType[]>();

    const getCategoryList = async () => {
        const res = await httpInstance.get<reqType>("v1/cate/ls");
        categoryList.value = res.data;
        cateList.value = res.data.data;
        console.log(categoryList.value);
    }
    return {
        cateList,
        categoryList,
        getCategoryList,
    }
})





