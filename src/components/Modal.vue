<template>
	<TransitionRoot as="template" :show="showModal">
		<Dialog class="relative z-10" @close="handleModal(false)">
			<TransitionChild
				as="template"
				enter="ease-out duration-300"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="ease-in duration-200"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div
					class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				/>
			</TransitionChild>

			<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div
					class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
				>
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enter-to="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leave-from="opacity-100 translate-y-0 sm:scale-100"
						leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<DialogPanel
							class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
						>
							<form @submit.prevent="handleSubmit">
								<div class="bg-white px-4 pb-20 pt-5 sm:p-6 sm:pb-4">
									<div>
										<label
											for="title"
											class="block text-sm font-medium leading-6 text-gray-900"
											>Title</label
										>
										<div class="mt-2">
											<input
												v-model="name"
												type="text"
												name="title"
												id="title"
												class="field-text shadow"
												placeholder="Membaca"
												required
											/>
										</div>
									</div>
									<div class="mt-2">
										<div>
											<label
												for="title"
												class="block text-sm font-medium leading-6 text-gray-900"
												>Priority</label
											>
											<div>
												<InputSelect
													@handle-priority="handlePriority"
													:selectedPriority="selectedPriority"
												/>
											</div>
										</div>
									</div>
								</div>
								<div
									class="px-4 py-3 flex flex-wrap space-x-2 justify-end pt-10"
								>
									<button
										type="button"
										class="btn btn-red"
										@click="handleModal(false)"
										ref="cancelButtonRef"
									>
										Cancel
									</button>
									<button
										type="submit"
										class="btn btn-blue relative"
										:disabled="isLoading"
									>
										<Spinner config="w-12 h-4 " v-if="isLoading" />
										<span v-else>Submit </span>
									</button>
								</div>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue'
import InputSelect from './InputSelect.vue'
import { useTasksStore } from '../store/tasks'
import Spinner from './Spinner.vue'

const props = defineProps({
	showModal: {
		default: false,
		type: Boolean,
	},
	mode: {
		default: 'create',
		type: String,
	},
	item: {
		default: null,
		type: Object,
	},
})

const tasksStore = useTasksStore()
const selectedPriority = ref({})
const name = ref('')
const isLoading = ref(false)
const emit = defineEmits(['handle-modal'])

function handleModal(payload) {
	emit('handle-modal', payload)
	if (props.mode === 'create') {
		name.value = ''
		selectedPriority.value = {}
	} else {
		name.value = props.item.name
		selectedPriority.value = props.item.priority
	}
}

function handlePriority(payload) {
	selectedPriority.value = payload
}

onMounted(() => {
	if (props.mode === 'update') {
		name.value = props.item.name
		selectedPriority.value = props.item.priority
	}
})

async function handleSubmit() {
	isLoading.value = true
	if (props.mode === 'create') {
		await tasksStore.addTask({
			name: name.value,
			priority_id: selectedPriority.value.id,
		})
	} else {
		await tasksStore.updateTask({
			id: props.item.id,
			name: name.value,
			priority_id: selectedPriority.value.id,
		})
	}
	handleModal(false)
	isLoading.value = false
	await tasksStore.fetchTasks('modal')
}
</script>
