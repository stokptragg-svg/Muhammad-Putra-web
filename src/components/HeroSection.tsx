import { useState } from 'react';
import { ArrowDownRight, Code2, User } from 'lucide-react';
import { HERO_METRICS, HERO_PORTRAIT, PROFILE } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenSourceCode: () => void;
}

export function HeroSection({ onOpenSourceCode }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="beranda" className="mx-auto max-w-6xl px-6 pt-12 pb-16 lg:pt-16 lg:pb-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
        {/* Left column: Typographic hierarchy */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-8 py-2">
          <div className="space-y-6">
            <p className="font-mono text-xs font-medium tracking-wide text-blue-700">
              {PROFILE.program} · NIM {PROFILE.nim}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-blue-950 leading-[1.08] [text-wrap:balance]">
              {PROFILE.fullName}
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-700">
              Mahasiswa {PROFILE.program} yang merancang dan membangun aplikasi web modern dengan
              arsitektur kode bersih, tipografi terstruktur, serta pengalaman pengguna yang cepat
              dan aksesibel.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#karya"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span>Jelajahi Karya</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onOpenSourceCode}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-white px-5 py-3 text-sm font-medium text-blue-950 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
            >
              <Code2 className="h-4 w-4 text-blue-600" aria-hidden="true" />
              <span>Lihat Codingan</span>
            </button>
          </div>
        </div>

        {/* Right column: Uploaded personal portrait framed to match hero height */}
        <div className="lg:col-span-5">
          <div className="relative h-96 sm:h-[420px] lg:h-full min-h-[360px] w-full overflow-hidden rounded-2xl border border-blue-200 bg-blue-100">
            {!imgError ? (
              <img
                src={HERO_PORTRAIT.src}
                alt={HERO_PORTRAIT.alt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover object-[70%_62%]"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center">
                <User className="h-12 w-12 text-blue-400" aria-hidden="true" />
                <p className="mt-3 font-display text-lg font-semibold text-blue-950">
                  {PROFILE.fullName}
                </p>
                <p className="mt-1 font-mono text-xs text-blue-700">NIM {PROFILE.nim}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-width 4-column summary strip below the hero split */}
      <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-blue-200 py-6 lg:grid-cols-4 lg:gap-8">
        {HERO_METRICS.map((metric) => (
          <div key={metric.label} className="space-y-1">
            <dt className="text-xs font-medium text-blue-900/70">{metric.label}</dt>
            <dd
              className={`text-base sm:text-lg font-semibold text-blue-950 ${
                metric.mono ? 'font-mono tabular-nums text-blue-700' : 'font-display'
              }`}
            >
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
