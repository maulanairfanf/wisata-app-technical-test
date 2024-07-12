<template>
	<div class="flex items-center justify-center h-screen">
		<div class="alert-danger" v-if="textError">{{ textError }}</div>
		<form
			@submit.prevent="handleSubmit"
			class="w-full max-w-xs flex flex-col justify-center"
		>
			<h1 class="text-white text-2xl font-semibold text-center mb-6">
				Sign Up to make your todo
			</h1>
			<div class="mt-2">
				<input
					v-model="name"
					placeholder="Name"
					type="name"
					required
					class="field-text"
				/>
			</div>
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
			<div class="mt-2">
				<input
					v-model="confirmPassword"
					placeholder="Confirm Password"
					type="password"
					required
					class="field-text"
				/>
			</div>
			<button
				type="submit"
				class="btn-default w-full mt-2"
				:disabled="isLoading"
			>
				{{ getTextButton }}
			</button>
			<div class="text-white text-right mt-2">
				Already have an account?

				<span
					@click="$router.push('/signin')"
					class="cursor-pointer hover:font-bold text-md"
					>Sign in</span
				>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(false)
const textError = ref('')

const handleSubmit = async () => {
	isLoading.value = true
	console.log(email.value, password.value)
	try {
		const response = await authStore.register({
			email: email.value,
			name: name.value,
			password: password.value,
			password: password.value,
		})
		if (response) router.push('/')
	} catch (error) {
		console.log('error', error.response.data)
		if (error && error.response.data) {
			if (error.response.data.email)
				textError.value = error.response.data.email[0]
			else if (error.response.data.password)
				textError.value = error.response.data.password[0]
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
	return isLoading.value ? 'Loading...' : 'Sign Up'
})
</script>
