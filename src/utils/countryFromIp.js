'use strict'

const geoip = require('geoip-country');
const { getClientIp } = require('request-ip')

module.exports = (req) => {
    const ip = getClientIp(req)
    const geo = geoip.lookup(ip)
    if(geo == null){
        return undefined
    }
    return geo.country
}