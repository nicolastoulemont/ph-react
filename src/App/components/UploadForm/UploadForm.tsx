import { ChangeEvent } from 'react'
import AddButton from '../AddButton'
import { useInMemoryStore } from '../../../lib'
import { uploadImage } from './UploadForm.http'
import { toast } from 'react-toastify'

export function UploadForm() {
  const { addImage } = useInMemoryStore()

  async function onImageAdd(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      try {
        const result = await uploadImage(e.target.files[0])
        addImage(result)
        toast.success('File added to your folders')
      } catch (error) {
        // Send log to observalibility tool (datadog, sentry)
        console.error(error)
        toast.error('Something went wrong')
      }
    } else {
      console.error('No file was picked')
    }
  }

  return (
    <div className='flex flex-grow'>
      <AddButton onImageAdd={onImageAdd} />
    </div>
  )
}
