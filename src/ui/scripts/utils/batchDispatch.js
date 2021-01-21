import { batch } from 'react-redux'

export default (dispatch, actions) => {
	batch(() => {
		actions.forEach((action) => dispatch(action))
	})
}