import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Book,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  Clock,
  Code,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Play,
  Rocket,
  Sparkles,
  Star,
  Terminal,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

// Lazy loaded components
const NotesNebulaCanvas = lazy(() => import('./NotesNebulaCanvas'));

// Utility functions
const cn = (...classes) => classes.filter(Boolean).join(" ");
const ratingToStars = (rating) => Math.round((Math.max(0, Math.min(10, rating)) / 10) * 5);

const safeCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
};

// Layout Components
const Section = ({ id, className, children }) => (
  <section id={id} className={cn("relative", className)}>
    {children}
  </section>
);

const Container = ({ className, children }) => (
  <div className={cn("mx-auto w-full max-w-7xl px-6", className)}>{children}</div>
);

const GradientText = ({ className, children, gradient = "from-cyan-400 via-blue-500 to-purple-600" }) => (
  <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", gradient, className)}>{children}</span>
);

const Card = ({ className, hover = true, children }) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl",
      hover && "transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-cyan-500/10",
      className
    )}
  >
    {children}
  </div>
);

// Global Styles
const GlobalStyles = () => (
  <style>{`
    @keyframes float { 0%,100%{ transform: translateY(0px);} 50%{ transform: translateY(-20px);} }
    @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
    @keyframes caretBlink { 0%,45%{ opacity:1;} 46%,100%{ opacity:0;} }

    .animate-float { animation: float 6s ease-in-out infinite; }

    ::selection { background: rgba(34, 211, 238, 0.3); color: white; }

    .text-shimmer {
      background: linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4);
      background-size: 200% auto;
      animation: shimmer 3s linear infinite;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .term {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }

    .caret { animation: caretBlink 1s steps(2, jump-none) infinite; }

    .term-scanlines::before {
      content: "";
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.06) 0px,
        rgba(255,255,255,0.02) 2px,
        rgba(0,0,0,0) 4px
      );
      opacity: .10;
      pointer-events: none;
      mix-blend-mode: overlay;
    }

    .term-glow {
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.10) inset,
        0 0 40px rgba(34,211,238,0.10),
        0 0 60px rgba(168,85,247,0.08);
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-float,
      .text-shimmer,
      .caret { animation: none !important; }
      .caret { opacity: 1; }
    }
  `}</style>
);

// Hero Background with particles
const HeroBackground = () => {
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

    const isMobile = window.innerWidth < 768;
    for (let i = 0; i < (isMobile ? 50 : 100); i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />;
};

// World Map Background
const WorldMapBackground = () => {
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

        if (c.particles.length < 3 && Math.random() < 0.11) c.particles.push({ p: 0, o: 1 });

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

    const loop = () => {
      ctx.clearRect(0, 0, state.w, state.h);
      drawMap();
      drawConnections();
      drawCities();
      raf = requestAnimationFrame(loop);
    };

    loop();
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

// Train Background
const TrainBackgroundCanvas = () => {
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

    const draw = () => {
      st.t += 1;
      ctx.clearRect(0, 0, st.w, st.h);

      const g = ctx.createRadialGradient(st.w * 0.5, st.h * 0.25, 0, st.w * 0.55, st.h * 0.45, Math.max(st.w, st.h));
      g.addColorStop(0, "rgba(34,211,238,0.07)");
      g.addColorStop(0.55, "rgba(168,85,247,0.05)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, st.w, st.h);

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (const tr of tracks) {
        const y = st.h * tr.y;
        const a = tr.a;
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(st.w * 0.05, y);
        ctx.bezierCurveTo(st.w * 0.25, y - st.h * 0.08, st.w * 0.75, y + st.h * 0.08, st.w * 0.95, y);
        ctx.stroke();
      }
      ctx.restore();

      train.x += train.v;
      if (train.x > 1.25) train.x = -0.35;

      const tx = st.w * train.x;
      const ty = st.h * train.y;
      const tw = st.w * train.w;
      const th = st.h * train.h;

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

      ctx.fillStyle = "rgba(236,72,153,0.10)";
      ctx.beginPath();
      ctx.arc(tx + tw + th * 0.25, ty + th * 0.5, th * 0.55, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-70" aria-hidden="true" />;
};

// Intro Loader
const IntroLoader = ({ show }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
        >
          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <div className="text-5xl font-black md:text-6xl">
                <span className="text-shimmer">UnsaidScript</span>
              </div>
              <div className="mt-2 text-sm font-semibold text-gray-400">by Abdullah</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
              className="relative"
            >
              <div className="h-14 w-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/70"
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                style={{ borderTopColor: "rgba(0,0,0,0)", borderRightColor: "rgba(0,0,0,0)" }}
              />
            </motion.div>

            <div className="term text-xs text-gray-500">initializing vibe…</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

// Role Type Animation
const RoleType = ({ roles }) => {
  const prefersReducedMotion = useReducedMotion();
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [dir, setDir] = useState("type");

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(roles[0] ?? "");
      return;
    }

    const current = roles[i] ?? "";
    let t;

    if (dir === "type") {
      t = window.setTimeout(() => {
        const next = current.slice(0, typed.length + 1);
        setTyped(next);
        if (next.length >= current.length) setDir("hold");
      }, 28);
    } else if (dir === "hold") {
      t = window.setTimeout(() => setDir("erase"), 950);
    } else {
      t = window.setTimeout(() => {
        const next = typed.slice(0, -1);
        setTyped(next);
        if (next.length === 0) {
          setI((v) => (v + 1) % roles.length);
          setDir("type");
        }
      }, 18);
    }

    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [dir, i, prefersReducedMotion, roles, typed]);

  return (
    <span className="inline-flex items-center gap-2 term">
      <span className="text-gray-500">{">"}</span>
      <span className="text-cyan-300">{typed}</span>
      <span className="caret -ml-1 text-cyan-200">▮</span>
    </span>
  );
};

// Terminal Panel
const TerminalPanel = () => {
  const prefersReducedMotion = useReducedMotion();

  const script = useMemo(
    () => [
      {
        cmd: "$ whoami",
        out: [
          { t: "Abdullah Al Mamun", c: "text-cyan-200" },
          { t: "Software Engineer • Researcher • Reader • Believer", c: "text-purple-200" },
          { t: "brand: UnsaidScript", c: "text-emerald-200" },
        ],
      },
      {
        cmd: '$ echo "signal"',
        out: [
          { t: "shipping calm UI with strong systems", c: "text-emerald-200" },
          { t: "writing notes that stay useful", c: "text-gray-400" },
        ],
      },
      {
        cmd: "$ git status",
        out: [
          { t: "On branch main", c: "text-gray-200" },
          { t: "nothing to commit, working tree clean", c: "text-emerald-200" },
        ],
      },
      {
        cmd: "$ npm test",
        out: [
          { t: "PASS  ui/portfolio.spec.ts", c: "text-emerald-200" },
          { t: "✓ 18 tests passed", c: "text-cyan-200" },
          { t: "Time: 0.98s", c: "text-gray-400" },
        ],
      },
      {
        cmd: "$ focus --now",
        out: [
          { t: "→ ship clean UI + fast UX", c: "text-pink-200" },
          { t: "→ write notes like poems (but useful)", c: "text-purple-200" },
        ],
      },
    ],
    []
  );

  const [block, setBlock] = useState(0);
  const [typed, setTyped] = useState("");
  const [doneCmd, setDoneCmd] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(script[block]?.cmd ?? "");
      setDoneCmd(true);
      return;
    }

    const cmd = script[block]?.cmd ?? "";
    setTyped("");
    setDoneCmd(false);

    let i = 0;
    const type = window.setInterval(() => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        window.clearInterval(type);
        setDoneCmd(true);
      }
    }, 20);

    return () => window.clearInterval(type);
  }, [block, prefersReducedMotion, script]);

  useEffect(() => {
    if (!doneCmd) return;

    const t = window.setTimeout(() => {
      setBlock((b) => (b + 1) % script.length);
    }, prefersReducedMotion ? 2300 : 3300);

    return () => window.clearTimeout(t);
  }, [doneCmd, prefersReducedMotion, script.length]);

  const current = script[block];

  return (
    <Card className="term term-glow term-scanlines relative mx-auto mt-10 max-w-4xl overflow-hidden p-0">
      <div className="relative border-b border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
            <Terminal size={16} className="text-cyan-300" aria-hidden="true" />
            <span className="text-gray-200">dev@unsaid</span>
            <span className="text-gray-500">—</span>
            <span className="text-gray-400">zsh</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
        </div>
      </div>

      <div className="relative px-6 py-5">
        <div className="text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-emerald-300">➜</span>
            <span className="text-cyan-300">~/uns</span>
            <span className="text-purple-300">git:(main)</span>
            <span className="text-gray-100">{typed}</span>
            <span className="caret -ml-1 text-gray-100">▮</span>
          </div>

          <AnimatePresence initial={false}>
            {doneCmd ? (
              <motion.div
                key={block}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-4 space-y-1"
              >
                {current.out.map((line, idx) => (
                  <div key={idx} className={cn("text-sm", line.c)}>
                    {line.t}
                  </div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-5 text-xs text-gray-500">
            Tip: jump to <span className="text-gray-300">Notes</span> for the nebula vibe.
          </div>
        </div>
      </div>
    </Card>
  );
};

// Stat Card
const StatCard = ({ icon: Icon, value, label, gradient }) => (
  <motion.div whileHover={{ scale: 1.05, y: -5 }} className="relative">
    <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-r opacity-20 blur-xl", gradient)} />
    <Card className="relative p-6 text-center">
      <Icon className="mx-auto mb-3 h-8 w-8 text-cyan-400" />
      <div className={cn("text-4xl font-black bg-gradient-to-r bg-clip-text text-transparent", gradient)}>{value}</div>
      <div className="mt-2 text-sm text-gray-400">{label}</div>
    </Card>
  </motion.div>
);

// Service Card
const ServiceCard = ({ icon: Icon, title, description, features, gradient }) => (
  <motion.div whileHover={{ y: -8 }} className="group relative">
    <div
      className={cn(
        "absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-opacity group-hover:opacity-20",
        gradient
      )}
    />
    <Card className="h-full p-8">
      <div className={cn("inline-flex rounded-2xl p-4 bg-gradient-to-r", gradient)}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-gray-400">{description}</p>
      <ul className="mt-6 space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  </motion.div>
);

// Book Card
const BookCard = ({ book, onClick }) => (
  <motion.div whileHover={{ y: -8 }} className="group relative cursor-pointer" onClick={onClick}>
    <div
      className={cn(
        "absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-opacity group-hover:opacity-30",
        book.gradient
      )}
    />
    <Card className="h-full overflow-hidden">
      <div className={cn("relative h-64 bg-gradient-to-br p-8", book.gradient)}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="text-right">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold backdrop-blur-sm">
              {book.category}
            </span>
          </div>
          <div>
            <div className="text-8xl">{book.emoji}</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white line-clamp-2">{book.title}</h3>
        <p className="mt-2 text-sm text-gray-400">{book.author}</p>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={cn(i < ratingToStars(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600")}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-300">{book.rating}/10</span>
        </div>

        <p className="mt-4 text-sm text-gray-300 line-clamp-3">{book.summary}</p>

        <div className="mt-6 flex items-center justify-between">
          <button className={cn("text-sm font-bold bg-gradient-to-r bg-clip-text text-transparent", book.gradient)}>
            Read Review →
          </button>
          <Clock className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </Card>
  </motion.div>
);

// Blog Card
const BlogCard = ({ post, onClick }) => (
  <motion.div whileHover={{ y: -8 }} className="group relative cursor-pointer" onClick={onClick}>
    <div
      className={cn(
        "absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-opacity group-hover:opacity-25",
        post.gradient
      )}
    />
    <Card className="h-full overflow-hidden">
      <div className={cn("relative h-48 bg-gradient-to-br", post.gradient)}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex h-full items-center justify-center p-6 text-center">
          <h3 className="text-2xl font-black text-white line-clamp-3">{post.title}</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-300 line-clamp-3">{post.excerpt}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className={cn("mt-6 text-sm font-bold bg-gradient-to-r bg-clip-text text-transparent", post.gradient)}>
          Read Article →
        </button>
      </div>
    </Card>
  </motion.div>
);

// Project Card
const ProjectCard = ({ project }) => (
  <motion.div whileHover={{ y: -8 }} className="group relative">
    <div
      className={cn(
        "absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-opacity group-hover:opacity-25",
        project.gradient
      )}
    />
    <Card className="overflow-hidden">
      <div className={cn("relative h-56 bg-gradient-to-br", project.gradient)}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex h-full items-center justify-center">
          <div className="text-7xl animate-float">{project.emoji}</div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex gap-3">
            <a
              href={project.demo}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <Play size={18} />
            </a>
            <a
              href={project.github}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-gray-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech, idx) => (
            <span
              key={idx}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5" />
              {project.stars}
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {project.users}
            </div>
          </div>
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
    </Card>
  </motion.div>
);

// Modal
const Modal = ({ open, onClose, title, subtitle, copyText, children }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!copyText) return;
    await safeCopy(copyText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <Card className="p-8">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-3xl font-black text-white">{title}</h2>
                  {subtitle ? <p className="mt-1 text-sm text-gray-400">{subtitle}</p> : null}
                </div>
                {copyText ? (
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-gray-200 transition hover:bg-white/10"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                ) : null}
              </div>

              <div className="mt-6 text-gray-300">{children}</div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function buildNoteCopy(n) {
  const lines = [`# ${n.title}`, n.subtitle, "", "Key points:", ...n.bullets.map((b) => `- ${b}`)];
  return lines.join("\n");
}

// Main App Component
export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = window.setTimeout(() => setShowLoader(false), prefersReducedMotion ? 150 : 1400);
    return () => window.clearTimeout(t);
  }, [prefersReducedMotion]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with the latest technologies.",
      features: ["React & Next.js applications", "Responsive design & animations", "Performance optimization", "API integration"],
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Sparkles,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love to interact with.",
      features: ["User interface design", "Prototyping & wireframing", "Design systems", "User experience optimization"],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Rocket,
      title: "Product Development",
      description: "End-to-end product development from concept to deployment.",
      features: ["MVP development", "Feature planning", "Testing & iteration", "Launch & maintenance"],
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      rating: 10,
      category: "Self-Help",
      emoji: "📘",
      gradient: "from-blue-500 to-cyan-400",
      summary: "A practical framework for building good habits and breaking bad ones through small, incremental changes.",
    },
    {
      id: 2,
      title: "Deep Work",
      author: "Cal Newport",
      rating: 9,
      category: "Productivity",
      emoji: "🧠",
      gradient: "from-purple-500 to-pink-400",
      summary: "Rules for focused success in a distracted world. Learn to cultivate deep focus and produce exceptional results.",
    },
    {
      id: 3,
      title: "Zero to One",
      author: "Peter Thiel",
      rating: 9,
      category: "Business",
      emoji: "🚀",
      gradient: "from-orange-500 to-red-400",
      summary: "Notes on startups and how to build the future. Contrarian thinking about innovation and competition.",
    },
    {
      id: 4,
      title: "The Lean Startup",
      author: "Eric Ries",
      rating: 8,
      category: "Startup",
      emoji: "💡",
      gradient: "from-green-500 to-emerald-400",
      summary: "How today's entrepreneurs use continuous innovation to create radically successful businesses.",
    },
    {
      id: 5,
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      rating: 10,
      category: "Tech",
      emoji: "💾",
      gradient: "from-indigo-500 to-purple-400",
      summary: "The big ideas behind reliable, scalable, and maintainable systems for modern applications.",
    },
    {
      id: 6,
      title: "Clean Code",
      author: "Robert C. Martin",
      rating: 9,
      category: "Programming",
      emoji: "💻",
      gradient: "from-cyan-500 to-teal-400",
      summary: "A handbook of agile software craftsmanship. Learn to write code that is clean, testable, and maintainable.",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Building Modern Web Apps with React and TypeScript",
      excerpt:
        "Learn how to combine React with TypeScript to build type-safe, scalable web applications. Explore best practices and patterns.",
      date: "Jan 10, 2026",
      readTime: "8 min read",
      tags: ["React", "TypeScript", "Web Development"],
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      id: 2,
      title: "The Art of API Design: Creating Developer-Friendly Interfaces",
      excerpt:
        "Discover principles and patterns for designing APIs that developers love to use. From REST to GraphQL and beyond.",
      date: "Jan 5, 2026",
      readTime: "10 min read",
      tags: ["API", "Design", "Backend"],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      title: "Performance Optimization: Making Your React App Blazing Fast",
      excerpt:
        "Deep dive into React performance optimization techniques. Learn about memoization, lazy loading, and code splitting.",
      date: "Dec 28, 2025",
      readTime: "12 min read",
      tags: ["React", "Performance", "Optimization"],
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const notes = [
    {
      id: "rumi",
      title: "Rumi — small notes",
      subtitle: "On love, motion, and the quiet instruction of the heart",
      gradient: "from-cyan-500 to-blue-600",
      bullets: [
        "A good interface should feel like a poem: minimal words, maximum meaning.",
        "Design is also longing: you build the thing you wish existed.",
        "Clarity is kindness. Beauty is a shortcut to attention.",
      ],
    },
    {
      id: "kafka",
      title: "Kafka — systems & absurdity",
      subtitle: "On rules, hidden constraints, and user journeys",
      gradient: "from-purple-500 to-pink-600",
      bullets: [
        "If the user feels lost, the system is speaking in riddles.",
        "Reduce invisible rules: make state, errors, and next steps obvious.",
        "Good UX is removing the courtroom from the experience.",
      ],
    },
    {
      id: "murakami",
      title: "Murakami — atmosphere",
      subtitle: "On vibe, space, and letting the page breathe",
      gradient: "from-orange-500 to-red-600",
      bullets: [
        "Whitespace is narrative pacing.",
        "Motion should be slow and intentional; never anxious.",
        "Every section needs a mood: Projects (bold), Notes (dreamy), Blog (editorial).",
      ],
    },
  ];

  const projects = [
    {
      id: 1,
      title: "AI Chat Platform",
      description: "Real-time chat application with AI-powered features and smart replies",
      emoji: "💬",
      gradient: "from-cyan-500 to-blue-600",
      tech: ["React", "Node.js", "OpenAI", "WebSocket"],
      stars: "245",
      users: "1.2k",
      demo: "#",
      github: "#",
    },
    {
      id: 2,
      title: "E-commerce Dashboard",
      description: "Analytics dashboard for e-commerce businesses with real-time insights",
      emoji: "📊",
      gradient: "from-purple-500 to-pink-600",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      stars: "189",
      users: "850",
      demo: "#",
      github: "#",
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management with team features and integrations",
      emoji: "✅",
      gradient: "from-orange-500 to-red-600",
      tech: ["React", "Firebase", "Tailwind", "Framer Motion"],
      stars: "312",
      users: "2.1k",
      demo: "#",
      github: "#",
    },
  ];

  const scrollTo = useCallback(
    (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    },
    [prefersReducedMotion]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#070a12] to-black text-white">
      <IntroLoader show={showLoader} />
      <GlobalStyles />

      {/* HERO SECTION */}
      <Section className="relative min-h-screen overflow-hidden">
        <HeroBackground />
        <WorldMapBackground />
        <TrainBackgroundCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-black/55 to-black" />

        {/* Navigation */}
        <header className="relative z-20">
          <Container className="py-6">
            <nav className="flex items-center justify-between">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600">
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="text-xl font-black leading-none">UnsaidScript</div>
                  <div className="text-xs text-gray-400">by Abdullah</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-8"
              >
                {/* Desktop Menu */}
                <div className="hidden items-center gap-8 md:flex">
                  {["Services", "Projects", "Books", "Notes", "Blog", "Contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollTo(item.toLowerCase())}
                      className="text-sm font-semibold text-gray-300 transition hover:text-white"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden text-white"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Menu"
                >
                  {mobileMenuOpen ? <X size={24} /> : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center gap-3">
                <a
                  href="#contact"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-bold transition hover:brightness-110"
                >
                  Hire Me
                </a>
              </motion.div>
            </nav>
          </Container>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full gap-8">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-6 right-6"
                >
                  <X size={32} className="text-white" />
                </button>
                {["Services", "Projects", "Books", "Notes", "Blog", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollTo(item.toLowerCase());
                      setMobileMenuOpen(false);
                    }}
                    className="text-2xl font-bold text-white transition hover:text-cyan-400"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Hero Content */}
        <Container className="relative z-10 flex min-h-[calc(100vh-88px)] flex-col items-center justify-center text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: prefersReducedMotion ? 0 : 0.12,
                  delayChildren: prefersReducedMotion ? 0 : 0.18,
                },
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 text-sm font-semibold text-cyan-300">
                ✨ Available for Freelance Projects
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-6xl font-black leading-tight md:text-8xl"
            >
              <span className="text-shimmer">Crafting Digital</span>
              <br />
              <span className="text-white">Experiences</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mx-auto mt-5 max-w-3xl text-lg text-gray-200/90 md:text-xl"
            >
              Full-stack developer & designer turning ideas into beautiful, functional products.
              Specialized in React, TypeScript, and modern web technologies.
              <span className="block mt-2 text-gray-400">Inspired by Rumi, Kafka, and Murakami — calm UI with a little mystery.</span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <div className="text-xs font-semibold text-gray-400">UnsaidScript</div>
              <div className="mt-1 text-sm font-bold text-gray-200">
                <RoleType roles={["Software Engineer", "Researcher", "Reader", "Believer"]} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-bold shadow-2xl shadow-cyan-500/30 transition hover:brightness-110"
            >
              View Projects
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </button>
            <button
              onClick={() => scrollTo("notes")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold backdrop-blur-xl transition hover:bg-white/10"
            >
              <Book size={20} />
              Read Notes
            </button>
          </motion.div>

          {/* Terminal */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}>
            <TerminalPanel />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            <StatCard icon={Briefcase} value="50+" label="Projects Done" gradient="from-cyan-400 to-blue-500" />
            <StatCard icon={Users} value="30+" label="Happy Clients" gradient="from-purple-400 to-pink-500" />
            <StatCard icon={Book} value="100+" label="Books Read" gradient="from-orange-400 to-red-500" />
            <StatCard icon={TrendingUp} value="5 Years" label="Experience" gradient="from-green-400 to-emerald-500" />
          </motion.div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section id="services" className="py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-5xl font-black md:text-6xl">
              <GradientText>What I Do</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">Freelance-ready delivery: design, build, polish.</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/40 to-black" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-5xl font-black md:text-6xl">
              <GradientText gradient="from-orange-400 via-red-500 to-pink-600">Featured Projects</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">Clean UI, real outcomes, measurable impact.</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Books Section */}
      <Section id="books" className="py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-2 text-sm font-semibold text-purple-300">
              <BookOpen size={16} />
              Book Reviews & Notes
            </div>
            <h2 className="text-5xl font-black md:text-6xl">
              <GradientText gradient="from-purple-400 via-pink-500 to-rose-600">Reading Library</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">Books that shape the way I think and build.</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book, idx) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <BookCard book={book} onClick={() => setSelectedBook(book)} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Notes Section (with Nebula) */}
      <Section id="notes" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Suspense fallback={<div className="h-96" />}>
            <NotesNebulaCanvas intensity={1} />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/80" />
        </div>

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 text-sm font-semibold text-cyan-300">
              <Sparkles size={16} />
              Notes with atmosphere
            </div>
            <h2 className="text-5xl font-black md:text-6xl">
              <GradientText gradient="from-cyan-400 via-purple-500 to-pink-500">Notes & Highlights</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Quick takeaways, short summaries, and ideas — written like a clean terminal log.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {notes.map((n, idx) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group relative"
              >
                <div
                  className={cn(
                    "absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-opacity group-hover:opacity-25",
                    n.gradient
                  )}
                />
                <Card className="p-8">
                  <h3 className="text-2xl font-black text-white">{n.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">{n.subtitle}</p>

                  <ul className="mt-6 space-y-3 text-sm text-gray-200">
                    {n.bullets.slice(0, 3).map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white/30" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex gap-3">
                    <button
                      onClick={() => setSelectedNote(n)}
                      className={cn(
                        "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold shadow-lg shadow-black/30 hover:brightness-110",
                        "bg-gradient-to-r",
                        n.gradient
                      )}
                    >
                      Read
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => safeCopy(buildNoteCopy(n))}
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10"
                      aria-label="Copy"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Blog Section */}
      <Section id="blog" className="py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/30 to-black" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 text-sm font-semibold text-cyan-300">
              <Zap size={16} />
              Essays & Experiments
            </div>
            <h2 className="text-5xl font-black md:text-6xl">
              <GradientText gradient="from-cyan-400 via-blue-500 to-indigo-600">Blog & Insights</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">Writing about craft, systems, and the web.</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <BlogCard post={post} onClick={() => setSelectedBlog(post)} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Card className="p-12 text-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600">
                  <MessageSquare size={32} />
                </div>
                <h2 className="text-4xl font-black md:text-5xl">
                  <GradientText>Let's build something</GradientText>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">If you need a clean, modern site (with vibe), I can help.</p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <a
                    href="mailto:cs.abdullah@gmail.com"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-bold transition hover:brightness-110"
                  >
                    <Mail size={20} />
                    Send Email
                  </a>
                  <a
                    href="https://github.com/Abdu11ahMamun"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold backdrop-blur-xl transition hover:bg-white/10"
                  >
                    <Github size={20} />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abdu11ahmamun/"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold backdrop-blur-xl transition hover:bg-white/10"
                  >
                    <Linkedin size={20} />
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600">
                <Sparkles size={16} />
              </div>
              <span className="font-bold">© {new Date().getFullYear()} UnsaidScript</span>
            </div>
            <p className="text-sm text-gray-500">Built with React, Tailwind & Framer Motion</p>
          </div>
        </Container>
      </footer>

      {/* Modals */}
      <Modal
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        title={selectedBook?.title || ""}
        subtitle={selectedBook ? `${selectedBook.author} • ${selectedBook.category}` : ""}
      >
        <p className="text-gray-300">This is where your full review/notes will live (MDX, Notion sync, etc.).</p>
      </Modal>

      <Modal
        open={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        title={selectedBlog?.title || ""}
        subtitle={selectedBlog ? `${selectedBlog.date} • ${selectedBlog.readTime}` : ""}
      >
        <p className="text-gray-300">This is where your full post content will live.</p>
      </Modal>

      <Modal
        open={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        title={selectedNote?.title || ""}
        subtitle={selectedNote?.subtitle || ""}
        copyText={selectedNote ? buildNoteCopy(selectedNote) : ""}
      >
        {selectedNote ? (
          <div className="space-y-4">
            <p className="text-gray-400">Key points:</p>
            <ul className="space-y-3">
              {selectedNote.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-white/30" />
                  <span className="text-gray-200">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Modal>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => scrollTo("services")}
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/40 transition hover:brightness-110"
        aria-label="Jump"
      >
        <ArrowRight className="-rotate-90" size={24} />
      </motion.button>
    </div>
  );
}