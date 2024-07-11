import { ref, computed } from 'vue'

export function useTextLimit() {
	const limitedText = text => {
		return text.length > 20 ? text.substring(0, 20) + '...' : text
	}

	return {
		limitedText,
	}
}
