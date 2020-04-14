import { createElement as h, Fragment, useEffect } from 'react'

import enhancePages from '../../enhancers/enhancePages'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardPages from '../cards/CardPages'

const RoutePages = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchPages(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.pages.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardPages, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						sorting: props.pages.sorting,
						loading: props.pages.value[domain.data.id] == null ? false : props.pages.value[domain.data.id].fetching,
						items: props.pages.value[domain.data.id] == null ? [] : enhancePages(props.pages.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RoutePages