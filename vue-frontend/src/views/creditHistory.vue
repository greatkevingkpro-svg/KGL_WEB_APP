<script setup>

import "../assets/custom-styles/main.css";

import { onMounted, computed } from "vue";
import { useCreditSalesBranchStore } from "@/stores/branchSalesStore"

const creditSalesForBranches = useCreditSalesBranchStore();

onMounted(() => {
    creditSalesForBranches.fetchCreditSalesForBranches();
});


//for madanjo branch
const maganjoCreditData = computed(() => {
    if (!creditSalesForBranches.allCreditSales) {
        return [];
    }

    return creditSalesForBranches.allCreditSales.filter(item => item.branch === "Maganjo");
});

//for matugga branch
const matuggaCreditData = computed(() => {
    if (!creditSalesForBranches.allCreditSales) {
        return [];
    }

    return creditSalesForBranches.allCreditSales.filter(item => item.branch === 'Matugga');
});


const getTheStatus = (amountDue) => {
    if (amountDue <= 100000) {
        return { label: 'Average', class: 'bg-warning text-dark' };
    } else if (amountDue <= 1000000) {
        return { label: 'High', class: 'bg-warning text-dark' };
    } else if (amountDue < 2000000) {
        return { label: 'Very High', class: 'bg-danger text-white' }; 
    } else {
        return { label: 'Critical', class: 'bg-dark text-white' };
    }
};


</script>

<template>

    <!-- MAIN CONTENT -->
    <div class="content w-100">
        <h3 class="mb-4">Maganjo Credit Sales</h3>

        <!-- Users Table -->
        <table id="maganjoSales" class="table table-striped table-success table-hover rounded">
            <thead>
                <tr>
                    <th>Buyer Name</th>
                    <th>National ID</th>
                    <th>Contact</th>
                    <th>Dispatch Date</th>
                    <th>Produce</th>
                    <th>Tonnage (kg)</th>
                    <th>Amount Due (Ugx)</th>
                    <th>Due Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in maganjoCreditData" :key="item.id">
                    <td>{{ item.buyerName }}</td>
                    <td>{{ item.nationalId }}</td>
                    <td>{{ item.contact }}</td>
                    <td>{{ new Date(item.dispatchDate).toLocaleDateString() }}</td>
                    <td>{{ item.produceName }}</td>
                    <td>{{ item.tonnage }}</td>
                    <td>{{ item.amountDue }}</td>
                    <td>{{ new Date(item.dueDate).toLocaleDateString() }}</td>
                    <td>
                        <span class="badge" :class="getTheStatus(item.amountDue).class">
                            {{ getTheStatus(item.amountDue).label }}
                        </span>
                    </td>
                </tr>
                <tr v-if="creditSalesForBranches.isLoading">
                    <td colspan="9" class="text-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </td>
                </tr>
                <tr v-if="maganjoCreditData.length === 0 && !creditSalesForBranches.isLoading">
                    <td colspan="9" class="text-center">
                        No credit sales found for Maganjo.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>


    <div class="content w-100">
        <h3 class="mb-4">Maganjo Credit Sales</h3>

        <!-- Users Table -->
        <table id="matuggaSales" class="table table-striped table-success table-hover rounded">
            <thead>
                <tr>
                    <th>Buyer Name</th>
                    <th>National ID</th>
                    <th>Contact</th>
                    <th>Dispatch Date</th>
                    <th>Produce</th>
                    <th>Tonnage (kg)</th>
                    <th>Amount Due (Ugx)</th>
                    <th>Due Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in matuggaCreditData" :key="item.id">
                    <td>{{ item.buyerName }}</td>
                    <td>{{ item.nationalId }}</td>
                    <td>{{ item.contact }}</td>
                    <td>{{ new Date(item.dispatchDate).toLocaleDateString() }}</td>
                    <td>{{ item.produceName }}</td>
                    <td>{{ item.tonnage }}</td>
                    <td>{{ item.amountDue }}</td>
                    <td>{{ new Date(item.dueDate).toLocaleDateString() }}</td>
                    <td>
                        <span class="badge" :class="getTheStatus(item.amountDue).class">
                            {{ getTheStatus(item.amountDue).label }}
                        </span>
                    </td>
                </tr>
                <tr v-if="creditSalesForBranches.isLoading">
                    <td colspan="9" class="text-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </td>
                </tr>
                <tr v-if="matuggaCreditData.length === 0 && !creditSalesForBranches.isLoading">
                    <td colspan="9" class="text-center">
                        No credit sales found for Maganjo.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style></style>