import { createElement as h, Fragment, useMemo } from 'react'

import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'
import mergedViewsLoader from '../../loaders/mergedViewsLoader'
import viewsLoader from '../../loaders/viewsLoader'
import useCardWidgets from '../../hooks/useCardWidgets'
import useCardWidgetsForDomains from '../../hooks/useCardWidgetsForDomains'

const RouteViews = (props) => {

	const mergedWidgetConfigs = useMemo(() => {

		return [{
			loader: mergedViewsLoader({
				interval: props.filter.interval,
				type: props.filter.viewsType
			}),
			additionalProps: {
				wide: true,
				headline: ({
					[VIEWS_TYPE_UNIQUE]: 'Site Views',
					[VIEWS_TYPE_TOTAL]: 'Page Views'
				})[props.filter.viewsType]
			}
		}]

	}, [ props.filter.interval, props.filter.viewsType ])

	const renderedMergedWidgets = useCardWidgets(props, mergedWidgetConfigs)
	const renderedDomainWidgets = useCardWidgetsForDomains(props, viewsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType
	})

	return (
		h(Fragment, {},
			renderedMergedWidgets,
			renderedDomainWidgets
		)
	)

}

export default RouteViews