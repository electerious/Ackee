import { createElement as h, Component, Fragment } from 'react'

import {
	REFERRERS_SORTING_TOP,
	REFERRERS_SORTING_RECENT
} from '../../../../constants/referrers'

import enhanceReferrers from '../../utils/enhanceReferrers'

import CardReferrers from '../cards/CardReferrers'
import Select from '../Select'

const RouteReferrers = class extends Component {

	componentDidMount() {

		this.props.fetchDomains(this.props).then(() => {

			this.props.domains.value.map((props) => {
				this.props.fetchReferrers(this.props, props.data.id)
			})

		})

	}

	componentDidUpdate(prevProps) {

		const shouldFetch = (
			prevProps.referrers.sorting !== this.props.referrers.sorting
		)

		if (shouldFetch === true) {

			this.props.domains.value.map((props) => {
				this.props.fetchReferrers(this.props, props.data.id)
			})

		}

	}

	render() {

		return (
			h(Fragment, {},

				h('div', { className: 'subHeader' },
					h(Select, {
						value: this.props.referrers.sorting,
						onChange: (e) => this.props.setReferrersSorting(e.target.value),
						items: [
							{ value: REFERRERS_SORTING_TOP, label: 'Top referrers' },
							{ value: REFERRERS_SORTING_RECENT, label: 'Recent referrers' }
						]
					})
				),

				this.props.domains.value.map(
					(props) => (
						h(CardReferrers, {
							key: props.data.id,
							headline: props.data.title,
							items: this.props.referrers.value[props.data.id] == null ? [] : enhanceReferrers(this.props.referrers.value[props.data.id].value)
						})
					)
				)

			)
		)

	}

}

export default RouteReferrers