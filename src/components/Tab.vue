<template>
	<div
		class="w-full p-2 flex space-y-2 flex-wrap items-center justify-center md:justify-between"
	>
		<Search />
		<TabList class="flex flex-wrap space-x-2 rounded-xl bg-blue-900/40 p-1 mt">
			<Tab
				v-for="(item, index) in dataTabList"
				as="template"
				:key="index"
				v-slot="{ selected }"
			>
				<button
					data-headlessui-state="index"
					:class="[
						'rounded-lg py-2 text-sm font-medium px-2',
						'focus:outline-none ',
						selected
							? 'bg-white text-blue-500 shadow'
							: 'text-blue-500 hover:bg-blue-500 hover:text-white',
					]"
				>
					{{ item.name }}
				</button>
			</Tab>
		</TabList>
	</div>
</template>

<script setup>
import { TabList, Tab } from '@headlessui/vue'
import Search from './Search.vue'
defineProps({
	dataTabList: {
		default: [],
		type: Array,
		required: true,
	},
})
</script>
