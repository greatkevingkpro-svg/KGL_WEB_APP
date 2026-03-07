import { defineStore } from "pinia";

import { ref } from "vue";
import axios from "@/utils/axios";

export const useStockBranchStore = defineStore("stock", () => {

    const allBranchStock = ref({})
    const isLoading = ref(false)

    async function fetchStockForAllBranches() {
        isLoading.value = true
        try {
            const response = await axios.get("/api/procurements")
            allBranchStock.value = response.data
        } catch(error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    }

    return {allBranchStock, isLoading, fetchStockForAllBranches}
})