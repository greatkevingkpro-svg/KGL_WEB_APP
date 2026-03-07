<script setup>

import "../assets/custom-styles/main.css";

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
            <form id="procForm">

              <div class="row g-3">
                <!-- produce name -->
                <div class="col-md-6">
                  <label for="produceName" class="form-label">Produce Name</label>
                  <input type="text" class="form-control" id="produceName" placeholder="Enter produce name" required>
                </div>

                <!-- produce type -->
                <div class="col-md-6">
                  <label for="produceType" class="form-label">Produce Type</label>
                  <select class="form-select" id="produceType" required>
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
                  <input type="date" class="form-control" id="date" required>
                </div>

                <!-- time -->
                <div class="col-md-6">
                  <label for="time" class="form-label">Time</label>
                  <input type="time" class="form-control" id="time" required>
                </div>

                <!-- tonnage -->
                <div class="col-md-6">
                  <label for="tonnage" class="form-label">Tonnage (kg)</label>
                  <input type="number" class="form-control" id="tonnage" min="0" step="0.01" required>
                </div>

                <!-- cost -->
                <div class="col-md-6">
                  <label for="cost" class="form-label">Cost (UGX)</label>
                  <input type="number" class="form-control" id="cost" min="0" step="100" required>
                </div>

                <!-- selling price -->
                <div class="col-md-6">
                  <label for="price" class="form-label">Selling Price (UGX)</label>
                  <input type="number" class="form-control" id="price" required>
                </div>

                <!-- dealer name -->
                <div class="col-md-6">
                  <label for="dealer" class="form-label">Dealer Name</label>
                  <input type="text" class="form-control" id="dealer" required>
                </div>

                <!-- contact -->
                <div class="col-md-6">
                  <label for="contact" class="form-label">Contact</label>
                  <input type="tel" class="form-control" id="contact" required>
                </div>

                <div class="col-md-6">
                  <label for="branch" class="form-label">Branch</label>
                  <select class="form-select" id="branch" required>
                    <option value="">-- Select Branch --</option>
                    <option>Maganjo</option>
                    <option>Matugga</option>
                  </select>
                </div>

              </div>

              <div class="mt-4 text-end">
                <button id="submitBtn" type="submit" class="btn text-white px-4">
                  Save Record
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>

</template>

<style>

</style>