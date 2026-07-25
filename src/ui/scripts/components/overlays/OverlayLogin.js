import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import { homepage } from '../../../../../package.json'

import Headline from '../Headline.js'
import Input from '../Input.js'
import Message from '../Message.js'
import Spacer from '../Spacer.js'
import Spinner from '../Spinner.js'
import Text from '../Text.js'

import useCreateToken from '../../api/hooks/tokens/useCreateToken.js'
import useInputs from '../../hooks/useInputs.js'

const OverlayLogin = (props) => {
  const createToken = useCreateToken()

  const hasError = createToken.error != null
  const loading = createToken.loading === true

  const [inputs, onInputChange] = useInputs({
    username: globalThis.env.isDemoMode === true ? 'admin' : '',
    password: globalThis.env.isDemoMode === true ? '123456' : '',
  })

  const onSubmit = async (event) => {
    event.preventDefault()
    const { data } = await createToken.mutate({
      variables: {
        input: inputs,
      },
    })
    props.setToken(data.createToken.payload.id)
  }

  return h(
    'form',
    { className: 'card card--overlay', onSubmit },
    h(
      'div',
      { className: 'card__inner align-center' },

      h(Spacer, { size: 2.4 }),

      h(
        Headline,
        {
          type: 'h1',
        },
        'Ackee',
      ),
      h(
        Text,
        {
          type: 'p',
        },
        'Welcome back, sign in to continue.',
      ),

      h(Spacer, { size: 2.5 }),

      hasError === true && h(Message, { status: 'error' }, createToken.error.message),

      h(Input, {
        type: 'username',
        required: true,
        disabled: loading === true,
        focused: true,
        placeholder: 'Username',
        value: inputs.username,
        onChange: onInputChange('username'),
      }),
      h(Input, {
        type: 'password',
        required: true,
        disabled: loading === true,
        placeholder: 'Password',
        value: inputs.password,
        onChange: onInputChange('password'),
      }),

      h(Spacer, { size: 1 }),
    ),
    h(
      'div',
      { className: 'card__footer' },

      h(
        'a',
        {
          className: 'card__button link',
          href: homepage,
          target: '_blank',
          rel: 'noopener',
        },
        'Help',
      ),

      h('div', {
        className: 'card__separator',
      }),

      h(
        'button',
        {
          className: 'card__button card__button--primary link color-white',
          disabled: loading === true,
        },
        loading === true ? h(Spinner) : 'Sign In →',
      ),
    ),
  )
}

OverlayLogin.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default OverlayLogin
