'use client';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      aria-label="Back to top"
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 
                  z-50 rounded-full
                  bg-[#9eff00] text-black shadow-lg
                  transition-all duration-300
                  hover:scale-110 hover:bg-lime-500
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9eff00]
                  ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <span className="block p-3 sm:p-4 text-base sm:text-lg">
        <FaArrowUp />
      </span>
    </button>
  );
}