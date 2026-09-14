import React, { useEffect, useRef } from 'react';

export default function PetalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const petalCount = isMobile ? 18 : 36;

    // Petal color palette matching design system
    const petalColors = [
      'rgba(255, 182, 193, 0.35)', // pink-soft
      'rgba(255, 105, 180, 0.28)', // pink-hot
      'rgba(248, 200, 220, 0.35)', // rose-gold
      'rgba(255, 228, 236, 0.40)', // blush-100
      'rgba(243, 217, 250, 0.30)', // lavender-pink
    ];

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -30;
        this.size = Math.random() * 12 + 8; // 8 - 20px
        this.speedY = Math.random() * 0.7 + 0.4; // slow descent
        this.speedX = Math.random() * 0.4 - 0.2;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.02;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayAmplitude = Math.random() * 25 + 15;
        this.swayOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.y += this.speedY;
        this.x += Math.sin(time * this.swaySpeed + this.swayOffset) * 0.6 + this.speedX;
        this.angle += this.angularSpeed;

        if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
          this.reset(false);
        }
      }

      draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);

        context.beginPath();
        // Hand-drawn smooth organic lotus/rose petal bezier shape
        context.moveTo(0, -this.size);
        context.bezierCurveTo(
          this.size * 0.75,
          -this.size * 0.45,
          this.size * 0.65,
          this.size * 0.75,
          0,
          this.size
        );
        context.bezierCurveTo(
          -this.size * 0.65,
          this.size * 0.75,
          -this.size * 0.75,
          -this.size * 0.45,
          0,
          -this.size
        );
        context.closePath();

        context.fillStyle = this.color;
        context.fill();

        // Subtle center petal vein
        context.beginPath();
        context.moveTo(0, -this.size * 0.7);
        context.lineTo(0, this.size * 0.6);
        context.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        context.lineWidth = 0.8;
        context.stroke();

        context.restore();
      }
    }

    const petals = Array.from({ length: petalCount }, () => new Petal());

    let touchPos = { x: -1000, y: -1000 };

    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      touchPos = { x: clientX, y: clientY };
    };

    const handlePointerEnd = () => {
      touchPos = { x: -1000, y: -1000 };
    };

    const render = (currentTime) => {
      const elapsed = (currentTime - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const petal = petals[i];
        petal.update(elapsed);

        // Gentle breeze displacement when touched or hovered
        const dx = petal.x - touchPos.x;
        const dy = petal.y - touchPos.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 90 && dist > 0) {
          const force = (90 - dist) / 90;
          petal.x += (dx / dist) * force * 2;
          petal.y += (dy / dist) * force * 2;
        }

        petal.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 will-change-transform"
      style={{ opacity: 0.85 }}
    />
  );
}
