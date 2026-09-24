import React, { useRef, useEffect } from 'react';

export default function AudioVisualizer({ isRecording, visualizerData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let animationId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background subtle gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, 0);
      bgGrad.addColorStop(0, '#f0fdfa');
      bgGrad.addColorStop(1, '#eff6ff');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      if (isRecording) {
        // Draw dynamic live audio frequencies
        const bars = 36;
        const barWidth = width / bars - 2;

        for (let i = 0; i < bars; i++) {
          const val = visualizerData && visualizerData[i * 2]
            ? visualizerData[i * 2]
            : Math.sin(Date.now() / 150 + i * 0.4) * 30 + 40;

          const barHeight = Math.max(6, (val / 255) * (height - 16));
          const x = i * (barWidth + 2);
          const y = (height - barHeight) / 2;

          // Gradient for sound waves in soothing teal
          const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
          grad.addColorStop(0, '#0d9488');
          grad.addColorStop(1, '#14b8a6');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 3);
          ctx.fill();
        }

        animationId = requestAnimationFrame(render);
      } else {
        // Calm resting baseline
        ctx.strokeStyle = '#99f6e4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        for (let x = 0; x < width; x += 10) {
          const y = height / 2 + Math.sin(x * 0.05) * 2;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    render();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isRecording, visualizerData]);

  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #99f6e4', background: '#f0fdfa' }}>
      <canvas
        ref={canvasRef}
        width={500}
        height={70}
        style={{ width: '100%', height: '70px', display: 'block' }}
      />
    </div>
  );
}
