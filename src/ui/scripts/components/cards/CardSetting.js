import { createElement as h, Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import isLast from '../../utils/isLast'

import Spacer from '../Spacer'
import Headline from '../Headline'
import Message from '../Message'
import LinkItem from '../LinkItem'
import Line from '../Line'

const CardSetting = class extends Component {

	render() {

		return (
			h('div', { className: 'card card--wide' },
				h('div', { className: 'card__inner' },

					h(Headline, {
						type: 'h2',
						small: true,
						className: 'color-white'
					}, this.props.headline),

					h(Spacer, { size: 1 }),

					this.props.message != null && h(Message, { status: this.props.message.status }, this.props.message.label),

					this.props.items.map(
						(props, index, arr) => h(Fragment, { key: props.label + index },
							h(LinkItem, props, props.label),
							isLast(index, arr) === false && h(Line)
						)
					)

				)
			)
		)

	}

}

CardSetting.propTypes = {
	headline: PropTypes.string.isRequired,
	message: PropTypes.shape({
		status: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired
	}),
	items: PropTypes.array.isRequired
}

export default CardSetting