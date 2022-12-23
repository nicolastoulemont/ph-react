import { Folder, Image } from '../../../../lib/storage/types'
import { useDrag } from 'react-dnd'

export function FolderImage({ folder, image }: { folder: Folder; image: Image }) {
  const [_, drag] = useDrag(
    () => ({
      type: image.id,
      item: image,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [image.id]
  )

  return (
    <li ref={drag} className='list-none'>
      <div className=' w-full block my-3 shadow-md p-3 rounded-lg overflow-hidden max-h-[250px]'>
        <img
          alt={`uploaded within folder ${folder.name}`}
          src={image.data}
          className='w-full object-center object-none'
        />
      </div>
    </li>
  )
}
