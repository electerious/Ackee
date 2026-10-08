import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

import eventFields from '../../fragments/event-fields.js'
import addAndSortModify from '../../utils/add-and-sort-modify.js'

const MUTATION = gql`
  mutation createEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      payload {
        ...eventFields
      }
    }
  }

  ${eventFields}
`

const update = (cache, result) => {
  const data = result.data.createEvent.payload
  const fragment = eventFields

  cache.modify({
    fields: {
      events: (...args) => {
        const newRef = cache.writeFragment({ data, fragment })
        return addAndSortModify(newRef, 'title')(...args)
      },
    },
  })
}

export default () => {
  const [mutate, { loading, error }] = useMutation(MUTATION)

  return {
    mutate: (options) =>
      mutate({
        update,
        ...options,
      }),
    loading,
    error,
  }
}
