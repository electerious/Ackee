import { createElement as h, Component, Fragment } from 'react'

import enhanceReferrers from '../../utils/enhanceReferrers'

import CardReferrers from '../cards/CardReferrers'

const RouteReferrers = class extends Component {

	constructor(props) {

		super(props)

	}

	componentDidMount() {

		this.props.fetchDomains(this.props).then(() => {

			this.props.domains.value.map((props) => {
				this.props.fetchReferrers(props.data.id, this.props)
			})

		})

	}

	render() {

		return (
			h(Fragment, {},

				this.props.domains.value.map(
					(props, index) => h(Fragment, { key: index },
						h(CardReferrers, {
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