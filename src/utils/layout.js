'use strict'

module.exports = (body, styles, scripts) => `
	<!doctype html>
	<html lang="en">
		<head>

			<title>Ackee</title>

			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">

			<!-- CSS -->
			${ styles.map((src) => `<link rel="stylesheet" href="${ src }">`).join('') }

			<!-- JS -->
			${ scripts.map((src) => `<script defer src="${ src }"></script>`).join('') }

		</head>
		<body>

			${ body }

		</body>
	</html>
`