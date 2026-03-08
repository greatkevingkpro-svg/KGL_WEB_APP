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
            users.value = response.data
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
        

    }

    return {
        users,
        isLoading, 
        fetchUserRecords,
    }
})

export const usePostUserStore = defineStore("users",()=> {
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

    return {
        postUser,
        error,
        recordNewUser
    }
},
{
    persist: true
});