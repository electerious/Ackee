import { createElement as h, Fragment } from 'react'

import useDevices from '../../api/hooks/useDevices'
import enhanceDevices from '../../enhancers/enhanceDevices'

import CardWidget from '../cards/CardWidget'
import RendererList from '../renderers/RendererList'

const RouteDevices = (props) => {

	const devices = useDevices(props.filter.sorting, props.filter.devicesType, props.filter.range)

	return (
		h(Fragment, {},
			devices.value.domains.map((domain) => {
				return h(CardWidget, {
					key: domain.statistics.id,
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					widget: {
						Renderer: RendererList,
						variables: {
							sorting: props.filter.sorting,
							range: props.filter.range
						},
						value: enhanceDevices(domain.statistics.devices),
						fetching: devices.fetching
					}
				})
			})
		)
	)

}

export default RouteDevices