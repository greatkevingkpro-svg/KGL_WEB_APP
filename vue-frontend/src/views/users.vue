<script setup>
import { Modal } from "bootstrap";
import "@/assets/custom-styles/main.css";
import { onMounted, onUnmounted, reactive, ref, nextTick, computed } from 'vue';
import { useUserInfoStore, usePostUserStore, useDeleteUserStore } from '@/stores/userInfoStore';

const usersStore = useUserInfoStore();
const postUserStore = usePostUserStore();
const deleteStore = useDeleteUserStore();

// --- STATE VARIABLES (Keep these at the top) ---
const userModalRef = ref(null);
let userModal = null;
const isLoading = ref(false);
const isEditing = ref(false);
const currentEditId = ref(null);
const passwordVisible = ref(false);


const form = reactive({
    name: "",
    userName: "",
    password: "",
    role: "",
    branch: "",
    status: ""
});


onMounted(() => {
    usersStore.fetchUserRecords();

    if (userModalRef.value) {
        userModal = new Modal(userModalRef.value);
    }
});

onUnmounted(() => {
    if (userModal) userModal.dispose();
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    document.body.classList.remove('modal-open');
});

function openAddModal() {
    isEditing.value = false;
    currentEditId.value = null;
    resetFormState();

    if (userModal) {
        userModal.show();
    }
}


function resetFormState() {
    Object.assign(form, { name: "", userName: "", password: "", role: "", branch: "", status: "" });
}

async function handleSave() {
    try {
        isLoading.value = true;
        const payload = { ...form };

        if (payload.role.toLowerCase() === 'director') delete payload.branch;

        if (isEditing.value) {
            await postUserStore.patchUser(currentEditId.value, payload);
        } else {
            await postUserStore.recordNewUser(payload);
        }

        if (userModal) userModal.hide();

        // Standard cleanup for the Freeze issue
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';

        await usersStore.fetchUserRecords();
        resetFormState();
        isEditing.value = false;
        currentEditId.value = null;

    } catch (error) {
        console.error("Operation failed:", error);
    } finally {
        isLoading.value = false;
    }
}

async function prepareEdit(id) {
    try {
        const userData = await usersStore.fetchUserById(id);
        if (userData) {
            isEditing.value = true;
            currentEditId.value = id;

            Object.assign(form, userData);

            // Wait for Vue to finish updating the form before showing the modal
            await nextTick();

            if (userModal) {
                userModal.show();
            }
        }
    } catch (error) {
        console.error(error);
    }
}


async function removeUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
        const success = await deleteStore.deleteUser(id);
        if (success) await usersStore.fetchUserRecords();
    } catch (error) {
        console.error("Delete failed:", error);
    }
}


const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedUsers = computed(() => {
  // 1. Determine where the actual array is
  const rawData = usersStore.users;
  
  // 2. Extract the array if it's wrapped in an object { data: [...] }
  const actualUsers = Array.isArray(rawData) ? rawData : (rawData?.data || []);

  // 3. Perform the slice safely
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return actualUsers.slice(start, end);
});
// Calculate total pages for the UI
const totalPages = computed(() => {
  const rawData = usersStore.users;
  const count = Array.isArray(rawData) ? rawData.length : (rawData?.data?.length || 0);
  return Math.ceil(count / itemsPerPage);
});

function setPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
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
                <button class="btn btn-primary" @click="openAddModal">
                    + Add New User
                </button>

            </div>

            <!-- Users Table -->
            <table class="table table-striped table-success">
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
                    <!-- Loop through the users array from the database store -->
                    <tr v-for="user in paginatedUsers" :key="user._id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.userName }}</td>
                        <td>{{ user.role }}</td>
                        <td>{{ user.branch || 'N/A' }}</td>
                        <td class="text-capitalize">{{ user.status }}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" @click="prepareEdit(user._id)"
                                :disabled="usersStore.isLoading">
                                {{ usersStore.isLoading ? '...' : 'Edit' }}
                            </button>

                            <button @click="removeUser(user._id)" class="btn btn-sm btn-danger ms-1"
                                :disabled="deleteStore.isLoading">
                                {{ deleteStore.isLoading ? '...' : 'Delete' }}
                            </button>
                        </td>
                    </tr>

                    <!-- Show a loading message or empty state -->
                    <tr v-if="usersStore.isLoading">
                        <td colspan="6" class="text-center">
                            <div class="spinner-border text-success" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <!-- Loading users... -->
                        </td>
                    </tr>
                    <tr v-else-if="!usersStore.users || usersStore.users.length === 0">
                        <td colspan="6" class="text-center">No users found.</td>
                    </tr>
                </tbody>

            </table>

            <!-- Pagination -->
            <nav aria-label="Page navigation" v-if="totalPages > 1">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link text-success" @click="setPage(currentPage - 1)">Previous</button>
                    </li>

                    <li v-for="page in totalPages" :key="page" class="page-item"
                        :class="{ active: currentPage === page }">
                        <button class="page-link"
                            :class="currentPage === page ? 'bg-success border-success' : 'text-success'"
                            @click="setPage(page)">
                            {{ page }}
                        </button>
                    </li>

                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <button class="page-link text-success" @click="setPage(currentPage + 1)">Next</button>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Add User Modal -->
        <div class="modal fade" id="addUserModal" ref="userModalRef" tabindex="-1" aria-labelledby="addUserModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEditing ? 'Edit User' : 'Add New User' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <!-- Modal Body -->
                    <div class="modal-body">
                        <form id="addUserForm" autocomplete="off">
                            <!-- TRAP FOR CHROME: Hidden from users but visible to the browser -->
                            <input type="text" name="fake_user" style="display:none" aria-hidden="true">
                            <input type="password" name="fake_pass" style="display:none" aria-hidden="true"
                                tabindex="-1">


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
                            <div class="mb-3" v-if="!isEditing">
                                <label for="password" class="form-label">Password</label>
                                <div class="input-group">
                                    <input :type="passwordVisible ? 'text' : 'password'" class="form-control"
                                        id="u_p_secure" v-model="form.password" autocomplete="new-password" required>
                                    <!-- Toggle Button -->
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="passwordVisible = !passwordVisible">
                                        {{ passwordVisible ? 'Hide' : 'Show' }}
                                    </button>
                                </div>
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

                            <!-- branch Field -->
                            <div class="mb-3">
                                <label for="branch" class="form-label">Branch</label>
                                <select class="form-select" id="branch" v-model="form.branch" required>
                                    <option value="">Select branch</option>
                                    <option value="Maganjo">Maganjo</option>
                                    <option value="Matugga">Matugga</option>
                                </select>
                            </div>

                            <!-- Status Field -->
                            <div class="mb-3">
                                <label for="status" class="form-label">Status</label>
                                <select class="form-select" id="status" v-model="form.status" required>
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <!-- Modal Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" @click="handleSave" class="btn btn-primary">
                            {{ isLoading ? "Saving..." : (isEditing ? 'Update User' : 'Add User') }}
                        </button>


                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style></style>