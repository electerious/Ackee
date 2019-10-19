// Executes the wrapped function with a signal function. This function can
// be used to get a new abort controller signal. Existing abort controllers
// will be aborted.
export default (fn) => {

	const defaultAbortControllerId = Symbol()
	const abortControllers = {}

	const signal = (id = defaultAbortControllerId) => {

		// Cancel existing AbortController
		if (abortControllers[id] != null) abortControllers[id].abort()

		abortControllers[id] = new AbortController()

		return abortControllers[id].signal

	}

	return fn(signal)

}