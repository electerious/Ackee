import { createElement as h, Fragment } from 'react'

import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'
import viewsLoader from '../../loaders/viewsLoader'
import mergeViews from '../../utils/mergeViews'
import useWidgets from '../../utils/useWidgets'

import CardViews from '../cards/CardViews'

const RouteViews = (props) => {

	const { rawWidgets, renderedWidgets } = useWidgets(props, viewsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType
	})

	return (
		h(Fragment, {},
			h(CardViews, {
				wide: true,
				headline: ({
					[VIEWS_TYPE_UNIQUE]: 'Site Views',
					[VIEWS_TYPE_TOTAL]: 'Page Views'
				})[props.filter.viewsType],
				interval: props.filter.interval,
				loading: props.fetching,
				items: mergeViews(rawWidgets)
			}),

			renderedWidgets
		)
	)

}

export default RouteViews