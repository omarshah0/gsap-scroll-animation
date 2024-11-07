import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollGallery = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.card')

      cards.forEach((card, i) => {
        gsap.set(card, {
          position: 'absolute',
          top: 0,
          opacity: i === 0 ? 1 : 0,
        })

        // Set initial background colors
        gsap.set(card.querySelector('.content-section'), {
          backgroundColor: getColorForIndex(i),
        })
      })

      gsap.to('.card', {
        opacity: 1,
        yPercent: 0,
        stagger: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * (cards.length - 1)}`,
          scrub: 1,
          pin: true,
          snap: 1 / (cards.length - 1),
        },
      })

      // Animate background colors
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card.querySelector('.content-section'), {
            backgroundColor: getColorForIndex(i + 1),
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${window.innerHeight * i} top`,
              end: `top+=${window.innerHeight * (i + 1)} top`,
              scrub: 1,
            },
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const getColorForIndex = index => {
    const colors = [
      '#f9d5e5', // Soft pink
      '#eeac99', // Coral
      '#e06377', // Rose
      '#c83349', // Deep red
    ]
    return colors[index] || colors[0]
  }

  return (
    <div ref={containerRef} className='relative h-[100dvh]'>
      {/* Card 1 */}
      <div className='card h-[100dvh] w-screen flex flex-col md:flex-row absolute top-0 left-0'>
        <div className='content-section w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center transition-colors duration-500'>
          <h2 className='text-2xl md:text-4xl font-bold text-gray-800 px-4 text-center'>
            Beautiful Nature
          </h2>
        </div>
        <div className='w-full md:w-1/2 h-1/2 md:h-full'>
          <img
            src='https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'
            alt='Nature landscape'
            className='w-full h-full object-cover'
          />
        </div>
      </div>

      {/* Card 2 */}
      <div className='card h-[100dvh] w-screen flex flex-col md:flex-row absolute top-0 left-0'>
        <div className='content-section w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center transition-colors duration-500'>
          <h2 className='text-2xl md:text-4xl font-bold text-gray-800 px-4 text-center'>
            Urban Life
          </h2>
        </div>
        <div className='w-full md:w-1/2 h-1/2 md:h-full'>
          <img
            src='https://images.unsplash.com/photo-1449824913935-59a10b8d2000'
            alt='City view'
            className='w-full h-full object-cover'
          />
        </div>
      </div>

      {/* Card 3 */}
      <div className='card h-[100dvh] w-screen flex flex-col md:flex-row absolute top-0 left-0'>
        <div className='content-section w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center transition-colors duration-500'>
          <h2 className='text-2xl md:text-4xl font-bold text-gray-800 px-4 text-center'>
            Ocean Waves
          </h2>
        </div>
        <div className='w-full md:w-1/2 h-1/2 md:h-full'>
          <img
            src='https://images.unsplash.com/photo-1505118380757-91f5f5632de0'
            alt='Ocean view'
            className='w-full h-full object-cover'
          />
        </div>
      </div>

      {/* Card 4 */}
      <div className='card h-[100dvh] w-screen flex flex-col md:flex-row absolute top-0 left-0'>
        <div className='content-section w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center transition-colors duration-500'>
          <h2 className='text-2xl md:text-4xl font-bold text-white px-4 text-center'>
            Mountain Peaks
          </h2>
        </div>
        <div className='w-full md:w-1/2 h-1/2 md:h-full'>
          <img
            src='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
            alt='Mountain landscape'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default ScrollGallery
