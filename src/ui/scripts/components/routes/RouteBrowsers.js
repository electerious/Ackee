import { createElement as h, Fragment } from 'react'

import useDomainsBrowsers from '../../api/hooks/browsers/useDomainsBrowsers'

import CardWidget from '../cards/CardWidget'
import RendererList from '../renderers/RendererList'

const RouteBrowsers = (props) => {

	const browsers = useDomainsBrowsers({
		sorting: props.filter.sorting,
		type: props.filter.browsersType,
		range: props.filter.range
	})

	return (
		h(Fragment, {},
			browsers.value.domains.map((domain) => {
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
						value: domain.statistics.browsers,
						fetching: browsers.fetching
					}
				})
			})
		)
	)

}

export default RouteBrowsers