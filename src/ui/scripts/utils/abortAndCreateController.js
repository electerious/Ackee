export default (abortController) => {

	const hasAbortController = abortController != null

	if (hasAbortController === true) abortController.abort()

	return new AbortController()

}