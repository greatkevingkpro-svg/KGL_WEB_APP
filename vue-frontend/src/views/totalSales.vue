<script setup>
import "../assets/custom-styles/main.css";
import { onMounted, computed, ref } from "vue";
import { useSalesBranchStore, useCreditSalesBranchStore } from "@/stores/branchSalesStore"

const salesForBranches = useSalesBranchStore();
const creditSalesForBranches = useCreditSalesBranchStore();

// Pagination Config
const itemsPerPage = 5;
const maganjoSalePage = ref(1);
const matuggaSalePage = ref(1);
const maganjoCreditPage = ref(1);
const matuggaCreditPage = ref(1);

onMounted(() => {
    salesForBranches.fetchSalesForAllBranches();
    creditSalesForBranches.fetchCreditSalesForBranches();
});

// Helper for slicing data
const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
};

// --- SALES PAGINATION ---
const maganjoSalesAll = computed(() => (salesForBranches.allBranchSales || []).filter(item => item.branch === 'Maganjo'));
const maganjoData = computed(() => paginate(maganjoSalesAll.value, maganjoSalePage.value));
const maganjoSaleTotal = computed(() => Math.ceil(maganjoSalesAll.value.length / itemsPerPage));

const matuggaSalesAll = computed(() => (salesForBranches.allBranchSales || []).filter(item => item.branch === 'Matugga'));
const matuggaData = computed(() => paginate(matuggaSalesAll.value, matuggaSalePage.value));
const matuggaSaleTotal = computed(() => Math.ceil(matuggaSalesAll.value.length / itemsPerPage));

// --- CREDIT PAGINATION ---
const maganjoCreditAll = computed(() => (creditSalesForBranches.allCreditSales || []).filter(item => item.branch === "Maganjo"));
const maganjoCreditData = computed(() => paginate(maganjoCreditAll.value, maganjoCreditPage.value));
const maganjoCreditTotal = computed(() => Math.ceil(maganjoCreditAll.value.length / itemsPerPage));

const matuggaCreditAll = computed(() => (creditSalesForBranches.allCreditSales || []).filter(item => item.branch === 'Matugga'));
const matuggaCreditData = computed(() => paginate(matuggaCreditAll.value, matuggaCreditPage.value));
const matuggaCreditTotal = computed(() => Math.ceil(matuggaCreditAll.value.length / itemsPerPage));

const getTheStatus = (amountDue) => {
    const amount = Number(amountDue);
    if (amount <= 100000) return { label: 'Average', class: 'bg-warning text-dark' };
    if (amount <= 1000000) return { label: 'High', class: 'bg-warning text-dark' };
    if (amount < 2000000) return { label: 'Very High', class: 'bg-danger text-white' }; 
    return { label: 'Critical', class: 'bg-dark text-white' };
};
</script>


<template>
    <!-- <span class="badge mb-4 bg-success text-dark">Maganjo Branch</span> -->
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

        <nav v-if="maganjoSaleTotal > 1">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: maganjoSalePage === 1 }">
                    <button class="page-link text-success" @click="maganjoSalePage--">Previous</button>
                </li>
                <li v-for="p in maganjoSaleTotal" :key="p" class="page-item" :class="{ active: maganjoSalePage === p }">
                    <button class="page-link" :class="maganjoSalePage === p ? 'bg-success text-white border-success' : 'text-success'" @click="maganjoSalePage = p">{{ p }}</button>
                </li>
                <li class="page-item" :class="{ disabled: maganjoSalePage === maganjoSaleTotal }">
                    <button class="page-link text-success" @click="maganjoSalePage++">Next</button>
                </li>
            </ul>
        </nav>
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


        <nav v-if="matuggaSaleTotal > 1">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: matuggaSalePage === 1 }">
                    <button class="page-link text-success" @click="matuggaSalePage--">Previous</button>
                </li>
                <li v-for="p in matuggaSaleTotal" :key="p" class="page-item" :class="{ active: matuggaSalePage === p }">
                    <button class="page-link" :class="matuggaSalePage === p ? 'bg-success text-white border-success' : 'text-success'" @click="matuggaSalePage = p">{{ p }}</button>
                </li>
                <li class="page-item" :class="{ disabled: matuggaSalePage === matuggaSaleTotal }">
                    <button class="page-link text-success" @click="matuggaSalePage++">Next</button>
                </li>
            </ul>
        </nav>
    </div>

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

        <nav v-if="maganjoCreditTotal > 1">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: maganjoCreditPage === 1 }">
                    <button class="page-link text-success" @click="maganjoCreditPage--">Previous</button>
                </li>
                <li v-for="p in maganjoCreditTotal" :key="p" class="page-item" :class="{ active: maganjoCreditPage === p }">
                    <button class="page-link" :class="maganjoCreditPage === p ? 'bg-success text-white border-success' : 'text-success'" @click="maganjoCreditPage = p">{{ p }}</button>
                </li>
                <li class="page-item" :class="{ disabled: maganjoCreditPage === maganjoCreditTotal }">
                    <button class="page-link text-success" @click="maganjoCreditPage++">Next</button>
                </li>
            </ul>
        </nav>
    </div>


    <div class="content w-100">
        <h3 class="mb-4">Matugga Credit Sales</h3>

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


        <nav v-if="matuggaCreditTotal > 1">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: matuggaCreditPage === 1 }">
                    <button class="page-link text-success" @click="matuggaCreditPage--">Previous</button>
                </li>
                <li v-for="p in matuggaCreditTotal" :key="p" class="page-item" :class="{ active: matuggaCreditPage === p }">
                    <button class="page-link" :class="matuggaCreditPage === p ? 'bg-success text-white border-success' : 'text-success'" @click="matuggaCreditPage = p">{{ p }}</button>
                </li>
                <li class="page-item" :class="{ disabled: matuggaCreditPage === matuggaCreditTotal }">
                    <button class="page-link text-success" @click="matuggaCreditPage++">Next</button>
                </li>
            </ul>
        </nav>
    </div>

</template>

<style></style>