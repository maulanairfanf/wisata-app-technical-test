import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Signin from '../pages/Signin.vue'
import SignUp from '../pages/SignUp.vue'
import authMiddleware from '../middleware/auth'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

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
		],
	},
	{
		path: '',
		component: AuthLayout,
		children: [
			{
				path: 'signin',
				name: 'SignIn',
				component: Signin,
				meta: {
					requiresAuth: false,
				},
			},
			{
				path: 'signup',
				name: 'SignUp',
				component: SignUp,
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
