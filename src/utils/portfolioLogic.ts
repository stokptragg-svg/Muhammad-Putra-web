export type ProjectCategory = 'Semua' | 'Web App' | 'UI/UX' | 'Sistem';

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'Semua'>;
  year: string;
  role: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  stack: string[];
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  codeLanguage: string;
  codeFileName: string;
  codeSnippet: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export interface ProfileSummary {
  fullName: string;
  nim: string;
  program: string;
  focus: string;
  location: string;
  email: string;
}

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory,
  searchQuery = ''
): ProjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory = category === 'Semua' || project.category === category;
    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      project.title,
      project.category,
      project.summary,
      project.role,
      ...project.stack,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  if (!input.name.trim() || input.name.trim().length < 2) {
    errors.name = 'Nama lengkap minimal terdiri dari 2 karakter.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email.trim() || !emailPattern.test(input.email.trim())) {
    errors.email = 'Masukkan alamat email yang valid (contoh: nama@domain.com).';
  }

  if (!input.subject.trim() || input.subject.trim().length < 3) {
    errors.subject = 'Subjek pesan minimal 3 karakter.';
  }

  if (!input.message.trim() || input.message.trim().length < 10) {
    errors.message = 'Isi pesan minimal 10 karakter agar konteksnya jelas.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function extractNimMetadata(nim: string): {
  formatted: string;
  entryYear: string;
  isValidFormat: boolean;
} {
  const digits = nim.replace(/\D/g, '');
  const isValidFormat = digits.length >= 10;
  const yearPrefix = digits.slice(0, 2);
  const entryYear = yearPrefix ? `20${yearPrefix}` : '2026';

  return {
    formatted: digits,
    entryYear,
    isValidFormat,
  };
}

export function buildStandaloneHtml(profile: ProfileSummary, projects: ProjectItem[]): string {
  const projectCardsHtml = projects
    .map(
      (project) => `        <article class="rounded-2xl border border-blue-200 bg-white p-6 transition hover:border-blue-600">
          <p class="text-xs font-medium text-blue-700">${project.category} · ${project.year} · ${project.role}</p>
          <h3 class="mt-2 text-xl font-semibold text-blue-950">${project.title}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">${project.summary}</p>
          <p class="mt-4 font-mono text-xs text-blue-600">${project.stack.join(' · ')}</p>
        </article>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${profile.fullName} — Portofolio (${profile.nim})</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#EFF6FF] text-[#0B1D45] antialiased">
  <header class="sticky top-0 z-30 border-b border-blue-200 bg-[#EFF6FF]/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
      <a href="#" class="text-lg font-bold tracking-tight text-blue-950 whitespace-nowrap">${profile.fullName}</a>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-blue-900/80">
        <a href="#tentang" class="hover:text-blue-700">Tentang</a>
        <a href="#karya" class="hover:text-blue-700">Karya</a>
        <a href="#kontak" class="hover:text-blue-700">Kontak</a>
      </nav>
      <a href="#kontak" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 whitespace-nowrap">
        Hubungi Saya
      </a>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-6 py-16 space-y-20">
    <section class="grid gap-10 lg:grid-cols-12 items-center">
      <div class="lg:col-span-7 space-y-5">
        <p class="font-mono text-xs font-medium text-blue-700">${profile.program} · NIM ${profile.nim}</p>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-tight">
          ${profile.fullName}
        </h1>
        <p class="max-w-xl text-base leading-relaxed text-slate-700">
          Mahasiswa ${profile.program} dengan fokus pada ${profile.focus}.
          Merancang dan mengembangkan aplikasi web modern dengan struktur kode yang bersih.
        </p>
        <div class="flex flex-wrap gap-3 pt-2">
          <a href="#karya" class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
            Jelajahi Karya
          </a>
          <a href="#kontak" class="rounded-lg border border-blue-300 bg-white px-5 py-2.5 text-sm font-medium text-blue-900 hover:bg-blue-50">
            Diskusi Proyek
          </a>
        </div>
      </div>
      <div class="lg:col-span-5 overflow-hidden rounded-2xl border border-blue-200 bg-blue-100 aspect-[4/5]">
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-11-18_at_07.21.09_3c98a360.jpeg"
          alt="Foto ${profile.fullName}"
          class="h-full w-full object-cover object-[70%_58%]"
        />
      </div>
    </section>

    <section id="karya" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-blue-950">Karya Pilihan</h2>
        <p class="mt-1 text-sm text-slate-600">Proyek pengembangan aplikasi web, sistem informasi, dan desain UI.</p>
      </div>
      <div class="grid gap-6 md:grid-cols-2">
${projectCardsHtml}
      </div>
    </section>

    <section id="kontak" class="rounded-2xl border border-blue-200 bg-white p-8">
      <h2 class="text-2xl font-bold tracking-tight text-blue-950">Kontak</h2>
      <p class="mt-2 text-sm text-slate-600">Terbuka untuk kolaborasi proyek, riset akademik, maupun pengembangan produk digital.</p>
      <p class="mt-4 font-mono text-sm text-blue-700">${profile.email}</p>
    </section>
  </main>

  <footer class="border-t border-blue-900 bg-blue-950 py-8 text-center text-xs text-blue-200">
    © 2026 ${profile.fullName} · NIM ${profile.nim}
  </footer>
</body>
</html>`;
}
