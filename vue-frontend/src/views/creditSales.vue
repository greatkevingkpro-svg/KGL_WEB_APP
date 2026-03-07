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

                <!-- tonnage -->
                <div class="col-md-6">
                  <label for="tonnage" class="form-label">Tonnage (kg)</label>
                  <input type="number" class="form-control" id="tonnage" min="0" step="0.01" required>
                </div>

                <!-- produce name -->
                <div class="col-md-6">
                  <label for="produceName" class="form-label">Buyer Name</label>
                  <input type="text" class="form-control" id="buyerName" placeholder="Enter buyer name" required>
                </div>

                <!-- produce name -->
                <div class="col-md-6">
                  <label for="produceName" class="form-label">National ID (NIN)</label>
                  <input type="text" class="form-control" id="creditNIN" placeholder="CM12345678901234" required>
                </div>

                <!-- location -->
                <div class="col-md-6">
                  <label for="produceName" class="form-label">location</label>
                  <input type="text" class="form-control" id="location" placeholder="location" required>
                </div>

                <!-- contact -->
                <div class="col-md-6">
                  <label for="contact" class="form-label">contact</label>
                  <input type="text" class="form-control" id="contact" placeholder="07XXXXXXXX" required>
                </div>

                <!-- amount due -->
                <div class="col-md-6">
                  <label for="amount due" class="form-label">amount due (UGX)</label>
                  <input type="number" class="form-control" id="amountDue" min="0" step="100" required>
                </div>

                <!-- date -->
                <div class="col-md-6">
                  <label for="date" class="form-label">Dispatch Date</label>
                  <input type="date" class="form-control" id="dispatchDate" required>
                </div>

                <!-- date -->
                <div class="col-md-6">
                  <label for="date" class="form-label">Due Date</label>
                  <input type="date" class="form-control" id="dueDate" required>
                </div>

                <!-- time -->
                <div class="col-md-6">
                  <label for="time" class="form-label">Time</label>
                  <input type="time" class="form-control" id="time" required>
                </div>

                <!-- agent name -->
                <div class="col-md-6">
                  <label for="agent" class="form-label">agent Name</label>
                  <input type="text" class="form-control" id="agent" required>
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
                  Save Credit Sale
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