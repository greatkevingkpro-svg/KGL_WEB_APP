<script setup>

	import { reactive } from "vue";
	import axios from "../utils/axios";

	const form = reactive({
		userName: "",
		password: "",
	})

	async function login() {
		// alert(form.userName+ form.password);
		try {
		const response = await axios.post("/api/auth/login", {
			userName: form.userName,
			password: form.password
		});

		if(response.status === 200) {
			console.log(response.data);
			alert("login successful")
		} else {
			alert("Invalid Credentials");
		}
	} catch (error) {
		console.log(error.response.data)
		alert("Something went wrong");
	}

		
	}

</script>

<template>
	<div class="login-container">

		<!-- card -->
		<div class="login-card">
			<img src="../assets/images/Design-sans-titre.png" alt="">

			<!-- form heading -->
			<h2>Karibu Groceries LTD</h2>
			<h4>Login System</h4>

			<!-- form -->
			<form action="" id="loginForm" @submit.prevent="login">
				<div class="form-floating mb-3">
					<input type="email" v-model="form.userName"
					class="form-control" id="userName" placeholder="name@example.com" required>
					<label for="floatingInput">username</label>
				</div>
				<div class="form-floating">
					<input type="password" v-model="form.password" class="form-control" id="password" placeholder="Password" required>
					<label for="floatingPassword">Password</label>
				</div>
				<div class="mb-3 form-check">
					<input type="checkbox" class="form-check-input" id="checkbox">
					<label class="form-check-label text-white" for="exampleCheck1">Check me out</label>
				</div>

				<button type="submit" id="loginBtn">
					Login
				</button>

				<p id="message"></p>


			</form>

		</div>
	</div>
</template>