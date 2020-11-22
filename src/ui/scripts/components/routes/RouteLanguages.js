import { createElement as h, Fragment, useMemo } from 'react'

import languagesLoader from '../../loaders/languagesLoader'
import enhanceLanguages from '../../enhancers/enhanceLanguages'
import overviewRoute from '../../utils/overviewRoute'

import CardLanguages from '../cards/CardLanguages'

const RouteLanguages = (props) => {

	const widgetIds = useMemo(() => {

		return props.domains.value.map(
			(domain) => {
				const loader = languagesLoader(domain.id, {
					range: props.filter.range,
					sorting: props.filter.sorting
				})

				props.fetchWidget(props, loader)
				return loader.id
			}
		)

	}, [ props.domains.value, props.filter.range, props.filter.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain, index) => {
					const widgetId = widgetIds[index]
					const widget = props.widgets.value[widgetId]

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