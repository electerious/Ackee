import { createElement as h, Fragment, useEffect } from 'react'

import enhanceCountries from '../../enhancers/enhanceCountries'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardCountries from '../cards/CardCountries'

const RouteCountries = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchCountries(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.countries.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardCountries, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						sorting: props.countries.sorting,
						loading: props.countries.value[domain.data.id] == null ? false : props.countries.value[domain.data.id].fetching,
						items: props.countries.value[domain.data.id] == null ? [] : enhanceCountries(props.countries.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteCountries