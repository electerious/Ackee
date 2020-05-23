import produce from 'immer'

import {
	SET_FILTER_RANGE,
	SET_FILTER_INTERVAL
} from '../actions'

import { RANGES_LAST_7_DAYS } from '../../../constants/ranges'
import { INTERVALS_DAILY } from '../../../constants/intervals'

export const initialState = () => ({
	range: RANGES_LAST_7_DAYS,
	interval: INTERVALS_DAILY
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_FILTER_RANGE:
			draft.range = action.payload
			break
		case SET_FILTER_INTERVAL:
			draft.interval = action.payload
			break
	}

}, initialState())