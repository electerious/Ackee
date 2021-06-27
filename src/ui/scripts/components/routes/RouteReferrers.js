import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import useDomains from '../../api/hooks/domains/useDomains'
import useReferrers from '../../api/hooks/referrers/useReferrers'

import CardStatistics from '../cards/CardStatistics'
import RendererReferrers from '../renderers/RendererReferrers'

const RouteReferrers = (props) => {
	const domains = useDomains()

	return domains.value.map((domain) => {
		return h(CardStatistics, {
			key: domain.id,
			headline: domain.title,
			onMore: () => props.setRoute(`/domains/${ domain.id }`),
			hook: useReferrers,
			hookArgs: [
				domain.id,
				{
					sorting: props.filters.sorting,
					type: props.filters.referrersType,
					range: props.filters.range,
				},
			],
			renderer: RendererReferrers,
			rendererProps: {
				sorting: props.filters.sorting,
				range: props.filters.range,
			},
		})
	})
}

RouteReferrers.propTypes = {
	setRoute: PropTypes.func.isRequired,
	filters: PropTypes.object.isRequired,
}

export default RouteReferrers