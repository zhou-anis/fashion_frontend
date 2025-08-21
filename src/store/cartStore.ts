// store/cartStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useUserStore from "@/store/userStore.ts";

export interface CartItem {
    key: string          // 唯一 key（商品+规格/颜色）
    productId: number
    name: string
    price: number
    image: string
    spec?: string
    color?: string
    quantity: number
}

type AddPayload = Omit<CartItem, "key">;

export const useCartStore = defineStore("cart", () => {
    const user = useUserStore();

    const userId = user.userInfo.email || "guest";
    const CART_KEY = `cart_items_${userId}`;

    const items = ref<CartItem[]>(JSON.parse(localStorage.getItem(CART_KEY) || "[]"));

    const totalPrice = computed(() =>
        items.value.reduce((s, i) => s + i.price * i.quantity, 0)
    );
    const totalCount = computed(() =>
        items.value.reduce((s, i) => s + i.quantity, 0)
    );

    const persist = () => {
        localStorage.setItem(CART_KEY, JSON.stringify(items.value));
    };

    const addCart = (payload: AddPayload) => {
        const key = `${payload.productId}_${payload.spec || ""}_${payload.color || ""}`;
        const exist = items.value.find((i) => i.key === key);
        if (exist) {
            exist.quantity += payload.quantity;
        } else {
            items.value.push({ ...payload, key });
        }
        persist();
    };

    const updateQuantity = (key: string, qty: number) => {
        const it = items.value.find((i) => i.key === key);
        if (it) {
            it.quantity = Math.max(1, Number(qty) || 1);
            persist();
        }
    };

    const removeItem = (key: string) => {
        items.value = items.value.filter((i) => i.key !== key);
        persist();
    };

    const clear = () => {
        items.value = [];
        persist();
    };

    return {
        items,
        totalPrice,
        totalCount,
        addCart,
        updateQuantity,
        removeItem,
        clear,
    };

});
