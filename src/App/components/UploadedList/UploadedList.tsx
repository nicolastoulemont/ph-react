import { useInMemoryStore } from '../../../lib'
import { FolderContainer } from './components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export function UploadedList() {
  const { state, createFolder } = useInMemoryStore()

  return (
    <div className='block p-9 border-r-2 border-gray-100 w-1/3'>
      <button className=' mb-6 px-3 py-2 bg-blue-500 rounded-lg text-white font-medium text-sm' onClick={createFolder}>
        New folder
      </button>
      {state && state?.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <h2 className='text-xl font-semibold'>Uploaded images</h2>
          {state.map((folder) => (
            <FolderContainer folder={folder} key={folder.id} />
          ))}
        </DndProvider>
      )}
    </div>
  )
}
