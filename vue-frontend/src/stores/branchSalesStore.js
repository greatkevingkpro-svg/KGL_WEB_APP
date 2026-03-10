import { defineStore } from "pinia";

import { ref, computed } from "vue";
import axios from "@/utils/axios";

export const useSalesBranchStore = defineStore("sales", () => {

    const allBranchSales = ref([])
    const isLoading = ref(false)

    async function fetchSalesForAllBranches() {
        isLoading.value = true
        try {
            const response = await axios.get("/api/sales")
            // alert("your request was successfully")
            allBranchSales.value = response.data.data || response.data;
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    }

    // Dynamic Filter: Returns a function to filter by branch
    const getSalesByBranch = computed(() => {
        return (branchId) => {
            // Safety check: if data isn't an array yet, return an empty array
            if (!Array.isArray(allBranchSales.value)) {
                return [];
            }
            return allBranchSales.value.filter(item => item.branch_id === branchId);
        };
    });

    return {
        allBranchSales,
        isLoading,
        fetchSalesForAllBranches,
        getSalesByBranch
    }
})



export const useCreditSalesBranchStore = defineStore("credit-sales", () => {
    const allCreditSales = ref([])
    const isLoading = ref(false)

    async function fetchCreditSalesForBranches() {
        isLoading.value = true
        try {
            const response = await axios.get("/api/credit-sales")
            // alert("your request was successfully")
            allBranchSales.value = response.data.data || response.data;
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    }

    // Dynamic Filter: Returns a function to filter by branch
    const getCreditSalesByBranch = computed(() => {
        return (branchId) => {
            // Safety check: if data isn't an array yet, return an empty array
            if (!Array.isArray(allCreditSales.value)) {
                return [];
            }
            return allCreditSales.value.filter(item => item.branch_id === branchId);
        };
    });

    return {
        allCreditSales,
        isLoading,
        fetchCreditSalesForBranches,
        getCreditSalesByBranch
    }
})