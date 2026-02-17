
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { GlowingButton } from "./glowing-button.tsx";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function SterlingGateKineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
      }
    } catch (e) {
      console.warn("CustomEase failed, falling back to power2.", e);
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");
        const onEnter = () => {
             shapesContainer!.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
             shape.classList.add("active");
             gsap.fromTo(shapeEls, 
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
             );
        };
        const onLeave = () => {
            gsap.to(shapeEls, {
                scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: () => shape.classList.remove("active"),
                overwrite: "auto"
            });
        };
        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        (item as any)._cleanup = () => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
        ctx.revert();
        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
            items.forEach((item: any) => item._cleanup && item._cleanup());
        }
    };
  }, []);

  useEffect(() => {
      if (!containerRef.current) return;
      const ctx = gsap.context(() => {
        const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
        const menu = containerRef.current!.querySelector(".menu-content");
        const overlay = containerRef.current!.querySelector(".overlay");
        const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
        const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
        const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
        const menuButton = containerRef.current!.querySelector(".nav-close-btn");
        const menuButtonTexts = menuButton?.querySelectorAll("p");
        const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

        const tl = gsap.timeline();
        const mainEase = gsap.parseEase("main") || "power2.inOut";
        
        if (isMenuOpen) {
            if (navWrap) navWrap.setAttribute("data-nav", "open");
            tl.set(navWrap, { display: "block" })
              .set(menu, { xPercent: 0 }, "<")
              .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2, ease: mainEase })
              .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315, ease: mainEase }, "<")
              .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, "<")
              .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.1, duration: 0.6, ease: mainEase }, "<")
              .fromTo(menuLinks, { yPercent: 140, rotate: 5 }, { yPercent: 0, rotate: 0, stagger: 0.04, duration: 0.5, ease: mainEase }, "<+=0.3");
            if (fadeTargets.length) {
                tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 30 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
            }
        } else {
            if (navWrap) navWrap.setAttribute("data-nav", "closed");
            tl.to(overlay, { autoAlpha: 0, duration: 0.4 })
              .to(menu, { xPercent: 120, duration: 0.5, ease: "power2.in" }, "<")
              .to(menuButtonTexts, { yPercent: 0, duration: 0.4 }, "<")
              .to(menuButtonIcon, { rotate: 0, duration: 0.4 }, "<")
              .set(navWrap, { display: "none" });
        }
      }, containerRef);
      return () => ctx.revert();
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  return (
    <div ref={containerRef}>
        <div className="site-header-wrapper">
          <nav className="nav-row">
            <a href="#" className="flex items-center gap-2 group pointer-events-auto">
               <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">S</div>
               <span className="font-bold tracking-tight text-xl hidden sm:block">SUDHANSHU.DEV</span>
            </a>
            <div className="nav-row__right">
              <div className="nav-toggle-label" onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
                <span className="toggle-text">Explore</span>
              </div>
              <GlowingButton 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                glowColor="#2563eb"
                className="nav-close-btn pointer-events-auto h-12 bg-transparent"
              >
                <div className="flex items-center gap-3">
                    <div className="menu-button-text">
                        <p>Menu</p>
                        <p>Close</p>
                    </div>
                    <div className="icon-wrap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" className="menu-button-icon">
                            <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor"></path>
                            <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor"></path>
                        </svg>
                    </div>
                </div>
              </GlowingButton>
            </div>
          </nav>
        </div>

      <section className="fullscreen-menu-container">
        <div className="nav-overlay-wrapper">
          <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>
          <nav className="menu-content">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>
              <div className="ambient-background-shapes">
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(99,102,241,0.15)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(139,92,246,0.12)" />
                </svg>
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(99,102,241,0.2)" strokeWidth="60" fill="none" />
                </svg>
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="200" cy="200" r="100" fill="rgba(236,72,153,0.05)" />
                </svg>
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200" fill="rgba(99,102,241,0.1)" />
                </svg>
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(139,92,246,0.12)" strokeWidth="30" />
                </svg>
              </div>
            </div>
            <div className="menu-content-wrapper">
              <ul className="menu-list">
                <li className="menu-list-item" data-shape="1">
                  <a href="#about" onClick={() => setIsMenuOpen(false)} className="nav-link">About</a>
                </li>
                <li className="menu-list-item" data-shape="2">
                  <a href="#expertise" onClick={() => setIsMenuOpen(false)} className="nav-link">Expertise</a>
                </li>
                <li className="menu-list-item" data-shape="3">
                  <a href="#projects" onClick={() => setIsMenuOpen(false)} className="nav-link">Projects</a>
                </li>
                <li className="menu-list-item" data-shape="4">
                  <a href="#contact" onClick={() => setIsMenuOpen(false)} className="nav-link" data-menu-fade>Contact</a>
                </li>
                <li className="menu-list-item" data-shape="5">
                  <a href="#" onClick={() => setIsMenuOpen(false)} className="nav-link">Resume</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
