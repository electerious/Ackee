'use strict'

// Custom plugin to replace apollo-server-plugin-http-headers
// This plugin allows setting cookies and headers from within GraphQL resolvers
// by adding them to context.setCookies and context.setHeaders arrays
module.exports = {
	requestDidStart() {
		return {
			willSendResponse({ contextValue, response }) {
				if (contextValue.setCookies != null) {
					for (const cookie of contextValue.setCookies) {
						if (response.http != null) {
							response.http.headers.append('Set-Cookie', cookie)
						}
					}
				}

				if (contextValue.setHeaders != null) {
					for (const header of contextValue.setHeaders) {
						if (response.http != null && header.key != null && header.value != null) {
							response.http.headers.set(header.key, header.value)
						}
					}
				}
			},
		}
	},
}