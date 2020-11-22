import { createElement as h, Fragment } from 'react'

import browsersLoader from '../../loaders/browsersLoader'
import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import * as selectDomainsValue from '../../selectors/selectDomainsValue'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetIds from '../../utils/useWidgetIds'

import CardBrowsers from '../cards/CardBrowsers'

const RouteBrowsers = (props) => {

	const widgetIds = useWidgetIds(props, browsersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.browsersType
	})

	return (
		h(Fragment, {},

			widgetIds.map(
				(widgetId) => {
					const widget = props.widgets.value[widgetId]
					if (widget == null) return h('p', {}, 'empty')

					const domain = selectDomainsValue.byId(props, widget.variables.domainId)

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