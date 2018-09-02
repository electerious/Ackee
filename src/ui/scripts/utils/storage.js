export const get = (key) => {

	const value = localStorage.getItem(key)

	return value == null ? undefined : JSON.parse(value)

}

export const set = (key, value) => {

	value = JSON.stringify(value)

	localStorage.setItem(key, value)

}

export const remove = (key) => {

	localStorage.removeItem(key)

}