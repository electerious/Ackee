import { createElement as h, Fragment } from 'react'

import devicesLoader from '../../loaders/devicesLoader'
import enhanceDevices from '../../enhancers/enhanceDevices'
import * as selectDomainsValue from '../../selectors/selectDomainsValue'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetIds from '../../utils/useWidgetIds'

import CardDevices from '../cards/CardDevices'

const RouteDevices = (props) => {

	const widgetIds = useWidgetIds(props, devicesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.devicesType
	})

	return (
		h(Fragment, {},

			widgetIds.map(
				(widgetId) => {
					const widget = props.widgets.value[widgetId]
					if (widget == null) return h('p', {}, 'empty')

					const domain = selectDomainsValue.byId(props, widget.variables.domainId)

					return h(CardDevices, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhanceDevices(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteDevices