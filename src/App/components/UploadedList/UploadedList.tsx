import './UploadedList.css'
import { useStore } from '../../../lib'

export function UploadedList() {
  const [value] = useStore()
  console.log(value)
  return (
    <div className='uploaded-list'>
      <h2>List of uploaded images</h2>
      {value && value?.length > 0 && (
        <>
          {value.map((folder) => (
            <div key={folder.name}>
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
    </div>
  )
}
