export const api = async (base, body, token, headers = {}) => {
  const url = new URL('/api', await base)

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': token == null ? undefined : `Bearer ${token}`,
  }

  const result = await fetch(url.href, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  })

  return {
    headers: result.headers,
    json: await result.json(),
  }
}
