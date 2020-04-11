import { createElement as h, Fragment, useEffect } from 'react'

import { SYSTEMS_SORTING_TOP, SYSTEMS_SORTING_RECENT, SYSTEMS_TYPE_NO_VERSION, SYSTEMS_TYPE_WITH_VERSION } from '../../../../constants/systems'
import ranges from '../../../../constants/ranges'

import enhanceSystems from '../../enhancers/enhanceSystems'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardSystems from '../cards/CardSystems'
import Select from '../Select'
import NoDomain from '../NoDomain'


const RouteSystems = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchSystems(props, domain.data.id)
		})

	}, [ props.domains.value, props.systems.sorting, props.systems.type, props.systems.range ])

	const mainView = (() => {
		if (props.domains.value.length > 0) {
			return (
				h('div', { className: 'subHeader' },
					h(Select, {
						value: props.systems.sorting,
						onChange: (e) => props.setSystemsSorting(e.target.value),
						items: [
							{ value: SYSTEMS_SORTING_TOP, label: 'Top Systems' },
							{ value: SYSTEMS_SORTING_RECENT, label: 'Recent Systems' }
						]
					}),
					h(Select, {
						value: props.systems.type,
						onChange: (e) => props.setSystemsType(e.target.value),
						items: [
							{ value: SYSTEMS_TYPE_NO_VERSION, label: 'No version' },
							{ value: SYSTEMS_TYPE_WITH_VERSION, label: 'With version' }
						]
					}),
					h(Select, {
						disabled: props.systems.sorting !== SYSTEMS_SORTING_TOP,
						value: props.systems.range,
						onChange: (e) => props.setSystemsRange(e.target.value),
						items: ranges.toArray()
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
					h(CardSystems, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.systems.range,
						sorting: props.systems.sorting,
						loading: props.systems.value[domain.data.id] == null ? false : props.systems.value[domain.data.id].fetching,
						items: props.systems.value[domain.data.id] == null ? [] : enhanceSystems(props.systems.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteSystems