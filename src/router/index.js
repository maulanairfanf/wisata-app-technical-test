// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Signin from '../pages/Signin.vue'
import authMiddleware from '../middleware/auth'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/signin',
		name: 'Signin',
		component: Signin,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		authMiddleware(to, from, next)
	} else {
		next()
	}
})

export default router
