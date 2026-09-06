import { HeaderMap } from '@apollo/server'

import config from './utils/config.js'
import connect from './utils/connect.js'
import createApolloServer from './utils/createApolloServer.js'
import { createServerlessContext } from './utils/createContext.js'
import findMatchingOrigin from './utils/findMatchingOrigin.js'
import setSecurityHeaders from './utils/securityHeaders.js'

if (config.dbUrl == null) {
  throw new Error('MongoDB connection URI missing in environment')
}

connect(config.dbUrl)

const apolloServer = createApolloServer()
await apolloServer.start()

const buildCorsHeaders = (allowedOrigin) => {
  if (allowedOrigin == null) return {}

  return {
    'access-control-allow-origin': allowedOrigin,
    'access-control-allow-methods': 'GET, POST, PATCH, OPTIONS',
    'access-control-allow-headers': 'Content-Type, Authorization, Time-Zone',
    'access-control-allow-credentials': 'true',
    'access-control-max-age': '3600',
  }
}

const buildResponseHeaders = (corsHeaders) => {
  const responseHeaders = new Headers(corsHeaders)
  setSecurityHeaders(responseHeaders)
  return responseHeaders
}

/**
 * Handles incoming requests using the Web API (Request/Response).
 * Manages CORS, delegates GraphQL operations to Apollo Server, and returns a Web Response.
 * Used by both Vercel and Netlify serverless entry points.
 *
 * @param {Request} request - The incoming web request.
 * @returns {Promise<Response>} - The web response to send back.
 */
export const handler = async (request) => {
  const requestOrigin = request.headers.get('origin')
  const allowedOrigin = await findMatchingOrigin(requestOrigin, config.allowOrigin, config.autoOrigin)
  const corsHeaders = buildCorsHeaders(allowedOrigin)

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: buildResponseHeaders(corsHeaders),
    })
  }

  const url = new URL(request.url)

  const headers = new HeaderMap()
  for (const [key, value] of request.headers) {
    headers.set(key, value)
  }

  const body = request.method === 'POST' ? await request.json() : undefined

  const result = await apolloServer.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: request.method,
      headers,
      body,
      search: url.search ?? '',
    },
    context: () => createServerlessContext(request),
  })

  const responseHeaders = buildResponseHeaders(corsHeaders)

  for (const [key, value] of result.headers) {
    responseHeaders.set(key, value)
  }

  for (const [key, value] of Object.entries(corsHeaders)) {
    responseHeaders.set(key, value)
  }

  if (result.body.kind === 'complete') {
    return new Response(result.body.string, {
      status: result.status ?? 200,
      headers: responseHeaders,
    })
  }

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.body.asyncIterator) {
        controller.enqueue(new TextEncoder().encode(chunk))
      }

      controller.close()
    },
  })

  return new Response(stream, {
    status: result.status ?? 200,
    headers: responseHeaders,
  })
}
