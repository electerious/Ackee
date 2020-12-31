import isUrl from 'is-url'

export default (referrers = []) => {

	return referrers.map((referrer) => ({
		url: isUrl(referrer.id) === true ? new URL(referrer.id) : null,
		text: isUrl(referrer.id) === true ? new URL(referrer.id).href : referrer.id,
		count: referrer.count,
		date: referrer.created == null ? null : new Date(referrer.created)
	}))

}