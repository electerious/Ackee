import { createElement as h, Fragment, useEffect } from 'react'

import {
	OS_SORTING_TOP,
	OS_SORTING_RECENT,
	OS_NO_VERSION,
	OS_WITH_VERSION
} from '../../../../constants/os'

import {
	ALL_TIME,
	LAST_7_DAYS,
	LAST_30_DAYS
} from '../../../../constants/dateRange'

import enhanceOs from '../../enhancers/enhanceOs'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardOs from '../cards/CardOs'
import Select from '../Select'

const RouteOs = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchOs(props, domain.data.id)
		})

	}, [ props.domains.value, props.os.sorting, props.os.type, props.os.dateRange ])

	return (
		h(Fragment, {},

			h('div', { className: 'subHeader' },
				h(Select, {
					value: props.os.sorting,
					onChange: (e) => props.setOsSorting(e.target.value),
					items: [
						{ value: OS_SORTING_TOP, label: 'Top OS' },
						{ value: OS_SORTING_RECENT, label: 'Recent OS' }
					]
				}),
				h(Select, {
					value: props.os.type,
					onChange: (e) => props.setOsType(e.target.value),
					items: [
						{ value: OS_NO_VERSION, label: 'No version' },
						{ value: OS_WITH_VERSION, label: 'With version' }
					]
				}),
				h(Select, {
					disabled: props.os.sorting !== OS_SORTING_TOP,
					value: props.os.dateRange,
					onChange: (e) => props.setOsTopDateRange(e.target.value),
					items: [
						{ value: LAST_7_DAYS.value, label: LAST_7_DAYS.label },
						{ value: LAST_30_DAYS.value, label: LAST_30_DAYS.label },
						{ value: ALL_TIME.value, label: ALL_TIME.label }
					]
				}),
				h(Select, {
					disabled: props.os.sorting !== OS_SORTING_TOP,
					value: props.os.dateRange,
					onChange: (e) => props.setOsTopDateRange(e.target.value),
					items: [
						{ value: LAST_7_DAYS.value.toString(), label: LAST_7_DAYS.label },
						{ value: LAST_30_DAYS.value.toString(), label: LAST_30_DAYS.label },
						{ value: ALL_TIME.value.toString(), label: ALL_TIME.label }
					]
				})
			),

			props.domains.value.map(
				(domain) => (
					h(CardOs, {
						key: domain.data.id,
						headline: domain.data.title,
						dateRange: props.os.dateRange,
						sorting: props.os.sorting,
						loading: props.os.value[domain.data.id] == null ? false : props.os.value[domain.data.id].fetching,
						items: props.os.value[domain.data.id] == null ? [] : enhanceOs(props.os.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteOs