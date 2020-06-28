import { createElement as h, Fragment, useEffect } from 'react'

import selectLanguagesValue from '../../selectors/selectLanguagesValue'
import enhanceLanguages from '../../enhancers/enhanceLanguages'
import overviewRoute from '../../utils/overviewRoute'

import CardLanguages from '../cards/CardLanguages'

const RouteLanguages = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchLanguages(props, domain.id)
		})

	}, [ props.filter.range, props.domains.value, props.languages.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardLanguages, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.languages.sorting,
						loading: props.domains.fetching || selectLanguagesValue(props, domain.id).fetching,
						items: enhanceLanguages(selectLanguagesValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteLanguages