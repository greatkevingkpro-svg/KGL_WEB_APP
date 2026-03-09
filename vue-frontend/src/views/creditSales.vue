<script setup>
import "../assets/custom-styles/main.css";

import { reactive, ref } from "vue";
import { useCreditSalesStore } from "../stores/creditSalesStore";

const creditSalesStore = useCreditSalesStore();

const form = reactive({
	buyerName: "",
	nationalId: "",
	location: "",
	contact: "",
	produceName: "",
	tonnage: "",
	dispatchDate: "",
	time: "",
	amountDue: "",
	dueDate: "",
	salesAgent: "",
	branch: ""
})

const isLoading = ref(false);

async function submitCreditSales() {
	try {
		isLoading.value = true;
		await creditSalesStore.recordNewCreditSale(form)

		Object.assign(form, {
			buyerName: "",
			nationalId: "",
			location: "",
			contact: "",
			produceName: "",
			tonnage: "",
			dispatchDate: "",
			time: "",
			amountDue: "",
			dueDate: "",
			salesAgent: "",
			branch: ""
		})
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
					<h5 class="mb-0">Procurement Record</h5>
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
							</div>

							<!-- tonnage -->
							<div class="col-md-6">
								<label for="tonnage" class="form-label">Tonnage (kg)</label>
								<input type="number" class="form-control" id="tonnage" v-model="form.tonnage" min="0"
									step="0.01" required>
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
								<input type="text" class="form-control" id="salesAgent" v-model="form.salesAgent"
									required>
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
							<button id="submitBtn" type="submit" :disabled="isLoading" class="btn text-white px-4">
								{{ isLoading ? "saving..." : "Save Credit Sale" }}
							</button>
						</div>

					</form>
				</div>

			</div>

		</div>
	</div>

</template>

<style></style>