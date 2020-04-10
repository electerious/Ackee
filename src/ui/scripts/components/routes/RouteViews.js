import { createElement as h, Fragment, useEffect } from 'react'

import {
	VIEWS_TYPE_UNIQUE,
	VIEWS_TYPE_TOTAL,
	VIEWS_INTERVAL_DAILY,
	VIEWS_INTERVAL_MONTHLY,
	VIEWS_INTERVAL_YEARLY
} from '../../../../constants/views'

import enhanceViews from '../../enhancers/enhanceViews'
import mergeViews from '../../utils/mergeViews'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardViews from '../cards/CardViews'
import Select from '../Select'
import NoDomain from '../NoDomain'

const RouteViews = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchViews(props, domain.data.id)
		})

	}, [ props.domains.value, props.views.type, props.views.interval ])

	const mainView = (() => {
		if (props.domains.value.length > 0) {
			return (
				h('div', { className: 'subHeader' },
					h(Select, {
						value: props.views.type,
						onChange: (e) => props.setViewsType(e.target.value),
						items: [
							{ value: VIEWS_TYPE_UNIQUE, label: 'Unique site views' },
							{ value: VIEWS_TYPE_TOTAL, label: 'Total page views' }
						]
					}),
					h(Select, {
						value: props.views.interval,
						onChange: (e) => props.setViewsInterval(e.target.value),
						items: [
							{ value: VIEWS_INTERVAL_DAILY, label: 'Daily' },
							{ value: VIEWS_INTERVAL_MONTHLY, label: 'Monthly' },
							{ value: VIEWS_INTERVAL_YEARLY, label: 'Yearly' }
						]
					})
				),
				h(CardViews, {
					wide: true,
					headline: ({
						[VIEWS_TYPE_UNIQUE]: 'Site Views',
						[VIEWS_TYPE_TOTAL]: 'Page Views'
					})[props.views.type],
					interval: props.views.interval,
					items: mergeViews(props.domains, props.views)
				})
			)
		}

		return h(NoDomain, {
			addModalsModal: props.addModalsModal
		})
	})()

	return (
		h(Fragment, {},
			mainView,
			props.domains.value.map(
				(domain) => (
					h(CardViews, {
						key: domain.data.id,
						headline: domain.data.title,
						interval: props.views.interval,
						items: props.views.value[domain.data.id] == null ? [] : enhanceViews(props.views.value[domain.data.id].value, 7, props.views.interval)
					})
				)
			)

		)
	)

}

export default RouteViews