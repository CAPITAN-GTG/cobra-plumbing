"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type CounterStat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

type CountersProps = {
  stats: CounterStat[];
  eyebrow?: string;
  heading?: string;
};

export function Counters({ stats, eyebrow, heading }: CountersProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="section section-dark">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || heading) && (
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            {heading ? <h2 className="heading-section">{heading}</h2> : null}
          </div>
        )}
        <ul className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <li
              key={s.label}
              className="flex flex-col items-center gap-2 text-center"
            >
<<<<<<< HEAD
              <span className="text-4xl font-bold leading-none text-accent-warm sm:text-5xl lg:text-6xl">
=======
              <span className="text-5xl font-bold text-white sm:text-6xl">
>>>>>>> 7a87289fcbeb6bb27cc09432fdedbf7c7c34eec9
                {s.prefix}
                {inView ? (
                  <CountUp end={s.value} duration={2.2} separator="," />
                ) : (
                  0
                )}
                {s.suffix}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/70 sm:text-sm">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
