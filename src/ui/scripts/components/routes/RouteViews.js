import { createElement as h, Fragment } from 'react'

import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'
import mergedViewsLoader from '../../loaders/mergedViewsLoader'
import viewsLoader from '../../loaders/viewsLoader'
import useMergedWidget from '../../utils/useMergedWidget'
import useWidgets from '../../utils/useWidgets'

const RouteViews = (props) => {

	const renderedMergedWidget = useMergedWidget(props, mergedViewsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType
	}, {
		wide: true,
		headline: (widget) => {
			return ({
				[VIEWS_TYPE_UNIQUE]: 'Site Views',
				[VIEWS_TYPE_TOTAL]: 'Page Views'
			})[widget.variables.type]
		}
	})

	const renderedWidgets = useWidgets(props, viewsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType
	})

	return (
		h(Fragment, {},
			renderedMergedWidget,
			renderedWidgets
		)
	)

}

export default RouteViews