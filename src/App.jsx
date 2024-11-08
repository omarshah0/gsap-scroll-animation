import ScrollGallery from './components/ScrollGallery'
// import GsapLandingPage from './components/GsapLandingPage'

function App() {
  return (
    <div>
      <div className='h-[100dvh] w-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white text-5xl grid place-items-center font-bold'>
        GSAP EXAMPLE
      </div>
      <ScrollGallery />
      <div className='h-[100dvh] w-screen bg-gradient-to-br from-blue-400 to-blue-600 text-5xl grid place-items-center font-bold'>
        END
      </div>
    </div>
    // <div>
    //   <GsapLandingPage />
    // </div>
  )
}

export default App
