import { compose, setDisplayName } from 'recompose'

import h from '../utils/h'

import Input from './Input'
import Spacer from './Spacer'
import Headline from './Headline'
import Text from './Text'

const enhance = compose(

	setDisplayName('Login')

)

const Component = () => (

	h('div', { className: 'card card--login' },
		h('div', { className: 'card__inner align-center' },
			h(Spacer, { size: 2 }),
			h(Headline, { type: 'h1', spacing: false, className: 'c-white' }, 'Ackee'),
			h(Text, {}, 'Welcome back, sign in to continue.'),
			h(Spacer, { size: 2.5 }),
			h(Input, { type: 'text', placeholder: 'Username', autoCapitalize: 'off', autoCorrect: 'off', autoComplete: 'username', autoFocus: true }),
			h(Input, { type: 'password', placeholder: 'Password', autoComplete: 'current-password' }),
			h(Spacer, { size: 1 })
		),
		h('div', { className: 'card__footer' },
			h('a', {
				className: 'card__button link',
				href: '#'
			}, 'Help'),
			h('div', { className: 'card__separator' }),
			h('button', { className: 'card__button card__button--primary link c-white align-right' }, 'Sign In →')
		)
	)

)

export default enhance(Component)