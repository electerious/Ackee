import { createElement as h, Fragment } from 'react'

import useDurations from '../../api/hooks/useDurations'
import enhanceDurations from '../../enhancers/enhanceDurations'

import CardWidget from '../cards/CardWidget'
import RendererDurations from '../renderers/RendererDurations'

const RouteDurations = (props) => {

	const durations = useDurations(props.filter.interval)

	return (
		h(Fragment, {},
			h(CardWidget, {
				key: durations.value.statistics.id,
				wide: true,
				headline: 'Durations',
				widget: {
					Renderer: RendererDurations,
					variables: {
						interval: props.filter.interval
					},
					value: enhanceDurations(durations.value.statistics.durations, 14),
					fetching: durations.fetching
				}
			}),
			durations.value.domains.map((domain) => {
				return h(CardWidget, {
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					widget: {
						Renderer: RendererDurations,
						variables: {
							interval: props.filter.interval
						},
						value: enhanceDurations(domain.statistics.durations, 7),
						fetching: durations.fetching
					}
				})
			})
		)
	)

}

export default RouteDurations