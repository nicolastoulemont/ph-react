import { ChangeEvent, useState } from 'react'
import './UploadForm.css'
import AddButton from '../AddButton'
import loadImage, { LoadImageResult } from 'blueimp-load-image'
import { API_KEY, API_URL, BASE64_IMAGE_HEADER } from '../../../Constants'
import { useStore } from '../../../lib'
import { Folder } from '../../../lib/storage/types'

export function UploadForm() {
  const [result, setResult] = useState<string | null>(null)
  const [value, setValue] = useStore()

  let uploadImageToServer = (file: File) => {
    loadImage(file, {
      maxWidth: 400,
      maxHeight: 400,
      canvas: true,
    })
      .then(async (imageData: LoadImageResult) => {
        let image = imageData.image as HTMLCanvasElement

        let imageBase64 = image.toDataURL('image/png')
        let imageBase64Data = imageBase64.replace(BASE64_IMAGE_HEADER, '')
        let data = {
          image_file_b64: imageBase64Data,
        }
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': API_KEY,
          },
          body: JSON.stringify(data),
        })

        if (response.status >= 400 && response.status < 600) {
          throw new Error('Bad response from server')
        }

        const result = await response.json()
        const base64Result = BASE64_IMAGE_HEADER + result.result_b64
        setResult(base64Result)
        const newFolder: Folder = { name: 'Untitled Folder', images: [{ type: 'base64', data: base64Result }] }
        if (value) {
          setValue([...value, newFolder])
        } else {
          setValue([newFolder])
        }

        // await setFileToLocalStorage(base64Result)
      })

      .catch((error) => {
        console.error(error)
      })
  }

  let onImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadImageToServer(e.target.files[0])
    } else {
      console.error('No file was picked')
    }
  }

  return (
    <div className='uploaded-form'>
      {!result && <AddButton onImageAdd={onImageAdd} />}
      {result && <img src={result} width={300} alt='result from the API' />}
    </div>
  )
}
