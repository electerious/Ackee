'use strict'

/**
 * A serverless function handler for the '/api' route, for use with Vercel.
 * This handler follows the AWS Lambda API; Vercel deployments are opted-in
 * using the "NODEJS_AWS_HANDLER_NAME" environment variable defined in vercel.json.
 *
 * See:
 *  - https://vercel.com/docs/serverless-functions/supported-languages#node.js
 *  - https://vercel.com/docs/runtimes#advanced-usage/advanced-node-js-usage/aws-lambda-api
 */
exports.handler = require('../src/serverless').handler