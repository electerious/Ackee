import { ALL_DOMAINS } from '../actions/overview'
import isDefined from '../../../utils/isDefined'
import * as selectOverviewValue from '../selectors/selectOverviewValue'

export default (state) => {

	const fetching = (
		selectOverviewValue.withoutType(state, ALL_DOMAINS).fetching === true ||
		Object.values(state.overview.value).some((value) => value.fetching) === true ||
		Object.values(state.widgets.value).some((value) => value.fetching) === true ||
		state.domains.fetching === true ||
		state.token.fetching === true ||
		state.permanentTokens.fetching === true ||
		state.events.fetching === true
	)

	const errors = [
		selectOverviewValue.withoutType(state, ALL_DOMAINS).error,
		...Object.values(state.overview.value).map((value) => value.error),
		...Object.values(state.widgets.value).map((value) => value.error),
		state.domains.error,
		state.token.error,
		state.permanentTokens.error,
		state.events.error
	].filter(isDefined)

	return Object.assign({}, state, {
		fetching,
		errors
	})

}