const { resolve } = require('path')
const { writeFile, readFile } = require('fs').promises
const sass = require('rosid-handler-sass')
const js = require('rosid-handler-js')

const html = require('./src/ui/index')
const isDemoMode = require('./src/utils/isDemoMode')
const isDevelopmentMode = require('./src/utils/isDevelopmentMode')

const index = async () => {

	const data = html()

	return data

}

const favicon = async () => {

	const filePath = resolve(__dirname, './src/ui/images/favicon.ico')
	const data = readFile(filePath)

	return data

}

const styles = async () => {

	const filePath = resolve(__dirname, './src/ui/styles/index.scss')
	const data = sass(filePath, { optimize: isDevelopmentMode === false })

	return data

}

const scripts = async () => {

	const filePath = resolve(__dirname, './src/ui/scripts/index.js')

	const babel = {
		presets: [
			[
				'@babel/preset-env', {
					targets: {
						browsers: [
							'last 2 Safari versions',
							'last 2 Chrome versions',
							'last 2 Opera versions',
							'last 2 Firefox versions'
						]
					}
				}
			]
		],
		babelrc: false
	}

	const data = js(filePath, {
		optimize: isDevelopmentMode === false,
		env: {
			ACKEE_TRACKER: process.env.ACKEE_TRACKER,
			ACKEE_DEMO: isDemoMode === true ? 'true' : 'false',
			NODE_ENV: isDevelopmentMode === true ? 'development' : 'production'
		},
		babel
	})

	return data

}

const tracker = async () => {

	const filePath = require.resolve('ackee-tracker')
	const data = readFile(filePath, 'utf8')

	return data

}

index().then((data) => {
	return writeFile('dist/index.html', data)
})

favicon().then((data) => {
	return writeFile('dist/favicon.ico', data)
})

styles().then((data) => {
	return writeFile('dist/index.css', data)
})

scripts().then((data) => {
	return writeFile('dist/index.js', data)
})

tracker().then((data) => {
	return writeFile('dist/tracker.js', data)
})