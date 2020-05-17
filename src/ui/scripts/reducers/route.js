import produce from 'immer'

import {
	SET_ROUTE_VALUE
} from '../actions'

import { ROUTE_OVERVIEW } from '../constants/route'

export const initialState = () => ({
	value: ROUTE_OVERVIEW
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_ROUTE_VALUE:
			draft.value = action.payload
			break
	}

}, initialState())