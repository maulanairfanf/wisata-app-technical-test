<!-- src/pages/Home.vue -->

<template>
	<div>
		<h1>Home Page</h1>
		<p>Welcome, {{ user?.email }}</p>
		<button @click="logout" class="btn">Logout</button>
	</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../store/auth'
import axios from '../plugins/axios'

const authStore = useAuthStore()
const user = authStore.user

const logout = () => {
	authStore.logout()
}

onMounted(async () => {
	try {
		const response = await axios.get('/data')
		if (response) {
			console.log('response', response.data)
		}
	} catch (error) {
		console.log('error', error)
	}
})
</script>
