import React, { useMemo } from 'react';
import { Flame, Moon, Star, Compass, Eye, Trees, KeyRound, Mountain, Pencil } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const icons = { moon: Moon, flame: Flame, star: Star, compass: Compass, eye: Eye, tree: Trees, key: KeyRound, mountain: Mountain };

export default function Torch({ navigate }) {
  const sigil = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('mahasaSigil') || '{}'); }
    catch { return {}; }
  }, []);
  const Icon = icons[sigil.center] || Moon;

  return (
    <main className="torch-page">
      <header className="simple-header">
        <button onClick={() => navigate('/sanctuary')}>←</button>
        <div><span>Your Journey</span><strong>Your Torch</strong></div>
        <button onClick={() => navigate('/forge')}><Pencil size={18}/></button>
      </header>

      <section className="torch-sanctuary">
        <p className="eyebrow">The Light You Carry</p>
        <h1>{sigil.name || 'Your First Torch'}</h1>
        <div className="large-torch">
          <div className="large-flame" />
          <div className="large-crown" />
          <div className="large-handle">
            <div className="large-sigil"><Icon size={72}/></div>
          </div>
        </div>
        <blockquote>{sigil.meaning || 'Your personal sigil will appear here after it is forged.'}</blockquote>
        <p className="belief">No light is diminished by lighting another.</p>
      </section>

      <section className="torch-details">
        <article><strong>Steady Flame</strong><span>Torch Brightness</span></article>
        <article><strong>3</strong><span>Hearths Joined</span></article>
        <article><strong>18</strong><span>Torches Passed</span></article>
        <article><strong>7</strong><span>Silver Threads</span></article>
      </section>

      <button className="primary-action centered" onClick={() => navigate('/forge')}><Pencil size={18}/> Return to The Forge</button>
      <BottomNav navigate={navigate} active="Torch" />
    </main>
  );
}
