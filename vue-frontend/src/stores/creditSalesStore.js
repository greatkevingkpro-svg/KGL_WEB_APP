import { defineStore } from "pinia";
import { ref } from "vue";

import axios from "@/utils/axios";

export const useCreditSalesStore = defineStore("credit-sales", 
    () => {
        const creditSales = ref([])
        const error = ref(null);

        // record new credit sale
        async function recordNewCreditSale(creditSalesData) {
            error.value = null;

            try {
                const response = await axios.post("/api/credit-sales", creditSalesData);

                // add new credit sale to the list
                creditSales.value.push(response.data);

                alert("New Credit Sale created successful")

                return response.data;
            } catch (err) {
                error.value = err.response?.data?.message || err.message;
                console.log(err)
            }
        }

        return {
            creditSales,
            error,
            recordNewCreditSale
        }
        
    },
    {
        persist: true
    }
);