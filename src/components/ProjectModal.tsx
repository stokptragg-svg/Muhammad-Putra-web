import { useEffect, useState } from 'react';
import { Check, Copy, Layers, X } from 'lucide-react';
import type { ProjectItem } from '../utils/portfolioLogic';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'kode'>('ringkasan');
  const [copiedCode, setCopiedCode] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setActiveTab('ringkasan');
    setCopiedCode(false);
    setImgError(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      setCopiedCode(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-blue-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-blue-200 bg-white/95 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-medium text-blue-700">
              {project.category} · {project.year} · {project.role}
            </p>
            <h2
              id="project-modal-title"
              className="font-display text-xl font-bold text-blue-950"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail proyek"
            className="rounded-lg border border-blue-200 bg-white p-2 text-blue-900 transition-colors hover:bg-blue-50 cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Interactive tab switcher */}
          <div
            role="tablist"
            aria-label="Tampilan detail proyek"
            className="inline-flex gap-1 rounded-lg border border-blue-200 bg-blue-50 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'ringkasan'}
              onClick={() => setActiveTab('ringkasan')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                activeTab === 'ringkasan'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-900/75 hover:text-blue-950'
              }`}
            >
              Ringkasan Proyek
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'kode'}
              onClick={() => setActiveTab('kode')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                activeTab === 'kode'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-900/75 hover:text-blue-950'
              }`}
            >
              Cuplikan Kode
            </button>
          </div>

          {activeTab === 'ringkasan' ? (
            <div className="space-y-6">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-blue-200 bg-blue-50">
                {!imgError ? (
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-blue-50 p-6">
                    <Layers className="h-8 w-8 text-blue-400" aria-hidden="true" />
                    <p className="mt-2 text-sm font-medium text-blue-900">{project.title}</p>
                  </div>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <h3 className="font-display text-sm font-bold text-blue-950">Tantangan</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{project.challenge}</p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-sm font-bold text-blue-950">Solusi Teknis</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{project.solution}</p>
                </div>
              </div>

              <div className="border-t border-blue-200 pt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-blue-950">Dampak: {project.impact}</p>
                <p className="font-mono text-xs text-blue-700">{project.stack.join(' · ')}</p>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-blue-900 bg-[#07132E]">
              <div className="flex items-center justify-between border-b border-blue-900 bg-[#0B193C] px-4 py-3 text-xs text-blue-200">
                <span className="font-mono">
                  {project.codeFileName} · {project.codeLanguage}
                </span>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="inline-flex items-center gap-1.5 rounded-md border border-blue-700 bg-blue-900/70 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-800 cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Salin Kode</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-blue-50">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
