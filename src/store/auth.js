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
				if (response) {
					console.log('response', response.data.data.access_token)
					this.token = response.data.data.access_token
					Cookies.set('token', this.token, { expires: 7 })
					axios.defaults.headers.common[
						'Authorization'
					] = `Bearer ${this.token}`
					return response
				}
			} catch (error) {
				throw error
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
				return response
			} catch (error) {
				throw error
			}
		},
	},
})
