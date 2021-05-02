import { createElement as h } from 'react'

import useDomains from '../../api/hooks/useDomains'
import useBrowsers from '../../api/hooks/browsers/useBrowsers'

import CardStatistics from '../cards/CardStatistics'
import RendererList from '../renderers/RendererList'

const RouteBrowsers = (props) => {

	const domains = useDomains()

	return domains.value.map((domain) => {
		return h(CardStatistics, {
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

}

export default RouteBrowsers