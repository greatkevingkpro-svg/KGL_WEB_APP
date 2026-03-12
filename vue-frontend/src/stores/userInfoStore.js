import { defineStore } from "pinia";

import { ref } from "vue";
import axios from "@/utils/axios";

export const useUserInfoStore = defineStore("users",()=> {

    const users = ref({})
    const isLoading = ref(false)

    async function fetchUserRecords() {
        isLoading.value = true
        try {
            const response = await axios.get("/api/users")
            users.value = response.data.data
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
        

    }


    const currentUser = ref(null);

    // NEW: Fetch a single user by ID
    async function fetchUserById(userId) {
        isLoading.value = true
        try {
            const response = await axios.get(`/api/users/${userId}`)
            currentUser.value = response.data.data
            return response.data.data 
        } catch (error) {
            console.error("Error fetching user:", error)
            return null
        } finally {
            isLoading.value = false
        }
    }

    return {
        users,
        currentUser,
        isLoading, 
        fetchUserRecords,
        fetchUserById
    }
})

export const usePostUserStore = defineStore("postUsers",()=> {
    const postUser = ref([]);
    const error = ref(null);

    // record new user
    async function recordNewUser(userData) {
        error.value = null;

        try {
            const response = await axios.post("/api/users", userData);

            // add new user to the list
            postUser.value.push(response.data);

            alert("New user created successful")

            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message;
            console.log(err);
        }
    }

     // NEW: Update existing user
    async function patchUser(userId, userData) {
        try {
            // Create a copy to avoid mutating the original form
            const updateData = { ...userData };
            
            // Remove password so we don't accidentally overwrite the hashed one with an empty string
            delete updateData.password; 

            const response = await axios.patch(`/api/users/${userId}`, updateData);
            
            alert("User updated successfully!");
            return response.data;
        } catch (err) {
            console.error("Update error:", err);
            throw err;
        }
    }

    return {
        postUser,
        error,
        recordNewUser,
        patchUser
    }
},
{
    persist: true
});



export const useDeleteUserStore = defineStore("delete-user", () => {
    const isLoading = ref(false);
    const error = ref(null);

    async function deleteUser(userId) {
        
        if (!confirm("Are you sure you want to delete this user?")) return;

        isLoading.value = true;
        error.value = null;

        try {
            await axios.delete(`/api/users/${userId}`);
            
            alert("User deleted successfully");
            return true; 
        } catch (err) {
            error.value = err.response?.data?.message || "Failed to delete user";
            console.error("Delete Error:", err);
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        deleteUser,
        isLoading,
        error
    };
});
