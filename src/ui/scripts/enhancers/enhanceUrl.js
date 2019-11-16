export default (url) => {

	if (url.hostname === 't.co') {
		// Link to Twitter search. This more helpful than linking to a URL that redirects to your own page.
		// Should not contain search parameters as the Twitter search only finds URLs without them.
		return new URL(`https://twitter.com/search?q=${ encodeURIComponent(url.origin + url.pathname) }`)
	}

	return url

}