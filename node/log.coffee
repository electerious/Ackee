# Dependencies
colors = require 'colors'

norm = (text) ->

	filler = '         ' #9
	length = filler.length - text.length

	if length > 0

		text += filler.substr text.length
		return text

	return text

log = module.exports =

	status: (source, text) ->

		source = norm source
		console.log 'ackee    '.white + "#{ source }".green + "#{ text }"

	warning: (source, text, error) ->

		source = norm source
		console.warn 'ackee    '.white + "#{ source }".yellow + "#{ text }"
		console.warn error if error?

	error: (source, text, error) ->

		source = norm source
		console.error 'ackee    '.white + "#{ source }".red + "#{ text }"
		console.error error