import { createElement as h, Fragment, useEffect } from 'react'

import { BROWSERS_SORTING_TOP, BROWSERS_SORTING_RECENT, BROWSERS_TYPE_NO_VERSION, BROWSERS_TYPE_WITH_VERSION } from '../../../../constants/browsers'
import ranges from '../../../../constants/ranges'

import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardBrowsers from '../cards/CardBrowsers'
import Select from '../Select'

const RouteBrowsers = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchBrowsers(props, domain.data.id)
		})

	}, [ props.domains.value, props.browsers.sorting, props.browsers.type, props.browsers.range ])

	return (
		h(Fragment, {},

			h('div', { className: 'subHeader' },
				h(Select, {
					value: props.browsers.sorting,
					onChange: (e) => props.setBrowsersSorting(e.target.value),
					items: [
						{ value: BROWSERS_SORTING_TOP, label: 'Top browsers' },
						{ value: BROWSERS_SORTING_RECENT, label: 'Recent browsers' }
					]
				}),
				h(Select, {
					value: props.browsers.type,
					onChange: (e) => props.setBrowsersType(e.target.value),
					items: [
						{ value: BROWSERS_TYPE_NO_VERSION, label: 'No version' },
						{ value: BROWSERS_TYPE_WITH_VERSION, label: 'With version' }
					]
				}),
				h(Select, {
					disabled: props.browsers.sorting !== BROWSERS_SORTING_TOP,
					value: props.browsers.range,
					onChange: (e) => props.setBrowsersRange(e.target.value),
					items: ranges.toArray()
				})
			),

			props.domains.value.map(
				(domain) => (
					h(CardBrowsers, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.browsers.range,
						sorting: props.browsers.sorting,
						loading: props.browsers.value[domain.data.id] == null ? false : props.browsers.value[domain.data.id].fetching,
						items: props.browsers.value[domain.data.id] == null ? [] : enhanceBrowsers(props.browsers.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteBrowsers