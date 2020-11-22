import { createElement as h, Fragment } from 'react'

import referrersLoader from '../../loaders/referrersLoader'
import enhanceReferrers from '../../enhancers/enhanceReferrers'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetBundles from '../../utils/useWidgetBundles'

import CardReferrers from '../cards/CardReferrers'

const RouteReferrers = (props) => {

	const widgetBundles = useWidgetBundles(props, referrersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

	return (
		h(Fragment, {},

			widgetBundles.map(
				({ domain, loader }) => {
					const widget = props.widgets.value[loader.id]

					if (widget == null) return h('p', { key: domain.id }, 'empty')

					return h(CardReferrers, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhanceReferrers(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteReferrers