<script setup>

import { reactive, ref, onMounted, onUnmounted } from "vue";
import "../assets/custom-styles/main.css";
import { Chart } from "chart.js/auto";

// chart render
onMounted(() => {
    // SALES LINE CHART
    new Chart(document.getElementById('salesChart'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales (UGX)',
                data: [5000000, 7000000, 6000000, 9000000, 8500000, 10000000],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79,70,229,0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            plugins: { legend: { labels: { color: 'black' } } },
            scales: {
                x: { ticks: { color: 'black' } },
                y: { ticks: { color: 'black' } }
            }
        }
    });

    // STOCK BAR CHART
    new Chart(document.getElementById('stockChart'), {
        type: 'bar', // changed from 'pie' to 'bar'
        data: {
            labels: ['Beans', 'Maize', 'Cow Peas', 'G-nuts', 'Soybeans'],
            datasets: [{
                label: 'Stock Quantity (kgs)', // optional label for dataset
                data: [5000, 4000, 3000, 3500, 3000],
                backgroundColor: [
                    '#4f46e5',
                    '#22c55e',
                    '#f59e0b',
                    '#ef4444',
                    '#06b6d4'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // hide legend for a simple bar chart
                },
                title: {
                    display: true,
                    text: 'Stock Quantities by Product'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})

</script>

<template>
    <!-- MAIN CONTENT -->
    <div class="content w-100">

        <h3 class="mb-4">Branch Dashboard Overview</h3>

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

        <!-- CHARTS ROW -->
        <div class="row g-4 mb-4">

            <div class="col-md-6">
                <div class="card chart-card p-3">
                    <h6>Monthly Sales Trend</h6>
                    <canvas id="salesChart"></canvas>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card chart-card p-3">
                    <h6>Stock Distribution</h6>
                    <canvas id="stockChart"></canvas>
                </div>
            </div>

        </div>

        <!-- RECENT SALES TABLE -->
        <div class="card p-3">
            <h6 class="mb-3">Recent Sales</h6>

            <div class="table-responsive">
                <table class="table table-success table-hover">
                    <thead>
                        <tr>
                            <th>Produce</th>
                            <th>Buyer</th>
                            <th>KG</th>
                            <th>Amount (UGX)</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Beans</td>
                            <td>John Traders</td>
                            <td>500</td>
                            <td>1,250,000</td>
                            <td>23 Feb 2026</td>
                        </tr>
                        <tr>
                            <td>Maize</td>
                            <td>Kampala Millers</td>
                            <td>800</td>
                            <td>2,000,000</td>
                            <td>23 Feb 2026</td>
                        </tr>
                        <tr>
                            <td>Soybeans</td>
                            <td>Sarah Wholesalers</td>
                            <td>300</td>
                            <td>900,000</td>
                            <td>22 Feb 2026</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

</template>

<style scoped></style>