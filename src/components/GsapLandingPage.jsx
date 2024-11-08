import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const GsapLandingPage = () => {
  const mainRef = useRef(null)
  const heroTextRef = useRef(null)
  const servicesRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hide all elements
      gsap.set(
        ['.hero-word-left', '.hero-word-right', '.hero-subtitle', '.hero-cta'],
        {
          opacity: 0,
        }
      )
      gsap.set('.service-card', { y: 100, opacity: 0 })
      gsap.set('.stat-number', { innerText: 0 })

      // Hero section animations
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroTextRef.current,
          start: 'top 80%', // Starts when top of section hits 80% from top of viewport
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      })

      heroTl
        .from('.hero-word-left', {
          x: '-100vw',
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
        })
        .from(
          '.hero-word-right',
          {
            x: '100vw',
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
          },
          '<'
        )
        .to(['.hero-word-left', '.hero-word-right'], {
          x: 0,
          opacity: 1,
          duration: 1,
        })
        .from('.hero-subtitle', {
          y: 50,
          opacity: 0,
          duration: 0.8,
        })
        .from('.hero-cta', {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
        })

      // Services section animations
      ScrollTrigger.batch('.service-card', {
        start: 'top 85%',
        onEnter: elements => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
          })
        },
        onLeave: elements => {
          gsap.to(elements, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
          })
        },
        onEnterBack: elements => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: -0.2,
          })
        },
        onLeaveBack: elements => {
          gsap.to(elements, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: -0.2,
          })
        },
      })

      // Stats counter animation
      const stats = gsap.utils.toArray('.stat-number')
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'))
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(stat, {
              innerText: target,
              duration: 2,
              snap: { innerText: 1 },
              ease: 'power1.inOut',
            })
          },
          onLeaveBack: () => {
            gsap.to(stat, {
              innerText: 0,
              duration: 1,
              snap: { innerText: 1 },
            })
          },
        })
      })

      // Floating animation for decorative elements
      gsap.to('.floating-element', {
        y: '20px',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef} className='overflow-hidden'>
      {/* Hero Section */}
      <section className='min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center relative'>
        <div className='floating-element absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl' />
        <div className='floating-element absolute bottom-20 right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-xl' />

        <div
          className='container mx-auto px-4 py-20 text-white'
          ref={heroTextRef}
        >
          <h1 className='text-5xl md:text-7xl font-bold mb-6 flex justify-center items-center gap-4'>
            <span className='hero-word-left opacity-0'>Innovate</span>
            <span className='hero-word-right opacity-0'>Earn</span>
          </h1>
          <p className='hero-subtitle text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-center opacity-0'>
            We craft innovative digital solutions that help brands thrive in the
            modern marketplace
          </p>
          <div className='text-center'>
            <button className='hero-cta bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform opacity-0'>
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-16'>Our Services</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='service-card bg-white p-8 rounded-xl shadow-lg'>
              <div className='text-purple-600 text-4xl mb-4'>🎯</div>
              <h3 className='text-2xl font-bold mb-4'>Digital Strategy</h3>
              <p className='text-gray-600'>
                Data-driven strategies that align with your business goals and
                target audience
              </p>
            </div>
            <div className='service-card bg-white p-8 rounded-xl shadow-lg'>
              <div className='text-purple-600 text-4xl mb-4'>💻</div>
              <h3 className='text-2xl font-bold mb-4'>Web Development</h3>
              <p className='text-gray-600'>
                Custom websites and applications built with cutting-edge
                technologies
              </p>
            </div>
            <div className='service-card bg-white p-8 rounded-xl shadow-lg'>
              <div className='text-purple-600 text-4xl mb-4'>📱</div>
              <h3 className='text-2xl font-bold mb-4'>Social Media</h3>
              <p className='text-gray-600'>
                Engaging social media campaigns that build brand awareness and
                drive engagement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className='py-20 bg-purple-900 text-white'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div>
              <div
                className='stat-number text-5xl font-bold mb-2'
                data-target='150'
              >
                0
              </div>
              <p className='text-xl'>Happy Clients</p>
            </div>
            <div>
              <div
                className='stat-number text-5xl font-bold mb-2'
                data-target='500'
              >
                0
              </div>
              <p className='text-xl'>Projects Completed</p>
            </div>
            <div>
              <div
                className='stat-number text-5xl font-bold mb-2'
                data-target='98'
              >
                0
              </div>
              <p className='text-xl'>Success Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GsapLandingPage
