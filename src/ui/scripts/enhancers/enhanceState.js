import { ALL_DOMAINS } from '../actions/overview'
import isDefined from '../../../utils/isDefined'
import * as selectOverviewValue from '../selectors/selectOverviewValue'

export default (state) => {

	const fetching = (
		selectOverviewValue.withoutType(state, ALL_DOMAINS).fetching === true ||
		Object.values(state.overview.value).some((value) => value.fetching) === true ||
		state.views.fetching === true ||
		state.pages.fetching === true ||
		state.referrers.fetching === true ||
		state.durations.fetching === true ||
		state.systems.fetching === true ||
		state.devices.fetching === true ||
		state.browsers.fetching === true ||
		state.sizes.fetching === true ||
		state.languages.fetching === true ||
		state.domains.fetching === true ||
		state.token.fetching === true ||
		state.permanentTokens.fetching === true
	)

	const errors = [
		selectOverviewValue.withoutType(state, ALL_DOMAINS).error,
		...Object.values(state.overview.value).map((value) => value.error),
		state.views.error,
		state.pages.error,
		state.referrers.error,
		state.durations.error,
		state.systems.error,
		state.devices.error,
		state.browsers.error,
		state.sizes.error,
		state.languages.error,
		state.domains.error,
		state.token.error,
		state.permanentTokens.error
	].filter(isDefined)

	return Object.assign({}, state, {
		fetching,
		errors
	})

}