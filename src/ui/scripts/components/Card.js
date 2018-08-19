import { createElement as h, Component } from 'react'
import { compose, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import relativeDate from '../utils/relativeDate'

import Headline from './Headline'
import Text from './Text'
import BarChart from './BarChart'

const toOffset = (index, max) => Math.abs(index - max)
const toIndex = (offset, max) => max - offset

const enhance = compose(

	setPropTypes({
		wide: PropTypes.bool,
		title: PropTypes.string.isRequired
	})

)

const Card = class extends Component {

	constructor(props) {

		super(props)

		this.onEnter = this.onEnter.bind(this)
		this.onLeave = this.onLeave.bind(this)

		this.state = {
			// Index of the active element
			active: toIndex(0, this.props.data.length - 1)
		}

	}

	onEnter(index) {

		this.setState({
			// Index of the active element
			active: index
		})

	}

	onLeave() {

		this.setState({
			// Index of the active element
			active: toIndex(0, this.props.data.length - 1)
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
					}, this.props.title),
					h(Text, {
						spacing: false
					}, relativeDate(toOffset(this.state.active, this.props.data.length - 1))),
					h(BarChart, {
						data: this.props.data,
						active: this.state.active,
						onEnter: this.onEnter,
						onLeave: this.onLeave
					})
				)
			)
		)

	}

}

export default enhance(Card)