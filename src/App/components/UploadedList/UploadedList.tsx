import './UploadedList.css'
import { useInMemoryStore } from '../../../lib'

export function UploadedList() {
  const { state, createFolder } = useInMemoryStore()
  console.log(state)
  return (
    <div className='uploaded-list'>
      <h2>List of uploaded images</h2>
      {state && state?.length > 0 && (
        <>
          {state.map((folder, index) => (
            <div key={`${folder.name}-${index}`}>
              <h3>{folder.name}</h3>
              <ul>
                {folder.images.map((image, index) => (
                  <li key={index}>
                    <img src={image.data} width={50} height='auto' />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      <button onClick={createFolder}>Add a new folder</button>
    </div>
  )
}
