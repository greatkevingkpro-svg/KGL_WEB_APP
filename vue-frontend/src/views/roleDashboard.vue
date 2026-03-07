<script setup>

import "../assets/custom-styles/main.css";

</script>

<template>

    <!-- MAIN CONTENT -->
    <div class="content w-100">
        <h3 class="mb-4">Branch Dashboard</h3>

        <!-- KPI CARDS -->
        <div class="row g-4 mb-4">

            <div class="col-md-3">
                <div class="card analytics-card border-start border-4 border-success">
                    <h6 class="fw-bold text-success fs-5">Total Revenue</h6>
                    <h4>UGX 25,400,000</h4>
                    <small class="text-success">+12% this month</small>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card analytics-card border-start border-4 border-warning">
                    <h6 class="fw-bold text-warning fs-5">Total Stock</h6>
                    <h4>18,500 KG</h4>
                    <small class="text-warning">3 items low</small>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card analytics-card border-start border-4 border-danger">
                    <h6 class="fw-bold text-danger fs-5">Credit Outstanding</h6>
                    <h4>UGX 6,800,000</h4>
                    <small class="text-danger">5 pending payments</small>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card analytics-card border-start border-4 border-success">
                    <h6 class="fw-bold text-success fs-5">Today's Sales</h6>
                    <h4>UGX 2,150,000</h4>
                    <small class="text-success">+8% today</small>
                </div>
            </div>

        </div>


    </div>

</template>

<style>

</style>