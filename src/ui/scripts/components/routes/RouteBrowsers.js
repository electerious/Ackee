import { createElement as h, Fragment } from 'react'

import useDomains from '../../api/hooks/useDomains'
import useBrowsers from '../../api/hooks/browsers/useBrowsers'

import CardWidget from '../cards/CardWidget'
import RendererList from '../renderers/RendererList'

const RouteBrowsers = (props) => {

	const domains = useDomains()

	return (
		h(Fragment, {},
			domains.value.map((domain) => {
				return h(CardWidget, {
					key: domain.id,
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					hook: useBrowsers,
					hookArgs: [
						domain.id,
						{
							sorting: props.filter.sorting,
							type: props.filter.browsersType,
							range: props.filter.range
						}
					],
					renderer: RendererList,
					rendererProps: {
						sorting: props.filter.sorting,
						range: props.filter.range
					}
				})
			})
		)
	)

}

export default RouteBrowsers