import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

const MUTATION = gql`
  mutation createToken($input: CreateTokenInput!) {
    createToken(input: $input) {
      payload {
        id
      }
    }
  }
`

export default () => {
  const [mutate, { loading, error }] = useMutation(MUTATION)

  return {
    mutate,
    loading,
    error,
  }
}
