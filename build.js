import { build, index, scripts, styles, tracker } from './src/ui/index.js'
import config from './src/utils/config.js'
import * as customTracker from './src/utils/custom-tracker.js'

// Build files that are identical on every installation
if (config.isPreBuildMode === true) {
  build('dist/index.css', styles)
  build('dist/index.js', scripts)
  build('dist/tracker.js', tracker)
}

// Build files that depend on environment variables
build(`dist/index.html`, index)
if (customTracker.exists === true) build(`dist/${customTracker.path}`, tracker)
