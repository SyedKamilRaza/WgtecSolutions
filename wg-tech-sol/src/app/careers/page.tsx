import React from 'react'
import Banner from '../components/banner'
import { banner } from '../components/bannerData'
import Into from './into';
import Current_Openings from './current_Openings';
import SquareUpHero from '../about/squareUpHero';

const sections = [
    {
        heading: "Welcome to WGTECSOL (Pvt.) Ltd., where talent meets opportunity!",
        description: "At WGTECSOL (Pvt.) Ltd., we believe that the success of our agency lies in the talent, passion, and dedication of our team members. We are a digital product agency that thrives on innovation, creativity, and collaboration. If you're ready to make a difference and contribute to cutting-edge projects, we invite you to explore career opportunities with us.",
        boxText: "Why Work at WGTECSOL (Pvt.) Ltd.?",
    },
    {
        heading: "Current Openings",
        description: "We are always on the lookout for talented individuals who are passionate about creating exceptional digital experiences. Whether you're a designer, engineer, project manager, or have skills that align with our agency's mission, we encourage you to explore our open positions.",
    }
];

const features = [
    {
        title: "Innovative and Impactful Projects",
        desc: "At WGTECSOL (Pvt.) Ltd., you'll have the opportunity to work on exciting and impactful projects that shape the digital landscape. From designing intuitive user interfaces to developing robust software solutions, you'll be part of a team that creates products that make a difference."
    },
    {
        title: "Supportive Environment",
        desc: "At WGTECSOL (Pvt.) Ltd., you'll have the opportunity to work on exciting and impactful projects that shape the digital landscape. From designing intuitive user interfaces to developing robust software solutions, you'll be part of a team that creates products that make a difference."
    },
    {
        title: "Continuous Learning and Growth",
        desc: "We believe in investing in our team's growth and development. We provide opportunities for continuous learning, whether it's through workshops, training programs, or attending industry conferences. At WGTECSOL (Pvt.) Ltd., you'll have the chance to expand your skill set and stay up-to-date with the latest trends and technologies."
    },
    {
        title: "Challenging and Rewarding Work",
        desc: "Our projects are challenging, but the rewards are even greater. We tackle complex problems and push ourselves to deliver innovative solutions. You'll be empowered to take ownership of your work, make a real impact, and see your ideas come to life."
    }
];






function Page() {
    return (
        <>
            <Banner
                bgImage={banner[4].bgImage}
                heading={banner[4].heading}
                headingTwo={banner[4].headingTwo}
                subheading={banner[4].subheading}
            />
            <Into section={sections[0]} />
            <div className="h-auto my-10 flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full items-stretch">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            data-aos="fade-up"
                            data-aos-anchor-placement="top-center"
                            className="px-6 flex h-full flex-col gap-2 "
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-[40px] text-[#D8FF99] break-words">
                                {feature.title}
                            </h2>
                            <hr className="border-[#262626] my-4" />
                            <p className="text-[#98989A] break-words">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <Into section={sections[1]} />
            <Current_Openings />
            <SquareUpHero />
        </>
    )
}

export default Page