import { createElement as h, Fragment } from 'react'

import useSizes from '../../api/hooks/useSizes'
import enhanceSizes from '../../enhancers/enhanceSizes'

import CardWidget from '../cards/CardWidget'
import RendererList from '../renderers/RendererList'

const RouteSizes = (props) => {

	const sizes = useSizes(props.filter.sorting, props.filter.sizesType, props.filter.range)

	return (
		h(Fragment, {},
			sizes.value.domains.map((domain) => {
				return h(CardWidget, {
					headline: domain.title,
					widget: {
						Renderer: RendererList,
						onMore: () => props.setRoute(`/domains/${ domain.id }`),
						variables: {
							sorting: props.filter.sorting,
							range: props.filter.range
						},
						value: enhanceSizes(domain.statistics.sizes),
						fetching: sizes.fetching
					}
				})
			})
		)
	)

}

export default RouteSizes