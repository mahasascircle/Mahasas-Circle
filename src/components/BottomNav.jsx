import React from 'react';
import { Compass, Sparkles, Network, Flame, UserRound } from 'lucide-react';

const items = [
  ['Compass', Compass, '/sanctuary'],
  ['Mirror', Sparkles, '/sanctuary'],
  ['Loom', Network, '/sanctuary'],
  ['Torch', Flame, '/torch'],
  ['Profile', UserRound, '/torch'],
];

export default function BottomNav({ navigate, active = 'Compass' }) {
  return (
    <nav className="bottom-nav" aria-label="Circle navigation">
      {items.map(([label, Icon, path]) => (
        <button key={label} className={active === label ? 'active' : ''} onClick={() => navigate(path)}>
          <Icon size={22} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
