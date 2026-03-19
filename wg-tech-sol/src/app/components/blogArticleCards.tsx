"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BlogItem } from "../blogs/types";
import { ArticleItem } from "../articles/types";

type BlogArticleItem = BlogItem | ArticleItem;

interface BlogArticleCardsProps {
  data: BlogArticleItem[];
  basePath: string;
}

export default function BlogArticleCards({
  data,
  basePath,
}: BlogArticleCardsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!data?.length) {
    return (
      <div className="w-full min-h-[200px] flex items-center justify-center text-gray-400">
        No data found.
      </div>
    );
  }
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full min-h-[300px] py-8 sm:py-12">
      <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <button
          onClick={scrollPrev}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-[#8CE600] opacity-60 hover:bg-[#9eff00] rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeftIcon className="h-4 w-4 sm:h-6 sm:w-6 text-black" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-[#8CE600] opacity-60 hover:bg-[#9eff00] rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Next"
        >
          <ChevronRightIcon className="h-4 w-4 sm:h-6 sm:w-6 text-black" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-2 sm:gap-4 md:gap-6">
            {data.map((item) => {
              const itemId = item?._id || "";
              const title = item?.title || "";
              const subTitle = item?.subTitle || "";
              const shortDescription = item?.shortDescription || "";
              const imageSrc = item?.image || "/images/Icon.png";

              return (
                <Link
                  key={itemId}
                  href={`${basePath}/${itemId}`}
                  className="flex-shrink-0 block"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                    className="flex-shrink-0 w-[250px] sm:w-[280px] md:w-[300px] lg:w-[320px] xl:w-[340px] border border-[#232323] rounded-lg flex flex-col p-3 sm:p-4 md:p-5 hover:bg-[#111] transition cursor-pointer"
                  >
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-1 sm:gap-2">
                      <h2 className="text-[#bfbfbf] text-xs sm:text-sm md:text-base lg:text-lg font-semibold line-clamp-1 flex-1 hover:underline">
                        {subTitle || title}
                      </h2>
                      <p className="text-gray-300 text-xs sm:text-xs md:text-sm font-normal leading-relaxed">
                        {" "}
                        {formatDate(item?.postedOn)}
                      </p>
                    </div>

                    <div className="w-full rounded-lg overflow-hidden mb-3 sm:mb-4">
                      <Image
                        src={imageSrc}
                        alt={title || "Image"}
                        width={400}
                        height={220}
                        className="w-full h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] object-contain"
                        priority
                      />
                    </div>

                    <div className="flex items-center justify-between mb-2 sm:mb-3 gap-1 sm:gap-2">
                      <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold line-clamp-1 flex-1">
                        {title}
                      </h3>

                      <div className="group rounded-lg p-2 bg-[#232323] hover:bg-[#9eff00] transition">
                        <Image
                          src="/images/Icon.png"
                          alt="Open Details"
                          width={20}
                          height={20}
                          className="transition group-hover:brightness-0"
                        />
                      </div>
                    </div>

                    {shortDescription && (
                      <p className="text-gray-300 text-[10px] sm:text-xs md:text-sm font-normal leading-relaxed line-clamp-2">
                        {shortDescription.split(" ").slice(0, 15).join(" ")}
                        {shortDescription.split(" ").length > 15 ? "..." : ""}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
