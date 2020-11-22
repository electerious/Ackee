import { createElement as h, Fragment } from 'react'

import enhancePages from '../../enhancers/enhancePages'
import pagesLoader from '../../loaders/pagesLoader'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetBundles from '../../utils/useWidgetBundles'

import CardPages from '../cards/CardPages'

const RoutePages = (props) => {

	const widgetBundles = useWidgetBundles(props, pagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

	return (
		h(Fragment, {},

			widgetBundles.map(
				({ domain, widgetId }) => {
					const widget = props.widgets.value[widgetId]

					if (widget == null) return h('p', { key: domain.id }, 'empty')

					return h(CardPages, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhancePages(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RoutePages