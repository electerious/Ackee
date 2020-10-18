import wait from '../utils/wait'
import shortId from '../utils/shortId'

export const SET_MODALS_STATE = Symbol()
export const REMOVE_MODALS_STATE = Symbol()
export const SET_MODALS_VISIBLE = Symbol()

export const setModalsState = (modalId, payload) => ({
	type: SET_MODALS_STATE,
	modalId,
	payload
})

export const removeModalsState = (modalId) => ({
	type: REMOVE_MODALS_STATE,
	modalId
})

export const setModalsVisible = (modalId, payload) => ({
	type: SET_MODALS_VISIBLE,
	modalId,
	payload
})

export const addModalsModal = (payload) => async (dispatch) => {

	const modalId = shortId()

	dispatch(setModalsState(modalId, payload))

	// Browsers only trigger a class change transition when a frame has
	// passed since the initial rendering. That's why we wait a bit.
	wait(() => {

		dispatch(setModalsVisible(modalId, true))

	}, 30)

}

export const removeModalsModal = (modalId) => async (dispatch) => {

	dispatch(setModalsVisible(modalId, false))

	// Wait for the modal close transition to finish
	wait(() => {

		dispatch(removeModalsState(modalId))

	}, 300)

}