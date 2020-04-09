import { createElement as h, Fragment, useEffect } from 'react'

import { OS_SORTING_TOP, OS_SORTING_RECENT, OS_NO_VERSION, OS_WITH_VERSION } from '../../../../constants/os'

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

	}, [ props.domains.value, props.os.sorting, props.os.type ])

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
						{ value: OS_NO_VERSION, label: 'No OS version' },
						{ value: OS_WITH_VERSION, label: 'With OS version' }
					]
				})
			),

			props.domains.value.map(
				(domain) => (
					h(CardOs, {
						key: domain.data.id,
						headline: domain.data.title,
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