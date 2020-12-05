import { createElement as h, Fragment } from 'react'

// import RendererChart from '../renderers/RendererChart'

// import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'
import viewsLoader from '../../loaders/viewsLoader'
// import mergeViews from '../../utils/mergeViews'
import useWidgets from '../../utils/useWidgets'
// import formatNumber from '../../utils/formatNumber'

const RouteViews = (props) => {

	// const { rawWidgets, renderedWidgets } = useWidgets(props, viewsLoader, {
	const { renderedWidgets } = useWidgets(props, viewsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType
	})

	return (
		h(Fragment, {},
			// h(RendererChart, {
			// 	wide: true,
			// 	headline: ({
			// 		[VIEWS_TYPE_UNIQUE]: 'Site Views',
			// 		[VIEWS_TYPE_TOTAL]: 'Page Views'
			// 	})[props.filter.viewsType],
			// 	interval: props.filter.interval,
			// 	items: mergeViews(rawWidgets),
			// 	formatter: formatNumber
			// }),

			renderedWidgets
		)
	)

}

export default RouteViews