import React, { useEffect, useRef, useState } from 'react';
import { Flame, Moon, KeyRound, Star, Compass, Eye, Trees, Mountain } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const symbols = [
  ['moon', Moon, 'Moon', 'Intuition & cycles'],
  ['flame', Flame, 'Flame', 'Courage & guidance'],
  ['compass', Compass, 'Compass', 'Direction & discovery'],
  ['eye', Eye, 'Eye', 'Awareness & truth'],
  ['tree', Trees, 'Tree', 'Roots & growth'],
  ['key', KeyRound, 'Key', 'Thresholds & wisdom'],
  ['mountain', Mountain, 'Mountain', 'Endurance & ascent'],
  ['star', Star, 'Star', 'Hope & possibility'],
];

export default function Forge({ navigate }) {
  const [symbol, setSymbol] = useState('moon');
  const [name, setName] = useState('');
  const [meaning, setMeaning] = useState('');
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mahasaSigil') || '{}');
      if (saved.center) setSymbol(saved.center);
      if (saved.name) setName(saved.name);
      if (saved.meaning) setMeaning(saved.meaning);
    } catch {}
  }, []);

  const save = () => {
    const drawingData = canvasRef.current?.toDataURL();
    localStorage.setItem('mahasaSigil', JSON.stringify({ center: symbol, name: name || 'The First Flame', meaning: meaning || 'A symbol of the light I carry.', drawing: drawingData }));
    localStorage.setItem('mahasaFirstTorchLit', 'true');
    navigate('/torch');
  };

  const point = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const start = (event) => {
    drawing.current = true;
    const ctx = canvasRef.current.getContext('2d');
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };
  const move = (event) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const p = point(event);
    ctx.strokeStyle = '#c47ff0';
    ctx.shadowColor = '#c47ff0';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const Selected = symbols.find(([id]) => id === symbol)?.[1] || Moon;

  return (
    <main className="forge-page">
      <header className="simple-header">
        <button onClick={() => navigate('/')}>←</button>
        <div><span>The Forge</span><strong>Forge Your Sigil</strong></div>
        <button>?</button>
      </header>

      <div className="forge-layout">
        <section className="forge-workbench">
          <p className="eyebrow">Your Living Symbol</p>
          <h1>What light are you carrying?</h1>
          <p className="muted">Choose its heart, add your own hand, and give it a private meaning.</p>

          <div className="symbol-picker">
            {symbols.map(([id, Icon, label, sub]) => (
              <button key={id} className={symbol === id ? 'selected' : ''} onClick={() => setSymbol(id)}>
                <Icon size={29}/><strong>{label}</strong><span>{sub}</span>
              </button>
            ))}
          </div>

          <label className="field"><span>Name your sigil</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="The Steady Flame" /></label>
          <label className="field"><span>What does it mean to you? <em>Private</em></span><textarea value={meaning} onChange={(e) => setMeaning(e.target.value)} placeholder="Write the meaning you want to remember." /></label>

          <div className="draw-area">
            <canvas ref={canvasRef} width="900" height="900" onPointerDown={start} onPointerMove={move} onPointerUp={() => drawing.current = false} onPointerLeave={() => drawing.current = false} />
            <button onClick={() => canvasRef.current.getContext('2d').clearRect(0,0,900,900)}>Clear Drawing</button>
          </div>

          <button className="primary-action" onClick={save}><Flame size={20}/> Light My First Torch</button>
        </section>

        <aside className="torch-preview">
          <div className="preview-flame" />
          <div className="preview-crown" />
          <div className="preview-handle">
            <div className="sigil-disc"><Selected size={52}/></div>
          </div>
          <h2>{name || 'Unnamed Sigil'}</h2>
          <p>{meaning || 'A private symbol of the light you carry.'}</p>
        </aside>
      </div>

      <BottomNav navigate={navigate} active="Torch" />
    </main>
  );
}
