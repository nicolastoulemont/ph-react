import { useLocalStorage } from 'react-use'

import { LocalStore } from './types'

export const STORE_NAME = 'storage'

export function useStore() {
  return useLocalStorage<LocalStore>(STORE_NAME, [])
}
