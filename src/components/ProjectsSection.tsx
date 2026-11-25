import { useMemo, useState } from 'react';
import { ArrowUpRight, Layers, Search, X } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import {
  filterProjects,
  type ProjectCategory,
  type ProjectItem,
} from '../utils/portfolioLogic';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES: ProjectCategory[] = ['Semua', 'Web App', 'UI/UX', 'Sistem'];

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredProjects = useMemo(
    () => filterProjects(PROJECTS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  return (
    <section id="karya" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-xs font-medium text-blue-700">Portofolio Proyek</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-blue-950">
            Karya &amp; Eksperimen Pilihan
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-slate-700">
            Klik kartu proyek untuk meninjau studi kasus arsitektur, solusi teknis, dan cuplikan
            kodenya.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Interactive segmented filter tabs */}
          <div
            role="tablist"
            aria-label="Filter kategori proyek"
            className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-100/80 p-1"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-blue-900/75 hover:text-blue-950'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div className="relative">
            <label htmlFor="project-search" className="sr-only">
              Cari proyek atau teknologi
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400"
              aria-hidden="true"
            />
            <input
              id="project-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari teknologi..."
              className="w-full sm:w-48 rounded-lg border border-blue-200 bg-white py-2 pl-9 pr-8 text-xs text-blue-950 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus pencarian proyek"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-blue-400 hover:text-blue-700 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      {filteredProjects.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-blue-200 bg-white p-12 text-center">
          <p className="font-display text-lg font-semibold text-blue-950">
            Tidak ada proyek yang sesuai filter
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Coba ubah kategori atau kata kunci pencarian teknologi.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('Semua');
              setSearchQuery('');
            }}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 cursor-pointer"
          >
            Tampilkan Semua Karya
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => {
            const isWideBento =
              (index === 0 && filteredProjects.length > 2) ||
              (index === 3 && filteredProjects.length === 4);
            const hasImgError = Boolean(failedImages[project.id]);

            return (
              <article
                key={project.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-blue-200/90 bg-white transition-colors duration-150 hover:border-blue-600 ${
                  isWideBento ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  aria-label={`Buka detail proyek ${project.title}`}
                  className="flex h-full flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
                >
                  <div
                    className={`relative w-full overflow-hidden bg-blue-50 ${
                      isWideBento ? 'aspect-[16/9]' : 'aspect-[4/3]'
                    }`}
                  >
                    {!hasImgError ? (
                      <img
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                        }
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
                        <Layers className="h-8 w-8 text-blue-400" aria-hidden="true" />
                        <p className="mt-2 font-display text-sm font-semibold text-blue-900">
                          {project.title}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                    <div>
                      {/* Unboxed static metadata with typographic separators */}
                      <p className="text-xs font-medium text-blue-700/80">
                        <span>{project.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="tabular-nums">{project.year}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{project.role}</span>
                      </p>

                      <div className="mt-2 flex items-start justify-between gap-4">
                        <h3 className="font-display text-xl font-bold tracking-tight text-blue-950 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight
                          className="mt-1 h-5 w-5 shrink-0 text-blue-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600"
                          aria-hidden="true"
                        />
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {project.summary}
                      </p>
                    </div>

                    {/* Clean unboxed technology line */}
                    <p className="border-t border-blue-100 pt-3 font-mono text-xs text-blue-800/75">
                      {project.stack.join(' · ')}
                    </p>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
