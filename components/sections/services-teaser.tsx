import Image from "next/image";
import Link from "next/link";
import { PiArrowUpRight } from "react-icons/pi";
import { getTranslator } from "@/lib/i18n/server";

const PHOTO = "/photos/New Photos/Stylish Photo.jpg";

export async function ServicesTeaser() {
  const { t, messages } = await getTranslator();
  const titles = messages.services.groups.map((g) => g.title);

  return (
    <section className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xl lg:order-1 lg:aspect-[5/6]">
            <Image
              src={PHOTO}
              alt={t("hero.imageAlt")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 lg:order-2">
            <h2 className="heading-section">{t("services.heading")}</h2>
            <p className="text-pretty text-ink-muted">{t("services.lead")}</p>

            <ul className="flex flex-wrap items-center gap-x-2 gap-y-2 text-lg font-bold tracking-tight text-ink-deep sm:text-xl">
              {titles.map((title, i) => (
                <li key={title} className="flex items-center gap-2">
                  <span>{title}</span>
                  {i < titles.length - 1 ? (
                    <span aria-hidden className="text-accent-warm">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>

            <Link
              href="/services"
              className="btn btn-warm self-start"
            >
              <span>{t("services.heading")}</span>
              <PiArrowUpRight aria-hidden size={18} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
