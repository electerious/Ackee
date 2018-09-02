export const SET_VIEWS_VALUE = Symbol()
export const SET_VIEWS_FETCHING = Symbol()
export const SET_VIEWS_ERROR = Symbol()

export const setViewsValue = (domainId, payload) => ({
	type: SET_VIEWS_VALUE,
	domainId,
	payload
})

export const setViewsFetching = (domainId, payload) => ({
	type: SET_VIEWS_FETCHING,
	domainId,
	payload
})

export const setViewsError = (domainId, payload) => ({
	type: SET_VIEWS_ERROR,
	domainId,
	payload
})

export const fetchViews = (domainId, props) => async (dispatch) => {

	dispatch(setViewsFetching(domainId, true))
	dispatch(setViewsError(domainId))

	try {

		const response = await fetch(`/domains/${ domainId }/views`, {
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

		dispatch(setViewsFetching(domainId, false))
		dispatch(setViewsValue(domainId, data))

	} catch (err) {

		console.error(err)

		dispatch(setViewsFetching(domainId, false))
		dispatch(setViewsError(domainId, err.message))

		if (err.message === 'Token unknown') {
			// Reset token and show login
			props.deleteToken(props)
		}

	}

}