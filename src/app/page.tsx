'use client'
import { useState, useEffect } from 'react'
import { RandomFox } from '@/components/RandomFox'

const randomNumber = (): number => {
  return Math.floor(Math.random() * 123) + 1
}

const generateId = (): string => {
  return Math.random().toString().substring(2, 12)
}

type ImageItem = {id: string, url: string}

export default function Home (): React.ReactNode {
  const [images, setImages] = useState<Array<ImageItem>>([])

  useEffect(() => {
    const images = []
    for (let i = 0; i < 4; i++) {
      const id = generateId()
      const url = `https://randomfox.ca/images/${randomNumber()}.jpg`
      images.push({ id, url })
    }
    setImages(images)
  }, [])

  return (
    <main>
      <div className='min-h-screen grid place-content-center text-center'>
        {images.map(({ id, url }) => (
          <div key={id} className='p-4'>
            <RandomFox  image={url} />
          </div>
        ))}
      </div>
    </main>
  )
}
