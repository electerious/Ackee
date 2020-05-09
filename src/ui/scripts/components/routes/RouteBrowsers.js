import { createElement as h, Fragment, useEffect } from 'react'

import selectBrowsersValue from '../../selectors/selectBrowsersValue'
import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardBrowsers from '../cards/CardBrowsers'
import NoDomain from '../NoDomain'

const RouteBrowsers = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchBrowsers(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.browsers.sorting, props.browsers.type ])

	const mainView = (() => {

		if (props.domains.value.length > 0) {
			return (props.domains.value.map(
				(domain) => (
					h(CardBrowsers, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						sorting: props.browsers.sorting,
						loading: selectBrowsersValue(props, domain.data.id).fetching,
						items: enhanceBrowsers(selectBrowsersValue(props, domain.data.id).value)
					})
				)
			))
		}

		if (!props.fetching) {
			return h(NoDomain, {
				addModalsModal: props.addModalsModal
			})
		}

	})()

	return (
		h(Fragment, {},	mainView)
	)

}

export default RouteBrowsers