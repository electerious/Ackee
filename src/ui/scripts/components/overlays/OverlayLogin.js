import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import { homepage } from '../../../../../package.json'

import Input from '../Input'
import Spacer from '../Spacer'
import Headline from '../Headline'
import Text from '../Text'
import Spinner from '../Spinner'
import Message from '../Message'

import useCreateToken from '../../api/hooks/tokens/useCreateToken'

const OverlayLogin = (props) => {

	const createToken = useCreateToken()

	const hasError = createToken.error != null
	const fetching = createToken.fetching === true

	const [ inputs, setInputs ] = useState({
		username: window.env.isDemoMode === true ? 'admin' : '',
		password: window.env.isDemoMode === true ? '123456' : ''
	})

	const onChange = (key) => (e) => setInputs({
		...inputs,
		[key]: e.target.value
	})

	const onSubmit = (e) => {
		e.preventDefault()
		createToken.mutate({
			variables: {
				input: inputs
			}
		}).then(({ data }) => {
			props.setToken(data.createToken.payload.id)
		})
	}

	return (
		h('form', { className: 'card card--overlay', onSubmit },
			h('div', { className: 'card__inner align-center' },

				h(Spacer, { size: 2.4 }),

				h(Headline, {
					type: 'h1'
				}, 'Ackee'),
				h(Text, {
					type: 'p'
				}, 'Welcome back, sign in to continue.'),

				h(Spacer, { size: 2.5 }),

				hasError === true && h(Message, { status: 'error' }, createToken.error.message),

				h(Input, {
					type: 'username',
					required: true,
					disabled: fetching === true,
					focused: true,
					placeholder: 'Username',
					value: inputs.username,
					onChange: onChange('username')
				}),
				h(Input, {
					type: 'password',
					required: true,
					disabled: fetching === true,
					placeholder: 'Password',
					value: inputs.password,
					onChange: onChange('password')
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
					disabled: fetching === true
				}, fetching === true ? h(Spinner) : 'Sign In →')

			)
		)
	)

}

OverlayLogin.propTypes = {
	setToken: PropTypes.func.isRequired
}

export default OverlayLogin