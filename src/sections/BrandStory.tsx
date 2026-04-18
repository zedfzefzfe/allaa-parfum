import { useEffect, useRef, useState } from 'react';
import { brandStoryConfig } from '../config';

const BrandStory = () => {
  if (!brandStoryConfig.heading) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headingLines = brandStoryConfig.heading.split('\n');

  const fadeUp = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 1.1s ease ${delay}ms, transform 1.1s ease ${delay}ms`,
  });

  return (
    <section
      id="brandstory"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '620px', height: '72vh' }}
    >
      {/* Background image with ken-burns */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${brandStoryConfig.videoPoster})`,
          transform: isVisible ? 'scale(1.04)' : 'scale(1.12)',
          transition: 'transform 3s ease',
        }}
      />

      {/* Deep cinematic overlays */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Vertical gold shimmer lines */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/10 to-transparent pointer-events-none" />


      {/* Gold edge lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 lg:px-32">

        {/* Tag with lines */}
        <div className="flex items-center justify-center gap-5 mb-8" style={fadeUp(100)}>
          <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
          <span className="text-[9px] md:text-[11px] tracking-[0.55em] text-[#C9A84C] uppercase font-semibold">
            {brandStoryConfig.tag}
          </span>
          <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
        </div>

        {/* Main heading */}
        <h2 className="font-serif mb-5 max-w-4xl" style={fadeUp(300)}>
          <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight drop-shadow-2xl">
            {headingLines[0]}
          </span>
          {headingLines[1] && (
            <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic text-[#C9A84C] leading-[1.05] tracking-tight drop-shadow-2xl"
              style={{ textShadow: '0 0 60px rgba(201,168,76,0.35)' }}>
              {headingLines[1]}
            </span>
          )}
        </h2>

        {/* Subheading */}
        {brandStoryConfig.subheading && (
          <p className="text-sm md:text-base text-[#C9A84C]/80 tracking-[0.25em] uppercase font-light mb-8" style={fadeUp(450)}>
            {brandStoryConfig.subheading}
          </p>
        )}

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-8" style={fadeUp(550)}>
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
          <div className="w-1.5 h-1.5 border border-[#C9A84C] rotate-45" />
          <div className="w-2 h-2 border border-[#C9A84C] rotate-45" />
          <div className="w-1.5 h-1.5 border border-[#C9A84C] rotate-45" />
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
        </div>

        {/* Body excerpt */}
        {brandStoryConfig.bodyParagraphs?.[0] && (
          <p className="max-w-xl text-gray-300 text-sm md:text-base font-light leading-relaxed mb-10 italic" style={fadeUp(650)}>
            "{brandStoryConfig.bodyParagraphs[0]}"
          </p>
        )}

        {/* CTA button */}
        {brandStoryConfig.ctaText && (
          <div style={fadeUp(800)}>
            <a
              href={brandStoryConfig.ctaTarget}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(brandStoryConfig.ctaTarget)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-5 px-12 md:px-16 py-4 md:py-5 overflow-hidden"
              style={{ border: '1px solid rgba(201,168,76,0.7)' }}
            >
              <span className="relative z-10 text-[#C9A84C] group-hover:text-black text-[11px] tracking-[0.4em] uppercase font-medium transition-colors duration-500">
                {brandStoryConfig.ctaText}
              </span>
              {/* Arrow */}
              <span className="relative z-10 text-[#C9A84C] group-hover:text-black transition-colors duration-500 group-hover:translate-x-1 transition-transform">
                →
              </span>
              <div className="absolute inset-0 bg-[#C9A84C] -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandStory;
