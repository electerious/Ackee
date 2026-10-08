import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import * as events from '../../../../constants/events.js'

import Input from '../input.js'
import Label from '../label.js'
import Select from '../select.js'
import Spacer from '../spacer.js'
import Textarea from '../textarea.js'
import Tooltip from '../tooltip.js'

import useDeleteEvent from '../../api/hooks/events/use-delete-event.js'
import useUpdateEvent from '../../api/hooks/events/use-update-event.js'
import useInputs from '../../hooks/use-inputs.js'
import commonModalProps from '../../utils/common-modal-props.js'
import shortId from '../../utils/short-id.js'

const ModalEventEdit = (props) => {
  const updateEvent = useUpdateEvent(props.id)
  const deleteEvent = useDeleteEvent(props.id)

  const [inputs, onInputChange] = useInputs({
    title: props.title,
    type: props.type,
  })

  const onSubmit = (event) => {
    event.preventDefault()
    updateEvent.mutate({
      variables: {
        input: inputs,
      },
    })
    props.closeModal()
  }

  const onDelete = (event) => {
    event.preventDefault()

    const c = confirm(`Are you sure you want to delete the event "${props.title}"? This action cannot be undone.`)
    if (c === false) return

    deleteEvent.mutate()
    props.closeModal()
  }

  const titleId = shortId()
  const typeId = shortId()
  const idId = shortId()
  const embedId = shortId()

  return h(
    'form',
    { className: 'card', onSubmit },
    h(
      'div',
      { className: 'card__inner' },

      h(Spacer, { size: 0.5 }),

      h(Label, { htmlFor: titleId }, 'Event title'),

      h(Input, {
        type: 'text',
        id: titleId,
        required: true,
        focused: true,
        placeholder: 'Event title',
        value: inputs.title,
        onChange: onInputChange('title'),
      }),

      h(
        'div',
        { className: 'card__group' },
        h(Label, { spacing: false, htmlFor: typeId }, 'Event type'),
        h(Tooltip, {}, 'Specifies how the aggregated data will be displayed in the UI. Can be changed at any time.'),
      ),

      h(Select, {
        id: typeId,
        required: true,
        value: inputs.type,
        items: [
          {
            value: events.EVENTS_TYPE_TOTAL_CHART,
            label: 'Chart with total sums',
          },
          {
            value: events.EVENTS_TYPE_AVERAGE_CHART,
            label: 'Chart with average values',
          },
          {
            value: events.EVENTS_TYPE_TOTAL_LIST,
            label: 'List with total sums',
          },
          {
            value: events.EVENTS_TYPE_AVERAGE_LIST,
            label: 'List with average values',
          },
        ],
        onChange: onInputChange('type'),
      }),

      h(Label, { htmlFor: idId }, 'Event id'),

      h(Input, {
        type: 'text',
        id: idId,
        readOnly: true,
        placeholder: 'Event id',
        value: props.id,
        copyOnFocus: true,
      }),

      h(Label, { htmlFor: embedId }, 'Usage example'),

      h(Textarea, {
        id: embedId,
        readOnly: true,
        rows: 3,
        value: `ackeeTracker.action('${props.id}', { key: 'Click', value: 1 })`,
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
        'Save',
      ),
    ),
  )
}

ModalEventEdit.propTypes = {
  ...commonModalProps,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ModalEventEdit
