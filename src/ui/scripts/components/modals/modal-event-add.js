import { createElement as h } from 'react'

import * as events from '../../../../constants/events.js'

import Input from '../input.js'
import Label from '../label.js'
import Select from '../select.js'
import Spacer from '../spacer.js'
import Spinner from '../spinner.js'
import Tooltip from '../tooltip.js'

import useCreateEvent from '../../api/hooks/events/use-create-event.js'
import useInputs from '../../hooks/use-inputs.js'
import commonModalProps from '../../utils/common-modal-props.js'
import shortId from '../../utils/short-id.js'

const ModalEventAdd = (props) => {
  const createEvent = useCreateEvent()

  const loading = createEvent.loading === true

  const [inputs, onInputChange] = useInputs({
    title: '',
    type: events.EVENTS_TYPE_TOTAL_CHART,
  })

  const onSubmit = async (event) => {
    event.preventDefault()
    await createEvent.mutate({
      variables: {
        input: inputs,
      },
    })
    props.closeModal()
  }

  const titleId = shortId()
  const typeId = shortId()

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
        disabled: loading === true,
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
        disabled: loading === true,
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

ModalEventAdd.propTypes = {
  ...commonModalProps,
}

export default ModalEventAdd
