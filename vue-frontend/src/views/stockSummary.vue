<script setup>

import "../assets/custom-styles/main.css";

import { onMounted } from "vue";
import { useStockBranchStore } from "@/stores/stockBranchStore";

const branchesStock = useStockBranchStore();

onMounted(() => {
    branchesStock.fetchStockForAllBranches();
})

</script>

<template>

    <!-- MAIN CONTENT -->
    <div class="content w-100">
        <h3 class="mb-4">Name of Branch</h3>

        <!-- Users Table -->
        <table id="maganjoTable" class="table table-striped table-success rounded">
            <thead>
                <tr>
                    <th>Produce</th>
                    <th>Type</th>
                    <th>Tonnage</th>
                    <th>Cost</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody id="usersTableBody">
                <!-- <tr>
            </tr> -->
            </tbody>
        </table>
    </div>


    <div class="content w-100">
        <h3 class="mb-4">Name of Branch</h3>

        <!-- Users Table -->
        <table id="maganjoTable" class="table table-striped table-success rounded">
            <thead>
                <tr>
                    <th>Produce</th>
                    <th>Type</th>
                    <th>Tonnage</th>
                    <th>Cost</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody id="usersTableBody">
                <!-- <tr>
            </tr> -->
            </tbody>
        </table>
    </div>

</template>

<style></style>