import type { ProfileSummary, ProjectItem } from '../utils/portfolioLogic';

export const PROFILE: ProfileSummary = {
  fullName: 'Muhammad Putra Al Thaillah',
  nim: '261011400864',
  program: 'Teknik Informatika',
  focus: 'Rekayasa Web Modern & Desain Antarmuka',
  location: 'Tangerang Selatan, Indonesia',
  email: 'putra.althaillah@informatika.id',
};

export const HERO_PORTRAIT = {
  src: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_07.21.09_3c98a360.jpeg',
  alt: 'Foto pribadi Muhammad Putra Al Thaillah, mahasiswa Teknik Informatika NIM 261011400864',
};

export const HERO_METRICS = [
  {
    label: 'Nomor Induk Mahasiswa',
    value: '261011400864',
    mono: true,
  },
  {
    label: 'Program Studi',
    value: 'Teknik Informatika',
    mono: false,
  },
  {
    label: 'Karya Terpublikasi',
    value: '4 Proyek Pilihan',
    mono: false,
  },
  {
    label: 'Spesialisasi Utama',
    value: 'Full-Stack & UI/UX',
    mono: false,
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'portal-akademik',
    title: 'Portal Akademik Terpadu Mahasiswa',
    category: 'Web App',
    year: '2026',
    role: 'Full-Stack Developer',
    summary:
      'Aplikasi web manajemen jadwal kuliah, pengisian KRS, dan pemantauan nilai semester dengan antarmuka cepat dan terstruktur.',
    challenge:
      'Mahasiswa sering kesulitan membaca jadwal bentrok dan memantau progres SKS di perangkat seluler saat masa pengisian KRS.',
    solution:
      'Merancang grid jadwal adaptif dengan validasi bentrok waktu otomatis pada sisi klien dan sinkronisasi state yang ringan.',
    impact: 'Waktu pengisian KRS lebih cepat 48% dengan nol konflik jadwal pada uji coba 120 mahasiswa.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'REST API'],
    imageUrl: '/src/assets/images/project_akademik_portal_1794960552239.jpg',
    imageAlt: 'Laptop menampilkan antarmuka Portal Akademik Terpadu Mahasiswa di meja beton minimalis',
    featured: true,
    codeLanguage: 'TypeScript',
    codeFileName: 'conflictDetector.ts',
    codeSnippet: `export interface CourseSlot {
  code: string;
  day: string;
  startMinutes: number;
  endMinutes: number;
}

export function hasScheduleConflict(
  existing: CourseSlot[],
  candidate: CourseSlot
): CourseSlot | null {
  return (
    existing.find(
      (slot) =>
        slot.day === candidate.day &&
        candidate.startMinutes < slot.endMinutes &&
        candidate.endMinutes > slot.startMinutes
    ) ?? null
  );
}`,
  },
  {
    id: 'kasflow-analytics',
    title: 'KasFlow — Pencatat Keuangan Mahasiswa',
    category: 'Web App',
    year: '2026',
    role: 'Frontend Engineer',
    summary:
      'Dasbor analitik arus kas pribadi untuk melacak anggaran bulanan, kategori pengeluaran, dan target tabungan secara tabular.',
    challenge:
      'Aplikasi pencatat keuangan umumnya penuh grafik rumit yang sulit dibaca sekilas untuk kebutuhan mahasiswa perantau.',
    solution:
      'Membangun ringkasan anggaran berbasis angka tabular, filter periode instan, serta kalkulasi rasio tabungan otomatis.',
    impact: 'Digunakan aktif oleh 85+ mahasiswa untuk mengontrol pengeluaran mingguan.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/src/assets/images/project_kasflow_fintech_1794960554221.jpg',
    imageAlt: 'Monitor desktop dan tablet menampilkan dasbor keuangan KasFlow dengan grafik ringkas',
    featured: false,
    codeLanguage: 'TypeScript',
    codeFileName: 'budgetSummary.ts',
    codeSnippet: `export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
}

export function summarizeCashflow(items: Transaction[]) {
  const income = items
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = items
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  return {
    income,
    expense,
    balance: income - expense,
    savingsRate: income > 0 ? Math.round(((income - expense) / income) * 100) : 0,
  };
}`,
  },
  {
    id: 'iot-lab-monitor',
    title: 'Sistem Monitoring Lingkungan Lab IoT',
    category: 'Sistem',
    year: '2026',
    role: 'Embedded & Web Engineer',
    summary:
      'Integrasi mikrokontroler ESP32 dengan antarmuka web real-time untuk memantau suhu, kelembapan, dan status node sensor.',
    challenge:
      'Ruang server dan laboratorium membutuhkan pencatatan suhu kontinu dengan peringatan cepat saat melampaui ambang batas.',
    solution:
      'Menghubungkan node sensor ESP32 ke broker data ringan dan menyajikan grafik historis serta log anomali secara terstruktur.',
    impact: 'Latensi pembaruan data terjaga di bawah 1,8 detik dengan log CSV siap ekspor.',
    stack: ['Node.js', 'Express', 'ESP32', 'TypeScript'],
    imageUrl: '/src/assets/images/project_iot_monitor_1794960553213.jpg',
    imageAlt: 'Prototipe modul sensor IoT dan mikrokontroler di samping monitor telemetri',
    featured: false,
    codeLanguage: 'TypeScript',
    codeFileName: 'sensorThreshold.ts',
    codeSnippet: `export interface TelemetryFrame {
  nodeId: string;
  temperatureC: number;
  humidityPct: number;
  recordedAt: string;
}

export function evaluateLabAlert(frame: TelemetryFrame) {
  if (frame.temperatureC >= 30) {
    return { level: 'warning', reason: 'Suhu ruang melebihi 30°C' } as const;
  }
  if (frame.humidityPct >= 75) {
    return { level: 'warning', reason: 'Kelembapan tinggi terdeteksi' } as const;
  }
  return { level: 'normal', reason: 'Parameter lingkungan stabil' } as const;
}`,
  },
  {
    id: 'structura-ui',
    title: 'Structura — Sistem Desain & Token UI',
    category: 'UI/UX',
    year: '2025',
    role: 'UI Systems Designer',
    summary:
      'Dokumentasi token tipografi, skala spasi 8px, dan komponen aksesibel WCAG AA sebagai fondasi aplikasi web akademik.',
    challenge:
      'Tim pengembang mahasiswa sering menghasilkan antarmuka yang tidak seragam karena belum ada standar komponen bersama.',
    solution:
      'Menyusun panduan tipografi editorial, rasio kontras warna, serta komponen tombol, formulir, dan dialog siap pakai.',
    impact: 'Mengurangi waktu penyusunan antarmuka baru hingga 55% pada proyek kolaborasi.',
    stack: ['Figma', 'Tailwind CSS', 'Accessibility', 'HTML5'],
    imageUrl: '/src/assets/images/project_ui_library_1794960553082.jpg',
    imageAlt: 'Kartu spesifikasi tipografi dan laptop menampilkan pustaka komponen Structura UI',
    featured: false,
    codeLanguage: 'CSS',
    codeFileName: 'designTokens.css',
    codeSnippet: `:root {
  --surface-canvas: #f8fafc;
  --surface-card: #ffffff;
  --ink-primary: #0f172a;
  --ink-muted: #475569;
  --accent-primary: #2563eb;
  --border-hairline: #e2e8f0;
  --radius-card: 1rem;
  --radius-control: 0.5rem;
}`,
  },
];

export interface SkillGroup {
  groupTitle: string;
  description: string;
  items: { name: string; context: string }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    groupTitle: '01. Pengembangan Antarmuka (Frontend)',
    description: 'Membangun UI yang responsif, aksesibel, dan terstruktur dengan arsitektur komponen modern.',
    items: [
      { name: 'HTML5 & CSS3 Semantik', context: 'Aksesibilitas & Grid Layout' },
      { name: 'TypeScript & JavaScript (ES2022)', context: 'Strict Typing & Modular Logic' },
      { name: 'React & Tailwind CSS', context: 'SPA & Sistem Desain Komponen' },
    ],
  },
  {
    groupTitle: '02. Sistem & Logika Backend',
    description: 'Merancang API, struktur basis data relasional, dan pemrosesan data yang andal.',
    items: [
      { name: 'Node.js & Express', context: 'RESTful API & Middleware' },
      { name: 'SQL & Pemodelan Data', context: 'Normalisasi & Query Efisien' },
      { name: 'Pengujian Unit (node:test)', context: 'Validasi Logika Deterministik' },
    ],
  },
  {
    groupTitle: '03. Desain UI/UX & Alur Kerja',
    description: 'Menjembatani rancangan visual dengan implementasi kode yang presisi dan terdokumentasi.',
    items: [
      { name: 'Figma & Wireframing', context: 'Hierarki Tipografi & Prototyping' },
      { name: 'Git & Version Control', context: 'Kolaborasi Branch & Code Review' },
      { name: 'Integrasi Perangkat IoT', context: 'Dasbor Telemetri ESP32' },
    ],
  },
];

export interface TimelineEntry {
  period: string;
  title: string;
  organization: string;
  detail: string;
}

export const TIMELINE: TimelineEntry[] = [
  {
    period: '2026 — Sekarang',
    title: 'Mahasiswa S1 Teknik Informatika',
    organization: 'NIM 261011400864',
    detail:
      'Berfokus pada algoritma, struktur data, pemrograman web modern, dan perancangan sistem informasi berbasis pengguna.',
  },
  {
    period: '2025 — 2026',
    title: 'Pengembang Web & UI Freelance',
    organization: 'Proyek Independen & Akademik',
    detail:
      'Merancang dan mengimplementasikan portal jadwal akademik, dasbor keuangan pribadi, serta sistem desain antarmuka modular.',
  },
  {
    period: '2025',
    title: 'Kontributor Riset Mini IoT Kampus',
    organization: 'Kelompok Studi Rekayasa Sistem',
    detail:
      'Membangun antarmuka pemantauan suhu dan kelembapan berbasis web yang terhubung dengan node mikrokontroler.',
  },
];

export const REACT_APP_PREVIEW_CODE = `import { useState } from 'react';

export function PortfolioCard() {
  const [selected, setSelected] = useState('Semua');
  const categories = ['Semua', 'Web App', 'UI/UX', 'Sistem'];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10 space-y-2">
        <p className="font-mono text-xs text-blue-600">
          Teknik Informatika · NIM 261011400864
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Muhammad Putra Al Thaillah
        </h1>
      </header>

      <div className="inline-flex gap-1 rounded-lg bg-slate-100 p-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={\`rounded-md px-3 py-1.5 text-sm font-medium transition-colors \${
              selected === cat
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}`;
