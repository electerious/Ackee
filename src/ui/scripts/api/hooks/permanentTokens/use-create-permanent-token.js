import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

import permanentTokenFields from '../../fragments/permanent-token-fields.js'
import addAndSortModify from '../../utils/add-and-sort-modify.js'

const MUTATION = gql`
  mutation createPermanentToken($input: CreatePermanentTokenInput!) {
    createPermanentToken(input: $input) {
      payload {
        ...permanentTokenFields
      }
    }
  }

  ${permanentTokenFields}
`

const update = (cache, result) => {
  const data = result.data.createPermanentToken.payload
  const fragment = permanentTokenFields

  cache.modify({
    fields: {
      permanentTokens: (...args) => {
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
