'use strict'

module.exports = (req) => req.cookies && req.cookies.ackee_login === '1'