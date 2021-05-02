import { createElement as h, Fragment } from 'react'

import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'

import useDomains from '../../api/hooks/useDomains'
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
				})[props.filter.viewsType],
				hook: useMergedViews,
				hookArgs: [
					{
						interval: props.filter.interval,
						type: props.filter.viewsType,
						limit: 14
					}
				],
				renderer: RendererViews,
				rendererProps: {
					interval: props.filter.interval
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
							interval: props.filter.interval,
							type: props.filter.viewsType,
							limit: 7
						}
					],
					renderer: RendererViews,
					rendererProps: {
						interval: props.filter.interval
					}
				})
			})
		)
	)

}

export default RouteViews