export default (referrers) => {

	// Extract and enhance the data from the API
	const parsedReferrers = referrers.map((referrer) => ({
		url: new URL(referrer.data.id),
		count: referrer.data.count
	}))

	return parsedReferrers

}