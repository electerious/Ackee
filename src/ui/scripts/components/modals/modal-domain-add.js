import { createElement as h } from 'react'

import Input from '../input.js'
import Label from '../label.js'
import Spacer from '../spacer.js'
import Spinner from '../spinner.js'

import useCreateDomain from '../../api/hooks/domains/use-create-domain.js'
import useInputs from '../../hooks/use-inputs.js'
import commonModalProps from '../../utils/common-modal-props.js'
import shortId from '../../utils/short-id.js'

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
        disabled: loading,
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
          disabled: loading,
        },
        loading ? h(Spinner) : 'Add',
      ),
    ),
  )
}

ModalDomainAdd.propTypes = {
  ...commonModalProps,
}

export default ModalDomainAdd
