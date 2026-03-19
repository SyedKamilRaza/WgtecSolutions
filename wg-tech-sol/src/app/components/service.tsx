'use client';
import React from 'react';
import ServiceCard from './serviceCard';
import Banner from '../components/banner';
import { banner } from '../components/bannerData';
import { ServiceItem } from '@/app/home/types';

interface OurServicesSectionProps {
  services?: ServiceItem[];
}

export const OurServicesSection: React.FC<OurServicesSectionProps> = ({ services }) => {
  console.log(services, "serviceserviceservices");
  return (
    <section className="w-auto -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24">
      <Banner
        bgImage={banner[0].bgImage}
        heading={banner[0].heading}
        subheading={banner[0].subheading}
      />
      <ServiceCard services={services} />
    </section>
  );
};