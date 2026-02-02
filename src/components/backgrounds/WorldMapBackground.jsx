/**
 * WorldMapBackground component with animated connections
 * @module components/backgrounds/WorldMapBackground
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Canvas-based world map with animated city connections
 * Shows major tech hub cities with traveling particles
 * @returns {JSX.Element} Canvas element with animated world map
 * @example
 * <div className="relative">
 *   <WorldMapBackground />
 *   <div className="relative z-10">Content</div>
 * </div>
 */
export const WorldMapBackground = () => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let lastTime = 0;
    const fps = 24;
    const frameInterval = 1000 / fps;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const state = { w: 0, h: 0 };

    const cities = [
      { name: "San Francisco", x: 0.15, y: 0.35 },
      { name: "New York", x: 0.25, y: 0.38 },
      { name: "London", x: 0.48, y: 0.32 },
      { name: "Paris", x: 0.5, y: 0.35 },
      { name: "Dubai", x: 0.6, y: 0.42 },
      { name: "Singapore", x: 0.75, y: 0.58 },
      { name: "Tokyo", x: 0.82, y: 0.35 },
      { name: "Sydney", x: 0.85, y: 0.72 },
      { name: "São Paulo", x: 0.32, y: 0.68 },
      { name: "Mumbai", x: 0.65, y: 0.48 },
    ];

    const pairs = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
      [0, 8], [4, 9], [9, 5], [2, 4], [1, 3], [5, 7],
    ];

    const abs = (c) => ({ x: c.x * state.w, y: c.y * state.h });

    const connections = pairs.map(([a, b]) => ({
      a, b,
      speed: 0.0022 + Math.random() * 0.0028,
      particles: [],
    }));

    const resize = () => {
      state.w = window.innerWidth;
      state.h = window.innerHeight;
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;
      canvas.width = Math.floor(state.w * dpr);
      canvas.height = Math.floor(state.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawMap = () => {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.strokeStyle = "rgba(34, 211, 238, 0.14)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);

      // North America
      ctx.beginPath();
      ctx.moveTo(state.w * 0.12, state.h * 0.25);
      ctx.lineTo(state.w * 0.18, state.h * 0.22);
      ctx.lineTo(state.w * 0.28, state.h * 0.3);
      ctx.lineTo(state.w * 0.26, state.h * 0.45);
      ctx.lineTo(state.w * 0.2, state.h * 0.5);
      ctx.lineTo(state.w * 0.12, state.h * 0.42);
      ctx.closePath();
      ctx.stroke();

      // Europe
      ctx.beginPath();
      ctx.moveTo(state.w * 0.45, state.h * 0.28);
      ctx.lineTo(state.w * 0.52, state.h * 0.26);
      ctx.lineTo(state.w * 0.55, state.h * 0.32);
      ctx.lineTo(state.w * 0.5, state.h * 0.38);
      ctx.lineTo(state.w * 0.45, state.h * 0.35);
      ctx.closePath();
      ctx.stroke();

      // Asia
      ctx.beginPath();
      ctx.moveTo(state.w * 0.56, state.h * 0.25);
      ctx.lineTo(state.w * 0.75, state.h * 0.22);
      ctx.lineTo(state.w * 0.85, state.h * 0.3);
      ctx.lineTo(state.w * 0.82, state.h * 0.45);
      ctx.lineTo(state.w * 0.7, state.h * 0.52);
      ctx.lineTo(state.w * 0.58, state.h * 0.48);
      ctx.lineTo(state.w * 0.56, state.h * 0.35);
      ctx.closePath();
      ctx.stroke();

      // Australia
      ctx.beginPath();
      ctx.arc(state.w * 0.82, state.h * 0.68, state.w * 0.05, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.restore();
    };

    const drawCities = () => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (const city of cities) {
        const p = abs(city);

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 16);
        glow.addColorStop(0, "rgba(34, 211, 238, 0.32)");
        glow.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(34, 211, 238, 0.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const drawConnections = () => {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.strokeStyle = "rgba(34, 211, 238, 0.14)";
      ctx.lineWidth = 1;

      for (const c of connections) {
        const from = abs(cities[c.a]);
        const to = abs(cities[c.b]);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        if (c.particles.length < 3 && Math.random() < 0.11) {
          c.particles.push({ p: 0, o: 1 });
        }

        c.particles.forEach((pt) => {
          pt.p += c.speed;
          if (pt.p > 0.7) pt.o = Math.max(0, 1 - (pt.p - 0.7) / 0.3);

          const x = from.x + (to.x - from.x) * pt.p;
          const y = from.y + (to.y - from.y) * pt.p;

          const rad = ctx.createRadialGradient(x, y, 0, x, y, 12);
          rad.addColorStop(0, `rgba(34, 211, 238, ${pt.o * 0.7})`);
          rad.addColorStop(0.5, `rgba(168, 85, 247, ${pt.o * 0.38})`);
          rad.addColorStop(1, "rgba(34, 211, 238, 0)");

          ctx.fillStyle = rad;
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255,255,255,${pt.o})`;
          ctx.beginPath();
          ctx.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        });

        c.particles = c.particles.filter((pt) => pt.p < 1);
      }

      ctx.restore();
    };

    resize();

    const loop = (currentTime) => {
      raf = requestAnimationFrame(loop);
      
      // Throttle to 24fps
      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;
      
      ctx.clearRect(0, 0, state.w, state.h);
      drawMap();
      drawConnections();
      drawCities();
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen"
      aria-hidden="true"
    />
  );
};

export default WorldMapBackground;
