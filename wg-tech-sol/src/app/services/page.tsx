"use client";
import React, { useEffect, useState } from "react";
import { getServices } from "../../api/module/service";
import Banner from "../components/banner";
import { banner } from "../components/bannerData";
import DetailFooter from "../components/detail_footer";
import { detailFooter } from "../components/detailFooterData";
import { ServicesGrid } from "./serviceCards";
import type { OurServiceType } from "./types";

function Page() {
  const [serviceData, setServicesData] = useState<OurServiceType[]>([]);
  console.log(serviceData, "serviceDataserviceData");

  useEffect(() => {
    handleGetServices();
  }, []);

  const handleGetServices = async () => {
    try {
      const response = await getServices();
      console.log(response?.data?.data, "sssssssssssssssssssssssss");

      if (response.status === 200 || response.status === 201) {
        const services = Array.isArray(response?.data.data)
          ? (response.data.data as OurServiceType[])
          : [];
        setServicesData(services);
      }
    } catch (error) {
      console.error("Error fetching About Us data:", error);
    } finally {
    }
  };

  console.log(serviceData, "serviceDataserviceData");
  return (
    <>
      <Banner
        bgImage={banner[0].bgImage}
        heading={banner[0].heading}
        subheading={banner[0].subheading}
      />
      <div className="w-full h-auto py-10 md:py-20 relative">
        {serviceData.map((section) => (
          <React.Fragment key={section?._id}>
            <section className="pt-4 md:pt-6 pb-8 md:pb-10">
              <div className="max-w-[1500px] mx-auto px-4 md:px-6">
                <h1 className="text-white text-4xl md:text-[56px] font-bold leading-none mb-4">
                  {section?.title}
                </h1>
                <p className="text-white text-base md:text-lg font-medium leading-snug mb-6 md:mb-10 max-w-full md:max-w-[1290px]">
                  {section?.description}
                </p>
                <div className="inline-block bg-[#333333] rounded-lg px-4 py-2 md:px-6 md:py-3 mt-2">
                  <span className="text-white text-lg md:text-2xl font-normal">
                    Our {section?.title} services include:
                  </span>
                </div>
              </div>
            </section>
            <ServicesGrid serviceData={[section]} />
          </React.Fragment>
        ))}
      </div>
      <DetailFooter data={detailFooter[1]} />
    </>
  );
}

export default Page;
