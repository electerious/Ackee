import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

import eventFields from '../../fragments/event-fields.js'

const MUTATION = gql`
  mutation updateEvent($id: ID!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      payload {
        ...eventFields
      }
    }
  }

  ${eventFields}
`

export default (id) => {
  const [mutate, { loading, error }] = useMutation(MUTATION, {
    variables: {
      id,
    },
  })

  return {
    mutate: (options) =>
      mutate({
        optimisticResponse: {
          updateEvent: {
            payload: {
              id,
              title: options.variables.input.title,
              type: options.variables.input.type,
              __typename: 'Event',
            },
            __typename: 'UpdateEventPayload',
          },
        },
        ...options,
      }),
    loading,
    error,
  }
}
