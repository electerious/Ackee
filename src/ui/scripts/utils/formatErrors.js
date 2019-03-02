import formatError from './formatError'

export default (errors) => errors.map(formatError).join('\n\n')