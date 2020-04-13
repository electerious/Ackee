import { createElement as h, Fragment, useEffect } from 'react'

import enhanceLanguages from '../../enhancers/enhanceLanguages'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardLanguages from '../cards/CardLanguages'

const RouteLanguages = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

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
						loading: props.languages.value[domain.data.id] == null ? false : props.languages.value[domain.data.id].fetching,
						items: props.languages.value[domain.data.id] == null ? [] : enhanceLanguages(props.languages.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteLanguages