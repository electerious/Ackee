import { createElement as h, Fragment, useEffect } from 'react'

import {
	VIEWS_TYPE_UNIQUE,
	VIEWS_TYPE_TOTAL
} from '../../../../constants/views'

import enhanceViews from '../../enhancers/enhanceViews'
import mergeViews from '../../utils/mergeViews'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardViews from '../cards/CardViews'
import Select from '../Select'

const RouteViews = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchViews(props, domain.data.id)
		})

	}, [ props.domains.value, props.views.type ])

	return (
		h(Fragment, {},

			h('div', { className: 'subHeader' },
				h(Select, {
					value: props.views.type,
					onChange: (e) => props.setViewsType(e.target.value),
					items: [
						{ value: VIEWS_TYPE_UNIQUE, label: 'Unique site views' },
						{ value: VIEWS_TYPE_TOTAL, label: 'Total page views' }
					]
				})
			),

			h(CardViews, {
				wide: true,
				headline: ({
					[VIEWS_TYPE_UNIQUE]: 'Site Views',
					[VIEWS_TYPE_TOTAL]: 'Page Views'
				})[props.views.type],
				items: mergeViews(props.domains, props.views)
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