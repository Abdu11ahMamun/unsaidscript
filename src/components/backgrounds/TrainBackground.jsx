/**
 * TrainBackground component with animated train
 * @module components/backgrounds/TrainBackground
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Canvas-based background with animated train on tracks
 * Creates a calming, journey-like atmosphere
 * @returns {JSX.Element} Canvas element with animated train
 * @example
 * <div className="relative">
 *   <TrainBackground />
 *   <div className="relative z-10">Content</div>
 * </div>
 */
export const TrainBackground = () => {
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
    const st = { w: 0, h: 0, t: 0 };

    const resize = () => {
      st.w = window.innerWidth;
      st.h = window.innerHeight;
      canvas.style.width = `${st.w}px`;
      canvas.style.height = `${st.h}px`;
      canvas.width = Math.floor(st.w * dpr);
      canvas.height = Math.floor(st.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const tracks = Array.from({ length: 10 }, (_, i) => ({
      y: 0.56 + i * 0.025,
      a: 0.16 - i * 0.012,
    }));

    const train = { x: -0.35, y: 0.64, v: 0.0012, w: 0.14, h: 0.035 };

    const draw = (currentTime) => {
      raf = requestAnimationFrame(draw);
      
      // Throttle to 24fps
      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;
      
      st.t += 1;
      ctx.clearRect(0, 0, st.w, st.h);

      // Background gradient
      const g = ctx.createRadialGradient(
        st.w * 0.5,
        st.h * 0.25,
        0,
        st.w * 0.55,
        st.h * 0.45,
        Math.max(st.w, st.h)
      );
      g.addColorStop(0, "rgba(34,211,238,0.07)");
      g.addColorStop(0.55, "rgba(168,85,247,0.05)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, st.w, st.h);

      // Draw tracks
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (const tr of tracks) {
        const y = st.h * tr.y;
        const a = tr.a;
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(st.w * 0.05, y);
        ctx.bezierCurveTo(
          st.w * 0.25,
          y - st.h * 0.08,
          st.w * 0.75,
          y + st.h * 0.08,
          st.w * 0.95,
          y
        );
        ctx.stroke();
      }
      ctx.restore();

      // Update train position
      train.x += train.v;
      if (train.x > 1.25) train.x = -0.35;

      const tx = st.w * train.x;
      const ty = st.h * train.y;
      const tw = st.w * train.w;
      const th = st.h * train.h;

      // Draw train
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = "rgba(34,211,238,0.10)";
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;

      const r = Math.min(18, th * 0.5);
      ctx.beginPath();
      ctx.roundRect(tx, ty, tw, th, r);
      ctx.fill();
      ctx.stroke();

      // Draw windows
      const ww = tw * 0.08;
      const gap = tw * 0.03;
      let wx = tx + tw * 0.1;
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = "rgba(168,85,247,0.09)";
        ctx.beginPath();
        ctx.roundRect(wx, ty + th * 0.22, ww, th * 0.56, 6);
        ctx.fill();
        wx += ww + gap;
      }

      // Draw headlight
      ctx.fillStyle = "rgba(236,72,153,0.10)";
      ctx.beginPath();
      ctx.arc(tx + tw + th * 0.25, ty + th * 0.5, th * 0.55, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-70"
      aria-hidden="true"
    />
  );
};

export default TrainBackground;
