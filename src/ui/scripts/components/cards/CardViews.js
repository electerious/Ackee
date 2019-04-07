import { createElement as h, Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import relativeDate from '../../utils/relativeDate'

import Headline from '../Headline'
import Text from '../Text'
import PresentationBarChart from '../presentations/PresentationBarChart'

const CardViews = class extends Component {

	constructor(props) {

		super(props)

		this.onEnter = this.onEnter.bind(this)
		this.onLeave = this.onLeave.bind(this)

		this.state = {
			// Index of the active element
			active: 0
		}

	}

	onEnter(index) {

		this.setState({
			active: index
		})

	}

	onLeave() {

		this.setState({
			active: 0
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
					}, relativeDate(this.state.active)),
					h(PresentationBarChart, {
						items: this.props.items,
						active: this.state.active,
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