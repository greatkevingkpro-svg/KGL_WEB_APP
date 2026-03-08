import { defineStore } from "pinia";
import { ref } from "vue";

import axios from "@/utils/axios";

export const useProcurementStore = defineStore(
    "procurement",
    () => {
        const procurements = ref([]);
        const isLoading = ref(false);
        const error = ref(null);

        // record new procurements
        async function recordNewProcurement(procurementData) {
            // isLoading.value = false;
            error.value = null;

            try {
                const response = await axios.post("/api/procurements", procurementData);

                // add new procurement to the list
                procurements.value.push(response.data);

                alert("New Procurement Created Successful")
                return response.data;

            } catch (err) {
                error.value = err.response?.data?.message || err.message;
                console.log(err);
            } finally {
                // isLoading.value = false;
            }
        }

        return {
            procurements,
            // isLoading,
            error,
            recordNewProcurement
        };
    },
    {
        persist: true
    }
);