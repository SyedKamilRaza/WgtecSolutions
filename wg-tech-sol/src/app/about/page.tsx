"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Banner from "../components/banner";
import { banner } from "../components/bannerData";
import Our_Story from "./our_story";
import SquareUpHero from "./squareUpHero";
import Our_Teams from "./our_teams";
import { getAboutUs } from "../../api/module/aboutUs";
import type { AboutUs, StoryEntry, TeamSection } from "./types";

const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
function Page() {
  const [aboutUsData, setAboutUsData] = useState<AboutUs | null>(null);
  const [ourStoryData, setOurStoryData] = useState<StoryEntry[]>([]);
  const [ourTeamData, setOurTeamData] = useState<TeamSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    handleGetAboutUs();
  }, []);

  const handleGetAboutUs = async () => {
    try {
      const response = await getAboutUs();
      console.log(response?.data?.data, "bbbbbbbbbbbbbbbbbbbbb");

      if (response.status === 200 || response.status === 201) {
        const aboutData = response?.data.data?.aboutUs;
        setAboutUsData(aboutData);
        const storyData = Array.isArray(response?.data.data?.ourStory)
          ? (response.data.data.ourStory as StoryEntry[])
          : [];
        setOurStoryData(storyData);
        const teamData = Array.isArray(response?.data.data?.ourTeamByRole)
          ? (response.data.data.ourTeamByRole as TeamSection[])
          : [];
        setOurTeamData(teamData);
      }
    } catch (error) {
      console.error("Error fetching About Us data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner
        bgImage={banner[3]?.bgImage}
        heading={banner[3]?.heading}
        subheading={banner[3]?.subheading}
      />

      <section className="w-full min-h-screen flex items-center justify-center px-2 md:px-8 py-12">
        <div className="max-w-[1500px] w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Text Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
              About Us – WGTECSOL (Pvt.) Ltd.

            </h2>

            {loading ? (
              <p className="text-gray-400">Loading description...</p>
            ) : aboutUsData?.description ? (
              <div
                className="text-gray-200 text-base md:text-lg font-medium leading-relaxed max-w-xl"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(aboutUsData?.description),
                }}
              />
            ) : (
              <p className="text-gray-400">Description not available.</p>
            )}
          </div>

          {/* Right: Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden w-[480px] h-[480px] max-w-full bg-[#181818] flex items-center justify-center">
              <Image
                src={aboutUsData?.image || "/images/WGTecSol_About.png"}
                alt="About Us"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Our_Story ourStoryData={ourStoryData} />
      <Our_Teams ourTeamData={ourTeamData} />
      <SquareUpHero />
    </>
  );
}

export default Page;
