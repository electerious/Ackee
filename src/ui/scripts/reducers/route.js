import produce from 'immer'

import {
	SET_ROUTE_VALUE,
	RESET_ROUTE
} from '../actions'

import { ROUTE_VIEWS } from '../constants/route'

export const initialState = () => ({
	value: ROUTE_VIEWS
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_ROUTE_VALUE:
			draft.value = action.payload || initialState().value
			break
		case RESET_ROUTE:
			return initialState()
	}

}, initialState())