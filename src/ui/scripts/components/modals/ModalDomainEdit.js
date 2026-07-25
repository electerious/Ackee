import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import Input from '../Input.js'
import Label from '../Label.js'
import Spacer from '../Spacer.js'
import Textarea from '../Textarea.js'

import useDeleteDomain from '../../api/hooks/domains/useDeleteDomain.js'
import useUpdateDomain from '../../api/hooks/domains/useUpdateDomain.js'
import useInputs from '../../hooks/useInputs.js'
import commonModalProps from '../../utils/commonModalProps.js'
import shortId from '../../utils/shortId.js'

const ModalDomainEdit = (props) => {
  const updateDomain = useUpdateDomain(props.id)
  const deleteDomain = useDeleteDomain(props.id)

  const [inputs, onInputChange] = useInputs({
    title: props.title,
  })

  const onSubmit = (event) => {
    event.preventDefault()
    updateDomain.mutate({
      variables: {
        input: inputs,
      },
    })
    props.closeModal()
  }

  const onDelete = (event) => {
    event.preventDefault()

    const c = confirm(`Are you sure you want to delete the domain "${props.title}"? This action cannot be undone.`)
    if (c === false) return

    deleteDomain.mutate()
    props.closeModal()
  }

  const titleId = shortId()
  const idId = shortId()
  const embedId = shortId()

  const trackerUrl = globalThis.env.customTracker.url || '/tracker.js'
  const srcUrl = new URL(trackerUrl, location.href).href
  const serverUrl = location.origin

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
        focused: true,
        placeholder: 'Domain title',
        value: inputs.title,
        onChange: onInputChange('title'),
      }),

      h(Label, { htmlFor: idId }, 'Domain id'),

      h(Input, {
        type: 'text',
        id: idId,
        readOnly: true,
        placeholder: 'Domain id',
        value: props.id,
        copyOnFocus: true,
      }),

      h(Label, { htmlFor: embedId }, 'Embed code'),

      h(Textarea, {
        id: embedId,
        readOnly: true,
        rows: 4,
        value: `<script async src="${srcUrl}" data-ackee-server="${serverUrl}" data-ackee-domain-id="${props.id}"></script>`,
        copyOnFocus: true,
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
          type: 'button',
          className: 'card__button link color-destructive',
          onClick: onDelete,
        },
        'Delete',
      ),

      h('div', {
        className: 'card__separator',
      }),

      h(
        'button',
        {
          className: 'card__button card__button--primary link color-white',
        },
        'Rename',
      ),
    ),
  )
}

ModalDomainEdit.propTypes = {
  ...commonModalProps,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ModalDomainEdit
