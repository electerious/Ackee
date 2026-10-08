import { useQuery } from '@apollo/client/react'
import { useMemo } from 'react'

import status from '../../utils/status.js'

export default (query, selector, enhancer, options) => {
  const { loading, data } = useQuery(query, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    ...options,
  })

  const selection = useMemo(() => {
    return selector(data)
  }, [data])

  const _value = useMemo(() => {
    return enhancer(selection)
  }, [selection])

  const _status = useMemo(() => {
    return status(selection, loading)
  }, [selection, loading])

  return {
    value: _value,
    status: _status,
  }
}
