import { createElement as h, Component } from 'react'

import formatErrors from '../../utils/formatErrors'

import Textarea from '../Textarea'
import Spacer from '../Spacer'
import Headline from '../Headline'
import Text from '../Text'
import Message from '../Message'

const OverlayFailure = class extends Component {

	constructor(props) {

		super(props)

		this.onReload = this.onReload.bind(this)

	}

	onReload() {

		window.location.reload()

	}

	render() {

		return (
			h('div', { className: 'card card--overlay' },
				h('div', { className: 'card__inner align-center' },

					h(Spacer, { size: 2 }),

					h(Headline, {
						type: 'h1',
						spacing: false,
						className: 'color-white'
					}, 'Oops'),
					h(Text, {}, 'Something went wrong.'),

					h(Spacer, { size: 2.5 }),

					h(Message, { status: 'error' }, `Please report this issue on GitHub if you can't resolve it by yourself.`),

					h(Textarea, {
						readOnly: true,
						rows: 6,
						value: formatErrors(this.props.errors)
					}),

					h(Spacer, { size: 1 })

				),
				h('div', { className: 'card__footer' },

					h('a', {
						className: 'card__button link',
						href: '#'
					}, 'Help'),

					h('div', {
						className: 'card__separator'
					}),

					h('button', {
						className: 'card__button card__button--primary link color-white',
						onClick: this.onReload
					}, 'Reload Ackee')

				)
			)
		)

	}

}

export default OverlayFailure