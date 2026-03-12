<script setup>
import { reactive, ref, watch } from "vue";
import axios from "../utils/axios";
import { useSalesStore } from "@/stores/salesStore";
import { useUserStore } from "@/stores/userStore";
import { useStockBranchStore } from "@/stores/stockBranchStore";
import { toast } from "vue3-toastify";

const salesStore = useSalesStore();
const userStore = useUserStore();
const stockStore = useStockBranchStore();

const form = reactive({
    produceName: "",
    tonnage: "",
    amountPaid: "",
    buyerName: "",
    salesAgent: userStore.user.name || "",
    dateOfSale: new Date().toISOString().slice(0, 10),
    timePurchaseMade: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    branch: userStore.user.branch || ""
})

const isLoading = ref(false);
const unitPrice = ref(0);
const availableStock = ref(null);
const stockError = ref(""); 

watch([() => form.produceName, () => form.branch], async ([newName, newBranch]) => {
    if (newName && newBranch) {
        try {
            stockError.value = ""; 
            const response = await axios.get(`/api/stocks/${newBranch}/${newName}`);
            if (response.data) {
                unitPrice.value = response.data.sellingPrice;
                availableStock.value = response.data.tonnage;
                if (form.tonnage) form.amountPaid = form.tonnage * unitPrice.value;
            }
        } catch (error) {
            unitPrice.value = 0;
            availableStock.value = null;
            // Set the error message if the backend fails
            stockError.value = error.response?.data?.message || "Produce not found in this branch";
        }
    } else {
        stockError.value = "";
    }
});

watch(() => form.tonnage, (newTonnage) => {
    if (unitPrice.value > 0) form.amountPaid = newTonnage * unitPrice.value;
});

async function submitSale() {
    const saleWeight = Number(form.tonnage);

    if (availableStock.value !== null && saleWeight > availableStock.value) {
        toast.error(`Only ${availableStock.value}kg available!`);
        return;
    }

    try {
        isLoading.value = true;
        await salesStore.recordNewSale({ ...form, tonnage: saleWeight });

        // console.log(typeof form.produceName.valueOf());

        // Refresh the stock store
        await stockStore.fetchStockForAllBranches();

        toast.success("Sale completed and stock updated!");

        form.produceName = "";
        form.tonnage = "";
        form.amountPaid = "";
        form.buyerName = "";
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="content w-100">
        <div class="container mt-4">
            <div class="card shadow">
                <div class="card-header text-white">
                    <h5 class="mb-0">Sales Record - {{ form.branch }}</h5>
                </div>

                <div class="card-body">
                    <form id="saleForm" @submit.prevent="submitSale">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="produceName" class="form-label">Produce Name</label>
                                <input type="text" class="form-control" id="produceName" v-model="form.produceName"
                                    placeholder="Enter produce name" required>
                                <small v-if="unitPrice" class="text-success">Unit Price: {{ unitPrice }} UgX/kg</small>
                                <!-- Error message shown only when produce is not found -->
                                <div v-if="stockError" class="invalid-feedback d-block">
                                    {{ stockError }}
                                </div>
                            </div>

                            <div class="col-md-6">
                                <label for="tonnage" class="form-label">Tonnage (kg)</label>
                                <input type="number" class="form-control" id="tonnage" v-model.number="form.tonnage"
                                    min="0.01" step="0.01" required>
                                <small v-if="availableStock !== null">Available: {{ availableStock }}kg</small>
                            </div>

                            <div class="col-md-6">
                                <label for="amountPaid" class="form-label">Amount Paid (UGX)</label>
                                <input type="number" class="form-control fw-bold" id="amountPaid"
                                    v-model="form.amountPaid" readonly required>
                            </div>

                            <div class="col-md-6">
                                <label for="buyerName" class="form-label">Buyer Name</label>
                                <input type="text" class="form-control" id="buyerName" v-model="form.buyerName"
                                    required>
                            </div>

                            <div class="col-md-6">
                                <label for="salesAgent" class="form-label">Sales Agent</label>
                                <input type="text" class="form-control bg-light" id="salesAgent"
                                    v-model="form.salesAgent" readonly required>
                            </div>

                            <div class="col-md-6">
                                <label for="dateOfSale" class="form-label">Date</label>
                                <input type="date" class="form-control" id="dateOfSale" v-model="form.dateOfSale"
                                    required>
                            </div>

                            <div class="col-md-6">
                                <label for="timePurchaseMade" class="form-label">Time</label>
                                <input type="time" class="form-control" id="timePurchaseMade"
                                    v-model="form.timePurchaseMade" required>
                            </div>

                            <div class="col-md-6">
                                <label for="branch" class="form-label">Branch</label>
                                <select class="form-select bg-light" id="branch" v-model="form.branch" disabled
                                    required>
                                    <option value="">-- Select Branch --</option>
                                    <option>Maganjo</option>
                                    <option>Matugga</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-4 text-end">
                            <button id="submitBtn" type="submit"
                                :disabled="isLoading || (availableStock !== null && form.tonnage > availableStock)"
                                class="btn btn-success text-white px-4">
                                {{ isLoading ? "Saving..." : "Record Sale" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>