import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const NotesNebulaCanvas = ({ intensity = 1 }) => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const state = { w: 0, h: 0, t: 0, mx: 0.5, my: 0.5 };

    const setSize = () => {
      const w = canvas.parentElement?.clientWidth ?? window.innerWidth;
      const h = canvas.parentElement?.clientHeight ?? 600;
      state.w = w;
      state.h = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    const rand = (a, b) => a + Math.random() * (b - a);

    const particles = Array.from({ length: Math.floor(120 * intensity) }, () => ({
      x: rand(-1, 1),
      y: rand(-1, 1),
      z: rand(0.15, 1.0),
      r: rand(0.6, 2.4),
      vx: rand(-0.0012, 0.0012),
      vy: rand(-0.0012, 0.0012),
      hue: rand(185, 290),
      tw: rand(0.4, 1.4),
    }));

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      state.mx = (e.clientX - rect.left) / rect.width;
      state.my = (e.clientY - rect.top) / rect.height;
    };

    canvas.addEventListener("pointermove", onMove, { passive: true });

    const draw = () => {
      state.t += 1;

      ctx.clearRect(0, 0, state.w, state.h);

      const g = ctx.createRadialGradient(
        state.w * (0.25 + 0.5 * state.mx),
        state.h * (0.25 + 0.5 * state.my),
        0,
        state.w * 0.55,
        state.h * 0.55,
        Math.max(state.w, state.h)
      );
      g.addColorStop(0, "rgba(34,211,238,0.10)");
      g.addColorStop(0.45, "rgba(168,85,247,0.08)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, state.w, state.h);

      const v = ctx.createLinearGradient(0, 0, 0, state.h);
      v.addColorStop(0, "rgba(0,0,0,0.65)");
      v.addColorStop(0.35, "rgba(0,0,0,0.25)");
      v.addColorStop(1, "rgba(0,0,0,0.70)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, state.w, state.h);

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.015;

        if (p.x < -1.2) p.x = 1.2;
        if (p.x > 1.2) p.x = -1.2;
        if (p.y < -1.2) p.y = 1.2;
        if (p.y > 1.2) p.y = -1.2;

        const parx = (state.mx - 0.5) * 0.18;
        const pary = (state.my - 0.5) * 0.18;

        const px = (p.x + parx * (1 - p.z)) * (state.w * 0.48) + state.w * 0.5;
        const py = (p.y + pary * (1 - p.z)) * (state.h * 0.48) + state.h * 0.5;
        const pr = p.r * (0.6 + (1 - p.z) * 1.2) * (0.75 + 0.25 * Math.sin(p.tw));

        const alpha = 0.18 + (1 - p.z) * 0.25;
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    draw();

    let rr = 0;
    const onResize = () => {
      cancelAnimationFrame(rr);
      rr = requestAnimationFrame(() => setSize());
    };

    window.addEventListener("resize", onResize);
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rr);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion, intensity]);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-75" aria-hidden="true" />;
};

export default NotesNebulaCanvas;
