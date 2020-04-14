import { createElement as h, Fragment, useEffect } from 'react'

import enhanceEvents from '../../enhancers/enhanceEvents'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardEvents from '../cards/CardEvents'

const RouteEvents = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchEvents(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardEvents, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						loading: props.events.value[domain.data.id] == null ? false : props.events.value[domain.data.id].fetching,
						items: props.events.value[domain.data.id] == null ? [] : enhanceEvents(props.events.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteEvents