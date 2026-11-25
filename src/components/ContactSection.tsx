import { useState, type FormEvent } from 'react';
import { Check, Copy, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { validateContactForm, type ContactFormInput } from '../utils/portfolioLogic';

interface SubmittedEntry extends ContactFormInput {
  id: string;
  submittedAt: string;
}

const EMPTY_FORM: ContactFormInput = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactSection() {
  const [form, setForm] = useState<ContactFormInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [submittedEntries, setSubmittedEntries] = useState<SubmittedEntry[]>([]);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(form);

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const newEntry: SubmittedEntry = {
      ...form,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setSubmittedEntries((prev) => [newEntry, ...prev]);
    setForm(EMPTY_FORM);
  };

  return (
    <section id="kontak" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Left column: Direct identity & email copy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <p className="font-mono text-xs font-medium text-blue-700">Kontak &amp; Kolaborasi</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-blue-950">
              Mari Diskusikan Proyek Anda
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700">
              Terbuka untuk kolaborasi proyek web, tugas kelompok rekayasa perangkat lunak, maupun
              diskusi seputar desain antarmuka.
            </p>
          </div>

          <dl className="divide-y divide-blue-200 border-y border-blue-200 text-sm">
            <div className="flex items-center justify-between py-4 gap-4">
              <dt className="text-blue-900/70">Nama Lengkap</dt>
              <dd className="font-medium text-blue-950 text-right">{PROFILE.fullName}</dd>
            </div>
            <div className="flex items-center justify-between py-4 gap-4">
              <dt className="text-blue-900/70">NIM</dt>
              <dd className="font-mono font-medium text-blue-700 tabular-nums">{PROFILE.nim}</dd>
            </div>
            <div className="flex items-center justify-between py-4 gap-4">
              <dt className="text-blue-900/70">Domisili</dt>
              <dd className="font-medium text-blue-950">{PROFILE.location}</dd>
            </div>
            <div className="flex items-center justify-between py-4 gap-4">
              <dt className="text-blue-900/70">Email</dt>
              <dd className="flex items-center gap-2">
                <span className="font-mono text-xs text-blue-950">{PROFILE.email}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Salin alamat email"
                  className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-white px-2.5 py-1 text-xs font-medium text-blue-900 transition-colors hover:bg-blue-50 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </dd>
            </div>
          </dl>
        </div>

        {/* Right column: Interactive contact form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-blue-200 bg-white p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-blue-950">
                    Nama Lengkap
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Contoh: Budi Santoso"
                    aria-invalid={Boolean(errors.name)}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-blue-950 placeholder:text-slate-400 focus:outline-none ${
                      errors.name
                        ? 'border-rose-500 focus:border-rose-600'
                        : 'border-blue-200 focus:border-blue-600'
                    }`}
                  />
                  {errors.name && (
                    <p role="alert" className="text-xs font-medium text-rose-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-blue-950">
                    Alamat Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="nama@domain.com"
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-blue-950 placeholder:text-slate-400 focus:outline-none ${
                      errors.email
                        ? 'border-rose-500 focus:border-rose-600'
                        : 'border-blue-200 focus:border-blue-600'
                    }`}
                  />
                  {errors.email && (
                    <p role="alert" className="text-xs font-medium text-rose-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-blue-950">
                  Subjek
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                  placeholder="Kolaborasi aplikasi web / Diskusi tugas"
                  aria-invalid={Boolean(errors.subject)}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-blue-950 placeholder:text-slate-400 focus:outline-none ${
                    errors.subject
                      ? 'border-rose-500 focus:border-rose-600'
                      : 'border-blue-200 focus:border-blue-600'
                  }`}
                />
                {errors.subject && (
                  <p role="alert" className="text-xs font-medium text-rose-600">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-blue-950">
                  Pesan
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Tuliskan detail kebutuhan atau pertanyaan Anda..."
                  aria-invalid={Boolean(errors.message)}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-blue-950 placeholder:text-slate-400 focus:outline-none ${
                    errors.message
                      ? 'border-rose-500 focus:border-rose-600'
                      : 'border-blue-200 focus:border-blue-600'
                  }`}
                />
                {errors.message && (
                  <p role="alert" className="text-xs font-medium text-rose-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <p className="text-xs text-slate-500">Semua kolom wajib diisi dengan benar.</p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Kirim Pesan</span>
                </button>
              </div>
            </form>

            {submittedEntries.length > 0 && (
              <div
                aria-live="polite"
                className="mt-6 border-t border-blue-200 pt-5 space-y-3"
              >
                <p className="text-xs font-semibold text-emerald-700">
                  Pesan berhasil dicatat ({submittedEntries.length})
                </p>
                <ul className="space-y-2">
                  {submittedEntries.map((entry) => (
                    <li
                      key={entry.id}
                      className="rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-3 text-xs text-slate-700"
                    >
                      <div className="flex items-center justify-between gap-2 font-semibold text-blue-950">
                        <span>{entry.subject}</span>
                        <span className="font-mono text-[11px] text-blue-700 tabular-nums">
                          {entry.submittedAt}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-600">
                        Dari: {entry.name} ({entry.email})
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
