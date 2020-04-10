import { createElement as h, Fragment, useEffect } from 'react'

import { DEVICES_SORTING_TOP, DEVICES_SORTING_RECENT, DEVICES_WITH_MODEL, DEVICES_NO_MODEL } from '../../../../constants/devices'
import { LAST_7_DAYS, LAST_30_DAYS, ALL_TIME } from '../../../../constants/dateRange'

import enhanceDevices from '../../enhancers/enhanceDevices'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardDevices from '../cards/CardDevices'
import Select from '../Select'

const RouteDevices = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchDevices(props, domain.data.id)
		})

	}, [ props.domains.value, props.devices.sorting, props.devices.type, props.devices.dateRange ])

	return (
		h(Fragment, {},

			h('div', { className: 'subHeader' },
				h(Select, {
					value: props.devices.sorting,
					onChange: (e) => props.setDevicesSorting(e.target.value),
					items: [
						{ value: DEVICES_SORTING_TOP, label: 'Top devices' },
						{ value: DEVICES_SORTING_RECENT, label: 'Recent devices' }
					]
				}),
				h(Select, {
					value: props.devices.type,
					onChange: (e) => props.setDevicesType(e.target.value),
					items: [
						{ value: DEVICES_NO_MODEL, label: 'No model' },
						{ value: DEVICES_WITH_MODEL, label: 'With model' }
					]
				}),
				h(Select, {
					disabled: props.devices.sorting !== DEVICES_SORTING_TOP,
					value: props.devices.dateRange,
					onChange: (e) => props.setDevicesTopDateRange(e.target.value),
					items: [
						{ value: LAST_7_DAYS.value, label: LAST_7_DAYS.label },
						{ value: LAST_30_DAYS.value, label: LAST_30_DAYS.label },
						{ value: ALL_TIME.value, label: ALL_TIME.label }
					]
				})
			),

			props.domains.value.map(
				(domain) => (
					h(CardDevices, {
						key: domain.data.id,
						headline: domain.data.title,
						dateRange: props.devices.dateRange,
						sorting: props.devices.sorting,
						loading: props.devices.value[domain.data.id] == null ? false : props.devices.value[domain.data.id].fetching,
						items: props.devices.value[domain.data.id] == null ? [] : enhanceDevices(props.devices.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteDevices