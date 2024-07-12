<template>
	<Listbox v-model="selectedPriority">
		<div class="relative mt-1" v-if="!isLoading">
			<ListboxButton class="relative field-text bg-white text-left">
				<span class="block truncate capitalize">{{
					selectedPriority?.name
				}}</span>
				<span
					class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
				>
					<ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
				</span>
			</ListboxButton>

			<transition
				leave-active-class="transition duration-100 ease-in"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<ListboxOptions
					class="fxied mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-30"
				>
					<ListboxOption
						v-slot="{ active, selected }"
						v-for="(item, index) in tasksStore.priorities"
						:key="item.name"
						:value="item"
						as="template"
					>
						<li
							:class="[
								active ? 'bg-blue-100 text-grey-700' : 'text-gray-900',
								'relative cursor-default select-none py-2 pl-10 pr-4',
							]"
						>
							<span
								:class="[
									selected ? 'font-medium' : 'font-normal',
									'block truncate capitalize',
								]"
								>{{ item.name }}</span
							>
							<span
								v-if="selected"
								class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
							>
								<CheckIcon class="h-5 w-5" aria-hidden="true" />
							</span>
						</li>
					</ListboxOption>
				</ListboxOptions>
			</transition>
		</div>
	</Listbox>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import {
	Listbox,
	ListboxLabel,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useTasksStore } from '../store/tasks'

const props = defineProps({
	selectedPriority: {
		type: Object,
		default: () => {},
	},
})

const tasksStore = useTasksStore()
const isLoading = ref(true)

const selectedPriority = ref()

const emits = defineEmits(['handle-priority'])

onMounted(async () => {
	if (tasksStore.priorities.length === 0) await tasksStore.fetchPriority()
	if (Object.keys(props.selectedPriority).length !== 0) {
		console.log('masuk if', props.selectedPriority)
		selectedPriority.value = props.selectedPriority
	} else {
		console.log('masuke else', tasksStore.priorities[0])
		selectedPriority.value = tasksStore.priorities[0]
	}
	isLoading.value = false
})

watch(
	() => selectedPriority.value,
	newValue => {
		emits('handle-priority', newValue)
	}
)
</script>
