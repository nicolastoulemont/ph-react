import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'

import { useLocalStorage } from 'react-use'

import { Folder, LocalStore } from './types'

export const STORE_NAME = 'storage'

export function useDiskStore() {
  return useLocalStorage<LocalStore>(STORE_NAME, [])
}

type State = LocalStore

type Actions =
  | { type: 'SYNC_STORES'; payload: Folder[] }
  | { type: 'ADD_IMAGE'; payload: Folder }
  | { type: 'MOVE_IMAGE'; payload: Folder[] }
  | { type: 'CREATE_FOLDER'; payload: Folder }
  | { type: 'RENAME_FOLDER'; payload: { originalName: string; newName: string } }

interface InMemoryContext {
  state: LocalStore
  dispatch: React.Dispatch<Actions>
  addImage: (base64: string) => void
  createFolder: () => void
  moveItem: (targetName: string, imgInfos: { folderIndex: number; imgIndex: number }) => void
}

export const InMemoryStoreContext = createContext<InMemoryContext | null>(null)

export const useInMemoryStore = () => {
  const context = useContext(InMemoryStoreContext)
  if (!context) {
    throw new Error('useInMemoryStore must be used within a InMemoryStoreProvider')
  }
  return context
}

function reducer(state: State, action: Actions) {
  const { type } = action
  switch (type) {
    case 'ADD_IMAGE': {
      return [...state, action.payload]
    }
    case 'MOVE_IMAGE': {
      return action.payload
    }
    case 'CREATE_FOLDER': {
      return [...state, action.payload]
    }
    case 'SYNC_STORES': {
      return action.payload
    }
    case 'RENAME_FOLDER': {
      /**
       * TODO: To implement
       */
      return state
    }
    default:
      throw new Error('Action not implemented')
  }
}

export function InMemoryStoreProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useDiskStore()
  const [state, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    if (value) {
      dispatch({ type: 'SYNC_STORES', payload: value })
    }
  }, [])

  function addImage(base64: string) {
    const newFolder: Folder = {
      name: state.length === 0 ? 'Untitle Folder' : `Untitle Folder (${state.length})`,
      images: [{ type: 'base64', data: base64 }],
    }
    dispatch({ type: 'ADD_IMAGE', payload: newFolder })
    if (value) {
      setValue([...value, newFolder])
    } else {
      setValue([newFolder])
    }
  }

  function createFolder() {
    const newFolder = { name: state.length === 0 ? 'Untitle Folder' : `Untitle Folder (${state.length})`, images: [] }
    dispatch({ type: 'CREATE_FOLDER', payload: newFolder })
    if (value) {
      setValue([...value, newFolder])
    } else {
      setValue([newFolder])
    }
  }

  function moveItem(targetName: string, imgInfos: { folderIndex: number; imgIndex: number }) {
    const imgFolder = state.find((_, index) => index === imgInfos.folderIndex)
    if (!imgFolder) return
    const img = imgFolder.images.find((_, index) => index === imgInfos.imgIndex)
    if (!img) return

    const newState = state.reduce((acc, folder, index) => {
      if (targetName === folder.name) {
        folder.images.push(img)
        acc.push(folder)
      } else if (imgInfos.folderIndex === index) {
        acc.push({ name: folder.name, images: folder.images.filter((_, index) => index !== imgInfos.imgIndex) })
      }

      return acc
    }, [] as Folder[])

    dispatch({ type: 'MOVE_IMAGE', payload: newState })
    setValue(newState)
  }

  return (
    <InMemoryStoreContext.Provider value={{ state, dispatch, addImage, createFolder, moveItem }}>
      {children}
    </InMemoryStoreContext.Provider>
  )
}
