<template>
	<div
		class="bg-white border rounded-md p-2 flex flex-col justify-between relative"
	>
		<h1 class="text-md">{{ item.name }}</h1>
		<div class="flex justify-between mt-2" v-if="!suggestion">
			<span :class="`badge capitalize text-md ${getColorBadge}`">{{
				item.priority.name
			}}</span>
			<button
				type="button"
				:class="['btn hover:animate-bounce', getColorButton]"
				@click="handleCompletedTasks(item.id)"
			>
				<XCircleIcon
					v-if="item.is_completed"
					class="-ml-0.5 h-5 w-5"
					aria-hidden="true"
				/>
				<CheckCircleIcon v-else class="-ml-0.5 h-5 w-5" aria-hidden="true" />
				{{ getTextButton }}
			</button>
		</div>
		<div class="flex justify-end mt-2" v-else="!suggestion">
			<button type="button" class="btn btn-blue" @click="handleAddTasks()">
				<PlusCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
				Add To Tasks
			</button>
		</div>
	</div>
</template>
<script setup>
import { computed } from 'vue'
import {
	CheckCircleIcon,
	XCircleIcon,
	PlusCircleIcon,
} from '@heroicons/vue/20/solid'
import { useTasksStore } from '../store/tasks'

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

const tasksStore = useTasksStore()

async function handleCompletedTasks(payload) {
	await tasksStore.markTaskComplete(payload)
}

async function handleAddTasks() {
	await tasksStore.addTask({ name: props.item.name })
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
