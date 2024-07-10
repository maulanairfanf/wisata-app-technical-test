<template>
	<div>
		<div class="relative mt-2 rounded-md shadow-sm">
			<input
				type="text"
				class="field-text pr-10"
				placeholder="Search"
				v-model="tasksStore.query"
				@input="handleInput"
			/>
			<div
				class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
			>
				<MagnifyingGlassIcon class="w-6 h-6 bg-transparent" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { useTasksStore } from '../store/tasks'
import { debounce } from 'lodash'
const debouncedFetchTasks = debounce(async function () {
	await tasksStore.fetchTasks()
}, 500)
const tasksStore = useTasksStore()

function handleInput(payload) {
	console.log('payload', payload)
	console.log('tasksStore.query', tasksStore.query)
	debouncedFetchTasks()
}
</script>
