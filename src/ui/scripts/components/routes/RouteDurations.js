import { createElement as h, Fragment, useMemo } from 'react'

import mergedDurationsLoader from '../../loaders/mergedDurationsLoader'
import durationsLoader from '../../loaders/durationsLoader'
import useWidgets from '../../hooks/useWidgets'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

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

	const renderedMergedWidgets = useWidgets(props, mergedWidgetConfigs)
	const renderedDomainWidgets = useWidgetsForDomains(props, durationsLoader, {
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