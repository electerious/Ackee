import { createElement as h, Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Headline from '../Headline'
import Text from '../Text'
import PresentationIconList from '../presentations/PresentationIconList'

const textLabel = (item) => {

	if (item == null) return 'Last 7 days'

	return `${ item.count } ${ item.count === 1 ? 'visit' : 'visits' }`

}

const CardViews = class extends Component {

	constructor(props) {

		super(props)

		this.onEnter = this.onEnter.bind(this)
		this.onLeave = this.onLeave.bind(this)

		this.state = {
			// Index of the active element
			active: undefined
		}

	}

	onEnter(index) {

		this.setState({
			active: index
		})

	}

	onLeave() {

		this.setState({
			active: undefined
		})

	}

	render() {

		return (
			h('div', {
				className: classNames({
					'card': true,
					'card--wide': this.props.wide === true
				})
			},
				h('div', { className: 'card__inner' },
					h(Headline, {
						type: 'h2',
						small: true,
						spacing: false,
						className: 'color-white'
					}, this.props.headline),
					h(Text, {
						spacing: false
					}, textLabel(this.props.items[this.state.active])),
					h(PresentationIconList, {
						items: this.props.items,
						onEnter: this.onEnter,
						onLeave: this.onLeave
					})
				)
			)
		)

	}

}

CardViews.propTypes = {
	wide: PropTypes.bool,
	headline: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired
}

export default CardViews