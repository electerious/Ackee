import KnownError from './KnownError.js'
import messages from './messages.js'

// Waits for a database write and turns a failed validation into a KnownError, so the
// client gets the reason and the log gets a warning instead of a stack trace.
export default async (write) => {
  try {
    return await write
  } catch (error) {
    if (error.name === 'ValidationError') throw new KnownError(messages(error.errors))

    throw error
  }
}
