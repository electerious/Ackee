import { createElement as h, Component, Fragment } from 'react'

import Header from './Header'
import Card from './Card'

export default class Dashboard extends Component {

	constructor(props) {

		super(props)

		this.state = {}

	}

	render() {

		return h('div', {},
			h(Header, this.props),
			h('main', { className: 'content' },
				this.props.route.tab === 'overview' && h(Fragment, {},
					h(Card, { wide: true, title: 'Page Visits' }),
					h(Card, { title: 'Visits' }),
					h(Card, { title: 'Visits' })
				)
			)
		)

	}

}