import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildStandaloneHtml,
  extractNimMetadata,
  filterProjects,
  validateContactForm,
  type ProfileSummary,
  type ProjectItem,
} from './portfolioLogic';

const sampleProjects: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Portal Akademik Terpadu',
    category: 'Web App',
    year: '2026',
    role: 'Full-Stack Developer',
    summary: 'Sistem manajemen KRS dan jadwal kuliah mahasiswa.',
    challenge: 'Akses KRS sering lambat saat jam sibuk.',
    solution: 'Optimasi query dan state caching.',
    impact: 'Waktu muat halaman turun 62%.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/img/p1.jpg',
    imageAlt: 'Portal Akademik',
    codeLanguage: 'tsx',
    codeFileName: 'ScheduleGrid.tsx',
    codeSnippet: 'export const ScheduleGrid = () => null;',
  },
  {
    id: 'p2',
    title: 'Sistem Monitoring Sensor IoT',
    category: 'Sistem',
    year: '2026',
    role: 'Embedded & Web Engineer',
    summary: 'Pemantauan suhu dan kelembapan ruangan laboratorium secara real-time.',
    challenge: 'Data sensor perlu ditampilkan dengan latensi rendah.',
    solution: 'Pipeline MQTT ke WebSocket dashboard.',
    impact: 'Pembaruan telemetri tiap 2 detik.',
    stack: ['Node.js', 'WebSocket', 'ESP32'],
    imageUrl: '/img/p2.jpg',
    imageAlt: 'IoT Monitor',
    codeLanguage: 'ts',
    codeFileName: 'telemetryStream.ts',
    codeSnippet: 'export const parseFrame = (raw: string) => JSON.parse(raw);',
  },
  {
    id: 'p3',
    title: 'Structura UI Design System',
    category: 'UI/UX',
    year: '2025',
    role: 'UI Systems Designer',
    summary: 'Pustaka komponen antarmuka modular yang aksesibel.',
    challenge: 'Inkonsistensi jarak dan kontras warna antar halaman.',
    solution: 'Menyusun token desain 8px dan komponen WCAG AA.',
    impact: 'Mempercepat pengembangan antarmuka 2x lebih konsisten.',
    stack: ['Figma', 'Tailwind CSS', 'React'],
    imageUrl: '/img/p3.jpg',
    imageAlt: 'Design System',
    codeLanguage: 'css',
    codeFileName: 'tokens.css',
    codeSnippet: ':root { --accent: #2563eb; }',
  },
];

test('filterProjects returns all items for category Semua and filters specifically', () => {
  assert.equal(filterProjects(sampleProjects, 'Semua').length, 3);
  assert.equal(filterProjects(sampleProjects, 'Web App').length, 1);
  assert.equal(filterProjects(sampleProjects, 'Sistem')[0]?.id, 'p2');
});

test('filterProjects supports search query across title and stack', () => {
  const byStack = filterProjects(sampleProjects, 'Semua', 'esp32');
  assert.equal(byStack.length, 1);
  assert.equal(byStack[0]?.id, 'p2');

  const empty = filterProjects(sampleProjects, 'UI/UX', 'mqtt');
  assert.equal(empty.length, 0);
});

test('validateContactForm rejects invalid or empty fields with clear Indonesian errors', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'bukan-email',
    subject: 'Hi',
    message: 'Pendek',
  });

  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Muhammad Putra Al Thaillah',
    email: 'putra@example.com',
    subject: 'Kolaborasi Proyek Web',
    message: 'Halo Putra, saya ingin berdiskusi mengenai proyek aplikasi kampus.',
  });

  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('extractNimMetadata parses NIM 261011400864 accurately', () => {
  const meta = extractNimMetadata('261011400864');
  assert.equal(meta.formatted, '261011400864');
  assert.equal(meta.entryYear, '2026');
  assert.equal(meta.isValidFormat, true);
});

test('buildStandaloneHtml embeds name, NIM, and all projects cleanly', () => {
  const profile: ProfileSummary = {
    fullName: 'Muhammad Putra Al Thaillah',
    nim: '261011400864',
    program: 'Teknik Informatika',
    focus: 'Full-Stack Web & UI Engineering',
    location: 'Tangerang Selatan, Indonesia',
    email: 'putra.althaillah@example.ac.id',
  };

  const html = buildStandaloneHtml(profile, sampleProjects);
  assert.ok(html.includes('Muhammad Putra Al Thaillah'));
  assert.ok(html.includes('261011400864'));
  assert.ok(html.includes('Portal Akademik Terpadu'));
  assert.ok(html.includes('/assets/aistudio/WhatsApp_Image_2026-11-18_at_07.21.09_3c98a360.jpeg'));
  assert.ok(html.includes('bg-blue-950'));
  assert.ok(html.includes('<!DOCTYPE html>'));
});
