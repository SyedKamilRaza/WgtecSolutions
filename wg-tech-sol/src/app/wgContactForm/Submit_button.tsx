import React from 'react'

interface SubmitButtonProps {
  isSubmitting?: boolean;
}

function Submit_button({ isSubmitting = false }: SubmitButtonProps) {
  return (
     <button
            type="submit"
            disabled={isSubmitting}
            className={`relative block mx-auto w-full sm:w-auto
    overflow-hidden rounded-2xl border border-gray-500 bg-transparent
    text-xl sm:text-2xl text-white
    transition-colors duration-300
    hover:text-black hover:border-[#9eff00]
    focus:text-black focus:border-[#9eff00]
    active:text-black active:border-[#9eff00]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9eff00]
    focus-visible:ring-offset-2 focus-visible:ring-offset-black
    before:absolute before:inset-y-0 before:left-0 before:w-0
    before:bg-[#9eff00] before:content-[''] before:transition-all
    before:duration-300 before:ease-out
    hover:before:w-full
    focus:before:w-full
    active:before:w-full
    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className="relative z-10 px-8 sm:px-12 md:px-16 py-2">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </span>
          </button>
  )
}

export default Submit_button