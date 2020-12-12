import produce from 'immer'

import {
	SET_MODALS_STATE,
	REMOVE_MODALS_STATE,
	SET_MODALS_VISIBLE
} from '../actions'

export const initialState = () => ({
	value: {}
})

export const initialSubState = () => ({
	id: undefined,
	type: undefined,
	props: {},
	visible: false
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_MODALS_STATE:
			// Initialize when id is unknown
			draft.value[action.modalId] = draft.value[action.modalId] || initialSubState()
			// Set remaining data
			draft.value[action.modalId].id = action.modalId
			draft.value[action.modalId].type = action.payload.type
			draft.value[action.modalId].props = action.payload.props || initialSubState().props
			draft.value[action.modalId].visible = action.payload.visible || initialSubState().visible
			break
		case REMOVE_MODALS_STATE:
			delete draft.value[action.modalId]
			break
		case SET_MODALS_VISIBLE:
			draft.value[action.modalId].visible = action.payload || initialSubState().visible
			break
	}

}, initialState())