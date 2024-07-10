<template>
	<div
		class="bg-white border border-blue-500 rounded-md p-2 flex flex-col justify-between"
	>
		<h1 class="text-md">{{ item.name }}</h1>
		<div class="flex justify-between mt-2">
			<span :class="`badge capitalize text-md ${getColorBadge}`">{{
				item.priority.name
			}}</span>
			<button type="button" class="btn-primary">
				<CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
				Done
			</button>
		</div>
	</div>
</template>
<script setup>
import { computed } from 'vue'

import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
	item: {
		type: Object,
		required: true,
	},
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
