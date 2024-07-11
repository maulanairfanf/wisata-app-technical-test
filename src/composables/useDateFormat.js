export function useDateFormat() {
	const formatDate = dateString => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' }
		return new Date(dateString).toLocaleDateString(undefined, options)
	}

	return {
		formatDate,
	}
}
