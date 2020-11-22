import { createElement as h, Fragment } from 'react'

import languagesLoader from '../../loaders/languagesLoader'
import enhanceLanguages from '../../enhancers/enhanceLanguages'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetBundles from '../../utils/useWidgetBundles'

import CardLanguages from '../cards/CardLanguages'

const RouteLanguages = (props) => {

	const widgetBundles = useWidgetBundles(props, languagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

	return (
		h(Fragment, {},

			widgetBundles.map(
				({ domain, widgetId }) => {
					const widget = props.widgets.value[widgetId]

					if (widget == null) return h('p', { key: domain.id }, 'empty')

					return h(CardLanguages, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhanceLanguages(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteLanguages