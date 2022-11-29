import './UploadedList.css'
import { useInMemoryStore } from '../../../lib'

export function UploadedList() {
  const { state, createFolder, moveItem } = useInMemoryStore()

  return (
    <div className='block p-9 border-r-2 border-gray-100 w-1/4'>
      <button className=' mb-6 px-3 py-2 bg-blue-500 rounded-lg text-white font-medium text-sm' onClick={createFolder}>
        New folder
      </button>
      {state && state?.length > 0 && (
        <>
          <h2 className='text-xl font-semibold'>Uploaded images</h2>
          {state.map((folder, index) => (
            <div key={folder.name} className='my-3 border-2 border-gray-200 rounded-md p-3'>
              <h3 className='text-sm font-medium'>{folder.name}</h3>
              {folder.images.length === 0 ? (
                <p className='text-xs italic'>No images</p>
              ) : (
                <ul className='pl-0 w-full'>
                  {folder.images.map((image, imgIndex) => (
                    <li key={`${folder.name}-${imgIndex}`} className='list-none w-full'>
                      <div className='block w-full'>
                        <img alt={`uploaded within folder ${folder.name}`} src={image.data} className='w-full h-auto' />
                        <div className='flex flex-col mt-2'>
                          <label>Move image</label>
                          <select
                            onChange={(event) => {
                              if (event.target.value !== '') {
                                moveItem(event.target.value, { folderIndex: index, imgIndex })
                              }
                            }}
                          >
                            <option value=''>--Please choose an option--</option>
                            {state
                              .filter((_, idx) => idx !== index)
                              .map((folder, folderIndex) => (
                                <option key={`option-${folderIndex}`} value={folder.name}>
                                  {folder.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
