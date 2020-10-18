import shortId from 'shortid'

// Prefix to ensure that the first character isn't a number
export default () => `_${ shortId.generate() }`