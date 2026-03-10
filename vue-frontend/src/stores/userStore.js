import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import VueJwtDecode from "vue-jwt-decode";

export const useUserStore = defineStore("user", () => {

    const user = reactive({
        name: "",
        userName: "",
        role: "",
        token: "",
    })

    function setUser(token) {
        const payload = VueJwtDecode.decode(token);
        // console.log(payload);

        user.name = payload.name;
        user.userName = payload.userName;
        user.role = payload.role;
        user.branch = payload.branch;
        user.token = token
    }

    function invalidateUser() {
        user.name = ""
        user.userName = ""
        user.role = ""
        user.branch = ""
        user.token = ""
    }

    function logout() {
        // 1. Reset Pinia state
        this.user = { token: null, role: null, name: null, branch: null };

        // 2. Wipe ALL browser storage for this site
        localStorage.clear();
        sessionStorage.clear();

        // 3. FORCE REDIRECT (This kills the "Back" button history for the current session)
        window.location.href = "/login";
    }

    return { user, setUser, invalidateUser, logout }
}, {
    persist: true
})