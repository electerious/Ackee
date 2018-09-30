import { createElement as h, Component, Fragment } from 'react'

import enhanceViews from '../utils/enhanceViews'

import Card from './Card'

const Overview = class extends Component {

	constructor(props) {

		super(props)

	}

	componentDidMount() {

		this.props.fetchDomains(this.props).then(() => {

			this.props.domains.value.map((props) => {
				this.props.fetchViews(props.data.id, this.props)
			})

		})

	}

	render() {

		return (
			h(Fragment, {},

				this.props.domains.value.map(
					(props, index) => h(Fragment, { key: index },
						h(Card, {
							headline: props.data.title,
							items: this.props.views.value[props.data.id] == null ? [] : enhanceViews(this.props.views.value[props.data.id].value, 7)
						})
					)
				)

			)
		)

	}

}

export default Overview