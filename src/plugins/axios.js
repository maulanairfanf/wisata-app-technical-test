// src/services/axios.js

import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
})

instance.interceptors.request.use(
	config => {
		const token = Cookies.get('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

instance.interceptors.response.use(
	response => response,
	error => {
		// if (error.response.status === 401) {
		// 	window.location = '/signin'
		// }
		return Promise.reject(error)
	}
)

export default instance
