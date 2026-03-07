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

    return {users, isLoading, fetchUserRecords}
})