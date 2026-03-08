<script setup>

import { onMounted, reactive, ref } from 'vue';
import { useUserInfoStore, usePostUserStore } from '@/stores/userInfoStore';

const usersStore = useUserInfoStore();

onMounted(() => {
    usersStore.fetchUserRecords()
})

const postUserStore = usePostUserStore();

const form = reactive({
    name: "",
    userName: "",
    password: "",
    role: "",
    branch: "",
    status: ""
})

const isLoading = ref(false);

async function addUser() {
    try {
        isLoading.value = true;
        await postUserStore.recordNewUser(form);
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
        <div class="container mt-3">
            <h2 class="mb-4">Users Management</h2>

            <!-- Search and Add -->
            <div class="d-flex justify-content-between mb-3">
                <input type="text" class="form-control w-50" id="searchInput" placeholder="Search users...">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
                    + Add New User
                </button>
            </div>

            <!-- Users Table -->
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Branch</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="usersTableBody">

                </tbody>
            </table>

            <!-- Pagination -->
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center" id="paginationContainer"></ul>
            </nav>
        </div>

        <!-- Add User Modal -->
        <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h5 class="modal-title" id="addUserModalLabel">Add New User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <!-- Modal Body -->
                    <div class="modal-body">
                        <form id="addUserForm">
                            <!-- Name Field -->
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" v-model="form.name" required>
                            </div>
                            <!-- Email Field -->
                            <div class="mb-3">
                                <label for="userName" class="form-label">User Name</label>
                                <input type="email" class="form-control" id="userName" v-model="form.userName" required>
                            </div>
                            <!-- password Field -->
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="Password" class="form-control"id="password" v-model="form.password" required>
                            </div>
                            <!-- Role Field -->
                            <div class="mb-3">
                                <label for="role" class="form-label">Role</label>
                                <select class="form-select" id="role" v-model="form.role" required>
                                    <option value="">Select Role</option>
                                    <option value="director">director</option>
                                    <option value="manager">manager</option>
                                    <option value="sales agent">sales agent</option>
                                </select>
                            </div>

                            <!-- depart Field -->
                            <div class="mb-3">
                                <label for="branch" class="form-label">Branch</label>
                                <select class="form-select" id="branch" v-model="form.branch" required>
                                    <option value="">Select branch</option>
                                    <option value="branch-1">Maganjo</option>
                                    <option value="branch-2">Matugga</option>
                                </select>
                            </div>

                            <!-- Status Field -->
                            <div class="mb-3">
                                <label for="status" class="form-label">Status</label>
                                <select class="form-select" id="status" v-model="form.status" required>
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <!-- Modal Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" @click="addUser" class="btn btn-primary" id="saveUserBtn" :disabled="isLoading">{{ isLoading ? "Saving..." : "Add User" }}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style></style>