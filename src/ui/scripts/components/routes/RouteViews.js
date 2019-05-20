import { createElement as h, Fragment, useEffect } from 'react'

import enhanceViews from '../../utils/enhanceViews'

import CardViews from '../cards/CardViews'

const RouteViews = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchViews(props, domain.data.id)
		})

	}, [ props.domains.value ])

	return (
		h(Fragment, {},

			h(CardViews, {
				wide: true,
				headline: 'Page Views',
				items: props.merged.views
			}),

			props.domains.value.map(
				(domain) => (
					h(CardViews, {
						key: domain.data.id,
						headline: domain.data.title,
						items: props.views.value[domain.data.id] == null ? [] : enhanceViews(props.views.value[domain.data.id].value, 7)
					})
				)
			)

		)
	)

}

export default RouteViews