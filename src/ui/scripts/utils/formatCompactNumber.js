/**
 * Format a number using compact notation with SI prefixes (K, M, B, T)
 * @param {number} num - The number to format
 * @param {number} maximumFractionDigits - Maximum number of fraction digits (default: 1)
 * @returns {string} The formatted number
 */
export default (num, maximumFractionDigits = 1) => {
	const formatter = new Intl.NumberFormat('en', {
		notation: 'compact',
		compactDisplay: 'short',
		maximumFractionDigits,
	})

	return formatter.format(num)
}