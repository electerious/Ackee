import { createElement as h, Fragment } from 'react'

import usePages from '../../api/hooks/usePages'
import enhancePages from '../../enhancers/enhancePages'

import CardWidget from '../cards/CardWidget'
import RendererList from '../renderers/RendererList'

const RoutePages = (props) => {

	const pages = usePages(props.filter.sorting, props.filter.range)

	return (
		h(Fragment, {},
			pages.value.domains.map((domain) => {
				return h(CardWidget, {
					key: domain.statistics.id,
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					widget: {
						Renderer: RendererList,
						variables: {
							sorting: props.filter.sorting,
							range: props.filter.range
						},
						value: enhancePages(domain.statistics.pages),
						fetching: pages.fetching
					}
				})
			})
		)
	)

}

export default RoutePages