import { useCallback, useEffect } from 'react'

const hotkeyManager = (() => {
  const handlers = new Set()

  const handleKeyDown = (event) => {
    const pressedKey = event.key.toLowerCase()
    const targetTag = event.target.tagName

    for (const handler of handlers) {
      handler(event, pressedKey, targetTag)
    }
  }

  globalThis.addEventListener('keydown', handleKeyDown)

  return {
    register: (handler) => {
      handlers.add(handler)
    },
    unregister: (handler) => {
      handlers.delete(handler)
    },
  }
})()

/**
 * Custom hook for handling keyboard shortcuts
 *
 * @param {string} keys - Single key or comma-separated keys (e.g., 'escape', 'a,b,c')
 * @param {Function} callback - Function to call when key is pressed. Receives (event, { key })
 * @param {object} options - Configuration options
 * @param {boolean} options.enabled - Whether the hotkey is enabled (default: true)
 * @param {boolean} options.enabledOnInput - Whether to allow hotkey on form inputs (default: false)
 * @param {Array} deps - Dependencies array for the callback
 */
const useHotkey = (keys, callback, options = {}, deps = []) => {
  const { enabled = true, enabledOnInput = false } = options

  const memoizedCallback = useCallback(callback, deps)

  useEffect(() => {
    const keySet = new Set(keys.split(',').map((key) => key.trim().toLowerCase()))

    const handler = (event, pressedKey, targetTag) => {
      // Check if hotkey is enabled
      if (!enabled) return

      // Check if the hotkey should be blocked on form inputs
      const isFormElement = ['INPUT', 'SELECT', 'TEXTAREA'].includes(targetTag)
      if (isFormElement && !enabledOnInput) return

      // Check if the pressed key matches any of the configured keys
      if (keySet.has(pressedKey)) {
        event.preventDefault()
        memoizedCallback(event, { key: pressedKey })
      }
    }

    hotkeyManager.register(handler)

    return () => {
      hotkeyManager.unregister(handler)
    }
  }, [keys, enabled, enabledOnInput, memoizedCallback])
}

export default useHotkey
