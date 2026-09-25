import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const ConfettiCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useImperativeHandle(ref, () => ({
    fire(durationMs = 3500) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const colors = ['#f59e0b', '#10b981', '#34d399', '#fbbf24', '#ffffff', '#6ee7b7', '#0284c7'];

      for (let i = 0; i < 110; i++) {
        particles.push({
          x: canvas.width / 2 + (Math.random() * 200 - 100),
          y: canvas.height / 2 - 50,
          r: Math.random() * 7 + 4,
          d: Math.random() * 110,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.floor(Math.random() * 10) - 10,
          tiltAngleIncremental: Math.random() * 0.07 + 0.05,
          tiltAngle: 0,
          vx: (Math.random() - 0.5) * 16,
          vy: Math.random() * -18 - 4,
          gravity: 0.4
        });
      }

      const startTime = Date.now();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const step = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          p.tiltAngle += p.tiltAngleIncremental;
          p.y += p.vy;
          p.x += p.vx;
          p.vy += p.gravity;
          p.tilt = Math.sin(p.tiltAngle) * 15;

          ctx.beginPath();
          ctx.lineWidth = p.r / 2;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
          ctx.stroke();
        });

        if (Date.now() - startTime < durationMs) {
          animationRef.current = requestAnimationFrame(step);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };

      step();
    }
  }));

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} id="confetti-canvas" />;
});

export default ConfettiCanvas;
