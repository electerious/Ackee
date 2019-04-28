import { createElement as h, Fragment } from 'react'
import PropTypes from 'prop-types'

import isLast from '../../utils/isLast'

import Spacer from '../Spacer'
import Headline from '../Headline'
import Message from '../Message'
import LinkItem from '../LinkItem'
import Line from '../Line'

const CardSetting = (props) => {

	return (
		h('div', { className: 'card card--wide' },
			h('div', { className: 'card__inner' },

				h(Headline, {
					type: 'h2',
					small: true,
					className: 'color-white'
				}, props.headline),

				h(Spacer, { size: 1 }),

				props.message != null && h(Message, { status: props.message.status }, props.message.label),

				props.items.map(
					(item, index, arr) => h(Fragment, { key: item.label + index },
						h(LinkItem, item, item.label),
						isLast(index, arr) === false && h(Line)
					)
				)

			)
		)
	)

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