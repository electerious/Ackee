import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

import deleteIdModify from '../../utils/delete-id-modify.js'

const MUTATION = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      success
    }
  }
`

const update = (id) => (cache, result) => {
  const success = result.data.deleteEvent.success
  if (success === false) return

  cache.modify({
    fields: {
      events: deleteIdModify(id),
    },
  })
}

export default (id) => {
  const [mutate, { loading, error }] = useMutation(MUTATION, {
    variables: {
      id,
    },
  })

  return {
    mutate: (options) =>
      mutate({
        update: update(id),
        optimisticResponse: {
          deleteEvent: {
            success: true,
            __typename: 'DeleteEventPayload',
          },
        },
        ...options,
      }),
    loading,
    error,
  }
}
