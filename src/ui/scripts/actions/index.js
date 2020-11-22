export * from './modals'
export * from './token'
export * from './permanentTokens'
export * from './route'
export * from './filter'
export * from './domains'
export * from './events'
export * from './overview'
export * from './referrers'
export * from './durations'
export * from './sizes'
export * from './systems'
export * from './browsers'
export * from './widgets'

export const RESET_STATE = Symbol()

export const resetState = () => ({
	type: RESET_STATE
})