/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AboutSkillsSection } from './components/AboutSkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { SourceCodeModal } from './components/SourceCodeModal';
import type { ProjectItem } from './utils/portfolioLogic';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [sourceModalOpen, setSourceModalOpen] = useState(false);

  const handleContactClick = () => {
    const contactEl = document.getElementById('kontak');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    const nameInput = document.getElementById('contact-name');
    if (nameInput instanceof HTMLInputElement) {
      nameInput.focus({ preventScroll: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#EFF6FF] text-[#0B1D45] flex flex-col">
      <Header onContactClick={handleContactClick} />

      <main className="flex-1">
        <HeroSection onOpenSourceCode={() => setSourceModalOpen(true)} />
        <MarqueeRibbon />
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        <AboutSkillsSection />
        <ContactSection />
      </main>

      <Footer onOpenSourceCode={() => setSourceModalOpen(true)} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <SourceCodeModal
        isOpen={sourceModalOpen}
        onClose={() => setSourceModalOpen(false)}
      />
    </div>
  );
}
