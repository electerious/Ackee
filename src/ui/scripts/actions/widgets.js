import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_WIDGETS_START = Symbol()
export const SET_WIDGETS_END = Symbol()
export const SET_WIDGETS_FETCHING = Symbol()
export const SET_WIDGETS_ERROR = Symbol()

export const setWidgetsStart = (id, Renderer, variables) => ({
	type: SET_WIDGETS_START,
	id,
	Renderer,
	variables
})

export const setWidgetsEnd = (id, value) => ({
	type: SET_WIDGETS_END,
	id,
	value
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

	const { id, Renderer, query, variables, selector } = loader

	dispatch(setWidgetsStart(id, Renderer, variables))

	try {

		const data = await api({
			query,
			variables,
			props,
			signal: signal(id)
		})

		dispatch(setWidgetsEnd(id, selector(data)))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setWidgetsFetching(id, false))
		if (err.name === 'HandledError') return
		dispatch(setWidgetsError(id, err))

	}

})