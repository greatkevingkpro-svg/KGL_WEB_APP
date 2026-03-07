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
                    <h5 class="mb-0">Sales Record</h5>
                </div>

                <div class="card-body">
                    <form id="saleForm">

                        <div class="row g-3">
                            <!-- produce name -->
                            <div class="col-md-6">
                                <label for="produceName" class="form-label">Produce Name</label>
                                <input type="text" class="form-control" id="produceName"
                                    placeholder="Enter produce name" required>
                            </div>

                            <!-- produce type -->
                            <!-- <div class="col-md-6">
                  <label for="produceType" class="form-label">Produce Type</label>
                  <select class="form-select" id="produceType" required>
                    <option value="">Select Type</option>
                    <option>Beans</option>
                    <option>Maize</option>
                    <option>G-nuts</option>
                    <option>Cow Peas</option>
                    <option>Millet</option>
                  </select>
                </div> -->

                            <!-- tonnage -->
                            <div class="col-md-6">
                                <label for="saleTonnage" class="form-label">Tonnage (kg)</label>
                                <input type="number" class="form-control" id="saleTonnage" min="1" step="0.01" required>
                            </div>

                            <!-- amoutPaid -->
                            <div class="col-md-6">
                                <label for="amoutPaid" class="form-label">Amout Paid (UGX)</label>
                                <input type="number" class="form-control" id="amoutPaid" required>
                            </div>

                            <!-- selling price -->
                            <!-- <div class="col-md-6">
                  <label for="price" class="form-label">Selling Price (UGX)</label>
                  <input type="number" class="form-control" id="price" required>
                </div> -->

                            <!-- buyer name -->
                            <div class="col-md-6">
                                <label for="buyerName" class="form-label">Buyer Name</label>
                                <input type="text" class="form-control" id="buyerName" required>
                            </div>

                            <div class="col-md-6">
                                <label for="agentName" class="form-label">Sales Agent</label>
                                <input type="text" class="form-control" id="agentName" required>
                            </div>

                            <!-- date -->
                            <div class="col-md-6">
                                <label for="saleDate" class="form-label">Date</label>
                                <input type="date" class="form-control" id="saleDate" required>
                            </div>

                            <!-- time -->
                            <div class="col-md-6">
                                <label for="saleTime" class="form-label">Time</label>
                                <input type="time" class="form-control" id="saleTime" required>
                            </div>

                            <!-- contact -->
                            <!-- <div class="col-md-6">
                  <label for="contact" class="form-label">Contact</label>
                  <input type="tel" class="form-control" id="contact" required>
                </div> -->

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
                                Record Sale
                            </button>
                        </div>

                    </form>
                </div>

            </div>

        </div>

    </div>

</template>

<style></style>