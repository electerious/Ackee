import { createElement as h } from 'react'

import Input from '../input.js'
import Label from '../label.js'
import Spacer from '../spacer.js'
import Spinner from '../spinner.js'

import useCreatePermanentToken from '../../api/hooks/permanent-tokens/use-create-permanent-token.js'
import useInputs from '../../hooks/use-inputs.js'
import commonModalProps from '../../utils/common-modal-props.js'
import shortId from '../../utils/short-id.js'

const ModalPermanentTokenAdd = (props) => {
  const createPermanentToken = useCreatePermanentToken()

  const loading = createPermanentToken.loading === true

  const [inputs, onInputChange] = useInputs({
    title: '',
  })

  const onSubmit = async (event) => {
    event.preventDefault()
    await createPermanentToken.mutate({
      variables: {
        input: inputs,
      },
    })
    props.closeModal()
  }

  const titleId = shortId()

  return h(
    'form',
    { className: 'card', onSubmit },
    h(
      'div',
      { className: 'card__inner' },

      h(Spacer, { size: 0.5 }),

      h(Label, { htmlFor: titleId }, 'Permanent token title'),

      h(Input, {
        type: 'text',
        id: titleId,
        required: true,
        disabled: loading,
        focused: true,
        placeholder: 'Permanent token title',
        value: inputs.title,
        onChange: onInputChange('title'),
      }),
    ),
    h(
      'div',
      { className: 'card__footer' },

      h(
        'button',
        {
          type: 'button',
          className: 'card__button link',
          onClick: props.closeModal,
        },
        'Close',
      ),

      h('div', {
        className: 'card__separator ',
      }),

      h(
        'button',
        {
          className: 'card__button card__button--primary link color-white',
          disabled: loading,
        },
        loading ? h(Spinner) : 'Add',
      ),
    ),
  )
}

ModalPermanentTokenAdd.propTypes = {
  ...commonModalProps,
}

export default ModalPermanentTokenAdd
