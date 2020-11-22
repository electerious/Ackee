import { createElement as h, Fragment, useEffect, useCallback } from 'react'

import languagesLoader from '../../loaders/languagesLoader'
import enhanceLanguages from '../../enhancers/enhanceLanguages'
import overviewRoute from '../../utils/overviewRoute'

import CardLanguages from '../cards/CardLanguages'

const RouteLanguages = (props) => {

	const createLoader = useCallback((domainId) => {

		return languagesLoader(domainId, {
			range: props.filter.range,
			sorting: props.filter.sorting
		})

	}, [ props.filter.range, props.filter.sorting ])

	useEffect(() => {

		return props.domains.value.map(
			(domain) => {
				const loader = createLoader(domain.id)
				props.fetchWidget(props, loader)
			}
		)

	}, [ props.domains.value, createLoader ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => {
					const { id } = createLoader(domain.id)
					const widget = props.widgets.value[id]

					if (widget == null) return h('p', { key: domain.id }, 'empty')

					return h(CardLanguages, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhanceLanguages(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteLanguages