import { defineStore } from "pinia";

import { ref } from "vue";
import axios from "@/utils/axios";

export const useSalesBranchStore = defineStore("sales",()=> {
    
    const allBranchSales = ref({})
    const isLoading = ref(false)

    async function fetchSalesForAllBranches() {
        isLoading.value = true
        try {
            const response = await axios.get("/api/sales")
            // alert("your request was successfully")
            allBranchSales.value = response.data
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    }

    return {allBranchSales, isLoading, fetchSalesForAllBranches}
})