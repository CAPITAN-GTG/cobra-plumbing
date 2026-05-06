"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { PiQuotesFill, PiStarFill } from "react-icons/pi";
import "swiper/css";
import "swiper/css/pagination";

type Testimonial = {
  quote: string;
  author: string;
  city: string;
};

type TestimonialsProps = {
  eyebrow: string;
  heading: string;
  items: Testimonial[];
};

export function Testimonials({ eyebrow, heading, items }: TestimonialsProps) {
  return (
    <section className="section bg-surface-tint">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="heading-section">{heading}</h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={items.length > 3}
          className="!pb-12"
        >
          {items.map((it, i) => (
            <SwiperSlide key={i}>
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-accent/15 bg-surface-card p-6 sm:p-7">
                <PiQuotesFill
                  aria-hidden
                  size={32}
                  className="text-accent-warm/70"
                />
                <p className="flex-1 text-pretty text-ink">{it.quote}</p>
                <div className="flex items-center gap-1 text-accent-warm">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <PiStarFill key={idx} size={16} aria-hidden />
                  ))}
                </div>
                <div className="border-t border-accent/15 pt-4">
                  <p className="font-bold text-ink-deep">{it.author}</p>
                  <p className="text-xs uppercase tracking-widest text-ink-muted">
                    {it.city}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
