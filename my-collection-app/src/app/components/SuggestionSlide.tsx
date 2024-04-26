'use client'
import { useEffect, useState } from 'react'

// Server Actions
import getSuggestionsList from '@/app/actions/getSuggestionList'

// Models
import { Suggestion } from '@/app/models/suggestionModel'

const SuggestionSlide = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? suggestions.length - 1 : currentSlide - 1)
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide === suggestions.length - 1 ? 0 : currentSlide + 1)
  }

  useEffect(() => {
    getSuggestionsList().then((suggestions: Suggestion[]) => {
      setSuggestions(suggestions)
    })
  }, [])

  return (
    <div className='flex flex-col w-full h-full gap-2 group p-2'>
      <h1 className='text-2xl p-3'>Suggestions:</h1>
      <div className='relative w-full h-full duration-500 bg-center bg-cover bg-neutral rounded-box' style={{ backgroundImage: `url(${suggestions[currentSlide]?.image})` }}>
        <a className='hidden group-hover:block absolute top-[48%] -translate-x-0 left-5 rounded-full cursor-pointer' onClick={prevSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </a>
        <a className='hidden group-hover:block absolute top-[48%] -translate-x-0 right-5 rounded-full cursor-pointer' onClick={nextSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </a>
        <div className='hidden absolute bottom-0 w-full h-fit group-hover:block bg-black/50 rounded-b-box'>
          <h1 className='text-lg text-white p-2'><a href={suggestions[currentSlide]?.url} target='_blank'>{suggestions[currentSlide]?.title}</a></h1>
        </div>
      </div>
    </div>
  )
}

export default SuggestionSlide