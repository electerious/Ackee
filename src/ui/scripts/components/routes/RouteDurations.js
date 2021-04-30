import { createElement as h, Fragment } from 'react'

import useDurations from '../../api/hooks/useDurations'
import enhanceDurations from '../../enhancers/enhanceDurations'
import formatDuration from '../../utils/formatDuration'

import CardWidget from '../cards/CardWidget'
import RendererChart from '../renderers/RendererChart'

export const DurationsChartRenderer = (props) => h(RendererChart, {
	...props,
	formatter: (ms) => formatDuration(ms).toString()
})


const RouteDurations = (props) => {

	const durations = useDurations(props.filter.interval)

	return (
		h(Fragment, {},
			h(CardWidget, {
				wide: true,
				headline: 'Durations',
				widget: {
					Renderer: DurationsChartRenderer,
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
					widget: {
						Renderer: DurationsChartRenderer,
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