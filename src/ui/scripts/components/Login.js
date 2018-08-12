import { createElement as h, Component } from 'react'

import Input from './Input'
import Spacer from './Spacer'
import Headline from './Headline'
import Text from './Text'
import Spinner from './Spinner'
import Message from './Message'

export default class Login extends Component {

	constructor(props) {

		super(props)

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)

		this.state = {
			username: '',
			password: ''
		}

	}

	onChange(key) {

		return (e) => {

			this.setState({
				...this.state,
				[key]: e.target.value
			})

		}

	}

	onSubmit(e) {

		e.preventDefault()

		this.props.postToken(this.state)

	}

	render() {

		return h('form', { className: 'card card--login', onSubmit: this.onSubmit },
			h('div', { className: 'card__inner align-center' },

				h(Spacer, { size: 2 }),

				h(Headline, {
					type: 'h1',
					spacing: false,
					className: 'c-white'
				}, 'Ackee'),
				h(Text, {}, 'Welcome back, sign in to continue.'),

				h(Spacer, { size: 2.5 }),

				this.props.token.error != null && h(Message, { status: 'error', className: 'c-white' }, this.props.token.error),

				h(Input, {
					type: 'text',
					placeholder: 'Username',
					disabled: this.props.token.fetching === true,
					required: true,
					autoCapitalize: 'off',
					autoCorrect: 'off',
					autoComplete: 'username',
					autoFocus: true,
					value: this.state.username,
					onChange: this.onChange('username')
				}),
				h(Input, {
					type: 'password',
					placeholder: 'Password',
					disabled: this.props.token.fetching === true,
					required: true,
					autoComplete: 'current-password',
					value: this.state.password,
					onChange: this.onChange('password')
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
					className: 'card__button card__button--primary link c-white',
					disabled: this.props.token.fetching === true
				}, this.props.token.fetching === true ? h(Spinner) : 'Sign In →')

			)
		)

	}

}