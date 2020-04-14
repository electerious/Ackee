import { createElement as h, Fragment, useEffect } from 'react'

import enhanceDevices from '../../enhancers/enhanceDevices'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardDevices from '../cards/CardDevices'
import NoDomain from '../NoDomain'

const RouteDevices = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchDevices(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.devices.sorting, props.devices.type ])

	const mainView = (() => {
		if (props.domains.value.length > 0) {
			return (
				props.domains.value.map(
					(domain) => (
						h(CardDevices, {
							key: domain.data.id,
							headline: domain.data.title,
							range: props.filter.range,
							sorting: props.devices.sorting,
							loading: props.devices.value[domain.data.id] == null ? false : props.devices.value[domain.data.id].fetching,
							items: props.devices.value[domain.data.id] == null ? [] : enhanceDevices(props.devices.value[domain.data.id].value)
						})
					)
				)
			)
		}

		if (!props.fetching) {
			return h(NoDomain, {
				addModalsModal: props.addModalsModal
			})
		}
	})()

	return (
		h(Fragment, {}, mainView)
	)

}

export default RouteDevices