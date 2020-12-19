import api from '../utils/api'
import signalHandler from '../utils/signalHandler'
import batchDispatch from '../utils/batchDispatch'

export const SET_WIDGETS_START = Symbol()
export const SET_WIDGETS_END = Symbol()
export const SET_WIDGETS_FETCHING = Symbol()
export const SET_WIDGETS_ERROR = Symbol()

export const setWidgetsStart = (id, value) => ({
	type: SET_WIDGETS_START,
	id,
	value
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

export const setWidgetsError = (payload) => ({
	type: SET_WIDGETS_ERROR,
	payload
})

export const fetchWidgets = signalHandler((signal) => (props, loaders) => async (dispatch) => {

	// Only fetch widgets when there's something to load as empty requests are forbidden
	if (loaders.length === 0) return

	const id = loaders.map((loader) => loader.id).join('')

	// Generate an unique name for every query
	const queryName = (index) => `_${ index }`

	// Combine multiple queries into one
	const query = loaders.map((loader, index) => {
		const { query } = loader
		return `${ queryName(index) }: ${ query }`
	}).join('')

	batchDispatch(dispatch, loaders.map((loader) => {
		const { id, enhancer } = loader
		return setWidgetsStart(id, enhancer())
	}))

	try {

		const data = await api({
			query: `
				{
					${ query }
				}
			`,
			props,
			signal: signal(id)
		})

		batchDispatch(dispatch, loaders.map((loader, index) => {
			const { id, selector, enhancer } = loader
			const entryName = queryName(index)
			return setWidgetsEnd(id, enhancer(selector(data, entryName)))
		}))

	} catch (err) {

		if (err.name === 'AbortError') return
		batchDispatch(dispatch, loaders.map((loader) => setWidgetsFetching(loader.id, false)))
		if (err.name === 'HandledError') return
		dispatch(setWidgetsError(err))

	}

})