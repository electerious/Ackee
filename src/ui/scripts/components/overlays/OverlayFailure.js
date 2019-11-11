import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import { homepage } from '../../../../../package'
import formatErrors from '../../utils/formatErrors'
import * as storage from '../../utils/storage'

import Textarea from '../Textarea'
import Spacer from '../Spacer'
import Headline from '../Headline'
import Text from '../Text'
import Message from '../Message'

const OverlayFailure = (props) => {

	const onClick = () => {
		storage.reset()
		window.location.reload()
	}

	return (
		h('div', { className: 'card card--overlay' },
			h('div', { className: 'card__inner align-center' },

				h(Spacer, { size: 2.4 }),

				h(Headline, {
					type: 'h1',
					className: 'color-white'
				}, 'Oops'),
				h(Text, {}, 'Something went wrong.'),

				h(Spacer, { size: 2.5 }),

				h(Message, { status: 'error' }, `Please report this issue on GitHub if you can't resolve it by yourself.`),

				h(Textarea, {
					readOnly: true,
					rows: 6,
					value: formatErrors(props.errors)
				}),

				h(Spacer, { size: 1 })

			),
			h('div', { className: 'card__footer' },

				h('a', {
					className: 'card__button link',
					href: homepage,
					target: '_blank',
					rel: 'noopener'
				}, 'Help'),

				h('div', {
					className: 'card__separator'
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
					onClick
				}, 'Reload Ackee')

			)
		)
	)

}

OverlayFailure.propTypes = {
	errors: PropTypes.array.isRequired
}

export default OverlayFailure