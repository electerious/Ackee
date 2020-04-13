import { createElement as h, Fragment, useEffect } from 'react'

import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardBrowsers from '../cards/CardBrowsers'

const RouteBrowsers = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchBrowsers(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.browsers.sorting, props.browsers.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardBrowsers, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						sorting: props.browsers.sorting,
						loading: props.browsers.value[domain.data.id] == null ? false : props.browsers.value[domain.data.id].fetching,
						items: props.browsers.value[domain.data.id] == null ? [] : enhanceBrowsers(props.browsers.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteBrowsers