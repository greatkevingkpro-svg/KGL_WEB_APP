import { defineStore } from "pinia";

import { ref, computed } from "vue";
import axios from "@/utils/axios";

export const useStockBranchStore = defineStore("stock", () => {

    const allBranchStock = ref([])
    const isLoading = ref(false)

    async function fetchStockForAllBranches() {
        isLoading.value = true
        try {
            const response = await axios.get(`/api/stocks?t=${new Date().getTime()}`);
            // Force a new array reference to trigger Vue's reactivity
            const freshData = response.data.data || response.data;
            allBranchStock.value = [...freshData];
        } catch (error) {
            console.log("Error fetching stock:", error);
            allBranchStock.value = [];
        } finally {
            isLoading.value = false
        }
    }

    // Dynamic Filter: Returns a function to filter by branch
    const getStockByBranch = computed(() => {
        return (branchName) => {
            // Safety check: if data isn't an array yet, return an empty array
            if (!Array.isArray(allBranchStock.value)) {
                return [];
            }
            return allBranchStock.value.filter(item => item.branch === branchName);
        };
    });

    return {
        allBranchStock,
        isLoading,
        fetchStockForAllBranches,
        getStockByBranch
    }
})