import timeout from './timeout'
import HandledError from './HandledError'

export default async ({ query, variables, props, signal }) => {

	try {

		const headers = new Headers()
		const token = props.token.value.id

		headers.append('Content-Type', 'application/json')
		if (token) headers.append('Authorization', `Bearer ${ token }`)

		const request = fetch('/graphql', {
			method: 'post',
			headers,
			body: JSON.stringify({
				query,
				variables
			}),
			signal
		})

		const response = await timeout(request, 'Request timeout', 30000)

		if (response.ok === false) {
			const text = await response.text()
			throw new Error(text)
		}

		const json = await response.json()

		if (json.errors != null) {
			const message = json.errors[0].message
			throw new Error(message)
		}

		return json.data

	} catch (err) {

		console.error(err)

		if (err.message === 'Token invalid') {
			// Reset token and show login
			props.deleteToken(props)
			throw new HandledError(err.message)
		}

		// Re-throw error so the caller can handle it.
		// Make sure to do nothing when a AbortError occurs.
		throw err

	}

}