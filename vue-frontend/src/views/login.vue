<script setup>

import { reactive, ref } from "vue";
import axios from "../utils/axios";
import { toast } from "vue3-toastify";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const form = reactive({
    userName: "",
    password: "",
});

const isLoading = ref(false);

async function login() {
    try {
        isLoading.value = true;
        const response = await axios.post("/api/auth/login", {
            userName: form.userName,
            password: form.password
        })

        if (response.status === 200) {
            console.log(response.data);

            userStore.setUser(response.data.token)
            toast.success("Login successfully", {
                autoClose: 3000
            });

            switch (userStore.user.role) {
                case "manager":
                case "sales agent":
                    router.push("/dashboard/roleDashboard")
                    break;
                case "director":
                    router.push("/dashboard/director")
                    break;

                default:
                    router.push("/access")
                    break;

            }

        } else {
            toast.error("Invalid credentials", {
                autoClose: 3000
            });
        }
    } catch (error) {
        console.log(error?.response?.data ?? error);
        toast.error("Invalid credentials", {
            autoClose: 3000
        });
    } finally {
        isLoading.value = false
    }
}

</script>

<template>
    <div class="login-container">

        <!-- card -->
        <div class="login-card">
            <img src="../assets/images/karibu-logo.png" alt="">

            <!-- form heading -->
            <h2>Karibu Groceries LTD</h2>
            <h4>Login System</h4>

            <!-- form -->
            <form id="loginForm" @submit.prevent="login">
                <div class="form-floating mb-3">
                    <input type="email" v-model="form.userName" class="form-control" id="userName"
                        placeholder="name@example.com" required>
                    <label for="floatingInput">username</label>
                </div>
                <div class="form-floating">
                    <input type="password" v-model="form.password" class="form-control" id="password"
                        placeholder="Password" required>
                    <label for="floatingPassword">Password</label>

                    <!-- toggle password -->
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="checkbox">
                        <label class="form-check-label text-white" for="exampleCheck1">show password</label>
                    </div>
                </div>

                <button type="submit" :disabled="isLoading" id="loginBtn">
                    {{ isLoading ? "loading..." : "Login" }}
                </button>

                <p id="message"></p>


            </form>

        </div>
    </div>
</template>

<style scoped>
body {
    margin: 0;
}

.login-container {
    background: url(../assets/images/cabbage.jpg);
    /* background: url(../Logo_Pic/Beans_2.jpg); */
    /* background: url(Maize_1.jpg); */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
}

.login-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(10px);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
}

.login-card h2 {
    font-weight: bold;
    color: rgb(33, 183, 33);
    margin-bottom: 30px;
}

.login-card h4 {
    color: #fff;
}

.login-card label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    text-align: left;
    color: rgba(32, 31, 31, 0.945);
}

.login-card input {
    /* width: 94%; */
    /* padding: 10px 12px; */
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.25);
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
}

.login-card button,
.login-card button a {
    background: rgb(33, 183, 33);
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    padding: 12px;
    width: 100%;
    cursor: pointer;
    transition: 0.5s;
    text-decoration: none;
}

.login-card button a {
    background: none;
    padding: 0;
    text-decoration: none;
}

.login-card button:hover {
    background: rgb(38, 211, 38);
}

.login-card button:active {
    background: rgb(23, 150, 23);
}

.login-card img {
    height: 90px;
    border-radius: 50px;
}

/* #checkbox {
  background-color: rgb(151, 149, 149);
} */

/* creating the toast */
/* .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    min-width: 250px;
    padding: 15px 20px;
    border-radius: 6px;
    color: #fff;
    font-size: 14px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

    opacity: 0;
    transform: translateX(50px);
    transition: all 0.3s ease;
    z-index: 1000;
} */

/* Show toast */
/* .toast.show {
    opacity: 1;
    transform: translateX(0);
} */

/* Success */
/* .toast.success {
    background-color: #28a745;
} */

/* Error */
/* .toast.error {
    background-color: #dc3545;
} */
</style>