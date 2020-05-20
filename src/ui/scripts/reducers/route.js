import produce from 'immer'

import {
	SET_ROUTE
} from '../actions'

import { ROUTE_OVERVIEW } from '../constants/route'

export const initialState = () => ({
	key: ROUTE_OVERVIEW.key,
	params: {}
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_ROUTE:
			draft.key = action.key
			draft.params = action.params
			break
	}

}, initialState())