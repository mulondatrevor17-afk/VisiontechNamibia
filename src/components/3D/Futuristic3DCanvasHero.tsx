import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Cpu, RefreshCw, Layers, ShieldCheck, Zap } from 'lucide-react';

export type Canvas3DVariant = 'cyber-grid' | 'constellation' | 'dashboard-matrix' | 'minimal-orb';

interface Futuristic3DCanvasHeroProps {
  variant?: Canvas3DVariant;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  className?: string;
  children?: React.ReactNode;
  heightClassName?: string;
  showControls?: boolean;
}

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

export const Futuristic3DCanvasHero: React.FC<Futuristic3DCanvasHeroProps> = ({
  variant = 'cyber-grid',
  title,
  subtitle,
  badgeText = 'VISIONTECH 3D INTERACTIVE CANVAS',
  className = '',
  children,
  heightClassName = 'min-h-[380px] sm:min-h-[440px]',
  showControls = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Framer Motion spring-backed mouse coordinates for ultra-smooth 3D camera & lighting reaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  // 3D Parallax tilt transform for container overlay elements
  const rotateX = useTransform(springY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-12deg', '12deg']);
  
  const glowX = useTransform(springX, [-0.5, 0.5], ['10%', '90%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['10%', '90%']);

  const [activeVariant, setActiveVariant] = useState<Canvas3DVariant>(variant);
  const [particleCount, setParticleCount] = useState<number>(65);
  const [fps, setFps] = useState<number>(60);
  const [pulseTrigger, setPulseTrigger] = useState<number>(0);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Canvas 3D Rendering Engine Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCounter = 0;
    let fpsTimer = performance.now();

    // Resize observer
    const handleResize = () => {
      if (!canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Initialize 3D particle nodes
    const nodes: Node3D[] = [];
    const count = activeVariant === 'minimal-orb' ? 40 : particleCount;
    const width = canvas.parentElement?.clientWidth || 800;
    const height = canvas.parentElement?.clientHeight || 400;

    const colors = [
      '#38bdf8', // Cyan/Sky
      '#818cf8', // Indigo
      '#c084fc', // Purple
      '#34d399', // Emerald
      '#f43f5e', // Rose accent
    ];

    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * width * 1.2;
      let y = (Math.random() - 0.5) * height * 1.2;
      let z = (Math.random() - 0.5) * 600;

      if (activeVariant === 'constellation') {
        // Sphere distribution
        const radius = Math.random() * 180 + 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);
      }

      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[i % colors.length],
      });
    }

    let globalAngleX = 0;
    let globalAngleY = 0;

    // Render loop
    const render = (now: number) => {
      // FPS Calculation
      frameCounter++;
      if (now - fpsTimer >= 1000) {
        setFps(frameCounter);
        frameCounter = 0;
        fpsTimer = now;
      }

      const w = canvas.parentElement?.clientWidth || width;
      const h = canvas.parentElement?.clientHeight || height;
      const centerX = w / 2;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Target camera rotation from Framer Motion springs
      const targetAngleY = springX.get() * 0.8;
      const targetAngleX = -springY.get() * 0.8;

      globalAngleY += (targetAngleY - globalAngleY) * 0.08 + 0.003;
      globalAngleX += (targetAngleX - globalAngleX) * 0.08 + 0.001;

      const cosX = Math.cos(globalAngleX);
      const sinX = Math.sin(globalAngleX);
      const cosY = Math.cos(globalAngleY);
      const sinY = Math.sin(globalAngleY);

      const focalLength = 400;

      // Projected 2D points storage
      const projectedNodes: { px: number; py: number; pz: number; radius: number; color: string }[] = [];

      // Update & project nodes
      nodes.forEach((node) => {
        // Drift movement
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Boundary bounce
        if (Math.abs(node.x) > w * 0.8) node.vx *= -1;
        if (Math.abs(node.y) > h * 0.8) node.vy *= -1;
        if (Math.abs(node.z) > 350) node.vz *= -1;

        // 3D Matrix Rotation (Y axis then X axis)
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        let y1 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // Camera perspective projection formula: scale = focalLength / (focalLength + z)
        const scale = focalLength / (focalLength + z2 + 250);
        const px = centerX + x1 * scale;
        const py = centerY + y1 * scale;

        projectedNodes.push({
          px,
          py,
          pz: z2,
          radius: node.radius * Math.max(0.3, scale),
          color: node.color,
        });
      });

      // Sort by depth (Z-index back to front) for accurate rendering
      projectedNodes.sort((a, b) => b.pz - a.pz);

      // Draw 3D vertex connections
      const maxDist = activeVariant === 'constellation' ? 120 : 90;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          const dx = n1.px - n2.px;
          const dy = n1.py - n2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.strokeStyle = activeVariant === 'dashboard-matrix' 
              ? `rgba(56, 189, 248, ${alpha})` 
              : activeVariant === 'constellation' 
              ? `rgba(192, 132, 252, ${alpha})` 
              : `rgba(255, 255, 255, ${alpha * 0.6})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw Projected 3D Node Spheres with glowing halos
      projectedNodes.forEach((node) => {
        if (node.px < -20 || node.px > w + 20 || node.py < -20 || node.py > h + 20) return;

        // Glow halo
        const grad = ctx.createRadialGradient(node.px, node.py, 0, node.px, node.py, node.radius * 4);
        grad.addColorStop(0, node.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.px, node.py, node.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(node.px, node.py, Math.max(1, node.radius * 0.8), 0, Math.PI * 2);
        ctx.fill();
      });

      // Special Central Holographic Geometric Ring for Cyber & Dashboard variants
      if (activeVariant === 'cyber-grid' || activeVariant === 'dashboard-matrix') {
        ctx.save();
        ctx.translate(centerX, centerY);
        
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, 110 + Math.sin(now * 0.002) * 10, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
        ctx.beginPath();
        ctx.arc(0, 0, 150 + Math.cos(now * 0.002) * 12, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentElement) {
        resizeObserver.unobserve(canvas.parentElement);
      }
    };
  }, [activeVariant, particleCount, pulseTrigger]);

  return (
    <div className={`relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0c0e15] shadow-2xl ${heightClassName} ${className}`}>
      
      {/* Interactive Motion Perspective Container */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8"
      >
        {/* Dynamic Light Reflection Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(700px circle at ${glowX} ${glowY}, rgba(56, 189, 248, 0.15), rgba(168, 85, 247, 0.08), transparent 60%)`,
          }}
        />

        {/* High-Performance Canvas HTML5 3D Particle Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* TOP HUD BAR */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12141c]/80 backdrop-blur-md border border-white/10 rounded-full text-[11px] font-mono text-[#38bdf8]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bdf8]"></span>
            </span>
            <span>{badgeText}</span>
          </div>

          {showControls && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 bg-black/40 border border-white/5 px-2.5 py-1 rounded-full backdrop-blur-md">
                {fps} FPS • 3D Canvas
              </span>

              {/* Variant Switcher Pill */}
              <div className="hidden sm:flex items-center bg-black/40 border border-white/10 p-1 rounded-full backdrop-blur-md">
                {(['cyber-grid', 'constellation', 'dashboard-matrix', 'minimal-orb'] as Canvas3DVariant[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveVariant(v)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase transition-all ${
                      activeVariant === v 
                        ? 'bg-[#38bdf8] text-black font-bold shadow' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {v.split('-')[0]}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPulseTrigger((prev) => prev + 1)}
                className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-full border border-white/10 transition-colors"
                title="Refresh 3D Matrix Nodes"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* CENTER / BOTTOM HERO CONTENT */}
        <div className="relative z-10 my-auto py-4 space-y-3 max-w-2xl">
          {title && (
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
              {title}
            </h2>
          )}
          
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-sans">
              {subtitle}
            </p>
          )}

          {children && (
            <div className="pt-2">
              {children}
            </div>
          )}
        </div>

        {/* BOTTOM HUD STATUS FOOTER */}
        <div className="relative z-10 pt-4 flex items-center justify-between border-t border-white/5 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-emerald-400" />
            <span>Interactive 60FPS Hardware Acceleration</span>
          </div>
          <div className="hidden sm:block">
            <span>Mouse Parallax &amp; Physics Active</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
