import { startTransition, useCallback, useReducer } from 'react'
import shortId from '../utils/short-id.js'

const ADD_MODAL = Symbol()
const REMOVE_MODAL = Symbol()
const RESET_MODALS = Symbol()

const initialState = {}

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_MODAL: {
      return {
        ...state,
        [action.modalId]: {
          id: action.modalId,
          type: action.payload.type,
          props: action.payload.props,
        },
      }
    }
    case REMOVE_MODAL: {
      const clone = { ...state }
      delete clone[action.modalId]
      return clone
    }
    case RESET_MODALS: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default () => {
  const [modals, dispatch] = useReducer(reducer, initialState)

  const addModal = useCallback(
    (type, props) =>
      startTransition(() =>
        dispatch({
          type: ADD_MODAL,
          modalId: shortId(),
          payload: {
            type,
            props,
          },
        }),
      ),
    [dispatch],
  )

  const removeModal = useCallback(
    (modalId) =>
      startTransition(() =>
        dispatch({
          type: REMOVE_MODAL,
          modalId,
        }),
      ),
    [dispatch],
  )

  const resetModals = useCallback(
    () =>
      dispatch({
        type: RESET_MODALS,
      }),
    [dispatch],
  )

  return {
    modals,
    addModal,
    removeModal,
    resetModals,
  }
}
