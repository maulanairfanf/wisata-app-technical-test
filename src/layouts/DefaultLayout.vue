<!-- src/layouts/DefaultLayout.vue -->

<template>
	<div class="bg-zinc-900" style="min-height: 100vh">
		<header>
			<div class="flex justify-end p-5">
				<button @click="logout" class="btn-default" :disabled="isLoading">
					{{ getTextButton }}
				</button>
			</div>
		</header>

		<main>
			<router-view />
		</main>

		<footer></footer>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../store/auth'

import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(false)

const logout = async () => {
	isLoading.value = true
	const response = await authStore.logout()
	if (response) router.push('/signin')
	isLoading.value = false
}

const getTextButton = computed(() => {
	return isLoading.value ? 'Loading...' : 'Sign Out'
})
</script>
