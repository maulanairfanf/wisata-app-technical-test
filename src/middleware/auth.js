import Cookies from 'js-cookie'

export default function authMiddleware(to, from, next) {
	const token = Cookies.get('token')
	if (token) {
		next()
	} else {
		next('/signin')
	}
}
