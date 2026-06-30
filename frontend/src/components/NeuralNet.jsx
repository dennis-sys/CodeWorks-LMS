import { useEffect, useRef } from 'react';

const NODE_COUNT       = 55;
const CONNECTION_DIST  = 160;
const SIGNAL_RATE      = 0.06;

export default function NeuralNet() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.45,
      vy:    (Math.random() - 0.5) * 0.45,
      r:     Math.random() * 2.5 + 1.8,
      pulse: Math.random() * Math.PI * 2,
      layer: Math.floor(Math.random() * 3),
    }));

    const signals = [];

    function spawnSignal() {
      const i = Math.floor(Math.random() * NODE_COUNT);
      const neighbours = [];
      for (let j = 0; j < NODE_COUNT; j++) {
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < CONNECTION_DIST * CONNECTION_DIST) neighbours.push(j);
      }
      if (!neighbours.length) return;
      const j = neighbours[Math.floor(Math.random() * neighbours.length)];
      signals.push({ from: i, to: j, t: 0, speed: 0.012 + Math.random() * 0.018 });
    }

    const LAYER_COLOURS = [
      'rgba(56,189,248,',
      'rgba(99,102,241,',
      'rgba(20,184,166,',
    ];

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < NODE_COUNT; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const nj  = nodes[j];
          const dx  = ni.x - nj.x;
          const dy  = ni.y - nj.y;
          const d2  = dx * dx + dy * dy;
          if (d2 < CONNECTION_DIST * CONNECTION_DIST) {
            const alpha = (1 - Math.sqrt(d2) / CONNECTION_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
            ctx.lineWidth   = 0.7;
            ctx.stroke();
          }
        }
      }

      for (let s = signals.length - 1; s >= 0; s--) {
        const sig  = signals[s];
        const from = nodes[sig.from];
        const to   = nodes[sig.to];
        const x    = from.x + (to.x - from.x) * sig.t;
        const y    = from.y + (to.y - from.y) * sig.t;

        const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
        g.addColorStop(0, 'rgba(186,230,253,0.95)');
        g.addColorStop(0.4, 'rgba(56,189,248,0.5)');
        g.addColorStop(1,   'rgba(56,189,248,0)');
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        sig.t += sig.speed;
        if (sig.t >= 1) signals.splice(s, 1);
      }

      for (const n of nodes) {
        n.pulse += 0.04;
        const glow = n.r + 1.5 + Math.sin(n.pulse) * 1.2;
        const col  = LAYER_COLOURS[n.layer];

        const gOuter = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glow * 4);
        gOuter.addColorStop(0,   `${col}0.5)`);
        gOuter.addColorStop(0.5, `${col}0.15)`);
        gOuter.addColorStop(1,   `${col}0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, glow * 4, 0, Math.PI * 2);
        ctx.fillStyle = gOuter;
        ctx.fill();

        const gCore = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        gCore.addColorStop(0,   'rgba(240,249,255,1)');
        gCore.addColorStop(0.6, `${col}0.9)`);
        gCore.addColorStop(1,   `${col}0.4)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = gCore;
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height)  n.vy *= -1;
      }

      if (Math.random() < SIGNAL_RATE) spawnSignal();
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
