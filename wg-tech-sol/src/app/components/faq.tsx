import Image from 'next/image'
import React from 'react'
import FaqSection from './faqQuestions'
import Banner from './banner'
import { banner } from './bannerData'
import { FAQItem } from '@/app/home/types'

interface FAQProps {
    faqs?: FAQItem[];
}

function FAQ({ faqs }: FAQProps) {
    return (
        <>
            <Banner
                bgImage={banner[7].bgImage}
                heading={banner[7].heading}
                subheading={banner[7].subheading}
            />
            <FaqSection faqs={faqs} />
        </>
    )
}

export default FAQ