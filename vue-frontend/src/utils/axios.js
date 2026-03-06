import axios from "axios";

const KGL_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
    baseURL: KGL_BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export default apiClient;