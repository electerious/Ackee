import { useReducer, useCallback } from 'react'
import shortId from '../utils/shortId'

export const ADD_MODAL = Symbol()
export const REMOVE_MODAL = Symbol()
export const RESET_MODALS = Symbol()

const initialState = {}

const reducer = (state, action) => {
	switch (action.type) {
		case ADD_MODAL:
			return {
				...state,
				[action.modalId]: {
					id: action.modalId,
					type: action.payload.type,
					props: action.payload.props,
				},
			}
		case REMOVE_MODAL:
			const clone = { ...state }
			delete clone[action.modalId]
			return clone
		case RESET_MODALS:
			return initialState
		default:
			return state
	}
}

export default () => {
	const [ modals, dispatch ] = useReducer(reducer, initialState)

	const addModal = useCallback((type, props) => dispatch({
		type: ADD_MODAL,
		modalId: shortId(),
		payload: {
			type,
			props,
		},
	}), [ dispatch ])

	const removeModal = useCallback((modalId) => dispatch({
		type: REMOVE_MODAL,
		modalId,
	}), [ dispatch ])

	const resetModals = useCallback(() => dispatch({
		type: RESET_MODALS,
	}), [ dispatch ])

	return {
		modals,
		addModal,
		removeModal,
		resetModals,
	}
}