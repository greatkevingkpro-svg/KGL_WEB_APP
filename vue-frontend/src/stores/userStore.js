import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import VueJwtDecode from "vue-jwt-decode";

export const useUserStore = defineStore("user", ()=> {

    const user = reactive({
        name:"",
        userName:"",
        role:"",
        token:"",
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

    return { user, setUser }
},{
    persist: true
})