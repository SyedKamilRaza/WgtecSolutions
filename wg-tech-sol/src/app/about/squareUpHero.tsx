import Image from "next/image";
import Link from "next/link";

export default function SquareUpHero() {
  return (
    <section className="min-h-[471px] w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-8 md:py-0">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 items-center md:items-start">
        {/* Neon Icon Box */}
        <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] flex items-center justify-center flex-shrink-0">
          <Image
            src="/images/Logo.png"
            alt="Cube Icon"
            width={150}
            height={150}
            className="object-contain w-full h-full"
            priority
          />
        </div>
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold text-[#98989A] leading-tight">
            Today, WGTECSOL (Pvt.) Ltd.
 Continues to Thrive as a Leading Digital Product Agency…..
          </h2>
          <p className="mt-2 text-[#98989A] text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
            Combining the power of design, engineering, and project management to create transformative digital experiences. They invite you to join them on their journey and discover how they can help bring your digital ideas to life.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full mt-8 sm:mt-12 md:mt-16 flex justify-center">
        <div className="w-full bg-[#181818] rounded-[16px] flex flex-col lg:flex-row items-stretch lg:items-center px-4 sm:px-6 md:px-10 py-4 sm:py-6 gap-4 md:gap-6 shadow-lg border border-[#232323]/60">
          <span className="text-[#7c7c7c] text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] font-medium flex items-center mb-2 lg:mb-0 lg:w-[260px] text-center lg:text-left">
            Welcome to WGTECSOL (Pvt.) Ltd.

          </span>
          <div className="flex-1 flex items-center">
            <span className="bg-[#232323] rounded-[10px] px-3 sm:px-4 py-2 sm:py-3 w-full text-[#e5e5e5] text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] font-medium text-center lg:text-left">
              Where collaboration, Expertise, and Client-Centricity Intersect to Shape the Future of Digital Innovation.
            </span>
          </div>
           <Link href="/contact" className="bg-[#8CE600] hover:bg-[#9eff00] active:bg-[#9eff00] transition text-black font-semibold rounded-[10px] px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] mt-2 lg:mt-0 w-auto lg:w-auto">
            Start Project
           </Link>
        </div>
      </div>
    </section>
  );
}