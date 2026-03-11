<script setup>
import "../assets/custom-styles/main.css";

import { reactive, ref, watch } from "vue";
import axios from "../utils/axios";
import { useCreditSalesStore } from "../stores/creditSalesStore";
import { useUserStore } from "@/stores/userStore";
import { useStockBranchStore } from "@/stores/stockBranchStore";
import { toast } from "vue3-toastify";

const creditSalesStore = useCreditSalesStore();
const userStore = useUserStore();
const stockStore = useStockBranchStore();

const form = reactive({
	buyerName: "",
	nationalId: "",
	location: "",
	contact: "",
	produceName: "",
	tonnage: "",
	dispatchDate: new Date().toISOString().slice(0, 10),
	time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
	amountDue: "",
	dueDate: "",
	salesAgent: userStore.user.name || "",
	branch: userStore.user.branch || ""
})

const isLoading = ref(false);
const unitPrice = ref(0);
const availableStock = ref(null);
const stockError = ref(""); // New: To store the "Not Found" message

watch([() => form.produceName, () => form.branch], async ([newName, newBranch]) => {
    if (newName && newBranch) {
        try {
			stockError.value = ""; // Reset error
            const response = await axios.get(`/api/stocks/${newBranch}/${newName}`);
            if (response.data) {
                unitPrice.value = response.data.sellingPrice;
                availableStock.value = response.data.tonnage;
                if (form.tonnage) form.amountDue = form.tonnage * unitPrice.value;
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
    if (unitPrice.value > 0) form.amountDue = newTonnage * unitPrice.value;
});


async function submitCreditSales() {
	const creditSaleWeight = Number(form.tonnage);

    if (availableStock.value !== null && creditSaleWeight > availableStock.value) {
        toast.error(`Only ${availableStock.value}kg available!`);
        return;
    }

	try {
		isLoading.value = true;
		await creditSalesStore.recordNewCreditSale({ ...form, tonnage: creditSaleWeight });

		// Refresh the stock store
        await stockStore.fetchStockForAllBranches();

		toast.success("Sale completed and stock updated!");

		form.buyerName = "",
		form.nationalId = "",
		form.location = "",
		form.contact = "",
		form.produceName = "",
		form.tonnage = "",
		form.amountDue = "",
		form.dueDate = ""
	} catch (error) {
		console.log(error)
	} finally {
		isLoading.value = false;
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
					<h5 class="mb-0">Credit Record - {{ form.branch }}</h5>
				</div>

				<div class="card-body">
					<form id="procForm" @submit.prevent="submitCreditSales">

						<div class="row g-3">
							<!-- Buyer name -->
							<div class="col-md-6">
								<label for="buyerName" class="form-label">Buyer Name</label>
								<input type="text" class="form-control" id="buyerName" v-model="form.buyerName"
									placeholder="Enter buyer name" required>
							</div>

							<!-- National ID (NIN) -->
							<div class="col-md-6">
								<label for="nationalId" class="form-label">National ID (NIN)</label>
								<input type="text" class="form-control" id="nationalId" v-model="form.nationalId"
									placeholder="CM12345678901234" required>
							</div>

							<!-- location -->
							<div class="col-md-6">
								<label for="location" class="form-label">location</label>
								<input type="text" class="form-control" id="location" v-model="form.location"
									placeholder="location" required>
							</div>

							<!-- contact -->
							<div class="col-md-6">
								<label for="contact" class="form-label">contact</label>
								<input type="text" class="form-control" id="contact" v-model="form.contact"
									placeholder="07XXXXXXXX" required>
							</div>

							<!-- produce name -->
							<div class="col-md-6">
								<label for="produceName" class="form-label">Produce Name</label>
								<input type="text" class="form-control" id="produceName" v-model="form.produceName"
									placeholder="Enter produce name" required>
								<small v-if="unitPrice" class="text-success">Unit Price: {{ unitPrice }} UgX/kg</small>
								<div v-if="stockError" class="invalid-feedback d-block">
                                    {{ stockError }}
                                </div>
							</div>

							<!-- tonnage -->
							<div class="col-md-6">
								<label for="tonnage" class="form-label">Tonnage (kg)</label>
								<input type="number" class="form-control" id="tonnage" v-model="form.tonnage" min="0"
									step="0.01" required>
								<small v-if="availableStock !== null">Available: {{ availableStock }}kg</small>
							</div>

							<!-- date -->
							<div class="col-md-6">
								<label for="date" class="form-label">Dispatch Date</label>
								<input type="date" class="form-control" id="dispatchDate" v-model="form.dispatchDate"
									required>
							</div>

							<!-- time -->
							<div class="col-md-6">
								<label for="time" class="form-label">Time</label>
								<input type="time" class="form-control" id="time" v-model="form.time" required>
							</div>

							<!-- amount due -->
							<div class="col-md-6">
								<label for="amountDue" class="form-label">amount due (UGX)</label>
								<input type="number" class="form-control" id="amountDue" v-model="form.amountDue"
									min="0" step="100" required>
							</div>

							<!-- date -->
							<div class="col-md-6">
								<label for="dueDate" class="form-label">Due Date</label>
								<input type="date" class="form-control" id="dueDate" v-model="form.dueDate" required>
							</div>

							<!-- agent name -->
							<div class="col-md-6">
								<label for="salesAgent" class="form-label">agent Name</label>
								<input type="text" class="form-control" id="salesAgent" v-model="form.salesAgent" readonly
									required>
							</div>

							<div class="col-md-6">
								<label for="branch" class="form-label">Branch</label>
								<select class="form-select" id="branch" v-model="form.branch" disabled required>
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
                                {{ isLoading ? "Saving..." : "Record Credit" }}
                            </button>
						</div>

					</form>
				</div>

			</div>

		</div>
	</div>

</template>

<style></style>