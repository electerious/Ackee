import { createElement as h, Fragment } from 'react'

import useDomains from '../../api/hooks/useDomains'
import useDevices from '../../api/hooks/devices/useDevices'

import CardWidget from '../cards/CardWidget'
import RendererList from '../renderers/RendererList'

const RouteDevices = (props) => {

	const domains = useDomains()

	return (
		h(Fragment, {},
			domains.value.map((domain) => {
				return h(CardWidget, {
					key: domain.id,
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					hook: useDevices,
					hookArgs: [
						domain.id,
						{
							sorting: props.filter.sorting,
							type: props.filter.devicesType,
							range: props.filter.range
						}
					],
					renderer: RendererList,
					rendererProps: {
						sorting: props.filter.sorting,
						range: props.filter.range
					}
				})
			})
		)
	)

}

export default RouteDevices