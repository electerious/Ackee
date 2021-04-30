import { createElement as h, Fragment } from 'react'

import useReferrers from '../../api/hooks/useReferrers'
import enhanceReferrers from '../../enhancers/enhanceReferrers'

import CardWidget from '../cards/CardWidget'
import RendererReferrers from '../renderers/RendererReferrers'

const RouteReferrers = (props) => {

	const referrers = useReferrers(props.filter.sorting, props.filter.referrersType, props.filter.range)

	return (
		h(Fragment, {},
			referrers.value.domains.map((domain) => {
				return h(CardWidget, {
					headline: domain.title,
					widget: {
						Renderer: RendererReferrers,
						onMore: () => props.setRoute(`/domains/${ domain.id }`),
						variables: {
							sorting: props.filter.sorting,
							range: props.filter.range
						},
						value: enhanceReferrers(domain.statistics.referrers),
						fetching: referrers.fetching
					}
				})
			})
		)
	)

}

export default RouteReferrers