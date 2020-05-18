import { createElement as h, Fragment, useEffect } from 'react'

import selectLanguagesValue from '../../selectors/selectLanguagesValue'
import enhanceLanguages from '../../enhancers/enhanceLanguages'

import CardLanguages from '../cards/CardLanguages'

const RouteLanguages = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchLanguages(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.languages.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardLanguages, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						sorting: props.languages.sorting,
						loading: props.domains.fetching || selectLanguagesValue(props, domain.data.id).fetching,
						items: enhanceLanguages(selectLanguagesValue(props, domain.data.id).value)
					})
				)
			)

		)
	)

}

export default RouteLanguages