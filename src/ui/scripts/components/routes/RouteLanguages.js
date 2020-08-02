import { createElement as h, Fragment, useEffect } from 'react'

import selectLanguagesValue from '../../selectors/selectLanguagesValue'
import enhanceLanguages from '../../enhancers/enhanceLanguages'
import overviewRoute from '../../utils/overviewRoute'

import CardLanguages from '../cards/CardLanguages'

const RouteLanguages = (props) => {

	useEffect(() => {

		props.fetchLanguages(props)

	}, [ props.filter.range, props.filter.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardLanguages, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.filter.sorting,
						loading: props.languages.fetching,
						items: enhanceLanguages(selectLanguagesValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteLanguages