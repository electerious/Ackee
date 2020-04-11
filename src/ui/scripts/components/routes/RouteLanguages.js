import { createElement as h, Fragment, useEffect } from 'react'

import { LANGUAGES_SORTING_TOP,	LANGUAGES_SORTING_RECENT } from '../../../../constants/languages'
import ranges from '../../../../constants/ranges'

import enhanceLanguages from '../../enhancers/enhanceLanguages'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardLanguages from '../cards/CardLanguages'
import Select from '../Select'
import NoDomain from '../NoDomain'

const RouteLanguages = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchLanguages(props, domain.data.id)
		})

	}, [ props.domains.value, props.languages.sorting, props.languages.range ])

	const mainView = (() => {
		if (props.domains.value.length > 0) {
			return (
				h('div', { className: 'subHeader' },
					h(Select, {
						value: props.languages.sorting,
						onChange: (e) => props.setLanguagesSorting(e.target.value),
						items: [
							{ value: LANGUAGES_SORTING_TOP, label: 'Top languages' },
							{ value: LANGUAGES_SORTING_RECENT, label: 'Recent languages' }
						]
					}),
					h(Select, {
						disabled: props.languages.sorting !== LANGUAGES_SORTING_TOP,
						value: props.languages.range,
						onChange: (e) => props.setLanguagesRange(e.target.value),
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
					h(CardLanguages, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.languages.range,
						sorting: props.languages.sorting,
						loading: props.languages.value[domain.data.id] == null ? false : props.languages.value[domain.data.id].fetching,
						items: props.languages.value[domain.data.id] == null ? [] : enhanceLanguages(props.languages.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteLanguages