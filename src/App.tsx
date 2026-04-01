/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import GithubStats from './components/GithubStats';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-blue-500/30">
      <Toaster position="bottom-right" theme="system" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <GithubStats />
        <Projects />
        <Experience />
        <Certificates />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
