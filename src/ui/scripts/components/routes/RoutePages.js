import { createElement as h, Fragment, useEffect } from 'react'

import selectPagesValue from '../../selectors/selectPagesValue'
import enhancePages from '../../enhancers/enhancePages'
import overviewRoute from '../../utils/overviewRoute'

import CardPages from '../cards/CardPages'

const RoutePages = (props) => {

	useEffect(() => {

		props.fetchPages(props)

	}, [ props.filter.range, props.filter.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardPages, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.filter.sorting,
						loading: props.pages.fetching,
						items: enhancePages(selectPagesValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RoutePages