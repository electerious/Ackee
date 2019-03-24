import { createElement as h, Component } from 'react'
import { compose, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import relativeDate from '../../utils/relativeDate'

import Headline from '../Headline'
import Text from '../Text'
import BarChart from '../BarChart'

const enhance = compose(

	setPropTypes({
		wide: PropTypes.bool,
		headline: PropTypes.string.isRequired,
		items: PropTypes.array.isRequired
	})

)

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
					h(BarChart, {
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

export default enhance(CardViews)