import { defineStore } from "pinia";
import { ref } from "vue";

import axios from "@/utils/axios";

export const useSalesStore = defineStore("sales",
    () => {
        const sales = ref([]);
        const error = ref(null);

        async function recordNewSale(salesData) {
            error.value = null;

            try {
                const response = await axios.post("/api/sales", salesData);

                // add new sales to the list
                sales.value.push(response.data);

                alert("New sale created successful")
                return response.data;
            } catch (err) {
                error.value = err.response?.data?.message || err.message;
                console.log(err);
            }
        }

        return {
            sales,
            error,
            recordNewSale
        };
    }, 
    {
        persist: true
    }
)