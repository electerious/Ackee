import { createElement as h, Fragment } from 'react'

import devicesLoader from '../../loaders/devicesLoader'
import enhanceDevices from '../../enhancers/enhanceDevices'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetBundles from '../../utils/useWidgetBundles'

import CardDevices from '../cards/CardDevices'

const RouteDevices = (props) => {

	const widgetBundles = useWidgetBundles(props, devicesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.devicesType
	})

	return (
		h(Fragment, {},

			widgetBundles.map(
				({ domain, loader }) => {
					const widget = props.widgets.value[loader.id]

					if (widget == null) return h('p', { key: domain.id }, 'empty')

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