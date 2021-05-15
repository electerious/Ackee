import { createElement as h, Fragment } from 'react'

import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'

import useDomains from '../../api/hooks/domains/useDomains'
import useMergedViews from '../../api/hooks/views/useMergedViews'
import useViews from '../../api/hooks/views/useViews'

import CardStatistics from '../cards/CardStatistics'
import RendererViews from '../renderers/RendererViews'

const RouteViews = (props) => {

	const domains = useDomains()

	return (
		h(Fragment, {},
			h(CardStatistics, {
				wide: true,
				headline: ({
					[VIEWS_TYPE_UNIQUE]: 'Site Views',
					[VIEWS_TYPE_TOTAL]: 'Page Views'
				})[props.filters.viewsType],
				hook: useMergedViews,
				hookArgs: [
					{
						interval: props.filters.interval,
						type: props.filters.viewsType,
						limit: 14
					}
				],
				renderer: RendererViews,
				rendererProps: {
					interval: props.filters.interval
				}
			}),
			domains.value.map((domain) => {
				return h(CardStatistics, {
					key: domain.id,
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					hook: useViews,
					hookArgs: [
						domain.id,
						{
							interval: props.filters.interval,
							type: props.filters.viewsType,
							limit: 7
						}
					],
					renderer: RendererViews,
					rendererProps: {
						interval: props.filters.interval
					}
				})
			})
		)
	)

}

export default RouteViews