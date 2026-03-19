'use client';
import Slider from 'react-infinite-logo-slider';
import Image from 'next/image';
import { AdvertisementItem } from '../home/types';

const companies = [
    '/images/zapier.png',
    '/images/spotify.png',
    '/images/zoom.png',
    '/images/slack.png',
    '/images/amazon.png',
    '/images/adobe.png',
];

export default function TrustedCompaniesSlider({ advertisements }: { advertisements: AdvertisementItem[] }) {
    console.log(advertisements, "advertisementsadvertisements");
    return (
        <div className="py-16">
            <div className="flex justify-center mb-5">
                <div className="rounded-full px-6 py-2 inline-flex items-center">
                    <span className="text-white text-sm font-medium">Trusted By 250+ Companies</span>
                </div>
            </div>
            <div className="max-w-full mx-auto">
                <Slider
                    width="150px"
                    duration={30}
                    toRight={false}
                    pauseOnHover={false}
                    blurBorders={false}
                >
                    {advertisements.map((src, idx) => (
                        <Slider.Slide key={idx}>
                            <div className="px-4">
                                <Image
                                    src={src.image || ''}
                                    alt={`Company logo ${idx}`}
                                    width={100}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>
                        </Slider.Slide>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
