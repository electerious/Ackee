import { createElement as h, Fragment, useEffect } from 'react'

import { REFERRERS_SORTING_TOP, REFERRERS_SORTING_NEW, REFERRERS_SORTING_RECENT } from '../../../../constants/referrers'
import { LAST_7_DAYS, LAST_30_DAYS, ALL_TIME } from '../../../../constants/ranges'

import enhanceReferrers from '../../enhancers/enhanceReferrers'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardReferrers from '../cards/CardReferrers'
import Select from '../Select'

const RouteReferrers = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchReferrers(props, domain.data.id)
		})

	}, [ props.domains.value, props.referrers.sorting, props.referrers.range ])

	return (
		h(Fragment, {},

			h('div', { className: 'subHeader' },
				h(Select, {
					value: props.referrers.sorting,
					onChange: (e) => props.setReferrersSorting(e.target.value),
					items: [
						{ value: REFERRERS_SORTING_TOP, label: 'Top referrers' },
						{ value: REFERRERS_SORTING_NEW, label: 'New referrers' },
						{ value: REFERRERS_SORTING_RECENT, label: 'Recent referrers' }
					]
				}),
				h(Select, {
					disabled: props.referrers.sorting !== REFERRERS_SORTING_TOP,
					value: props.referrers.range,
					onChange: (e) => props.setReferrersRange(e.target.value),
					items: [
						{ value: LAST_7_DAYS.value, label: LAST_7_DAYS.label },
						{ value: LAST_30_DAYS.value, label: LAST_30_DAYS.label },
						{ value: ALL_TIME.value, label: ALL_TIME.label }
					]
				})
			),

			props.domains.value.map(
				(domain) => (
					h(CardReferrers, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.referrers.range,
						sorting: props.referrers.sorting,
						loading: props.referrers.value[domain.data.id] == null ? false : props.referrers.value[domain.data.id].fetching,
						items: props.referrers.value[domain.data.id] == null ? [] : enhanceReferrers(props.referrers.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteReferrers