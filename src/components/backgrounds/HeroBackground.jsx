/**
 * HeroBackground component with animated particles
 * @module components/backgrounds/HeroBackground
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Canvas-based particle background for hero sections
 * Automatically adjusts particle count for mobile devices
 * @returns {JSX.Element} Canvas element with animated particles
 * @example
 * <div className="relative">
 *   <HeroBackground />
 *   <div className="relative z-10">Content</div>
 * </div>
 */
export const HeroBackground = () => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    const particles = [];
    let lastTime = 0;
    const fps = 30;
    const frameInterval = 1000 / fps;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Reduce particles on mobile for better performance
    const isMobile = window.innerWidth < 768;
    for (let i = 0; i < (isMobile ? 20 : 40); i++) {
      particles.push(new Particle());
    }

    const animate = (currentTime) => {
      animationId = requestAnimationFrame(animate);
      
      // Throttle to 30fps
      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-35"
      aria-hidden="true"
    />
  );
};

export default HeroBackground;
