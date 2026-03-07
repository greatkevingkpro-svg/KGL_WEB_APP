<script setup>

import { onMounted } from 'vue';
import { useUserInfoStore } from '@/stores/userInfoStore';

const usersStore = useUserInfoStore();

onMounted(() => {
    usersStore.fetchUserRecords()
})

</script>

<template>
    <!-- <div  class="d-flex position-absolute z-3 vh-100 vw-100" style="background-color: rgba(0,0,0,0.5);"> -->
        <!-- <div v-if="usersStore.isLoading" class="d-flex justify-content-center align-items-center position-absolute z-3 vh-100 vw-100" style="background-color: rgba(0,0,0,0.5);">
            <div class="spinner-border text-success" role="status" style="width: 8rem; height: 8rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div> -->
    <!-- </div> -->


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
                    <!-- <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Admin</td>
              <td>produce</td>
              <td>Active</td>
              <td>
                <button class="btn btn-sm btn-warning me-2">Edit</button>
                <button class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>jane@example.com</td>
              <td>User</td>
              <td>sales</td>
              <td>Active</td>
              <td>
                <button class="btn btn-sm btn-warning me-2">Edit</button>
                <button class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr> -->
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
                                <input type="text" class="form-control" id="name" required>
                            </div>
                            <!-- Email Field -->
                            <div class="mb-3">
                                <label for="userName" class="form-label">User Name</label>
                                <input type="email" class="form-control" id="userName" required>
                            </div>
                            <!-- password Field -->
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="text" class="form-control" id="password" required>
                            </div>
                            <!-- Role Field -->
                            <div class="mb-3">
                                <label for="userRole" class="form-label">Role</label>
                                <select class="form-select" id="userRole" required>
                                    <option value="">Select Role</option>
                                    <option value="director">director</option>
                                    <option value="manager">manager</option>
                                    <option value="sales agent">sales agent</option>
                                </select>
                            </div>

                            <!-- depart Field -->
                            <div class="mb-3">
                                <label for="branch" class="form-label">Branch</label>
                                <select class="form-select" id="branch" required>
                                    <option value="">Select branch</option>
                                    <option value="branch-1">Maganjo</option>
                                    <option value="branch-2">Matugga</option>
                                </select>
                            </div>

                            <!-- Status Field -->
                            <div class="mb-3">
                                <label for="userStatus" class="form-label">Status</label>
                                <select class="form-select" id="userStatus" required>
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
                        <button type="button" class="btn btn-primary" id="saveUserBtn">Save User</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style></style>