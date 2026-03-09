import { defineStore } from "pinia";

import { ref, computed } from "vue";
import axios from "@/utils/axios";

export const useStockBranchStore = defineStore("stock", () => {

    const allBranchStock = ref([])
    const isLoading = ref(false)

    async function fetchStockForAllBranches() {
        isLoading.value = true
        try {
            const response = await axios.get("/api/procurements")
            allBranchStock.value = response.data
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    }

    // Dynamic Filter: Returns a function to filter by branch
    const getStockByBranch = computed(() => {
        return (branchId) => {
            // Safety check: if data isn't an array yet, return an empty array
            if (!Array.isArray(allBranchStock.value)) {
                return [];
            }
            return allBranchStock.value.filter(item => item.branch_id === branchId);
        };
    });

    return {
        allBranchStock,
        isLoading,
        fetchStockForAllBranches,
        getStockByBranch
    }
})