'use client'
import { useState } from 'react'
import type { MouseEventHandler } from 'react'
import { LazyImage } from '@/components/RandomFox'
import { random } from 'lodash'

// const randomNumber = (): number => {
//   return Math.floor(Math.random() * 123) + 1
// }

const randomNumber = (): number => {
  return random(1, 123)
}

const generateId = (): string => {
  return Math.random().toString().substring(2, 12)
}

export default function Home (): React.ReactNode {
  const [images, setImages] = useState<IImageItem[]>([])

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event): void => {
    const newImageItem: IImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${randomNumber()}.jpg`
    }
    setImages([...images, newImageItem])
  }

  return (
    <main>
      <h1 className='text-center text-2xl p-2'>Random Foxs</h1>
      <button className='block my-0 mx-auto bg-orange-700 rounded text-white p-2' onClick={addNewFox}>Add a new fox</button>
      <div className='min-h-screen grid place-content-center text-center'>
        {images.map(({ id, url }, index) => (
          <div key={id} className='p-4'>
            <LazyImage
              src={url}
              width={320}
              height='auto'
              className='rounded-lg shadow bg-gray-400'
              onLazyLoad={(img) => console.log(`Image #${index + 1} cargada. Nodo:`, img)}
              onClick={() => console.log('Clicking')}
            />
          </div>
        ))}
      </div>
    </main>
  )
}
