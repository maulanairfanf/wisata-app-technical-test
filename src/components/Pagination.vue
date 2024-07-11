<template>
	<div class="flex items-center justify-between px-4 py-3 sm:px-6">
		<div class="flex flex-1 justify-between sm:hidden">
			<a
				href="#"
				class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>Previous</a
			>
			<a
				href="#"
				class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>Next</a
			>
		</div>
		<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
			<div>
				<nav
					class="isolate inline-flex rounded-md shadow-sm bg-blue-600/30"
					aria-label="Pagination"
				>
					<div class="pagination-button rounded-l-md" @click="handlePrev()">
						<span class="sr-only">Previous</span>
						<ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
					</div>

					<span
						v-for="index in pagination.last_page"
						:key="index"
						@click="handleChangePagination(index)"
						:class="[
							'cursor-pointer ',
							pagination.current_page === index
								? 'pagination-active'
								: 'pagination-default',
						]"
						>{{ index }}</span
					>

					<div class="pagination-button rounded-r-md" @click="handleNext()">
						<span class="sr-only">Next</span>
						<ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
					</div>
				</nav>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { useTasksStore } from '../store/tasks'

const tasksStore = useTasksStore()
const { pagination } = tasksStore
function handleChangePagination(payload) {
	pagination.current_page = payload
	tasksStore.fetchTasks('pagination')
}
function handlePrev() {
	if (pagination.current_page - 1 >= 1) {
		pagination.current_page--
		tasksStore.fetchTasks('pagination')
	}
}
function handleNext() {
	if (pagination.current_page + 1 <= pagination.last_page) {
		pagination.current_page++
		tasksStore.fetchTasks('pagination')
	}
}
</script>
