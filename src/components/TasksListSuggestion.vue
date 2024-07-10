<template>
	<div>
		<div class="grid grid-cols-1 gap-2">
			<Card v-for="(item, index) in tasks" :key="index" :item="item" />
		</div>
	</div>
</template>
<script setup>
import Card from './Card.vue'
defineProps({
	tasks: {
		default: [],
		type: Array,
	},
})
</script>
