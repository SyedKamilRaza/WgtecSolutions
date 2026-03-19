'use client';
import Image from "next/image";
import Link from "next/link";
import blogsData from "./../../blogsData/blogsData";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function BlogsCard() {
    const [showAll, setShowAll] = useState(false);
    const displayedWorkCard = showAll ? blogsData : blogsData.slice(0, 4);

    return (
        <div className="w-full min-h-screen py-8 sm:py-12 px-2 sm:px-4 md:px-8">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[#232323]">
                {displayedWorkCard.map((project) => (
                    <div
                        key={project.slug}
                        data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom"
                        className="border-b border-r border-[#232323] flex flex-col p-4 sm:p-6 md:p-10"
                    >
                        {/* Title (clickable) */}
                        <h2 className="text-[#bfbfbf] w-full text-xl sm:text-2xl md:text-2xl font-semibold mb-4 sm:mb-6">
                            <Link
                                href={`/blogs/${project.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {project.title}
                            </Link>
                        </h2>

                        {/* Image (clickable) */}
                        <div className="w-full rounded-xl overflow-hidden mb-6 sm:mb-8">
                            <Link
                                href={`/blogs/${project.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.brand}
                                    width={900}
                                    height={500}
                                    className="w-full h-[180px] sm:h-[220px] md:h-[320px] object-contain"
                                    priority
                                />
                            </Link>

                        </div>
                        {/* Brand */}

                        {/* Open details icon */}
                        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
                            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                                {project.brand}
                            </h3>
                            <Link
                                href={`/blogs/${project.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#232323] rounded-lg p-2 hover:bg-lime-400 transition group bg-[#8CE600] hover:bg-[#9eff00] active:bg-[#9eff00] transition"
                            >
                                <Image
                                    src="/images/Icon.png"
                                    alt="Open Blog Details"
                                    width={24}
                                    height={24}
                                    className="transition group-hover:brightness-0 group-active:brightness-0 touch-manipulation"
                                />
                            </Link>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
                            {project.description.split(' ').slice(0, 20).join(' ')}...
                        </p>
                    </div>
                ))}
            </div>

            {blogsData.length > 4 && (
                <div className="flex justify-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="rounded-full text-black px-6 py-3 my-2 flex items-center gap-2 duration-300 bg-[#8CE600] hover:bg-[#9eff00] active:bg-[#9eff00] transition group"
                    >
                        {showAll ? "View Less" : "View More"}
                        <span className="group-hover:animate-bounceArrow inline-block">
                            {showAll ? (
                                <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}