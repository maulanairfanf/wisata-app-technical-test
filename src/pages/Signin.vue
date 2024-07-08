<!-- src/pages/Signin.vue -->

<template>
	<div class="flex items-center justify-center h-screen">
		<form @submit.prevent="login" class="w-full max-w-xs">
			<div>
				<label>Email</label>
				<input v-model="email" type="email" required class="input" />
			</div>
			<div>
				<label>Password</label>
				<input v-model="password" type="password" required class="input" />
			</div>
			<button type="submit" class="btn">Sign In</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
	await authStore.login({ email: email.value, password: password.value })
	router.push('/')
}
</script>
