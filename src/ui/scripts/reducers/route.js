import produce from 'immer'

import {
	SET_ROUTE_VALUE,
	RESET_ROUTE
} from '../actions'

import {
	OVERVIEW
} from '../constants/routes'

const initalState = () => ({
	value: OVERVIEW
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_ROUTE_VALUE:
			draft.value = action.payload || initalState().value
			break
		case RESET_ROUTE:
			return initalState()
	}

}, initalState())