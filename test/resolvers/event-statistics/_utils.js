import { api } from '../../_utils.js'
import { gql } from '../_utils.js'

export const getStats = async ({ base, token, eventId, fragment }) => {
  const body = {
    query: gql`
      query fetchStatistics($id: ID!) {
        event(id: $id) {
          statistics {
            id
            ${fragment}
          }
        }
      }
    `,
    variables: {
      id: eventId,
    },
  }

  const { json } = await api(base, body, token)

  if (json.errors != null) {
    throw new Error(json.errors[0].message)
  }

  return json.data.event.statistics
}
