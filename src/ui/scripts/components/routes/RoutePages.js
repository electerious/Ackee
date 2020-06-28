import { createElement as h, Fragment, useEffect } from 'react'

import selectPagesValue from '../../selectors/selectPagesValue'
import enhancePages from '../../enhancers/enhancePages'
import overviewRoute from '../../utils/overviewRoute'

import CardPages from '../cards/CardPages'

const RoutePages = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchPages(props, domain.id)
		})

	}, [ props.filter.range, props.domains.value, props.pages.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardPages, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.pages.sorting,
						loading: props.domains.fetching || selectPagesValue(props, domain.id).fetching,
						items: enhancePages(selectPagesValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RoutePages