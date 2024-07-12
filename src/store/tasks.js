import { defineStore } from 'pinia'
import axios from '../plugins/axios'

export const useTasksStore = defineStore('tasks', {
	state: () => ({
		tasks: [],
		tasksSuggestion: [],
		isLoading: false,
		pagination: {
			per_page: 12,
			current_page: 1,
			last_page: 1,
			total: 0,
		},
		query: '',
		is_completed: '',
		priorities: [],
	}),
	actions: {
		async fetchTasks(payload) {
			console.log('modal', payload)
			this.isLoading = true

			const params = {
				is_completed: this.is_completed,
				search: this.query,
				per_page: this.pagination.per_page,
				page: this.pagination.current_page,
			}

			try {
				const response = await axios.get('/tasks', { params })
				console.log('response', response.data)
				this.tasks = response.data.data

				this.pagination.current_page = response.data.pagination.current_page
				this.pagination.last_page = response.data.pagination.last_page
				this.pagination.total = response.data.pagination.total
			} catch (error) {
				console.error('Error fetching tasks:', error)
			}
			this.isLoading = false
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

		async markTaskComplete(taskId) {
			try {
				await axios.patch(`/tasks/${taskId}/complete`)
				await this.fetchTasks()
			} catch (error) {
				console.error(`Error marking task ${taskId} as complete:`, error)
			}
		},

		async addTask(task) {
			try {
				await axios.post('/tasks', task)
			} catch (error) {
				console.error('Error adding task:', error)
			}
		},

		async deleteTask(id) {
			try {
				await axios.delete('/tasks/' + id)
			} catch (error) {
				console.error('Error adding task:', error)
			}
		},

		async updateTask(payload) {
			console.log('payload', payload)
			try {
				await axios.put(`/tasks/${payload.id}`, {
					name: payload.name,
					priority_id: payload.priority_id,
				})
			} catch (error) {
				console.error('Error adding task:', error)
			}
		},

		async fetchPriority() {
			try {
				const response = await axios.get(`/priorities`)
				if (response) {
					this.priorities = response.data.data
					console.log('this.priorities', this.priorities)
				}
			} catch (error) {
				console.error(`Error marking task ${taskId} as complete:`, error)
			}
		},

		resetPagination() {
			this.pagination.current_page = 1
			this.pagination.last_page = 1
			this.pagination.total = 0
			this.pagination.per_page = 12
		},
	},
})
