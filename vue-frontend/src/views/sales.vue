<script setup>

import "../assets/custom-styles/main.css";

import { reactive, ref } from "vue";
import { useSalesStore } from "@/stores/salesStore";

const salesStore = useSalesStore();

const form = reactive({
    produceName: "",
    tonnage: "",
    amountPaid: "",
    buyerName: "",
    salesAgent: "",
    dateOfSale: "",
    timePurchaseMade: "",
    branch: ""
})

const isLoading = ref(false)

async function submitSale() {
    try {
        isLoading.value = true;
        await salesStore.recordNewSale(form);
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false;;
    }
}

</script>

<template>

    <!-- MAIN CONTENT -->
    <div class="content w-100">

        <!-- NEW CONTENT: Users Management -->
        <div class="container mt-4">

            <div class="card shadow">
                <div class="card-header text-white">
                    <h5 class="mb-0">Sales Record</h5>
                </div>

                <div class="card-body">
                    <form id="saleForm" @submit.prevent="submitSale">

                        <div class="row g-3">
                            <!-- produce name -->
                            <div class="col-md-6">
                                <label for="produceName" class="form-label">Produce Name</label>
                                <input type="text" class="form-control" id="produceName" v-model="form.produceName"
                                    placeholder="Enter produce name" required>
                            </div>

                            <!-- tonnage -->
                            <div class="col-md-6">
                                <label for="tonnage" class="form-label">Tonnage (kg)</label>
                                <input type="number" class="form-control" id="tonnage" v-model="form.tonnage" min="1" step="0.01" required>
                            </div>

                            <!-- amoutPaid -->
                            <div class="col-md-6">
                                <label for="amoutPaid" class="form-label">Amout Paid (UGX)</label>
                                <input type="number" class="form-control" id="amoutPaid" v-model="form.amountPaid" required>
                            </div>

                            <!-- buyer name -->
                            <div class="col-md-6">
                                <label for="buyerName" class="form-label">Buyer Name</label>
                                <input type="text" class="form-control" id="buyerName" v-model="form.buyerName" required>
                            </div>

                            <div class="col-md-6">
                                <label for="salesAgent" class="form-label">Sales Agent</label>
                                <input type="text" class="form-control" id="salesAgent" v-model="form.salesAgent" required>
                            </div>

                            <!-- date -->
                            <div class="col-md-6">
                                <label for="dateOfSale" class="form-label">Date</label>
                                <input type="date" class="form-control" id="dateOfSale" v-model="form.dateOfSale" required>
                            </div>

                            <!-- time -->
                            <div class="col-md-6">
                                <label for="timePurchaseMade" class="form-label">Time</label>
                                <input type="time" class="form-control" id="timePurchaseMade" v-model="form.timePurchaseMade" required>
                            </div>

                            <div class="col-md-6">
                                <label for="branch" class="form-label">Branch</label>
                                <select class="form-select" id="branch" v-model="form.branch" required>
                                    <option value="">-- Select Branch --</option>
                                    <option>Maganjo</option>
                                    <option>Matugga</option>
                                </select>
                            </div>

                        </div>

                        <div class="mt-4 text-end">
                            <button id="submitBtn" type="submit"
                            :disabled="isLoading" class="btn text-white px-4">
                                {{ isLoading ? "Saving..." : "Record Sale" }}
                            </button>
                        </div>

                    </form>
                </div>

            </div>

        </div>

    </div>

</template>

<style></style>