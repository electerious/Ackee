import { createElement as h, Fragment, useMemo } from 'react'

import mergedDurationsLoader from '../../loaders/mergedDurationsLoader'
import durationsLoader from '../../loaders/durationsLoader'
import useCardWidgets from '../../hooks/useCardWidgets'
import useCardWidgetsForDomains from '../../hooks/useCardWidgetsForDomains'

const RouteDurations = (props) => {

	const mergedWidgetConfigs = useMemo(() => {

		return [{
			loader: mergedDurationsLoader({
				interval: props.filter.interval
			}),
			additionalProps: {
				wide: true,
				headline: 'Durations'
			}
		}]

	}, [ props.filter.interval ])

	const renderedMergedWidgets = useCardWidgets(props, mergedWidgetConfigs)
	const renderedDomainWidgets = useCardWidgetsForDomains(props, durationsLoader, {
		interval: props.filter.interval
	})

	return (
		h(Fragment, {},
			renderedMergedWidgets,
			renderedDomainWidgets
		)
	)

}

export default RouteDurations