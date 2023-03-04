import { loaderInitial, pulseLoaderInitial } from './initialState'
import {
  LOADER_END,
  LOADER_START,
  PULSELOADER_END,
  PULSELOADER_START,
} from './loaderTypes'

// loader reducer
export const loaderReducer = (state = loaderInitial, { type, payload }) => {
  switch (type) {
    case LOADER_START:
      return 100

    case LOADER_END:
      return 0

    default:
      return state
  }
}
export const pulseLoader = (state = pulseLoaderInitial, { type, payload }) => {
  switch (type) {
    case PULSELOADER_START:
      return true

    case PULSELOADER_END:
      return false

    default:
      return state
  }
}
