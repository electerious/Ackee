import { createElement as h, Fragment } from 'react'

import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'

import useViews from '../../api/hooks/useViews'
import enhanceViews from '../../enhancers/enhanceViews'

import CardWidget from '../cards/CardWidget'
import RendererViews from '../renderers/RendererViews'

const RouteViews = (props) => {

	const views = useViews(props.filter.interval, props.filter.viewsType)

	return (
		h(Fragment, {},
			h(CardWidget, {
				key: views.value.statistics.id,
				wide: true,
				headline: ({
					[VIEWS_TYPE_UNIQUE]: 'Site Views',
					[VIEWS_TYPE_TOTAL]: 'Page Views'
				})[props.filter.viewsType],
				widget: {
					Renderer: RendererViews,
					variables: {
						interval: props.filter.interval
					},
					value: enhanceViews(views.value.statistics.views, 14),
					fetching: views.fetching
				}
			}),
			views.value.domains.map((domain) => {
				return h(CardWidget, {
					key: domain.statistics.id,
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					widget: {
						Renderer: RendererViews,
						variables: {
							interval: props.filter.interval
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