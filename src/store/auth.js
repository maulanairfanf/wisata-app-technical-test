// src/store/auth.js

import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
		token: Cookies.get('token') || null,
	}),
	actions: {
		async login(credentials) {
			try {
				const response = await axios.post('/login', credentials)
				this.token = response.data.token
				Cookies.set('token', this.token, { expires: 7 }) // Token akan disimpan di cookie selama 7 hari
				axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
			} catch (error) {
				console.error(error)
			}
		},
		async logout() {
			try {
				const response = await axios.post('/logout')
				if (response) {
					this.user = null
					this.token = null
					Cookies.remove('token')
					delete axios.defaults.headers.common['Authorization']
				}
			} catch (error) {}
		},
		async fetchUser() {
			// if (this.token) {
			// 	try {
			// 		const response = await axios.get('/user')
			// 		this.user = response.data
			// 	} catch (error) {
			// 		console.error(error)
			// 	}
			// }
		},
	},
})
