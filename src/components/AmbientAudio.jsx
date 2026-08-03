import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Waves } from 'lucide-react';

const MODES = ['off', 'ambient', 'full'];

function noiseBuffer(context, seconds = 3) {
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 2.8;
  }
  return buffer;
}

export default function AmbientAudio({ compact = false }) {
  const [mode, setMode] = useState(() => localStorage.getItem('mahasaAudioMode') || 'off');
  const audioRef = useRef(null);

  const stop = () => {
    const state = audioRef.current;
    if (!state) return;
    state.nodes.forEach((node) => {
      try { node.stop?.(); } catch {}
      try { node.disconnect?.(); } catch {}
    });
    try { state.context.close(); } catch {}
    audioRef.current = null;
  };

  const start = async (nextMode) => {
    stop();
    if (nextMode === 'off') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    await context.resume();
    const master = context.createGain();
    master.gain.value = 0.0001;
    master.connect(context.destination);
    master.gain.exponentialRampToValueAtTime(nextMode === 'full' ? 0.14 : 0.095, context.currentTime + 1.4);
    const nodes = [master];

    const noise = context.createBufferSource();
    noise.buffer = noiseBuffer(context);
    noise.loop = true;
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 620;
    const gain = context.createGain();
    gain.gain.value = 0.12;
    noise.connect(filter).connect(gain).connect(master);
    noise.start();
    nodes.push(noise, filter, gain);

    const crackleGain = context.createGain();
    crackleGain.gain.value = 0.035;
    crackleGain.connect(master);
    const crackleTimer = setInterval(() => {
      if (!audioRef.current) return;
      const osc = context.createOscillator();
      const pulse = context.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 70 + Math.random() * 110;
      pulse.gain.setValueAtTime(0.0001, context.currentTime);
      pulse.gain.exponentialRampToValueAtTime(0.012 + Math.random() * 0.018, context.currentTime + 0.01);
      pulse.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.08);
      osc.connect(pulse).connect(crackleGain);
      osc.start(); osc.stop(context.currentTime + 0.12);
    }, 155);
    nodes.push(crackleGain, { stop: () => clearInterval(crackleTimer), disconnect: () => {} });

    if (nextMode === 'full') {
      [110, 164.81, 220].forEach((frequency, index) => {
        const osc = context.createOscillator();
        const g = context.createGain();
        osc.type = index === 1 ? 'sine' : 'triangle';
        osc.frequency.value = frequency;
        g.gain.value = index === 1 ? 0.022 : 0.012;
        osc.connect(g).connect(master);
        osc.start();
        nodes.push(osc, g);
      });
      const chimeTimer = setInterval(() => {
        if (!audioRef.current) return;
        const osc = context.createOscillator();
        const g = context.createGain();
        osc.type = 'sine';
        osc.frequency.value = [440, 523.25, 659.25, 783.99][Math.floor(Math.random() * 4)];
        g.gain.setValueAtTime(0.0001, context.currentTime);
        g.gain.exponentialRampToValueAtTime(0.02, context.currentTime + 0.08);
        g.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 2.6);
        osc.connect(g).connect(master);
        osc.start(); osc.stop(context.currentTime + 2.8);
      }, 9500);
      nodes.push({ stop: () => clearInterval(chimeTimer), disconnect: () => {} });
    }
    audioRef.current = { context, nodes };
  };

  const cycle = async () => {
    const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
    setMode(next);
    localStorage.setItem('mahasaAudioMode', next);
    await start(next);
  };

  useEffect(() => () => stop(), []);
  const Icon = mode === 'off' ? VolumeX : mode === 'ambient' ? Waves : Volume2;
  const label = mode === 'off' ? 'Sound off' : mode === 'ambient' ? 'Ambient only' : 'Full atmosphere';
  return <button className={`audio-toggle ${compact ? 'compact' : ''}`} onClick={cycle} title={`${label}. Tap to change.`} aria-label={`${label}. Tap to change.`}><Icon size={18}/>{!compact && <span>{label}</span>}</button>;
}
