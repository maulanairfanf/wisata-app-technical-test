<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
			<Card v-for="(item, index) in tasks" :key="index" :item="item" />
		</div>
		<Modal />
	</div>
</template>
<script setup>
import Modal from './Modal.vue'
import Card from './Card.vue'
defineProps({
	tasks: {
		default: [],
		type: Array,
	},
})
</script>
