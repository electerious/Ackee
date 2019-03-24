import { createElement as h, Component } from 'react'
import { compose, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Headline from '../Headline'
import Text from '../Text'
import PresentationIconList from '../presentations/PresentationIconList'

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
					}, 'Last 7 days'),
					h(PresentationIconList, {
						items: this.props.items
					})
				)
			)
		)

	}

}

export default enhance(CardViews)