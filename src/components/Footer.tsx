import { PROFILE } from '../data/portfolioData';

interface FooterProps {
  onOpenSourceCode: () => void;
}

export function Footer({ onOpenSourceCode }: FooterProps) {
  return (
    <footer className="border-t border-blue-900 bg-blue-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-blue-200">
          © 2026 {PROFILE.fullName} · NIM{' '}
          <span className="font-mono text-white tabular-nums">{PROFILE.nim}</span>
        </p>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-blue-200">
          <a href="#beranda" className="hover:text-white">
            Beranda
          </a>
          <a href="#karya" className="hover:text-white">
            Karya
          </a>
          <a href="#kontak" className="hover:text-white">
            Kontak
          </a>
          <button
            type="button"
            onClick={onOpenSourceCode}
            className="text-sky-300 hover:text-white hover:underline underline-offset-4 cursor-pointer"
          >
            Lihat Codingan
          </button>
        </div>
      </div>
    </footer>
  );
}
