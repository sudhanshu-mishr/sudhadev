
import React, { useState } from 'react';
import { 
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SterlingGateKineticNavigation } from "./components/ui/sterling-gate-kinetic-navigation.tsx";
import { RevolutionHero } from "./components/ui/revolution-hero.tsx";
import { PulseBeams } from "./components/ui/pulse-beams.tsx";
import { AetherHero } from "./components/ui/aether-hero.tsx";
import LiquidMetalHero from "./components/ui/liquid-metal-hero.tsx";
import { ShaderAnimation } from "./components/ui/shader-animation.tsx";
import { GlowingButton } from "./components/ui/glowing-button.tsx";
import { CardStack, CardStackItem } from "./components/ui/card-stack.tsx";
import HeroText from "./components/ui/hero-shutter-text.tsx";
import { Discipline, Project } from "./types.ts";

const PROJECTS: Project[] = [
  {
    id: '1',
    title: '8-bit ALU Design',
    category: 'VLSI',
    description: 'Custom implementation of an Arithmetic Logic Unit using Verilog, optimized for timing and area.',
    tags: ['Verilog', 'Cadence', 'FPGA'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'CloudSaaS Platform',
    category: 'Software',
    description: 'A full-stack enterprise platform handling real-time data synchronization for 10k+ concurrent users.',
    tags: ['React', 'TypeScript', 'Node.js', 'Redis'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'The Silicon Frontier',
    category: 'Writing',
    description: 'A series of investigative essays on the future of neuromorphic computing and chip architecture.',
    tags: ['Technical Writing', 'Journalism'],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'RISC-V Core Implementation',
    category: 'VLSI',
    description: '5-stage pipeline RISC-V processor architecture designed from scratch with formal verification.',
    tags: ['SystemVerilog', 'RTL', 'Python'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  }
];

const EXPERTISE_BEAMS = [
  {
    path: "M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: { x1: ["0%", "0%", "200%"], x2: ["0%", "0%", "180%"], y1: ["80%", "0%", "0%"], y2: ["100%", "20%", "20%"] },
      transition: { duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 2 }
    }
  },
  {
    path: "M568 200H841C846.523 200 851 195.523 851 190V40",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: { x1: ["20%", "100%", "100%"], x2: ["0%", "90%", "90%"], y1: ["80%", "80%", "-20%"], y2: ["100%", "100%", "0%"] },
      transition: { duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }
    }
  }
];

const DISCIPLINE_ITEMS: CardStackItem[] = [
  {
    id: Discipline.VLSI,
    title: Discipline.VLSI,
    description: "Architecting the backbone of modern computing. Expert in RTL design, FPGA prototyping, and ASIC verification pipelines.",
    imageSrc: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200",
    glowColor: 'blue'
  },
  {
    id: Discipline.Software,
    title: Discipline.Software,
    description: "Building resilient distributed systems. Specialized in React ecosystems, low-latency backends, and full-stack performance optimization.",
    imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200",
    glowColor: 'purple'
  },
  {
    id: Discipline.Athletics,
    title: Discipline.Athletics,
    description: "Performance in every dimension. Applying the elite discipline of competitive athletics to engineering precision and mental clarity.",
    imageSrc: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
    glowColor: 'orange'
  },
  {
    id: Discipline.Writing,
    title: Discipline.Writing,
    description: "Narrating the technological shift. Crafting compelling stories and deep-dive technical investigations into the silicon frontier.",
    imageSrc: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200",
    glowColor: 'green'
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'VLSI' | 'Software' | 'Writing'>('All');
  const filteredProjects = activeTab === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeTab);

  const handleContact = () => {
    window.open("https://github.com/sudhanshu-mishr", "_blank");
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-blue-500/30">
      {/* Fixed Background Shader */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <ShaderAnimation />
      </div>

      <SterlingGateKineticNavigation />

      <main className="relative z-10">
        {/* Primary Hero - Fully Translucent */}
        <div className="relative border-b border-white/5 bg-black/40 backdrop-blur-sm">
          <RevolutionHero />
        </div>

        {/* Expertise Section - Interactive Card Stack */}
        <section id="expertise" className="relative py-32 bg-black/60 backdrop-blur-3xl border-b border-white/5">
          <div className="absolute inset-0 z-0 opacity-20">
            <PulseBeams beams={EXPERTISE_BEAMS} />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl font-black mb-6 tracking-tight text-white uppercase italic">Core Disciplines</h2>
              <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
              <p className="mt-8 text-slate-400 max-w-2xl mx-auto font-medium text-lg italic tracking-tight">
                A polymathic approach to complex problem-solving, fanned across the digital and physical domains.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <CardStack 
                items={DISCIPLINE_ITEMS}
                autoAdvance
                intervalMs={4000}
                cardWidth={600}
                cardHeight={380}
                spreadDeg={35}
                overlap={0.5}
                showDots
              />
            </div>
          </div>
        </section>

        {/* Transitional Aether Hero with Shutter Text Animation */}
        <section className="relative h-[70vh] border-y border-white/5 overflow-hidden">
          <AetherHero 
            title="" 
            subtitle=""
            align="center"
            height="100%"
            className="bg-black/50 backdrop-blur-md"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-full max-w-5xl pointer-events-auto">
              <HeroText 
                text="ENGINEERING IMPACT" 
                transparent 
                autoLoop
                loopInterval={4000}
                className="scale-90 md:scale-100"
              />
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-center text-slate-400 mt-4 text-xl font-medium italic tracking-widest uppercase px-4"
              >
                Selected works across digital and silicon frontiers.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Projects Section - Deep Glass Cards */}
        <section id="projects" className="py-32 bg-black/70 backdrop-blur-[60px] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
              <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Project Archives</h2>
              <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
                {['All', 'VLSI', 'Software', 'Writing'].map((tab) => (
                  <GlowingButton
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    glowColor={activeTab === tab ? "#2563eb" : "#475569"}
                    className={activeTab === tab ? "opacity-100" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"}
                  >
                    {tab}
                  </GlowingButton>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-[3rem] overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/20 backdrop-blur-2xl transition-all duration-700 shadow-2xl"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out brightness-75 group-hover:brightness-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  </div>
                  <div className="p-12 relative">
                    <span className="text-[10px] font-black py-1.5 px-4 bg-blue-600 text-white rounded-full mb-6 inline-block tracking-[0.3em] uppercase italic">{project.category}</span>
                    <h3 className="text-4xl font-black mb-4 text-white tracking-tight group-hover:text-blue-400 transition-colors uppercase italic leading-none">{project.title}</h3>
                    <p className="text-slate-400 mb-8 line-clamp-2 leading-relaxed font-medium text-lg">{project.description}</p>
                    <GlowingButton glowColor="#2563eb" className="group/btn h-12">
                      <span className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] italic">
                        Analyze Case <ArrowRight size={16} className="text-blue-500 group-hover/btn:translate-x-2 transition-transform" />
                      </span>
                    </GlowingButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Contact Section - Interactive Glass Liquid Metal */}
        <section id="contact" className="relative border-b border-white/5">
          <LiquidMetalHero
            badge="✨ READY FOR THE NEXT LEAP"
            title="Architecting the Future."
            subtitle="I bring a performance-first mindset to every layer of the stack."
            primaryCtaLabel="Initiate Contact"
            secondaryCtaLabel="Review Source"
            onPrimaryCtaClick={handleContact}
            onSecondaryCtaClick={() => window.open('https://github.com/sudhanshu-mishr', '_blank')}
            features={[
              "Hardware Acceleration",
              "Low-Latency Architectures", 
              "High-Fidelity Technical Writing"
            ]}
            className="bg-black/80 backdrop-blur-2xl"
          />
        </section>
      </main>

      {/* Footer - Final Translucent Layer */}
      <footer className="py-20 bg-black/90 backdrop-blur-3xl relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-3xl text-white uppercase italic leading-none mb-2">SUDHANSHU.DEV</span>
            <span className="text-slate-500 text-sm font-bold tracking-widest uppercase">Engineer. Athlete. Writer.</span>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] leading-relaxed">
              System Design & Visualization by <span className="text-blue-500">Three.js</span>
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              &copy; 2025 Sudhanshu Polymath // Integrated High-Performance Stack
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
