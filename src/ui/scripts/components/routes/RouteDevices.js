import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import useDomains from '../../api/hooks/domains/useDomains'
import useDevices from '../../api/hooks/devices/useDevices'

import CardStatistics from '../cards/CardStatistics'
import RendererList from '../renderers/RendererList'

const RouteDevices = (props) => {
	const domains = useDomains()

	return domains.value.map((domain) => {
		return h(CardStatistics, {
			key: domain.id,
			headline: domain.title,
			onMore: () => props.setRoute(`/domains/${ domain.id }`),
			hook: useDevices,
			hookArgs: [
				domain.id,
				{
					sorting: props.filters.sorting,
					type: props.filters.devicesType,
					range: props.filters.range,
				},
			],
			renderer: RendererList,
			rendererProps: {
				sorting: props.filters.sorting,
				range: props.filters.range,
			},
		})
	})
}

RouteDevices.propTypes = {
	setRoute: PropTypes.func.isRequired,
	filters: PropTypes.object.isRequired,
}

export default RouteDevices