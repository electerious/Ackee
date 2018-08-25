import immer from 'immer'

import {
	SET_ROUTE_TAB
} from '../actions'

import {
	OVERVIEW
} from '../constants/routes'

const initalState = {
	tab: OVERVIEW
}

export default (state = initalState, action) => immer(state, (draft) => {

	switch (action.type) {
		case SET_ROUTE_TAB:
			draft.tab = action.payload
			break
	}

})