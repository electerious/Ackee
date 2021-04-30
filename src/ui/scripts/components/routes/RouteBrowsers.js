import { createElement as h, Fragment } from 'react'

import useBrowsers from '../../api/hooks/useBrowsers'
import enhanceBrowsers from '../../enhancers/enhanceBrowsers'

import CardWidget from '../cards/CardWidget'
import RendererList from '../renderers/RendererList'

const RouteBrowsers = (props) => {

	const browsers = useBrowsers(props.filter.sorting, props.filter.browsersType, props.filter.range)

	return (
		h(Fragment, {},
			browsers.value.domains.map((domain) => {
				return h(CardWidget, {
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					widget: {
						Renderer: RendererList,
						variables: {
							sorting: props.filter.sorting,
							browsersType: props.filter.browsersType,
							range: props.filter.range
						},
						value: enhanceBrowsers(domain.statistics.browsers),
						fetching: browsers.fetching
					}
				})
			})
		)
	)

}

export default RouteBrowsers