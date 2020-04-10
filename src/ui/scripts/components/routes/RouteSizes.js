import { createElement as h, Fragment, useEffect } from 'react'

import { SIZES_TYPE_BROWSER_HEIGHT, SIZES_TYPE_BROWSER_RESOLUTION, SIZES_TYPE_BROWSER_WIDTH, SIZES_TYPE_SCREEN_HEIGHT, SIZES_TYPE_SCREEN_RESOLUTION, SIZES_TYPE_SCREEN_WIDTH } from '../../../../constants/sizes'
import { LAST_7_DAYS, LAST_30_DAYS, ALL_TIME } from '../../../../constants/dateRange'

import enhanceSizes from '../../enhancers/enhanceSizes'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardSizes from '../cards/CardSizes'
import Select from '../Select'
import NoDomain from '../NoDomain'

const RouteSizes = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchSizes(props, domain.data.id)
		})

	}, [ props.domains.value, props.sizes.type, props.sizes.dateRange ])

	const mainView = (() => {
		if (props.domains.value.length > 0) {
			return (
				h('div', { className: 'subHeader' },
					h(Select, {
						value: props.sizes.type,
						onChange: (e) => props.setSizesType(e.target.value),
						items: [
							{ value: SIZES_TYPE_BROWSER_RESOLUTION, label: 'Browser resolutions' },
							{ value: SIZES_TYPE_BROWSER_HEIGHT, label: 'Browser heights' },
							{ value: SIZES_TYPE_BROWSER_WIDTH, label: 'Browser widths' },
							{ value: SIZES_TYPE_SCREEN_RESOLUTION, label: 'Screen resolutions' },
							{ value: SIZES_TYPE_SCREEN_HEIGHT, label: 'Screen heights' },
							{ value: SIZES_TYPE_SCREEN_WIDTH, label: 'Screen widths' }
						]
					}),
					h(Select, {
						value: props.sizes.dateRange,
						onChange: (e) => props.setSizesTopDateRange(e.target.value),
						items: [
							{ value: LAST_7_DAYS.value, label: LAST_7_DAYS.label },
							{ value: LAST_30_DAYS.value, label: LAST_30_DAYS.label },
							{ value: ALL_TIME.value, label: ALL_TIME.label }
						]
					})
				)
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
					h(CardSizes, {
						key: domain.data.id,
						dateRange: props.sizes.dateRange,
						headline: domain.data.title,
						loading: props.sizes.value[domain.data.id] == null ? false : props.sizes.value[domain.data.id].fetching,
						items: props.sizes.value[domain.data.id] == null ? [] : enhanceSizes(props.sizes.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteSizes