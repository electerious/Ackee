'use strict'

// Returns a random integer between min (inclusive) and max (inclusive)
module.exports = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min