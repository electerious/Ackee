import { createElement as h, Fragment, useEffect, useCallback } from 'react'

// import selectPagesValue from '../../selectors/selectPagesValue'
import enhancePages from '../../enhancers/enhancePages'
import pagesLoader from '../../loaders/pagesLoader'
import overviewRoute from '../../utils/overviewRoute'

import CardPages from '../cards/CardPages'

const RoutePages = (props) => {

	const createLoader = useCallback((domainId) => {

		return pagesLoader(domainId, {
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