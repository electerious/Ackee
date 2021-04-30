import { createElement as h, Fragment } from 'react'

import useSystems from '../../api/hooks/useSystems'
import enhanceSystems from '../../enhancers/enhanceSystems'

import CardWidget from '../cards/CardWidget'
import RendererList from '../renderers/RendererList'

const RouteSystems = (props) => {

	const systems = useSystems(props.filter.sorting, props.filter.systemsType, props.filter.range)

	return (
		h(Fragment, {},
			systems.value.domains.map((domain) => {
				return h(CardWidget, {
					headline: domain.title,
					widget: {
						Renderer: RendererList,
						onMore: () => props.setRoute(`/domains/${ domain.id }`),
						variables: {
							sorting: props.filter.sorting,
							systemsType: props.filter.systemsType,
							range: props.filter.range
						},
						value: enhanceSystems(domain.statistics.systems),
						fetching: systems.fetching
					}
				})
			})
		)
	)

}

export default RouteSystems