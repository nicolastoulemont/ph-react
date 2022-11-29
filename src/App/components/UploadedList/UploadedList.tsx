import './UploadedList.css'
import { useInMemoryStore } from '../../../lib'

export function UploadedList() {
  const { state, createFolder, moveItem } = useInMemoryStore()

  return (
    <div className='uploaded-list'>
      <h2>List of uploaded images</h2>
      {state && state?.length > 0 && (
        <>
          {state.map((folder, index) => (
            <div key={folder.name}>
              <h3>{folder.name}</h3>
              <ul style={{ paddingLeft: 0 }}>
                {folder.images.map((image, imgIndex) => (
                  <li key={`${folder.name}-${imgIndex}`} style={{ listStyle: 'none' }}>
                    <div style={{ display: 'block', width: '100%' }}>
                      <img alt={`uploaded within folder ${folder.name}`} src={image.data} width='150px' height='auto' />
                      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
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
            </div>
          ))}
        </>
      )}

      <button onClick={createFolder}>Add a new folder</button>
    </div>
  )
}
