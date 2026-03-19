"use client";

// app/components/Current_Openings.tsx

import Image from "next/image";
import { useEffect, useState } from "react";
import { jobOpenings, OpportunityGroup, JobSection } from "./openings";
import { getOpportunitiesData } from "@/api/module/carear";
import Link from "next/link";

export default function Current_Openings() {
  const [opportunitiesData, setOpportunitiesData] = useState<JobSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetOpportunities();
  }, []);

  const handleGetOpportunities = async () => {
    try {
      const response = await getOpportunitiesData();
      console.log("Opportunities API Response:", response?.data);

      if (response.status === 200 || response.status === 201) {
        const data = response?.data?.data || response?.data;
        const opportunities: OpportunityGroup[] = data?.opportunities || [];

        // API data ko component ke format mein convert karna
        const formattedData: JobSection[] = opportunities
          .filter((group) => group.status === "Active")
          .map((group) => ({
            section: group.name,
            jobs: group.opportunity.map((opp) => ({
              title: opp.title,
              description: opp.description,
              image: opp.image,
            })),
          }));

        console.log("Formatted Opportunities:", formattedData);
        setOpportunitiesData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching Opportunities data:", error);
      // Fallback to static data
      setOpportunitiesData(jobOpenings);
    } finally {
      setLoading(false);
    }
  };

  // Use API data if available, otherwise use fallback
  const displayData =
    opportunitiesData.length > 0 ? opportunitiesData : jobOpenings;

  if (loading) {
    return (
      <div className="w-auto min-h-screen py-10 px-4 md:px-10 flex items-center justify-center">
        <div className="text-white text-xl">Loading opportunities...</div>
      </div>
    );
  }

  return (
    <div className="w-auto min-h-screen py-10 px-4 md:px-10 ">
      {displayData.map((section) => (
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          key={section.section}
          className="mb-12"
        >
          <div className="max-w-[1500px] mx-auto px-4 md:px-6 mb-6">
            <div className="border-l-4 border-[#8CE600] pl-4 md:pl-6">
              <h2 className="text-white text-3xl capitalize md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
                {section.section}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] place-items-center md:place-items-start">
            {section.jobs.map((job, index) => (
              <div
                key={`${job.title}-${index}`}
                className="py-6 px-6 flex flex-col gap-6 w-full max-w-[431px] h-full overflow-hidden"
              >
                <div className="flex flex-col gap-6 flex-grow">
                  <div className="w-[88px] h-[88px] relative">
                    <Image
                      src={job.image}
                      alt={job.title}
                      fill
                      className="object-contain rounded"
                      sizes="88px"
                    />
                  </div>
                  <span className="text-[24px] font-medium break-all">
                    {job.title}
                  </span>
                  <p className="text-[#E6E6E6] text-[18px] md:text-base break-all">
                    {job.description}
                  </p>
                </div>
                <Link
                  href="/wgContactForm"
                  className="text-center text-white rounded-md py-4 font-semibold bg-[#8CE600] hover:bg-[#9eff00] active:bg-[#9eff00] transition cursor-pointer"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
