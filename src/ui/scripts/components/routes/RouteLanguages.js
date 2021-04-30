import { createElement as h, Fragment } from 'react'

import useLanguages from '../../api/hooks/useLanguages'
import enhanceLanguages from '../../enhancers/enhanceLanguages'

import CardWidget from '../cards/CardWidget'
import RendererList from '../renderers/RendererList'

const RouteLanguages = (props) => {

	const languages = useLanguages(props.filter.sorting, props.filter.range)

	return (
		h(Fragment, {},
			languages.value.domains.map((domain) => {
				return h(CardWidget, {
					headline: domain.title,
					onMore: () => props.setRoute(`/domains/${ domain.id }`),
					widget: {
						Renderer: RendererList,
						variables: {
							sorting: props.filter.sorting,
							range: props.filter.range
						},
						value: enhanceLanguages(domain.statistics.languages),
						fetching: languages.fetching
					}
				})
			})
		)
	)

}

export default RouteLanguages