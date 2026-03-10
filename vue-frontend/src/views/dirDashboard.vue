<script setup>
import { onMounted, computed, ref, nextTick } from "vue";
import { Chart } from "chart.js/auto";
import { useUserStore } from "@/stores/userStore";
import { useStockBranchStore } from "@/stores/stockBranchStore";
import { useSalesBranchStore, useCreditSalesBranchStore } from "@/stores/branchSalesStore";

// Initialize Stores
const userStore = useUserStore();
const stockStore = useStockBranchStore();
const salesStore = useSalesBranchStore();
const creditStore = useCreditSalesBranchStore();

// Chart Instances for cleanup
let salesChartInstance = null;
let stockChartInstance = null;

// 1. FILTERED DATA (Logic: Director sees ALL, Branch staff see only THEIR branch)
const branchSales = computed(() => {
    const data = salesStore.allBranchSales || [];
    return userStore.user.role === 'director' 
        ? data 
        : data.filter(s => s.branch === userStore.user.branch);
});

const branchStock = computed(() => {
    const data = stockStore.allBranchStock || [];
    return userStore.user.role === 'director' 
        ? data 
        : data.filter(s => s.branch === userStore.user.branch);
});

const branchCredits = computed(() => {
    const data = creditStore.allCreditSales || [];
    return userStore.user.role === 'director' 
        ? data 
        : data.filter(s => s.branch === userStore.user.branch);
});

// 2. KPI CALCULATIONS
const totalRevenue = computed(() => {
    return branchSales.value.reduce((sum, s) => sum + (Number(s.amountPaid) || 0), 0);
});

const totalStockWeight = computed(() => {
    return branchStock.value.reduce((sum, s) => sum + (Number(s.tonnage) || 0), 0);
});

const outstandingCredit = computed(() => {
    return branchCredits.value.reduce((sum, c) => sum + (Number(c.amountDue) || 0), 0);
});

// 3. FETCH DATA & RENDER
onMounted(async () => {
    try {
        await Promise.all([
            stockStore.fetchStockForAllBranches(),
            salesStore.fetchSalesForAllBranches(),
            creditStore.fetchCreditSalesForBranches()
        ]);

        // Crucial: Wait for DOM to update so Canvas IDs exist
        await nextTick();
        renderCharts();
    } catch (err) {
        console.error("Dashboard Fetch Error:", err);
    }
});

function renderCharts() {
    const salesCtx = document.getElementById('salesChart');
    const stockCtx = document.getElementById('stockChart');

    if (!salesCtx || !stockCtx) return;

    // Destroy existing charts to prevent memory leaks if re-rendering
    if (salesChartInstance) salesChartInstance.destroy();
    if (stockChartInstance) stockChartInstance.destroy();

    // Line Chart: Sales Trend
    salesChartInstance = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: branchSales.value.slice(-7).map(s => new Date(s.createdAt).toLocaleDateString()),
            datasets: [{
                label: 'Sales (UGX)',
                data: branchSales.value.slice(-7).map(s => s.amountPaid),
                borderColor: '#198754',
                backgroundColor: 'rgba(25, 135, 84, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: { responsive: true }
    });

    // Bar Chart: Stock Distribution
    stockChartInstance = new Chart(stockCtx, {
        type: 'bar',
        data: {
            labels: branchStock.value.map(s => s.produceName),
            datasets: [{
                label: 'KGs',
                data: branchStock.value.map(s => s.tonnage),
                backgroundColor: '#198754'
            }]
        },
        options: { responsive: true }
    });
}
</script>

<template>
    <div class="content p-4 w-100">
        <h3 class="mb-4">{{ userStore.user.role === 'director' ? 'Global' : userStore.user.branch }} Overview</h3>

        <!-- KPI CARDS -->
        <div class="row g-4 mb-4">
            <div class="col-md-4">
                <div class="card analytics-card border-start border-4 border-success p-3">
                    <h6 class="fw-bold text-success fs-5">Total Revenue</h6>
                    <h4>UGX {{ totalRevenue.toLocaleString() }}</h4>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card analytics-card border-start border-4 border-warning p-3">
                    <h6 class="fw-bold text-warning fs-5">Total Stock</h6>
                    <h4>{{ totalStockWeight.toLocaleString() }} KG</h4>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card analytics-card border-start border-4 border-danger p-3">
                    <h6 class="fw-bold text-danger fs-5">Credit Due</h6>
                    <h4>UGX {{ outstandingCredit.toLocaleString() }}</h4>
                </div>
            </div>
        </div>

        <!-- CHARTS -->
        <div class="row g-4 mb-4">
            <div class="col-md-6">
                <div class="card chart-card p-3">
                    <h6>Recent Sales Trend</h6>
                    <canvas id="salesChart"></canvas>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card chart-card p-3">
                    <h6>Current Stock Levels</h6>
                    <canvas id="stockChart"></canvas>
                </div>
            </div>
        </div>

        <!-- RECENT SALES TABLE -->
        <div class="card p-3">
            <h6 class="mb-3">Latest Transactions</h6>
            <div class="table-responsive">
                <table class="table table-striped table-success table-hover">
                    <thead>
                        <tr>
                            <th>Produce</th>
                            <th>Buyer</th>
                            <th>Amount (UGX)</th>
                            <th v-if="userStore.user.role === 'director'">Branch</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sale in branchSales.slice(-5).reverse()" :key="sale._id">
                            <td>{{ sale.produceName }}</td>
                            <td>{{ sale.buyerName }}</td>
                            <td>{{ Number(sale.amountPaid).toLocaleString() }}</td>
                            <td v-if="userStore.user.role === 'director'">{{ sale.branch }}</td>
                            <td>{{ new Date(sale.createdAt).toLocaleDateString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
