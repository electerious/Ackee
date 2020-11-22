import { createElement as h, Fragment, useMemo } from 'react'

// import selectPagesValue from '../../selectors/selectPagesValue'
import enhancePages from '../../enhancers/enhancePages'
import pagesLoader from '../../loaders/pagesLoader'
import overviewRoute from '../../utils/overviewRoute'

import CardPages from '../cards/CardPages'

const RoutePages = (props) => {

	const widgetIds = useMemo(() => {

		return props.domains.value.map(
			(domain) => {
				const loader = pagesLoader(domain.id, {
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

					return h(CardPages, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhancePages(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RoutePages