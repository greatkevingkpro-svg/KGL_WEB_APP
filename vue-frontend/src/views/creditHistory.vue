<script setup>
import "../assets/custom-styles/main.css";
import { onMounted, computed, ref } from "vue";
import { useCreditSalesBranchStore } from "@/stores/branchSalesStore"
import { useUserStore } from "@/stores/userStore";

const creditSalesForBranches = useCreditSalesBranchStore();
const userStore = useUserStore();
const itemsPerPage = 5;

// Pagination state
const maganjoPage = ref(1);
const matuggaPage = ref(1);

onMounted(() => {
    creditSalesForBranches.fetchCreditSalesForBranches();
});

// --- MAGANJO LOGIC ---
const maganjoAll = computed(() => {
    return (creditSalesForBranches.allCreditSales || []).filter(item => item.branch === "Maganjo");
});

const maganjoPaginated = computed(() => {
    const start = (maganjoPage.value - 1) * itemsPerPage;
    return maganjoAll.value.slice(start, start + itemsPerPage);
});

const maganjoTotalPages = computed(() => Math.ceil(maganjoAll.value.length / itemsPerPage));

// --- MATUGGA LOGIC ---
const matuggaAll = computed(() => {
    return (creditSalesForBranches.allCreditSales || []).filter(item => item.branch === 'Matugga');
});

const matuggaPaginated = computed(() => {
    const start = (matuggaPage.value - 1) * itemsPerPage;
    return matuggaAll.value.slice(start, start + itemsPerPage);
});

const matuggaTotalPages = computed(() => Math.ceil(matuggaAll.value.length / itemsPerPage));

// Page change handlers
const setMaganjoPage = (p) => { if (p >= 1 && p <= maganjoTotalPages.value) maganjoPage.value = p; };
const setMatuggaPage = (p) => { if (p >= 1 && p <= matuggaTotalPages.value) matuggaPage.value = p; };

const getTheStatus = (amountDue) => {
    const amount = Number(amountDue);
    if (amount <= 100000) {
        return { label: 'Average', class: 'bg-warning text-dark' };
    } else if (amount <= 1000000) {
        return { label: 'High', class: 'bg-warning text-dark' };
    } else if (amount < 2000000) {
        return { label: 'Very High', class: 'bg-danger text-white' }; 
    } else {
        return { label: 'Critical', class: 'bg-dark text-white' };
    }
};
</script>

<template>
    <!-- MAGANJO CREDIT TABLE -->
    <div v-if="userStore.user.branch === 'Maganjo'" class="content w-100 mb-5">
        <h3 class="mb-4">Maganjo Credit Sales</h3>
        <table class="table table-striped table-success table-hover rounded">
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
                <tr v-for="item in maganjoPaginated" :key="item._id">
                    <td>{{ item.buyerName }}</td>
                    <td>{{ item.nationalId }}</td>
                    <td>{{ item.contact }}</td>
                    <td>{{ new Date(item.dispatchDate).toLocaleDateString() }}</td>
                    <td>{{ item.produceName }}</td>
                    <td>{{ item.tonnage }}</td>
                    <td>{{ Number(item.amountDue).toLocaleString() }}</td>
                    <td>{{ new Date(item.dueDate).toLocaleDateString() }}</td>
                    <td>
                        <span class="badge" :class="getTheStatus(item.amountDue).class">
                            {{ getTheStatus(item.amountDue).label }}
                        </span>
                    </td>
                </tr>
                <tr v-if="maganjoAll.length === 0 && !creditSalesForBranches.isLoading">
                    <td colspan="9" class="text-center">No credit sales found for Maganjo.</td>
                </tr>
            </tbody>
        </table>

        <!-- Maganjo Pagination -->
        <nav v-if="maganjoTotalPages > 1">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: maganjoPage === 1 }">
                    <button class="page-link text-success" @click="setMaganjoPage(maganjoPage - 1)">Previous</button>
                </li>
                <li v-for="p in maganjoTotalPages" :key="p" class="page-item" :class="{ active: maganjoPage === p }">
                    <button class="page-link" :class="maganjoPage === p ? 'bg-success border-success text-white' : 'text-success'" @click="setMaganjoPage(p)">{{ p }}</button>
                </li>
                <li class="page-item" :class="{ disabled: maganjoPage === maganjoTotalPages }">
                    <button class="page-link text-success" @click="setMaganjoPage(maganjoPage + 1)">Next</button>
                </li>
            </ul>
        </nav>
    </div>

    <!-- MATUGGA CREDIT TABLE -->
    <div v-if="userStore.user.branch === 'Matugga'" class="content w-100">
        <h3 class="mb-4">Matugga Credit Sales</h3>
        <table class="table table-striped table-success table-hover rounded">
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
                <tr v-for="item in matuggaPaginated" :key="item._id">
                    <td>{{ item.buyerName }}</td>
                    <td>{{ item.nationalId }}</td>
                    <td>{{ item.contact }}</td>
                    <td>{{ new Date(item.dispatchDate).toLocaleDateString() }}</td>
                    <td>{{ item.produceName }}</td>
                    <td>{{ item.tonnage }}</td>
                    <td>{{ Number(item.amountDue).toLocaleString() }}</td>
                    <td>{{ new Date(item.dueDate).toLocaleDateString() }}</td>
                    <td>
                        <span class="badge" :class="getTheStatus(item.amountDue).class">
                            {{ getTheStatus(item.amountDue).label }}
                        </span>
                    </td>
                </tr>
                <tr v-if="matuggaAll.length === 0 && !creditSalesForBranches.isLoading">
                    <td colspan="9" class="text-center">No credit sales found for Matugga.</td>
                </tr>
            </tbody>
        </table>

        <!-- Matugga Pagination -->
        <nav v-if="matuggaTotalPages > 1">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: matuggaPage === 1 }">
                    <button class="page-link text-success" @click="setMatuggaPage(matuggaPage - 1)">Previous</button>
                </li>
                <li v-for="p in matuggaTotalPages" :key="p" class="page-item" :class="{ active: matuggaPage === p }">
                    <button class="page-link" :class="matuggaPage === p ? 'bg-success border-success text-white' : 'text-success'" @click="setMatuggaPage(p)">{{ p }}</button>
                </li>
                <li class="page-item" :class="{ disabled: matuggaPage === matuggaTotalPages }">
                    <button class="page-link text-success" @click="setMatuggaPage(matuggaPage + 1)">Next</button>
                </li>
            </ul>
        </nav>
    </div>
</template>
