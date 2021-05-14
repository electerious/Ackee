import shortId from '../utils/shortId'
import { useReducer, useCallback } from 'react'

export const ADD_MODAL = Symbol()
export const REMOVE_MODAL = Symbol()

export const initialState = {}

const reducer = (state, action) => {

	switch (action.type) {
		case ADD_MODAL:
			return {
				...state,
				[action.modalId]: {
					id: action.modalId,
					type: action.payload.type,
					props: action.payload.props,
					visible: true
				}
			}
		case REMOVE_MODAL:
			const clone = { ...state }
			delete clone[action.modalId]
			return clone
		default:
			return state
	}

}

export default () => {

	const [ modals, dispatch ] = useReducer(reducer, initialState)

	const addModal = useCallback((payload) => dispatch({
		type: ADD_MODAL,
		modalId: shortId(),
		payload
	}), [ dispatch ])

	const removeModal = useCallback((modalId) => dispatch({
		type: REMOVE_MODAL,
		modalId
	}), [ dispatch ])

	return {
		modals,
		addModal,
		removeModal
	}

}