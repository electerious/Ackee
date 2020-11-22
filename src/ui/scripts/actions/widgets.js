import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_WIDGETS_VALUE = Symbol()
export const SET_WIDGETS_VARIABLES = Symbol()
export const SET_WIDGETS_FETCHING = Symbol()
export const SET_WIDGETS_ERROR = Symbol()

export const setWidgetsValue = (id, payload) => ({
	type: SET_WIDGETS_VALUE,
	id,
	payload
})

export const setWidgetsVariables = (id, payload) => ({
	type: SET_WIDGETS_VARIABLES,
	id,
	payload
})

export const setWidgetsFetching = (id, payload) => ({
	type: SET_WIDGETS_FETCHING,
	id,
	payload
})

export const setWidgetsError = (id, payload) => ({
	type: SET_WIDGETS_ERROR,
	id,
	payload
})

export const fetchWidget = signalHandler((signal) => (props, loader) => async (dispatch) => {

	const { id, query, variables, selector } = loader

	dispatch(setWidgetsVariables(id, variables))
	dispatch(setWidgetsFetching(id, true))
	dispatch(setWidgetsError(id))

	try {

		const data = await api({
			query,
			variables,
			props,
			signal: signal(id)
		})

		dispatch(setWidgetsValue(id, selector(data)))
		dispatch(setWidgetsFetching(id, false))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setWidgetsFetching(id, false))
		if (err.name === 'HandledError') return
		dispatch(setWidgetsError(id, err))

	}

})