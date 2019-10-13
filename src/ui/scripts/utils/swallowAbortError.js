export default (fn) => async (...args) => {

	try {

		return await fn(...args)

	} catch (err) {

		if (err.name === 'AbortError') {
			// Request has been canceled => Do nothing
			return
		}

		throw err

	}

}