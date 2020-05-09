import produce from 'immer'

import {
	SET_FILTER_RANGE
} from '../actions'

import { RANGES_LAST_7_DAYS } from '../../../constants/ranges'

export const initialState = () => ({
	range: RANGES_LAST_7_DAYS
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_FILTER_RANGE:
			draft.range = action.payload
			break
	}

}, initialState())