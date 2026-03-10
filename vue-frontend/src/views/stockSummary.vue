<script setup>

import "../assets/custom-styles/main.css";

import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStockBranchStore } from "@/stores/stockBranchStore";

const branchesStock = useStockBranchStore();

const { allBranchStock, isLoading } = storeToRefs(branchesStock);

onMounted(() => {
    branchesStock.fetchStockForAllBranches();
})

// 1. Create computed properties for each branch
// Change "Maganjo" and "Matugga" to match exactly what is in database 'branch' field
const maganjoData = computed(() => {
    // Safety check: ensure we are filtering an array
    const dataArray = Array.isArray(allBranchStock.value) ? allBranchStock.value : [];

    return branchesStock.getStockByBranch('Maganjo');
});

const matuggaData = computed(() => {
    // if (!branchesStock.allBranchStock) {
    //     return [];
    // }
    // Safety check: ensure we are filtering an array
    const dataArray = Array.isArray(allBranchStock.value) ? allBranchStock.value : [];

    return branchesStock.getStockByBranch('Matugga');
});

const getStatus = (tonnage) => {
    if (tonnage <= 0) {
        return { label: 'Out of Stock', class: 'bg-danger text-white' };
    } else if (tonnage < 1000) {
        return { label: 'Low Stock', class: 'bg-warning text-dark' };
    } else {
        // 1000 or above
        return { label: 'Available', class: 'bg-success text-white' }; 
    }
};


</script>

<template>

    <!-- MAIN CONTENT -->
    <div class="content w-100">
        <h3 class="mb-4">Maganjo Branch</h3>

        <!-- stock Table -->
        <table id="maganjoTable" class="table table-striped table-success table-hover rounded">
            <thead>
                <tr>
                    <th>Produce</th>
                    <th>Tonnage</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in maganjoData" :key="item._id">
                    <td>{{ item.produceName }}</td>

                    <td>{{ item.tonnage }}</td>

                    <td>{{ item.sellingPrice }}</td>
                    <td>
                        <!-- Dynamic Status Badge -->
                        <span class="badge" :class="getStatus(item.tonnage).class">
                            {{ getStatus(item.tonnage).label }}
                        </span>
                    </td>
                </tr>
                <tr v-if="branchesStock.isLoading">
                    <td colspan="4" class="text-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </td>
                </tr>
                <tr v-if="maganjoData.length === 0 && !branchesStock.isLoading">
                    <td colspan="4" class="text-center">No stock found for Maganjo.</td>
                </tr>
            </tbody>
        </table>
    </div>


    <div class="content w-100">
        <h3 class="mb-4">Matugga Branch</h3>

        <!-- Users Table -->
        <table id="matuggaTable" class="table table-striped table-success table-hover rounded">
            <thead>
                <tr>
                    <th>Produce</th>

                    <th>Tonnage</th>

                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody id="usersTableBody">
                <tr v-for="item in matuggaData" :key="item._id">
                    <td>{{ item.produceName }}</td>

                    <td>{{ item.tonnage }}</td>

                    <td>{{ item.sellingPrice }}</td>
                    <td>
                        <!-- Dynamic Status Badge -->
                        <span class="badge" :class="getStatus(item.tonnage).class">
                            {{ getStatus(item.tonnage).label }}
                        </span>
                    </td>
                </tr>
                <tr v-if="branchesStock.isLoading">
                    <td colspan="4" class="text-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </td>
                </tr>
                <tr v-if="matuggaData.length === 0 && !branchesStock.isLoading">
                    <td colspan="4" class="text-center">No stock found for Matugga.</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<style></style>