// src/stores/tasks.js

import { defineStore } from 'pinia'
import axios from '../plugins/axios'

export const useTasksStore = defineStore('tasks', {
	state: () => ({
		tasks: [],
		tasksSuggestion: [],
		isLoading: false,
		pagination: {},
		query: '',
	}),
	actions: {
		async fetchTasks() {
			try {
				const response = await axios.get('/tasks')
				console.log('response', response.data)
				this.tasks = response.data.data
				this.pagination = response.data.pagination
			} catch (error) {
				console.error('Error fetching tasks:', error)
			}
		},

		async fetchTasksSuggestion() {
			try {
				const response = await axios.get('/tasks-suggestion')
				console.log('response', response.data)
				this.tasksSuggestion = response.data.data
			} catch (error) {
				console.error('Error fetching tasks:', error)
			}
		},
	},
})
