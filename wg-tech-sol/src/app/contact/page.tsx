import React, { Suspense } from 'react'
import ContactForm from '../components/ContactForm'

function Page() {
  return (
    <>
      <Suspense fallback={<div className="min-h-auto mt-26 sm:mt-16 md:mt-20 flex items-center justify-center px-4">Loading...</div>}>
        <ContactForm />
      </Suspense>
    </>
  )
}

export default Page