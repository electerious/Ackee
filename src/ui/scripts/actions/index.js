export * from './modals'
export * from './token'
export * from './route'
export * from './filter'
export * from './domains'
export * from './views'
export * from './pages'
export * from './referrers'
export * from './durations'
export * from './languages'
export * from './sizes'
export * from './systems'
export * from './devices'
export * from './browsers'

export const RESET_STATE = Symbol()

export const resetState = () => ({
	type: RESET_STATE
})