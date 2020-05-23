import selectDurationsValue from '../selectors/selectDurationsValue'
import enhanceAverageDurations from '../enhancers/enhanceAverageDurations'
import isDefined from '../../../utils/isDefined'

// Turns the durations of multiple domains into one array of durations
export default (state) => {

	// Enhance durations for all domains
	const enhancedDurations = state.domains.value.map((domain) => {

		const duration = selectDurationsValue(state, domain.data.id)

		return enhanceAverageDurations(duration.value, 14, state.filter.interval)

	})

	// Remove durations of domains that are still loading
	const filteredDurations = enhancedDurations.filter(isDefined)

	// Merge all durations to one array of durations
	const mergedDurations = filteredDurations.reduce((acc, durations) => {

		// Durations is an array. Each item represents the average duration of one day.
		durations.forEach((duration, index) => {

			// The current day might be new as should be initialised first
			const initial = acc[index] == null ? 0 : acc[index]

			// Add the current day to the global array of days
			acc[index] = initial + duration

		})

		return acc

	}, [])

	// Convert merged, total durations into average durations
	return mergedDurations.map((duration) => {

		const totalDomains = filteredDurations.length

		return duration / totalDomains

	})

}