import { createElement as h, Fragment, useEffect } from 'react'

import ranges from '../../../../constants/ranges'

import enhanceEvents from '../../enhancers/enhanceEvents'
import useDidMountEffect from '../../utils/useDidMountEffect'

import Select from '../Select'
import CardEvents from '../cards/CardEvents'

const RouteEvents = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchEvents(props, domain.data.id)
		})

	}, [ props.domains.value, props.events.range ])

	return (
		h(Fragment, {},

			h('div', { className: 'subHeader' },
				h(Select, {
					value: props.events.range,
					onChange: (e) => props.setEventsRange(e.target.value),
					items: ranges.toArray()
				})
			),

			props.domains.value.map(
				(domain) => (
					h(CardEvents, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.events.range,
						loading: props.events.value[domain.data.id] == null ? false : props.events.value[domain.data.id].fetching,
						items: props.events.value[domain.data.id] == null ? [] : enhanceEvents(props.events.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteEvents