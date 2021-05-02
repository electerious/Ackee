import { createElement as h } from 'react'

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
					sorting: props.filter.sorting,
					type: props.filter.referrersType,
					range: props.filter.range
				}
			],
			renderer: RendererReferrers,
			rendererProps: {
				sorting: props.filter.sorting,
				range: props.filter.range
			}
		})
	})

}

export default RouteReferrers