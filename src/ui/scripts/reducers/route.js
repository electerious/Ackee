import produce from 'immer'

import {
	SET_ROUTE_VALUE,
	RESET_ROUTE
} from '../actions'

import {
	VIEWS
} from '../constants/routes'

const initialState = () => ({
	value: VIEWS
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