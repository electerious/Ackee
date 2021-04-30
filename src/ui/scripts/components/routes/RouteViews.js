import { createElement as h, Fragment } from 'react'

import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'

import useViews from '../../api/hooks/useViews'
import enhanceViews from '../../enhancers/enhanceViews'
import formatNumber from '../../utils/formatNumber'

import CardWidget from '../cards/CardWidget'
import RendererChart from '../renderers/RendererChart'

export const ViewsChartRenderer = (props) => h(RendererChart, {
	...props,
	formatter: formatNumber
})

const RouteViews = (props) => {

	const views = useViews(props.filter.interval, props.filter.viewsType)

	return (
		h(Fragment, {},
			h(CardWidget, {
				wide: true,
				headline: ({
					[VIEWS_TYPE_UNIQUE]: 'Site Views',
					[VIEWS_TYPE_TOTAL]: 'Page Views'
				})[props.filter.viewsType],
				widget: {
					Renderer: ViewsChartRenderer,
					variables: {
						interval: props.filter.interval,
						viewsType: props.filter.viewsType
					},
					value: enhanceViews(views.value.statistics.views, 14),
					fetching: views.fetching
				}
			}),
			views.value.domains.map((domain) => {
				return h(CardWidget, {
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					widget: {
						Renderer: ViewsChartRenderer,
						variables: {
							interval: props.filter.interval,
							viewsType: props.filter.viewsType
						},
						value: enhanceViews(domain.statistics.views, 7),
						fetching: views.fetching
					}
				})
			})
		)
	)

}

export default RouteViews