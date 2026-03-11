<script setup>

import "../assets/custom-styles/main.css";

import { reactive, ref } from "vue";
import { useProcurementStore } from "@/stores/procurementStore";
import { useUserStore } from "@/stores/userStore";


const procurementStore = useProcurementStore();
const userStore = useUserStore();

const form = reactive({
  produceName: "",
  produceType: "",
  date: new Date().toISOString().slice(0, 10),
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
  tonnage: "",
  cost: "",
  sellingPrice: "",
  dealerName: "",
  contact: "",
  branch: userStore.user.branch || ""
})

const isLoading = ref(false);

async function submitProcurement() {
  try {
    isLoading.value = true;
    await procurementStore.recordNewProcurement(form);

    Object.assign(form, {
      produceName: "",
      produceType: "",
      date: "",
      time: "",
      tonnage: "",
      cost: "",
      sellingPrice: "",
      dealerName: "",
      contact: "",
      branch: ""
    })
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
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
          <h5 class="mb-0">Procurement Record - {{ userStore.user.branch }}</h5>
        </div>

        <div class="card-body">
          <form id="procForm" @submit.prevent="submitProcurement">

            <div class="row g-3">
              <!-- produce name -->
              <div class="col-md-6">
                <label for="produceName" class="form-label">Produce Name</label>
                <input type="text" class="form-control" id="produceName" v-model="form.produceName"
                  placeholder="Enter produce name" required>
              </div>

              <!-- produce type -->
              <div class="col-md-6">
                <label for="produceType" class="form-label">Produce Type</label>
                <select class="form-select" id="produceType" v-model="form.produceType" required>
                  <option value="">Select Type</option>
                  <option>Beans</option>
                  <option>Maize</option>
                  <option>G-nuts</option>
                  <option>Cow Peas</option>
                  <option>Millet</option>
                </select>
              </div>

              <!-- date -->
              <div class="col-md-6">
                <label for="date" class="form-label">Date</label>
                <input type="date" id="date" v-model="form.date" class="form-control" required>
              </div>

              <!-- time -->
              <div class="col-md-6">
                <label for="time" class="form-label">Time</label>
                <input type="time" v-model="form.time" class="form-control" id="time" required>
              </div>

              <!-- tonnage -->
              <div class="col-md-6">
                <label for="tonnage" class="form-label">Tonnage (kg)</label>
                <input type="number" v-model="form.tonnage" class="form-control" id="tonnage" min="0" step="0.01"
                  required>
              </div>

              <!-- cost -->
              <div class="col-md-6">
                <label for="cost" class="form-label">Cost (UGX)</label>
                <input type="number" v-model="form.cost" class="form-control" id="cost" min="0" step="100" required>
              </div>

              <!-- selling price -->
              <div class="col-md-6">
                <label for="sellingPrice" class="form-label">Selling Price (UGX)</label>
                <input type="number" v-model="form.sellingPrice" class="form-control" id="sellingPrice" required>
              </div>

              <!-- dealer name -->
              <div class="col-md-6">
                <label for="dealerName" class="form-label">Dealer Name</label>
                <input type="text" v-model="form.dealerName" class="form-control" id="dealerName" required>
              </div>

              <!-- contact -->
              <div class="col-md-6">
                <label for="contact" class="form-label">Contact</label>
                <input type="tel" v-model="form.contact" class="form-control" id="contact" required>
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

            <div v-if="procurementStore.error" color="red">
              {{ procurementStore.error }}
            </div>

            <div class="mt-4 text-end">
              <button id="submitBtn" type="submit" :disabled="isLoading" class="btn text-white px-4">
                {{ isLoading ? "Saving..." : "Save Record" }}
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  </div>

</template>

<style></style>