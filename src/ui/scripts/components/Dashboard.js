import { createElement as h, Component, Fragment } from 'react'

import Header from './Header'
import Card from './Card'

const Dashboard = class extends Component {

	constructor(props) {

		super(props)

		this.state = {
			data: [
				800,
				300,
				250,
				400,
				550,
				901,
				620
			]
		}

	}

	render() {

		return (
			h('div', {},
				h(Header, this.props),
				h('main', { className: 'content' },
					this.props.route.tab === 'overview' && h(Fragment, {},
						h(Card, {
							wide: true,
							title: 'Page Visits',
							data: [...this.state.data, ...this.state.data]
						}),
						h(Card, {
							title: 'Visits',
							data: this.state.data
						}),
						h(Card, {
							title: 'Visits',
							data: this.state.data
						})
					)
				)
			)
		)

	}

}

export default Dashboard