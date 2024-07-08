<!-- src/pages/Signin.vue -->

<template>
	<div class="flex items-center justify-center border h-screen">
		<div class="alert-danger" v-if="textError">{{ textError }}</div>
		<form
			@submit.prevent="handleSubmit"
			class="w-full max-w-xs flex flex-col justify-center"
		>
			<h1 class="text-white text-2xl font-semibold text-center mb-6">
				Log in to make your todo
			</h1>
			<div class="mt-2">
				<input
					v-model="email"
					placeholder="Email"
					type="email"
					required
					class="field-text"
				/>
			</div>
			<div class="mt-2">
				<input
					v-model="password"
					placeholder="Password"
					type="password"
					required
					class="field-text"
				/>
			</div>
			<button type="submit" class="btn w-full mt-2" :disabled="isLoading">
				{{ getTextButton }}
			</button>
		</form>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const email = ref('maul@gmail.com')
const password = ref('password')
const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(false)
const textError = ref('')

const handleSubmit = async () => {
	isLoading.value = true
	console.log(email.value, password.value)
	try {
		const response = await authStore.login({
			email: email.value,
			password: password.value,
		})
		if (response) router.push('/')
	} catch (error) {
		if (error && error.response.status === 401) {
			textError.value = 'Wrong email or password'
		} else {
			textError.value = 'Something went wrong'
		}
		setTimeout(() => {
			textError.value = ''
		}, 2000)
	}
	isLoading.value = false
}

const getTextButton = computed(() => {
	return isLoading.value ? 'Loading...' : 'Sign In'
})
</script>
