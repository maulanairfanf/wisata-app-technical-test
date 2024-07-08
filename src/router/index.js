import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Signin from '../pages/Signin.vue'
import authMiddleware from '../middleware/auth'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const routes = [
	{
		path: '',
		component: DefaultLayout,
		children: [
			{
				path: '',
				name: 'Home',
				component: Home,
				meta: {
					requiresAuth: true,
				},
			},
			{
				path: 'signin',
				name: 'SignIn',
				component: Signin,
				meta: {
					requiresAuth: false,
				},
			},
		],
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
