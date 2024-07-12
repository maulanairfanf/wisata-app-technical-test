<template>
	<div
		class="cursor-pointer bg-gray-50 hover:bg-white rounded-md p-2 flex flex-col justify-between relative"
	>
		<h1 class="text-md">{{ item.name }}</h1>
		<div class="flex flex-wrap justify-between mt-2" v-if="!suggestion">
			<span :class="`badge capitalize text-md ${getColorBadge}`">{{
				item.priority.name
			}}</span>
			<div class="flex flex-nowrap justify-end mt-2 md:mt-0">
				<div class="relative group">
					<button
						type="button"
						:class="'btn mr-2 hover:animate-bounce btn-purple '"
						@click="handleModal(true)"
					>
						<PencilIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
					</button>
					<div class="tooltip">Edit Task</div>
				</div>
				<div class="relative group">
					<button
						type="button"
						:class="'btn mr-2 hover:animate-bounce btn-red '"
						@click="handleDeleteTasks(item.id)"
						:disabled="isLoading"
					>
						<TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
					</button>
					<div class="tooltip">Delete Task</div>
				</div>
				<div class="relative group">
					<button
						type="button"
						:class="['btn hover:animate-bounce ', getColorButton]"
						@click="handleCompletedTasks(item.id)"
						:disabled="isLoading"
					>
						<XCircleIcon
							v-if="item.is_completed"
							class="-ml-0.5 h-5 w-5"
							aria-hidden="true"
						/>
						<CheckCircleIcon
							v-else
							class="-ml-0.5 h-5 w-5"
							aria-hidden="true"
						/>
					</button>
					<div class="tooltip">
						{{ item.is_completed ? 'Mark as Incomplete' : 'Mark as Complete' }}
					</div>
				</div>
			</div>
		</div>
		<div class="flex justify-end mt-2" v-else="!suggestion">
			<button
				type="button"
				class="btn btn-blue relative"
				:disabled="isLoading"
				@click="handleAddTasks()"
			>
				<span v-if="!isLoading" class="flex">
					<PlusCircleIcon class="mr-2 h-5 w-5" aria-hidden="true" />
					Add
				</span>
				<Spinner v-else config="w-5 h-5 fill-white" />
			</button>
		</div>
	</div>
	<Modal
		:showModal="showModal"
		:item="item"
		@handle-modal="handleModal"
		mode="update"
	/>
</template>
<script setup>
import { computed, ref } from 'vue'
import {
	CheckCircleIcon,
	XCircleIcon,
	PlusCircleIcon,
	TrashIcon,
	PencilIcon,
} from '@heroicons/vue/20/solid'
import { useTasksStore } from '../store/tasks'
import Modal from '../components/Modal.vue'
import Spinner from '../components/Spinner.vue'

const props = defineProps({
	item: {
		type: Object,
		required: true,
	},
	suggestion: {
		type: Boolean,
		default: false,
	},
})

const showModal = ref(false)
const tasksStore = useTasksStore()
const isLoading = ref(false)

function handleModal(show) {
	if (!props.suggestion) {
		showModal.value = show
	}
}

async function handleCompletedTasks(payload) {
	await tasksStore.markTaskComplete(payload)
}

async function handleAddTasks() {
	isLoading.value = true
	await tasksStore.addTask({ name: props.item.name })
	await tasksStore.fetchTasks('handhandleAddTasksle')
	isLoading.value = false
}

async function handleDeleteTasks() {
	isLoading.value = true
	await tasksStore.deleteTask(props.item.id)
	await tasksStore.fetchTasks('handhandleAddTasksle')
	isLoading.value = false
}

const getTextButton = computed(() => {
	const isCompleted = props.item.is_completed

	if (isCompleted) {
		return 'Undo'
	} else {
		return 'Done'
	}
})

const getColorButton = computed(() => {
	const isCompleted = props.item.is_completed

	if (isCompleted) {
		return 'btn btn-gray'
	} else {
		return 'btn btn-green'
	}
})

const getColorBadge = computed(() => {
	const priority = props.item.priority.name

	if (priority === 'low') {
		return 'badge-green'
	} else if (priority === 'medium') {
		return 'badge-yellow'
	} else if (priority === 'high') {
		return 'badge-red'
	} else {
		return ''
	}
})
</script>
<style>
#tooltip:hover .absolute {
	opacity: 1;
	visibility: visible;
}
</style>
