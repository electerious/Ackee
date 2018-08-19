import { createElement as h } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// Round upward to the next group of ten
const round = (num) => Math.ceil(num / 10) * 10

const max = (data) => round(Math.max.apply(Math, data))
const mid = (data) => max(data) / 2
const min = () => 0

const percentage = (amount, max) => (amount / max) * 100

const enhance = compose(

	setDisplayName('BarChart'),

	setPropTypes({
		data: PropTypes.arrayOf(PropTypes.number).isRequired,
		onEnter: PropTypes.func.isRequired,
		onLeave: PropTypes.func.isRequired
	})

)

const Row = (props) => (

	h('div', {
		className: classNames({
			'barChart__row': true,
			'barChart__row--top': props.position === 'top',
			'barChart__row--middle': props.position === 'middle',
			'barChart__row--bottom': props.position === 'bottom',
			'color-light': true
		})
	}, props.children)

)

const Column = (props) => (

	h('div', {
		className: classNames({
			barChart__column: true,
			active: props.active
		}),
		onMouseEnter: props.onEnter,
		onMouseLeave: props.onLeave
	},
		h('div', {
			'className': 'barChart__bar color-black',
			'style': { '--size': props.size },
			'data-label': props.label
		})
	)

)

const Component = (props) => (

	h('div', { className: 'barChart' },
		h('div', { className: 'barChart__axis' },
			h(Row, { position: 'top' }, max(props.data)),
			h(Row, { position: 'middle' }, mid(props.data)),
			h(Row, { position: 'bottom' }, min(props.data))
		),
		props.data.map((amount, index) => (
			h(Column, {
				key: index,
				active: props.active === index,
				size: `${ percentage(amount, max(props.data)) }%`,
				onEnter: () => props.onEnter(index),
				onLeave: () => props.onLeave(index),
				label: amount
			})
		))
	)

)

export default enhance(Component)