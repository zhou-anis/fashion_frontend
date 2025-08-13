import {defineStore} from "pinia";
import {ref} from "vue";
import httpInstance from "../requests/http.ts";


export const categoryStore = defineStore("categoryStore", () => {
    interface SecondCateType {
        id: number;
        category_name: string;
        url: string;
        image: string;
        first_category: number;
    }

    interface FirstCateType {
        id: number;
        secondary_category: SecondCateType[];
        name: string;
    }
    interface reqType {
        code: number;
        message: string;
        first_cate_name: string;
        data: FirstCateType[];
        success: boolean;
    }

    const categoryList = ref<reqType>();
    const FirstCateList = ref<FirstCateType[]>();

    const getCategoryList = async () => {
        const res = await httpInstance.get<reqType>("v1/cate/ls");
        categoryList.value = res.data;
        FirstCateList.value = res.data.data;
        console.log(categoryList.value);
    }
    return {
        FirstCateList,
        categoryList,
        getCategoryList,
    }
})





