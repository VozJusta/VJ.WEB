'use client';

import { useEffect, useRef } from 'react';

const BAR_COUNT = 9;
// Which frequency bins to sample (0–127 for fftSize=256), shaped as a bell curve
const BIN_INDICES = [2, 4, 7, 11, 16, 11, 7, 4, 2];

interface AudioWaveformProps {
  isActive: boolean;
  analyserNode: AnalyserNode | null;
}

export function AudioWaveform({ isActive, analyserNode }: AudioWaveformProps) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive || !analyserNode) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      // Reset bars to min height when not active
      barsRef.current.forEach((bar) => {
        if (bar) bar.style.height = '4px';
      });
      return;
    }

    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);

    const tick = () => {
      analyserNode.getByteFrequencyData(dataArray);
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const bin = BIN_INDICES[i];
        const value = dataArray[bin] ?? 0;
        // Map 0–255 to 4–64px
        const height = 4 + (value / 255) * 60;
        bar.style.height = `${height}px`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, analyserNode]);

  return (
    <div className="flex items-end justify-center gap-[3px] h-16">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { barsRef.current[i] = el; }}
          className={`w-[5px] rounded-full bg-[#2585F4] transition-[height] duration-75 ease-out ${
            !isActive ? 'animate-idle-bar' : ''
          }`}
          style={{
            height: '4px',
            animationDelay: isActive ? undefined : `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}
