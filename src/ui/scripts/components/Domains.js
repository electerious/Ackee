import { createElement as h, Component, Fragment } from 'react'

import Card from './Card'

const Overview = class extends Component {

	constructor(props) {

		super(props)

	}

	componentDidMount() {

		this.props.fetchDomains(this.props)

	}

	render() {

		return (
			h(Fragment, {},

				this.props.domains.value != null && this.props.domains.value.map(
					(props, index) => h(Fragment, { key: index },
						h(Card, {
							headline: props.data.title,
							items: [ 1, 2, 3, 4, 5, 6, 7, 8 ]
						})
					)
				)

			)
		)

	}

}

export default Overview