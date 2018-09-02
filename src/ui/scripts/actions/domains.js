export const SET_DOMAINS_VALUE = Symbol()
export const SET_DOMAINS_FETCHING = Symbol()
export const SET_DOMAINS_ERROR = Symbol()

export const setDomainsValue = (payload) => ({
	type: SET_DOMAINS_VALUE,
	payload
})

export const setDomainsFetching = (payload) => ({
	type: SET_DOMAINS_FETCHING,
	payload
})

export const setDomainsError = (payload) => ({
	type: SET_DOMAINS_ERROR,
	payload
})

export const fetchDomains = (props) => async (dispatch) => {

	dispatch(setDomainsFetching(true))
	dispatch(setDomainsError())

	try {

		const response = await fetch('/domains', {
			method: 'get',
			headers: new Headers({
				Authorization: `Bearer ${ props.token.value.id }`
			})
		})

		if (response.ok === false) {
			const text = await response.text()
			throw new Error(text)
		}

		const json = await response.json()
		const data = json.data

		dispatch(setDomainsFetching(false))
		dispatch(setDomainsValue(data))

	} catch (err) {

		console.error(err)

		dispatch(setDomainsFetching(false))
		dispatch(setDomainsError(err.message))

		if (err.message === 'Token unknown') {
			// Reset token and show login
			props.deleteToken(props)
		}

	}

}