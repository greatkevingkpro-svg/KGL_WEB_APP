<script setup>

import "../assets/custom-styles/main.css";

import { onMounted } from "vue";
import { useSalesBranchStore } from "@/stores/branchSalesStore"

const salesForBranches = useSalesBranchStore();

onMounted(() => {
    salesForBranches.fetchSalesForAllBranches();
})

</script>

<template>

    <!-- MAIN CONTENT -->
    <div class="content w-100">
        <h3 class="mb-4">Name of Branch</h3>

        <!-- Users Table -->
        <table id="maganjoSales" class="table table-striped table-success rounded">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Produce</th>
                    <th>Type</th>
                    <th>Tonnage (kg)</th>
                    <th>Amount Paid (Ugx)</th>
                    <th>Buyer Name</th>
                    <th>Sales Agent</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>

    <!-- MAIN CONTENT -->
    <div class="content w-100">
        <h3 class="mb-4">Name of Branch</h3>

        <!-- Users Table -->
        <table id="maganjoSales" class="table table-striped table-success rounded">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Produce</th>
                    <th>Type</th>
                    <th>Tonnage (kg)</th>
                    <th>Amount Paid (Ugx)</th>
                    <th>Buyer Name</th>
                    <th>Sales Agent</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>

</template>

<style></style>