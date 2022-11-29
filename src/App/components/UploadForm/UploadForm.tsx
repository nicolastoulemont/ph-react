import { ChangeEvent, useState } from 'react'
import AddButton from '../AddButton'
import { useInMemoryStore } from '../../../lib'
import { uploadImage } from './UploadForm.http'

export function UploadForm() {
  const [status, setStatus] = useState<'success' | 'error' | 'idle'>('idle')

  const { addImage } = useInMemoryStore()

  async function onImageAdd(e: ChangeEvent<HTMLInputElement>) {
    if (status !== 'idle') {
      setStatus('idle')
    }
    if (e.target.files && e.target.files[0]) {
      try {
        const result = await uploadImage(e.target.files[0])
        addImage(result)
        setStatus('success')
      } catch (error) {
        // Send log to observalibility tool (datadog, sentry)
        console.error(error)
        setStatus('error')
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
