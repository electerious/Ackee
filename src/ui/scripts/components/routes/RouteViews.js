import { createElement as h, Fragment, useMemo } from 'react'

import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'
import mergedViewsLoader from '../../loaders/mergedViewsLoader'
import viewsLoader from '../../loaders/viewsLoader'
import useWidgets from '../../hooks/useWidgets'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteViews = (props) => {

	const mergedWidgetConfigs = useMemo(() => {

		return [{
			loader: mergedViewsLoader({
				interval: props.filter.interval,
				type: props.filter.viewsType,
				limit: 14
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

	const renderedMergedWidgets = useWidgets(props, mergedWidgetConfigs)
	const renderedDomainWidgets = useWidgetsForDomains(props, viewsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType,
		limit: 7
	})

	return (
		h(Fragment, {},
			renderedMergedWidgets,
			renderedDomainWidgets
		)
	)

}

export default RouteViews