import { createElement as h, Fragment, useEffect } from 'react'

import {
	VIEWS_TYPE_UNIQUE,
	VIEWS_TYPE_TOTAL,
	VIEWS_TYPE_PAGES
} from '../../../../constants/views'

import enhanceChartViews from '../../utils/enhanceChartViews'
import enhancePageViews from '../../utils/enhancePageViews'
import mergeChartViews from '../../utils/mergeChartViews'

import CardChartViews from '../cards/CardChartViews'
import CardPageViews from '../cards/CardPageViews'
import Select from '../Select'

const ChartViews = (props) => {

	return (
		h(Fragment, {},

			h(CardChartViews, {
				wide: true,
				headline: 'Page Views',
				items: mergeChartViews(props.domains, props.views)
			}),

			props.domains.value.map(
				(domain) => (
					h(CardChartViews, {
						key: domain.data.id,
						headline: domain.data.title,
						items: props.views.value[domain.data.id] == null ? [] : enhanceChartViews(props.views.value[domain.data.id].value, 7)
					})
				)
			)

		)
	)

}

const PageViews = (props) => {

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardPageViews, {
						key: domain.data.id,
						headline: domain.data.title,
						loading: props.views.value[domain.data.id] == null ? false : props.views.value[domain.data.id].fetching,
						items: props.views.value[domain.data.id] == null ? [] : enhancePageViews(props.views.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

const RouteViews = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchViews(props, domain.data.id)
		})

	}, [ props.domains.value, props.views.type ])

	const isChartViews = (
		props.views.type === VIEWS_TYPE_UNIQUE ||
		props.views.type === VIEWS_TYPE_TOTAL
	)

	const isPageViews = (
		props.views.type === VIEWS_TYPE_PAGES
	)

	return (
		h(Fragment, {},

			h('div', { className: 'subHeader' },
				h(Select, {
					value: props.views.type,
					onChange: (e) => props.setViewsType(e.target.value),
					items: [
						{ value: VIEWS_TYPE_UNIQUE, label: 'Unique site views' },
						{ value: VIEWS_TYPE_TOTAL, label: 'Total page views' },
						{ value: VIEWS_TYPE_PAGES, label: 'Views per page' }
					]
				})
			),

			isChartViews === true && h(ChartViews, props),
			isPageViews === true && h(PageViews, props)

		)
	)

}

export default RouteViews