import ScrollGallery from './components/ScrollGallery'

function App() {
  return (
    <div>
      <div className='h-[100dvh] w-screen bg-red-400 text-5xl grid place-items-center font-bold'>
        GSAP EXAMPLE
      </div>
      <ScrollGallery />
      <div className='h-[100dvh] w-screen bg-blue-400 text-5xl grid place-items-center font-bold'>
        END
      </div>
    </div>
  )
}

export default App
