import { createElement as h, Fragment, useEffect, useCallback } from 'react'

// import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'
import viewsLoader from '../../loaders/viewsLoader'
import enhanceViews from '../../enhancers/enhanceViews'
// import mergeViews from '../../utils/mergeViews'
import overviewRoute from '../../utils/overviewRoute'

import CardViews from '../cards/CardViews'

const RouteViews = (props) => {

	const createLoader = useCallback((domainId) => {

		return viewsLoader(domainId, {
			interval: props.filter.interval,
			type: props.filter.viewsType
		})

	}, [ props.filter.interval, props.filter.viewsType ])

	useEffect(() => {

		return props.domains.value.map(
			(domain) => {
				const loader = createLoader(domain.id)
				props.fetchWidget(props, loader)
			}
		)

	}, [ props.domains.value, createLoader ])

	return (
		h(Fragment, {},

			// h(CardViews, {
			// 	wide: true,
			// 	headline: ({
			// 		[VIEWS_TYPE_UNIQUE]: 'Site Views',
			// 		[VIEWS_TYPE_TOTAL]: 'Page Views'
			// 	})[props.filter.viewsType],
			// 	interval: props.filter.interval,
			// 	loading: props.fetching,
			// 	items: mergeViews(props)
			// }),

			props.domains.value.map(
				(domain) => {
					const { id } = createLoader(domain.id)
					const widget = props.widgets.value[id]

					if (widget == null) return h('p', { key: domain.id }, 'empty')

					return h(CardViews, {
						key: domain.id,
						headline: domain.title,
						interval: widget.variables.interval,
						loading: widget.fetching,
						items: enhanceViews(widget.value, 7),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteViews