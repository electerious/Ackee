import { createElement as h, Fragment } from 'react'
import PropTypes from 'prop-types'

import { MODALS_DURATIONS } from '../../constants/modals'

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
						interval: props.filters.interval,
						limit: 14,
					},
				],
				renderer: RendererDurations,
				rendererProps: {
					interval: props.filters.interval,
					onItemClick: (index) => props.addModal(MODALS_DURATIONS, {
						index,
						interval: props.filters.interval,
						limit: 14,
					}),
				},
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
							interval: props.filters.interval,
							limit: 7,
						},
					],
					renderer: RendererDurations,
					rendererProps: {
						interval: props.filters.interval,
					},
				})
			}),
		)
	)
}

RouteDurations.propTypes = {
	setRoute: PropTypes.func.isRequired,
	filters: PropTypes.object.isRequired,
}

export default RouteDurations