export default (fn, ms) => setTimeout(() => {
	requestAnimationFrame(fn)
}, ms)