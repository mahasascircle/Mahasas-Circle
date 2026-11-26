import React, { useMemo, useState } from 'react';
import {
  BookHeart,
  Check,
  Compass,
  Eye,
  Flame,
  Heart,
  KeyRound,
  Leaf,
  LockKeyhole,
  Moon,
  Mountain,
  Pencil,
  Sparkles,
  Star,
  Trees,
  Users,
  X,
} from 'lucide-react';
import BottomNav from '../components/BottomNav';

const icons = {
  moon: Moon,
  flame: Flame,
  star: Star,
  compass: Compass,
  eye: Eye,
  tree: Trees,
  key: KeyRound,
  mountain: Mountain,
};

const focuses = [
  ['Ground', Leaf, 'Move gently and return to what is steady.'],
  ['Create', Sparkles, 'Give one idea your attention and your hands.'],
  ['Connect', Users, 'Reach toward a person, place, or shared purpose.'],
  ['Restore', Heart, 'Make room for rest, care, and repair.'],
];

const TENDING_KEY = 'mahasa.torch.tending.v1';
const FOCUS_KEY = 'mahasa.torch.focus.v1';
const REFLECTIONS_KEY = 'mahasa.torch.reflections.v1';

function load(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function persist(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function localDay(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(day, amount) {
  const [year, month, date] = day.split('-').map(Number);
  const next = new Date(year, month - 1, date);
  next.setDate(next.getDate() + amount);
  return localDay(next);
}

function currentStreak(days) {
  const daySet = new Set(days);
  let cursor = localDay();
  if (!daySet.has(cursor)) cursor = addDays(cursor, -1);
  let count = 0;
  while (daySet.has(cursor)) {
    count += 1;
    cursor = addDays(cursor, -1);
  }
  return count;
}

function readableDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Saved reflection'
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Torch({ navigate }) {
  const [sigil] = useState(() => load('mahasaSigil', {}));
  const [tendingDays, setTendingDays] = useState(() => {
    const saved = load(TENDING_KEY, []);
    return Array.isArray(saved) ? saved : [];
  });
  const [dailyFocus, setDailyFocus] = useState(() => {
    const saved = load(FOCUS_KEY, {});
    return saved?.day === localDay() ? saved.value : '';
  });
  const [reflections, setReflections] = useState(() => {
    const saved = load(REFLECTIONS_KEY, []);
    return Array.isArray(saved) ? saved : [];
  });
  const [reflection, setReflection] = useState('');
  const [notice, setNotice] = useState('');

  const Icon = icons[sigil.center] || Moon;
  const today = localDay();
  const tendedToday = tendingDays.includes(today);
  const streak = useMemo(() => currentStreak(tendingDays), [tendingDays]);
  const flameState = tendedToday ? 'Bright today' : streak ? 'Steady flame' : 'Ready to tend';

  function tendFlame() {
    if (tendedToday) return;
    const next = [...new Set([...tendingDays, today])].sort();
    if (!persist(TENDING_KEY, next)) {
      setNotice('This browser could not save today’s tending.');
      return;
    }
    setTendingDays(next);
    setNotice('Your flame has been tended for today.');
  }

  function chooseFocus(value) {
    if (!persist(FOCUS_KEY, { day: today, value })) {
      setNotice('This browser could not save your focus.');
      return;
    }
    setDailyFocus(value);
    setNotice(`${value} is your focus for today.`);
  }

  function saveReflection(event) {
    event.preventDefault();
    const text = reflection.trim();
    if (!text) return;
    const entry = {
      id: `reflection-${Date.now()}`,
      createdAt: new Date().toISOString(),
      focus: dailyFocus,
      text,
    };
    const next = [entry, ...reflections].slice(0, 50);
    if (!persist(REFLECTIONS_KEY, next)) {
      setNotice('This browser could not save your reflection. Your words are still in the form.');
      return;
    }
    setReflections(next);
    setReflection('');
    setNotice('Your private reflection has been saved on this device.');
  }

  function removeReflection(id) {
    if (!window.confirm('Remove this private reflection from this browser?')) return;
    const next = reflections.filter((entry) => entry.id !== id);
    if (persist(REFLECTIONS_KEY, next)) {
      setReflections(next);
      setNotice('Reflection removed.');
    } else {
      setNotice('This browser could not remove the reflection.');
    }
  }

  return (
    <main className="torch-page personal-torch-page">
      <header className="simple-header">
        <button aria-label="Return to Sanctuary" onClick={() => navigate('/sanctuary')}>←</button>
        <div><span>Your Journey</span><strong>Personal Torch</strong></div>
        <button aria-label="Edit your sigil" onClick={() => navigate('/forge')}><Pencil size={18}/></button>
      </header>

      <section className="personal-torch-hero">
        <div className="personal-torch-art" aria-hidden="true">
          <div className={`large-flame ${tendedToday ? 'tended' : ''}`} />
          <div className="large-crown" />
          <div className="large-handle">
            <div className="large-sigil"><Icon size={64}/></div>
          </div>
        </div>
        <div className="personal-torch-copy">
          <p className="eyebrow">The Light You Carry</p>
          <h1>{sigil.name || 'Your First Torch'}</h1>
          <blockquote>{sigil.meaning || 'Forge a private sigil to give your torch a name and meaning.'}</blockquote>
          <div className="torch-private-note"><LockKeyhole size={15}/> Your torch activity stays in this browser.</div>
          <button className="primary-action torch-tend-button" disabled={tendedToday} onClick={tendFlame}>
            {tendedToday ? <Check size={19}/> : <Flame size={19}/>} {tendedToday ? 'Flame tended today' : 'Tend today’s flame'}
          </button>
          {!sigil.name && <button className="torch-text-button" onClick={() => navigate('/forge')}><Pencil size={16}/> Forge your personal sigil</button>}
        </div>
      </section>

      {notice && (
        <div className="torch-notice" role="status">
          <Check size={16}/><span>{notice}</span>
          <button aria-label="Dismiss message" onClick={() => setNotice('')}><X size={16}/></button>
        </div>
      )}

      <section className="torch-details" aria-label="Your Torch activity">
        <article><strong>{flameState}</strong><span>Flame</span></article>
        <article><strong>{streak}</strong><span>Day streak</span></article>
        <article><strong>{tendingDays.length}</strong><span>Days tended</span></article>
        <article><strong>{reflections.length}</strong><span>Reflections</span></article>
      </section>

      <div className="torch-practice-grid">
        <section className="torch-practice-card">
          <p className="eyebrow">Choose Your Direction</p>
          <h2>What needs your light today?</h2>
          <p className="muted">Choose one focus. It resets tomorrow so each day can begin differently.</p>
          <div className="torch-focus-options">
            {focuses.map(([label, FocusIcon, description]) => (
              <button
                key={label}
                className={dailyFocus === label ? 'selected' : ''}
                aria-pressed={dailyFocus === label}
                onClick={() => chooseFocus(label)}
              >
                <FocusIcon size={21}/>
                <span><strong>{label}</strong><small>{description}</small></span>
              </button>
            ))}
          </div>
        </section>

        <section className="torch-practice-card">
          <p className="eyebrow">Private Reflection</p>
          <h2>Leave an ember for yourself.</h2>
          <p className="muted">A few honest words are enough. Reflections remain on this device.</p>
          <form className="torch-reflection-form" onSubmit={saveReflection}>
            <label htmlFor="torch-reflection">What do you want to remember?</label>
            <textarea
              id="torch-reflection"
              maxLength={500}
              rows={5}
              placeholder="Today I noticed…"
              value={reflection}
              onChange={(event) => setReflection(event.target.value)}
            />
            <div><span>{reflection.length}/500</span><button type="submit" disabled={!reflection.trim()}><BookHeart size={17}/> Save reflection</button></div>
          </form>
        </section>
      </div>

      <section className="torch-history">
        <div className="torch-history-heading">
          <div><p className="eyebrow">Ember Journal</p><h2>Your recent reflections</h2></div>
          <span>{reflections.length ? `Showing ${Math.min(reflections.length, 5)} of ${reflections.length}` : 'Waiting for your first ember'}</span>
        </div>
        {reflections.length ? (
          <div className="torch-history-list">
            {reflections.slice(0, 5).map((entry) => (
              <article key={entry.id}>
                <div className="torch-history-meta">
                  <span>{readableDate(entry.createdAt)}</span>
                  {entry.focus && <strong>{entry.focus}</strong>}
                </div>
                <p>{entry.text}</p>
                <button aria-label="Remove reflection" onClick={() => removeReflection(entry.id)}><X size={15}/></button>
              </article>
            ))}
          </div>
        ) : (
          <div className="torch-empty-state"><Flame size={26}/><p>Your first saved reflection will glow here.</p></div>
        )}
      </section>

      <p className="belief personal-torch-belief">No light is diminished by lighting another.</p>
      <BottomNav navigate={navigate} active="Torch" />
    </main>
  );
}
