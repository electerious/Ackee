import produce from 'immer'

import {
	SET_FILTER_SORTING,
	SET_FILTER_RANGE,
	SET_FILTER_INTERVAL
} from '../actions'

import { SORTINGS_TOP } from '../../../constants/sortings'
import { RANGES_LAST_7_DAYS } from '../../../constants/ranges'
import { INTERVALS_DAILY } from '../../../constants/intervals'

export const initialState = () => ({
	sorting: SORTINGS_TOP,
	range: RANGES_LAST_7_DAYS,
	interval: INTERVALS_DAILY
})

export default produce((draft, action) => {

	switch (action.type) {
		case SET_FILTER_SORTING:
			draft.sorting = action.payload
			break
		case SET_FILTER_RANGE:
			draft.range = action.payload
			break
		case SET_FILTER_INTERVAL:
			draft.interval = action.payload
			break
	}

}, initialState())