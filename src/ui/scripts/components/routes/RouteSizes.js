import { createElement as h } from 'react'

import useDomains from '../../api/hooks/useDomains'
import useSizes from '../../api/hooks/sizes/useSizes'

import CardStatistics from '../cards/CardStatistics'
import RendererList from '../renderers/RendererList'

const RouteSizes = (props) => {

	const domains = useDomains()

	return domains.value.map((domain) => {
		return h(CardStatistics, {
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

}

export default RouteSizes