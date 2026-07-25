import { SetContextLink } from '@apollo/client/link/context'

import { get as getToken } from '../../hooks/useToken.js'

export default () => {
  return new SetContextLink((previousContext) => {
    const token = getToken()

    return {
      headers: {
        ...previousContext.headers,
        Authorization: `Bearer ${token}`,
      },
    }
  })
}
