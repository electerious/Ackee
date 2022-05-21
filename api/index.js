'use strict'

const handler = require('../src/serverless').handler

/**
 * A serverless function handler for the '/api' route, for use with Vercel.
 * This handler follows the AWS Lambda API; Vercel deployments are opted-in
 * using the "NODEJS_AWS_HANDLER_NAME" environment variable defined in vercel.json.
 *
 * See:
 *  - https://vercel.com/docs/serverless-functions/supported-languages#node.js
 *  - https://vercel.com/docs/runtimes#advanced-usage/advanced-node-js-usage/aws-lambda-api
 */
exports.handler = async (...args) => {
	const response = await handler(...args)
	return convertMultiValueHeaders(response)
}

/*
 * At the time of writing the Vercel polyfill for the AWS Lambda API doesn't support .multiValueHeaders.
 * This stops us from attaching CORS headers to requests.
 * Since all the headers we commonly attach have a single value, we can map them to .headers instead.
 */
const convertMultiValueHeaders = (response) => {
	if (response?.multiValueHeaders == null) return response

	response.headers = response.headers ?? {}

	for (const [ key, value ] of Object.entries(response.multiValueHeaders)) {
		if (value.length === 1) {
			response.headers[key] = value[0]
		} else {
			console.warn(`multiValueHeaders is currently unsupported on Vercel. Header ${ key } will be ignored.`)
		}
	}

	return response
}