import { ChangeEvent } from 'react'
import start from '../../startButton.svg'

export default function AddButton({
  onImageAdd,
}: {
  onImageAdd: (event: ChangeEvent<HTMLInputElement>) => void
}): JSX.Element {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <label
        className='flex mb-0 cursor-pointer pointer-events-auto h-full w-full items-center justify-center'
        htmlFor='customFileAdd'
      >
        <input
          type='file'
          onChange={onImageAdd}
          className='opacity-0 absolute z-[-1]'
          id='customFileAdd'
          accept='.png, .jpg, .jpeg'
        />
        <img src={start} alt='plus sign' className='w-[120px]' />
      </label>
    </div>
  )
}
