import api from '../utils/api'
import signalHandler from '../utils/signalHandler'

export const SET_EVENTS_START = Symbol()
export const SET_EVENTS_END = Symbol()
export const SET_EVENTS_FETCHING = Symbol()
export const SET_EVENTS_ERROR = Symbol()

export const setEventsStart = () => ({
	type: SET_EVENTS_START
})

export const setEventsEnd = (value) => ({
	type: SET_EVENTS_END,
	value
})

export const setEventsFetching = (payload) => ({
	type: SET_EVENTS_FETCHING,
	payload
})

export const setEventsError = (payload) => ({
	type: SET_EVENTS_ERROR,
	payload
})

export const fetchEvents = signalHandler((signal) => (props) => async (dispatch) => {

	dispatch(setEventsStart(true))

	try {

		const data = await api({
			query: `
				query fetchEvents {
					events {
						id
						title
						type
					}
				}
			`,
			props,
			signal: signal()
		})

		dispatch(setEventsEnd(data.events))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setEventsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setEventsError(err))

	}

})

export const addEvent = (props, state) => async (dispatch) => {

	dispatch(setEventsStart(true))

	try {

		await api({
			query: `
				mutation createEvent($input: CreateEventInput!) {
					createEvent(input: $input) {
						success
					}
			  	}
			`,
			variables: {
				input: {
					title: state.title,
					type: state.type
				}
			},
			props
		})

		await dispatch(fetchEvents(props))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setEventsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setEventsError(err))

	}

}

export const updateEvent = signalHandler((signal) => (props, eventId, state) => async (dispatch) => {

	dispatch(setEventsStart(true))

	try {

		await api({
			query: `
				mutation updateEvent($id: ID!, $input: UpdateEventInput!) {
					updateEvent(id: $id, input: $input) {
						success
					}
				}
			`,
			variables: {
				id: eventId,
				input: {
					title: state.title,
					type: state.type
				}
			},
			props,
			signal: signal(eventId)
		})

		await dispatch(fetchEvents(props))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setEventsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setEventsError(err))

	}

})

export const deleteEvent = signalHandler((signal) => (props, eventId) => async (dispatch) => {

	dispatch(setEventsStart(true))

	try {

		await api({
			query: `
				mutation deleteEvent($id: ID!) {
					deleteEvent(id: $id) {
						success
					}
				}
			`,
			variables: {
				id: eventId
			},
			props,
			signal: signal(eventId)
		})

		await dispatch(fetchEvents(props))

	} catch (err) {

		if (err.name === 'AbortError') return
		dispatch(setEventsFetching(false))
		if (err.name === 'HandledError') return
		dispatch(setEventsError(err))

	}

})