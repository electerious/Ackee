import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'

import config from '../utils/config.js'
import * as customTracker from '../utils/custom-tracker.js'
import layout from '../utils/layout.js'
import signale from '../utils/signale.js'

const __dirname = import.meta.dirname

export const index = () => {
  return layout('<div id="main"></div>', 'favicon.ico', ['index.css'], ['index.js'], {
    isDemoMode: config.isDemoMode,
    customTracker,
  })
}

export const styles = async () => {
  const { default: css } = await import('rosid-handler-css')
  const filePath = path.resolve(__dirname, './styles/index.css')

  return css(filePath, { optimize: config.isDevelopmentMode === false })
}

export const scripts = async () => {
  const { default: js } = await import('rosid-handler-js-next')
  const filePath = path.resolve(__dirname, './scripts/index.js')

  return js(filePath, {
    optimize: config.isDevelopmentMode === false,
    replace: {
      'process.env.NODE_ENV': JSON.stringify(config.isDevelopmentMode === true ? 'development' : 'production'),
    },
    babel: false,
  })
}

export const tracker = () => {
  const require = createRequire(import.meta.url)
  const filePath = require.resolve('ackee-tracker')

  return readFile(filePath, 'utf8')
}

export const build = async (path, fn) => {
  try {
    signale.await(`Building and writing '${path}'`)
    const data = await fn()
    await writeFile(path, data)
    signale.success(`Finished building '${path}'`)
  } catch (error) {
    signale.fatal(error)
    process.exit(1)
  }
}
