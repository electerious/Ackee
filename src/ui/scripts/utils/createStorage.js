export default (key, fallback) => {
	const get = () => {
		const value = localStorage.getItem(key)
		if (value == null) return fallback
		return JSON.parse(value)
	}

	const set = (state) => {
		const value = JSON.stringify(state)
		localStorage.setItem(key, value)
		return state
	}

	const reset = () => {
		localStorage.removeItem(key)
		return fallback
	}

	return {
		get,
		set,
		reset,
	}
}