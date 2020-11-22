import { createElement as h, Fragment } from 'react'

import browsersLoader from '../../loaders/browsersLoader'
import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetBundles from '../../utils/useWidgetBundles'

import CardBrowsers from '../cards/CardBrowsers'

const RouteBrowsers = (props) => {

	const widgetBundles = useWidgetBundles(props, browsersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.browsersType
	})

	return (
		h(Fragment, {},

			widgetBundles.map(
				({ domain, loader }) => {
					const widget = props.widgets.value[loader.id]

					if (widget == null) return h('p', { key: domain.id }, 'empty')

					return h(CardBrowsers, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhanceBrowsers(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteBrowsers