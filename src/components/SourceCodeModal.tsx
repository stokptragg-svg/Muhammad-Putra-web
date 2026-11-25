import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Download, X } from 'lucide-react';
import { PROFILE, PROJECTS, REACT_APP_PREVIEW_CODE } from '../data/portfolioData';
import { buildStandaloneHtml } from '../utils/portfolioLogic';

interface SourceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CodeTabKey = 'html' | 'react' | 'css';

const CSS_TOKENS_SNIPPET = `@import "tailwindcss";

@theme {
  --font-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

/* Muhammad Putra Al Thaillah · NIM 261011400864 */
:root {
  --canvas-bg: #eff6ff;
  --surface-card: #ffffff;
  --ink-navy: #0b1d45;
  --accent-royal: #2563eb;
}`;

export function SourceCodeModal({ isOpen, onClose }: SourceCodeModalProps) {
  const [activeTab, setActiveTab] = useState<CodeTabKey>('html');
  const [copied, setCopied] = useState(false);

  const standaloneHtml = useMemo(() => buildStandaloneHtml(PROFILE, PROJECTS), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const currentCode =
    activeTab === 'html'
      ? standaloneHtml
      : activeTab === 'react'
      ? REACT_APP_PREVIEW_CODE
      : CSS_TOKENS_SNIPPET;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portofolio-${PROFILE.nim}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-code-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/65 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-blue-200 px-6 py-4">
          <div>
            <p className="font-mono text-xs text-blue-700">
              Source Code · NIM {PROFILE.nim}
            </p>
            <h2
              id="source-code-modal-title"
              className="font-display text-xl font-bold text-blue-950"
            >
              Codingan Web Portofolio — {PROFILE.fullName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela codingan"
            className="rounded-lg border border-blue-200 bg-white p-2 text-blue-900 transition-colors hover:bg-blue-50 cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-200 bg-blue-50/70 px-6 py-3">
          <div
            role="tablist"
            aria-label="Pilih berkas kode"
            className="inline-flex gap-1 rounded-lg border border-blue-200 bg-white p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'html'}
              onClick={() => {
                setActiveTab('html');
                setCopied(false);
              }}
              className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium cursor-pointer ${
                activeTab === 'html'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-900/75 hover:text-blue-950'
              }`}
            >
              index.html (Standalone)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'react'}
              onClick={() => {
                setActiveTab('react');
                setCopied(false);
              }}
              className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium cursor-pointer ${
                activeTab === 'react'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-900/75 hover:text-blue-950'
              }`}
            >
              App.tsx (React)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'css'}
              onClick={() => {
                setActiveTab('css');
                setCopied(false);
              }}
              className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium cursor-pointer ${
                activeTab === 'css'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-900/75 hover:text-blue-950'
              }`}
            >
              index.css
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300 bg-white px-3.5 py-2 text-xs font-medium text-blue-950 transition-colors hover:bg-blue-50 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Unduh HTML</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Salin Kode</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-[#07132E] p-6">
          <pre className="font-mono text-xs leading-relaxed text-blue-50">
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
