import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

import domainFields from '../../fragments/domain-fields.js'
import addAndSortModify from '../../utils/add-and-sort-modify.js'

const MUTATION = gql`
  mutation createDomain($input: CreateDomainInput!) {
    createDomain(input: $input) {
      payload {
        ...domainFields
      }
    }
  }

  ${domainFields}
`

const update = (cache, result) => {
  const data = result.data.createDomain.payload
  const fragment = domainFields

  cache.modify({
    fields: {
      domains: (...args) => {
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
