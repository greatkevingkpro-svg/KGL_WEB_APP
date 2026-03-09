<script setup>

import "../assets/custom-styles/main.css";

import { onMounted, computed } from "vue";
import { useSalesBranchStore } from "@/stores/branchSalesStore"

const salesForBranches = useSalesBranchStore();

onMounted(() => {
    salesForBranches.fetchSalesForAllBranches();
})

//for madanjo branch
const maganjoData = computed(() => {
    if (!salesForBranches.allBranchSales) {
        return [];
    }

    return salesForBranches.allBranchSales.filter(item => item.branch === 'Maganjo');
});

//for madanjo branch
const matuggaData = computed(() => {
    if (!salesForBranches.allBranchSales) {
        return [];
    }

    return salesForBranches.allBranchSales.filter(item => item.branch === 'Matugga');
});

</script>

<template>

    <!-- MAIN CONTENT -->
    <div class="content w-100">
        <h3 class="mb-4">Maganjo Sales</h3>

        <!-- Users Table -->
        <table id="maganjoSales" class="table table-striped table-success table-hover rounded">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Produce</th>
                    <th>Tonnage (kg)</th>
                    <th>Amount Paid (Ugx)</th>
                    <th>Buyer Name</th>
                    <th>Sales Agent</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in maganjoData" :key="item.id">
                    <td>{{ new Date(item.dateOfSale).toLocaleDateString() }}</td>
                    <td>{{ item.timePurchaseMade }}</td>
                    <td>{{ item.produceName }}</td>
                    <td>{{ item.tonnage }}</td>
                    <td>{{ item.amountPaid }}</td>
                    <td>{{ item.buyerName }}</td>
                    <td>{{ item.salesAgent }}</td>
                </tr>
                <tr v-if="salesForBranches.isLoading">
                    <td colspan="7" class="text-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </td>
                </tr>
                <tr v-if="maganjoData.length === 0 && !salesForBranches.isLoading">
                    <td colspan="7" class="text-center">No sales found for Maganjo.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- MAIN CONTENT -->
    <div class="content w-100">
        <h3 class="mb-4">Matugga Branch</h3>

        <!-- Users Table -->
        <table id="maganjoSales" class="table table-striped table-success table-hover rounded">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Produce</th>
                    <th>Tonnage (kg)</th>
                    <th>Amount Paid (Ugx)</th>
                    <th>Buyer Name</th>
                    <th>Sales Agent</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in matuggaData" :key="item.id">
                    <td>{{ new Date(item.dateOfSale).toLocaleDateString() }}</td>
                    <td>{{ item.timePurchaseMade }}</td>
                    <td>{{ item.produceName }}</td>
                    <td>{{ item.tonnage }}</td>
                    <td>{{ item.amountPaid }}</td>
                    <td>{{ item.buyerName }}</td>
                    <td>{{ item.salesAgent }}</td>
                </tr>
                <tr v-if="salesForBranches.isLoading">
                    <td colspan="7" class="text-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </td>
                </tr>
                <tr v-if="maganjoData.length === 0 && !salesForBranches.isLoading">
                    <td colspan="7" class="text-center">No sales found for Matugga.</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<style></style>