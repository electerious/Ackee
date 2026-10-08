import sanitizeFilename from 'sanitize-filename'

const name = process.env.ACKEE_TRACKER
export const exists = name != null && name !== ''
export const url = exists === true ? `/${encodeURIComponent(name)}.js` : undefined
export const path = exists === true ? `${sanitizeFilename(name)}.js` : undefined
