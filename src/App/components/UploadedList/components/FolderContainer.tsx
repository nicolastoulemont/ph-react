import { Folder, Image } from '../../../../lib/storage/types'
import { useDrop } from 'react-dnd'

import { FolderImage } from './FolderImage'
import { useInMemoryStore } from '../../../../lib'

export function FolderContainer({ folder }: { folder: Folder }) {
  const { state, moveImageToDifferentFolder } = useInMemoryStore()
  const imagesIds = state.reduce((acc, folder) => {
    const folderImageIds = folder.images.map((img) => img.id)
    acc.push(...folderImageIds)
    return acc
  }, [] as string[])

  const [_, drop] = useDrop({
    accept: imagesIds,
    drop: (item: Image) => moveImageToDifferentFolder(item, folder.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  return (
    <div
      ref={drop}
      className='flex flex-col items-center justify-between my-3 border-2 border-gray-200 rounded-md p-3 min-h-[200px]'
    >
      <h3 className='text-sm font-medium text-left w-full'>{folder.name}</h3>
      {folder.images.length > 0 ? (
        <ul className='pl-0 w-full'>
          {folder.images.map((image, imgIndex) => (
            <FolderImage key={`${folder.name}-${imgIndex}`} folder={folder} image={image} />
          ))}
        </ul>
      ) : (
        <div className='flex items-center justify-center flex-grow w-full h-full'>
          <p className='text-sm italic'>Drop some image here</p>
        </div>
      )}
    </div>
  )
}
