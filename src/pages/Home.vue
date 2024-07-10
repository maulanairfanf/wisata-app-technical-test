<template>
	<div
		class="flex flex-col items-center justify-center container mx-auto"
		v-if="!tasksStore.isLoading && tasksStore.tasks.length > 0"
	>
		<div class="grid md:grid-cols-12 gap-4 w-full">
			<div class="md:col-span-10 flex flex-col items-center">
				<TabGroup>
					<Tab :dataTabList="dataTabList" />
					<TabPanels class="w-full">
						<TabPanel class="tab-panel">
							<TasksList :tasks="tasksStore.tasks" />
						</TabPanel>
						<TabPanel class="tab-panel">
							<TasksList :tasks="tasksStore.tasks" />
						</TabPanel>
					</TabPanels>
				</TabGroup>
			</div>
			<div class="md:col-span-2">
				<h1 class="text-xl text-white font-semibold py-4">Suggestion Tasks</h1>
				<TasksListSuggestion :tasks="tasksStore.tasksSuggestion" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useTasksStore } from '../store/tasks'
import TasksList from '../components/TasksList.vue'
import TasksListSuggestion from '../components/TasksListSuggestion.vue'

import Tab from '../components/Tab.vue'
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/vue'

const tasksStore = useTasksStore()
const dataTabList = ref([
	{
		name: 'Tasks',
	},
	{
		name: 'Completed',
	},
])

onBeforeMount(() => {
	tasksStore.isLoading = true
})
onMounted(async () => {
	await tasksStore.fetchTasks()
	await tasksStore.fetchTasksSuggestion()
	tasksStore.isLoading = false
})
</script>
