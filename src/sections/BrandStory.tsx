import { useEffect, useRef, useState } from 'react';
import { brandStoryConfig } from '../config';

const BrandStory = () => {
  if (!brandStoryConfig.heading) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headingLines = brandStoryConfig.heading.split('\n');

  const fadeUp = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
  });

  return (
    <section
      id="brandstory"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '45vh', minHeight: '360px', maxHeight: '500px' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${brandStoryConfig.videoPoster})`,
          transform: isVisible ? 'scale(1.0)' : 'scale(1.06)',
          transition: 'transform 2s ease',
        }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

      {/* Corner gold accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[#C9A84C]/60" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[#C9A84C]/60" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[#C9A84C]/60" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#C9A84C]/60" />

      {/* Top & bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">

        {/* Tag */}
        <div className="flex items-center justify-center gap-4 mb-8" style={fadeUp(200)}>
          <div className="w-10 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C9A84C]" />
          <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#C9A84C] uppercase font-medium">
            {brandStoryConfig.tag}
          </span>
          <div className="w-10 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C9A84C]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif mb-6 max-w-3xl" style={fadeUp(400)}>
          <span className="block text-3xl md:text-4xl lg:text-5xl text-white leading-[1.05]">
            {headingLines[0]}
          </span>
          {headingLines[1] && (
            <span className="block text-3xl md:text-4xl lg:text-5xl italic text-[#C9A84C] leading-[1.05]">
              {headingLines[1]}
            </span>
          )}
        </h2>

        {/* Ornamental line */}
        <div className="flex items-center justify-center gap-3 mb-7" style={fadeUp(550)}>
          <div className="w-10 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
          <div className="w-1.5 h-1.5 border border-[#C9A84C] rotate-45" />
          <div className="w-10 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
        </div>

        {/* CTA */}
        {brandStoryConfig.ctaText && (
          <div style={fadeUp(700)}>
            <a
              href={brandStoryConfig.ctaTarget}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(brandStoryConfig.ctaTarget)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-4 px-10 md:px-14 py-4 md:py-5 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.35em] uppercase overflow-hidden transition-all duration-500 hover:text-black hover:shadow-lg hover:shadow-[#C9A84C]/30"
            >
              <span className="relative z-10">{brandStoryConfig.ctaText}</span>
              <div className="absolute inset-0 bg-[#C9A84C] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandStory;
