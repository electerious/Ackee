import { createElement as h, Fragment, useEffect } from 'react'

import selectLanguagesValue from '../../selectors/selectLanguagesValue'
import enhanceLanguages from '../../enhancers/enhanceLanguages'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardLanguages from '../cards/CardLanguages'
import NoDomain from '../NoDomain'

const RouteLanguages = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchLanguages(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.languages.sorting ])

	const mainView = (() => {
		if (props.domains.value.length > 0) {
			return (
				props.domains.value.map(
					(domain) => (
						h(CardLanguages, {
							key: domain.data.id,
							headline: domain.data.title,
							range: props.filter.range,
							sorting: props.languages.sorting,
							loading: selectLanguagesValue(props, domain.data.id).fetching,
							items: enhanceLanguages(selectLanguagesValue(props, domain.data.id).value)
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

export default RouteLanguages