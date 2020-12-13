import api from '../utils/api'
import signalHandler from '../utils/signalHandler'
import batchDispatch from '../utils/batchDispatch'

export const SET_WIDGETS_START = Symbol()
export const SET_WIDGETS_END = Symbol()
export const SET_WIDGETS_FETCHING = Symbol()
export const SET_WIDGETS_ERROR = Symbol()

export const setWidgetsStart = (id, value, Renderer, variables) => ({
	type: SET_WIDGETS_START,
	id,
	value,
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

export const fetchWidgets = signalHandler((signal) => (props, loaders) => async (dispatch) => {

	const id = loaders.map((loader) => loader.id).join('')

	// Generate an unique name for every query
	const queryName = (index) => `_${ index }`

	// Combine multiple queries into one
	const query = loaders.map((loader, index) => {
		const { query } = loader
		return `${ queryName(index) }: ${ query }`
	}).join('')

	batchDispatch(dispatch, loaders.map((loader) => {
		const { id, Renderer, variables, enhancer } = loader
		return setWidgetsStart(id, enhancer(), Renderer, variables)
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
		batchDispatch(dispatch, loaders.map((loader) => setWidgetsError(loader.id, err)))

	}

})