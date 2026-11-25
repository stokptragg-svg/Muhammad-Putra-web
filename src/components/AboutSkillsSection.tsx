import { PROFILE, SKILL_GROUPS, TIMELINE } from '../data/portfolioData';

export function AboutSkillsSection() {
  return (
    <section id="tentang" className="border-y border-blue-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left column: Tentang & Perjalanan Akademik */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <p className="font-mono text-xs font-medium text-blue-700">
                Profil Mahasiswa · NIM {PROFILE.nim}
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-blue-950">
                Pendekatan Rekayasa &amp; Latar Belakang
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                Saya {PROFILE.fullName}, mahasiswa {PROFILE.program} angkatan 2026 yang tertarik
                pada pertemuan antara desain visual yang terstruktur dan rekayasa perangkat lunak
                yang efisien. Setiap proyek dibangun dengan memprioritaskan keterbacaan kode,
                performa peramban, dan kenyamanan pengguna.
              </p>
            </div>

            <div className="space-y-1 pt-2">
              <h3 className="font-display text-base font-semibold text-blue-950 pb-3">
                Linimasa Akademik &amp; Aktivitas
              </h3>
              <div className="divide-y divide-blue-100 border-t border-blue-200">
                {TIMELINE.map((entry) => (
                  <div key={entry.title} className="py-5 space-y-1.5">
                    <p className="font-mono text-xs text-blue-700/80 tabular-nums">
                      {entry.period} · {entry.organization}
                    </p>
                    <h4 className="font-display text-lg font-semibold text-blue-950">
                      {entry.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-600">{entry.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Keahlian Teknis */}
          <div id="keahlian" className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <p className="font-mono text-xs font-medium text-blue-700">Kompetensi Teknis</p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-blue-950">
                Teknologi &amp; Alat Kerja
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                Tumpukan teknologi yang saya gunakan sehari-hari untuk membangun aplikasi web
                modern, menguji logika bisnis, dan mendokumentasikan antarmuka.
              </p>
            </div>

            <div className="divide-y divide-blue-100 border-t border-blue-200">
              {SKILL_GROUPS.map((group) => (
                <div key={group.groupTitle} className="py-6 space-y-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-blue-950">
                      {group.groupTitle}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{group.description}</p>
                  </div>

                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-baseline justify-between gap-4 text-sm"
                      >
                        <span className="font-medium text-blue-950">{item.name}</span>
                        <span className="text-right text-xs text-blue-800/70">{item.context}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
