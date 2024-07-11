<template>
	<div class="flex flex-col items-center justify-center container mx-auto">
		<div class="grid md:grid-cols-12 gap-4 w-full">
			<div class="md:col-span-8 lg:col-span-10 flex flex-col items-center">
				<TabGroup @change="handleChangeTab">
					<Tab :dataTabList="dataTabList" />
					<div
						v-if="tasksStore.isLoading"
						class="h-full w-full flex items-center justify-center"
					>
						<Spinner size="h-24 w-24" class="mt-20" />
					</div>
					<TabPanels class="w-full" v-else>
						<TabPanel class="tab-panel">
							<TasksList :tasks="tasksStore.tasks" />
						</TabPanel>
						<TabPanel class="tab-panel">
							<TasksList :tasks="tasksStore.tasks" />
						</TabPanel>
						<TabPanel class="tab-panel">
							<TasksList :tasks="tasksStore.tasks" />
						</TabPanel>
					</TabPanels>
				</TabGroup>
				<Pagination v-if="tasksStore.pagination.total !== 0" />
			</div>
			<div class="md:col-span-4 lg:col-span-2 p-2">
				<h1 class="text-xl text-white font-semibold py-4">Suggestion Tasks</h1>
				<div
					v-if="isLoadingSuggestion"
					class="h-full w-full flex items-center justify-center"
				>
					<Spinner size="h-24 w-24" class="mt-20" />
				</div>
				<TasksListSuggestion v-else :tasks="tasksStore.tasksSuggestion" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useTasksStore } from '../store/tasks'
import TasksList from '../components/TasksList.vue'
import TasksListSuggestion from '../components/TasksListSuggestion.vue'
import Pagination from '../components/Pagination.vue'
import Spinner from '../components/Spinner.vue'
import Tab from '../components/Tab.vue'
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/vue'
const tasksStore = useTasksStore()
const dataTabList = ref([
	{
		name: 'All Tasks',
	},
	{
		name: 'Incomplete Tasks',
	},
	{
		name: 'Completed Tasks',
	},
])
const isLoadingSuggestion = ref(false)

async function handleChangeTab(payload) {
	tasksStore.resetPagination()

	if (payload === 0) {
		tasksStore.is_completed = ''
	} else if (payload === 1) {
		tasksStore.is_completed = 0
	} else if (payload === 2) {
		tasksStore.is_completed = 1
	}
}

watch(
	() => tasksStore.is_completed,
	async (oldValue, newValue) => {
		if (oldValue !== newValue) {
			await tasksStore.fetchTasks()
		}
	}
)

onBeforeMount(() => {
	tasksStore.isLoading = true
	isLoadingSuggestion.value = true
})

onMounted(async () => {
	await tasksStore.fetchTasks()
	await tasksStore.fetchTasksSuggestion()
	isLoadingSuggestion.value = false
})
</script>
