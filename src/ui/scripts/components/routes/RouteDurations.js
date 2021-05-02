import { createElement as h, Fragment } from 'react'

import useDomains from '../../api/hooks/domains/useDomains'
import useMergedDurations from '../../api/hooks/durations/useMergedDurations'
import useDurations from '../../api/hooks/durations/useDurations'

import CardStatistics from '../cards/CardStatistics'
import RendererDurations from '../renderers/RendererDurations'

const RouteDurations = (props) => {

	const domains = useDomains()

	return (
		h(Fragment, {},
			h(CardStatistics, {
				wide: true,
				headline: 'Durations',
				hook: useMergedDurations,
				hookArgs: [
					{
						interval: props.filter.interval,
						limit: 14
					}
				],
				renderer: RendererDurations,
				rendererProps: {
					interval: props.filter.interval
				}
			}),
			domains.value.map((domain) => {
				return h(CardStatistics, {
					key: domain.id,
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					hook: useDurations,
					hookArgs: [
						domain.id,
						{
							interval: props.filter.interval,
							limit: 7
						}
					],
					renderer: RendererDurations,
					rendererProps: {
						interval: props.filter.interval
					}
				})
			})
		)
	)

}

export default RouteDurations