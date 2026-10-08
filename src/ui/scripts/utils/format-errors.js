import formatError from './format-error.js'

export default (errors) => errors.map(formatError).join('\n\n')
