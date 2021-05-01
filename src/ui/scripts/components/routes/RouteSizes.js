import { createElement as h, Fragment } from 'react'

import useDomains from '../../api/hooks/useDomains'
import useSizes from '../../api/hooks/sizes/useSizes'

import CardWidget from '../cards/CardWidget'
import RendererList from '../renderers/RendererList'

const RouteSizes = (props) => {

	const domains = useDomains()

	return (
		h(Fragment, {},
			domains.value.map((domain) => {
				return h(CardWidget, {
					key: domain.id,
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					hook: useSizes,
					hookArgs: [
						domain.id,
						{
							sorting: props.filter.sorting,
							type: props.filter.sizesType,
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

export default RouteSizes