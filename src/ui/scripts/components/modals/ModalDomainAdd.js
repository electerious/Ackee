import { createElement as h } from 'react'

import Input from '../Input.js'
import Label from '../Label.js'
import Spacer from '../Spacer.js'
import Spinner from '../Spinner.js'

import useCreateDomain from '../../api/hooks/domains/useCreateDomain.js'
import useInputs from '../../hooks/useInputs.js'
import commonModalProps from '../../utils/commonModalProps.js'
import shortId from '../../utils/shortId.js'

const ModalDomainAdd = (props) => {
  const createDomain = useCreateDomain()

  const loading = createDomain.loading === true

  const [inputs, onInputChange] = useInputs({
    title: '',
  })

  const onSubmit = async (event) => {
    event.preventDefault()
    await createDomain.mutate({
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

      h(Label, { htmlFor: titleId }, 'Domain title'),

      h(Input, {
        type: 'text',
        id: titleId,
        required: true,
        disabled: loading === true,
        focused: true,
        placeholder: 'Domain title',
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
        className: 'card__separator',
      }),

      h(
        'button',
        {
          className: 'card__button card__button--primary link color-white',
          disabled: loading === true,
        },
        loading === true ? h(Spinner) : 'Add',
      ),
    ),
  )
}

ModalDomainAdd.propTypes = {
  ...commonModalProps,
}

export default ModalDomainAdd
