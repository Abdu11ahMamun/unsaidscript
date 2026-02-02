/**
 * NotesNebula component - lazy loaded canvas background
 * @module components/backgrounds/NotesNebula
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Canvas-based nebula background for notes section
 * Creates a cosmic, ethereal atmosphere
 * This component is designed to be lazy-loaded
 * @returns {JSX.Element} Canvas element with animated nebula effect
 * @example
 * const NotesNebula = lazy(() => import('./NotesNebula'));
 * <Suspense fallback={<div>Loading...</div>}>
 *   <NotesNebula />
 * </Suspense>
 */
export const NotesNebula = () => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let lastTime = 0;
    const fps = 20;
    const frameInterval = 1000 / fps;
    const stars = [];
    const nebulaClouds = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    // Create stars - reduced count for performance
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 20 : 40;
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Create nebula clouds - reduced count
    for (let i = 0; i < 3; i++) {
      nebulaClouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 100,
        color: i % 2 === 0 ? "purple" : "cyan",
        opacity: Math.random() * 0.15 + 0.05,
        drift: (Math.random() - 0.5) * 0.1,
      });
    }

    let time = 0;

    const animate = (currentTime) => {
      animationId = requestAnimationFrame(animate);
      
      // Throttle to 20fps
      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;
      
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebula clouds
      nebulaClouds.forEach((cloud) => {
        cloud.x += cloud.drift;
        if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius;

        const gradient = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          cloud.radius
        );

        if (cloud.color === "purple") {
          gradient.addColorStop(0, `rgba(168, 85, 247, ${cloud.opacity})`);
          gradient.addColorStop(0.5, `rgba(139, 92, 246, ${cloud.opacity * 0.5})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          gradient.addColorStop(0, `rgba(34, 211, 238, ${cloud.opacity})`);
          gradient.addColorStop(0.5, `rgba(6, 182, 212, ${cloud.opacity * 0.5})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw stars with twinkling effect
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);

        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
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
      className="pointer-events-none absolute inset-0 opacity-60"
      aria-hidden="true"
    />
  );
};

export default NotesNebula;
