import { createElement as h, Component, Fragment } from 'react'

import Card from './Card'

const Overview = class extends Component {

	constructor(props) {

		super(props)

		this.state = {}

	}

	componentDidMount() {

		this.setState({
			items: [
				800,
				300,
				250,
				400,
				550,
				901,
				620,
				800,
				300,
				250,
				400,
				550,
				901,
				620
			]
		})

	}

	render() {

		return (
			h(Fragment, {},

				this.state.items != null && h(Card, {
					wide: true,
					headline: 'Page Views',
					items: this.state.items
				})

			)
		)

	}

}

export default Overview