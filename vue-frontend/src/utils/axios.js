import axios from "axios";
import { useUserStore } from "@/stores/userStore";

const KGL_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
    baseURL: KGL_BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        if(userStore.user.token) {
            config.headers.Authorization = `Bearer ${userStore.user.token}`;
        }
    
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default apiClient;