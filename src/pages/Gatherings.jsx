import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Bookmark, CalendarDays, Check, Compass, Flame,
  Heart, MapPin, Moon, Plus, Search, Sparkles, Trash2, Users, X
} from 'lucide-react';
import './Gatherings.css';

const STORE_DRAFTS = 'mahasa.gatherings.drafts.v1';
const STORE_IDEAS = 'mahasa.gatherings.savedIdeas.v1';

const categories = ['All', 'Rituals', 'Workshops', 'Community', 'Markets'];

const inspiration = [
  {
    id: 'idea-crossroads', title: 'A Night at the Crossroads',
    category: 'Rituals', format: 'In person',
    description: 'An evening of reflection, torchlight, and intentions at a turning point.',
    symbol: '✦', tone: 'violet'
  },
  {
    id: 'idea-moon', title: 'Moon Journal & Reflection',
    category: 'Workshops', format: 'Online',
    description: 'A welcoming guided practice for intentions, release, and lunar journaling.',
    symbol: '☾', tone: 'silver'
  },
  {
    id: 'idea-makers', title: 'Makers Under the Moon',
    category: 'Markets', format: 'In person',
    description: 'Meet independent artisans, discover handmade work, and share your craft.',
    symbol: '◇', tone: 'gold'
  },
  {
    id: 'idea-hearth', title: 'The Open Hearth Circle',
    category: 'Community', format: 'Online',
    description: 'A small, respectful gathering to share stories and find kindred spirits.',
    symbol: '❖', tone: 'rose'
  }
];

/* Scenic illustrations are drawn as SVG so no remote image host is required.
   Each is intentionally illustrative; example gatherings are not live events. */
function GatheringScene({ type }) {
  const scene = type === 'idea-moon' ? 'journal' :
    type === 'idea-makers' ? 'market' :
    type === 'idea-hearth' ? 'hearth' : 'crossroads';
  return (
    <svg className={'gather-illustration gather-scene-' + scene}
      viewBox="0 0 680 300" preserveAspectRatio="xMidYMid slice"
      role="img" aria-label={
        scene === 'journal' ? 'Moonlit journal and ritual candles' :
        scene === 'market' ? 'Artisan market stalls beneath a violet moon' :
        scene === 'hearth' ? 'A warm fire surrounded by a quiet circle' :
        'Ancient stone crossroads under moonlight'
      }>
      <g className="gather-scene-stars" fill="#f2d8ff">
        <circle cx="48" cy="41" r="1.6" /><circle cx="112" cy="85" r="1.2" />
        <circle cx="190" cy="34" r="1.3" /><circle cx="260" cy="64" r="1.6" />
        <circle cx="398" cy="29" r="1.3" /><circle cx="488" cy="80" r="1.7" />
        <circle cx="552" cy="26" r="1.3" /><circle cx="639" cy="56" r="1.6" />
      </g>
      <circle className="gather-scene-moon" cx={scene === 'market' ? 545 : scene === 'hearth' ? 342 : scene === 'journal' ? 490 : 340}
        cy={scene === 'journal' ? 84 : 71} r={scene === 'market' ? 31 : 41}
        fill="#efd4ff" opacity=".9"/>
      <circle cx={scene === 'market' ? 545 : scene === 'hearth' ? 342 : scene === 'journal' ? 490 : 340}
        cy={scene === 'journal' ? 84 : 71} r="57" fill="none" stroke="#d4a3e8" strokeOpacity=".17" strokeWidth="20"/>
      {scene === 'crossroads' && <>
        <path d="M0 186 L70 151 L136 184 L220 120 L296 191 L375 158 L465 124 L532 175 L608 135 L680 180 V300 H0Z" fill="#332043"/>
        <path d="M0 226 L112 172 L204 231 L306 160 L391 226 L493 170 L606 231 L680 188 V300 H0Z" fill="#1b1029"/>
        <path d="M315 300 L328 195 L350 195 L368 300Z" fill="#745178" opacity=".7"/>
        <path d="M328 224 L231 300 H278 L340 240 L405 300 H452 L355 222Z" fill="#9e7a94" opacity=".5"/>
        <path d="M140 265 L149 144 Q153 123 167 123 L194 123 Q208 123 211 144 L220 265" fill="none" stroke="#77618b" strokeWidth="16"/>
        <path d="M459 265 L468 144 Q471 123 484 123 L511 123 Q525 123 528 144 L537 265" fill="none" stroke="#77618b" strokeWidth="16"/>
        <rect x="156" y="174" width="40" height="84" fill="#261729" opacity=".8"/>
        <rect x="476" y="174" width="43" height="84" fill="#261729" opacity=".8"/>
        {[165,506].map((x,i)=><g key={i}>
          <circle cx={x} cy="200" r="22" fill="#efab58" opacity=".18"/>
          <path d={'M'+(x-5)+' 207 Q'+(x-12)+' 190 '+x+' 177 Q'+(x+11)+' 188 '+(x+5)+' 207Z'} fill="#f9c27f"/>
          <rect x={x-7} y="205" width="14" height="32" rx="3" fill="#f0d5ae"/>
        </g>)}
      </>}
      {scene === 'journal' && <>
        <path d="M0 235 L65 160 L119 211 L205 139 L294 220 L398 161 L527 226 L680 156 V300 H0Z" fill="#261934" opacity=".7"/>
        <path d="M400 250 V80 Q400 26 483 26 Q568 26 568 80 V250" fill="none" stroke="#77658b" strokeWidth="20"/>
        <path d="M482 42 V235 M414 133 H553" stroke="#57416a" strokeWidth="9"/>
        <rect x="0" y="223" width="680" height="80" fill="#27172a"/>
        <rect x="0" y="222" width="680" height="12" fill="#896281"/>
        <path d="M177 234 Q233 198 308 222 L339 238 L365 219 Q436 197 501 233 L498 283 Q418 254 340 284 Q262 258 180 283Z"
          fill="#e9d4b7" stroke="#b69c9e" strokeWidth="3"/>
        <path d="M340 238 V281 M198 242 L314 254 M198 254 L308 268 M371 256 L473 242 M373 271 L474 256"
          stroke="#9f87a0" strokeWidth="2.5" opacity=".6"/>
        <path d="M129 225 L165 183 L152 224Z" fill="#f1c89b"/>
        <path d="M139 219 Q132 195 154 179 Q171 199 150 218Z" fill="#f5ab65"/>
        <rect x="126" y="221" width="35" height="48" rx="4" fill="#ddd2cc"/>
        <path d="M527 232 L550 197 L570 227Z" fill="#f5bc80"/>
        <rect x="530" y="226" width="33" height="47" rx="5" fill="#d7b3bd"/>
        <path d="M560 235 L595 159" stroke="#b2b6e0" strokeWidth="5"/>
      </>}
      {scene === 'market' && <>
        <path d="M0 196 L84 151 L166 209 L252 147 L351 211 L476 144 L580 214 L680 166 V300 H0Z" fill="#30203e"/>
        <rect x="0" y="250" width="680" height="50" fill="#1c1424"/>
        {[28,236,444].map((x,i)=><g key={i}>
          <path d={'M'+x+' 171 L'+(x+90)+' 118 L'+(x+180)+' 171Z'} fill={i===1?'#866176':'#705176'} stroke="#c39d86" strokeWidth="3"/>
          <path d={'M'+x+' 171 H'+(x+180)+' L'+(x+170)+' 196 H'+(x+10)+'Z'} fill="#aa7493"/>
          {[0,1,2,3].map(n=><path key={n} d={'M'+(x+10+n*40)+' 171 v24'} stroke="#f1b898" strokeWidth="12" opacity=".6"/>)}
          <rect x={x+15} y="194" width="8" height="71" fill="#95768a"/>
          <rect x={x+157} y="194" width="8" height="71" fill="#95768a"/>
          <rect x={x+22} y="238" width="136" height="12" rx="3" fill="#b18a82"/>
          <rect x={x+35} y="222" width="23" height="17" rx="5" fill="#e9b878"/>
          <rect x={x+75} y="217" width="20" height="21" rx="5" fill="#9776c0"/>
          <rect x={x+112} y="225" width="25" height="14" rx="6" fill="#e0bdb0"/>
        </g>)}
        <path d="M0 100 Q175 140 340 107 Q515 70 680 116" fill="none" stroke="#d9a478" strokeWidth="2"/>
        {[75,160,244,340,428,530,624].map((x,i)=><g key={i}>
          <circle cx={x} cy={i%2?120:115} r="6" fill="#ffe5aa" opacity=".95"/>
          <circle cx={x} cy={i%2?120:115} r="15" fill="#ffc883" opacity=".12"/>
        </g>)}
      </>}
      {scene === 'hearth' && <>
        <path d="M0 205 L70 167 L145 193 L232 135 L345 205 L451 143 L535 183 L622 154 L680 203 V300 H0Z" fill="#34223f"/>
        <path d="M0 255 Q110 200 218 236 Q360 189 475 225 Q610 188 680 226 V300 H0Z" fill="#1b1123"/>
        <ellipse cx="341" cy="265" rx="178" ry="33" fill="#d18c68" opacity=".12"/>
        <path d="M287 270 L391 243 M391 272 L287 245" stroke="#7c5243" strokeWidth="13" strokeLinecap="round"/>
        <path d="M318 246 Q281 202 324 170 Q333 194 345 198 Q363 173 361 155 Q420 211 369 248Z" fill="#f2a76d"/>
        <path d="M332 245 Q317 217 343 201 Q351 218 363 209 Q377 233 358 245Z" fill="#ffe5ac"/>
        {[160,520].map((x,i)=><g key={i} opacity=".95">
          <ellipse cx={x} cy="258" rx="34" ry="15" fill="#15101b"/>
          <circle cx={x} cy="203" r="17" fill="#261626"/>
          <path d={'M'+(x-24)+' 264 Q'+(x-35)+' 217 '+x+' 221 Q'+(x+39)+' 215 '+(x+28)+' 264Z'} fill="#322034"/>
          <path d={'M'+(x-30)+' 262 L'+(x-54)+' 278 M'+(x+30)+' 262 L'+(x+55)+' 280'} stroke="#322034" strokeWidth="14" strokeLinecap="round"/>
        </g>)}
        <circle cx="339" cy="225" r="95" fill="#f6a964" opacity=".045"/>
      </>}
      <path d="M0 287 Q164 263 330 287 Q508 260 680 283 V300 H0Z" fill="#090711" opacity=".8"/>
    </svg>
  );
}

const emptyForm = {
  title: '', category: 'Community', format: 'In person',
  date: '', time: '', place: '', description: ''
};

function fromStorage(key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function dateLabel(date, time) {
  if (!date) return 'Date to be decided';
  const parsed = new Date(date + 'T12:00:00');
  const label = Number.isNaN(parsed.getTime())
    ? date
    : new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(parsed);
  return time ? label + ' at ' + time : label;
}

export default function Gatherings({ navigate }) {
  const [category, setCategory] = useState('All');
  const [format, setFormat] = useState('Any format');
  const [search, setSearch] = useState('');
  const [drafts, setDrafts] = useState(() => fromStorage(STORE_DRAFTS));
  const [savedIdeas, setSavedIdeas] = useState(() => fromStorage(STORE_IDEAS));
  const [composerOpen, setComposerOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (!composerOpen) return;
    const onKey = (event) => { if (event.key === 'Escape') setComposerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [composerOpen]);

  const filtered = useMemo(() => {
    const lower = search.trim().toLowerCase();
    return [...drafts.map(d => ({ ...d, isDraft: true })), ...inspiration].filter(item => {
      if (category !== 'All' && item.category !== category) return false;
      if (format !== 'Any format' && item.format !== format) return false;
      return !lower || [item.title, item.description, item.place, item.category]
        .some(value => String(value || '').toLowerCase().includes(lower));
    });
  }, [drafts, category, format, search]);

  function saveArray(key, value, setter) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setter(value);
      return true;
    } catch {
      setNotice('Your browser blocked local storage. Please check browser privacy settings.');
      return false;
    }
  }

  function toggleIdea(id) {
    const next = savedIdeas.includes(id)
      ? savedIdeas.filter(value => value !== id)
      : [...savedIdeas, id];
    if (saveArray(STORE_IDEAS, next, setSavedIdeas)) {
      setNotice(next.includes(id) ? 'Idea saved on this device.' : 'Idea removed from saved ideas.');
    }
  }

  function openNew() {
    setForm(emptyForm);
    setEditingId(null);
    setComposerOpen(true);
  }

  function openEdit(item) {
    setForm({
      title: item.title, category: item.category, format: item.format,
      date: item.date, time: item.time, place: item.place,
      description: item.description
    });
    setEditingId(item.id);
    setComposerOpen(true);
  }

  function updateForm(field, value) {
    setForm(current => ({ ...current, [field]: value }));
  }

  function submitDraft(event) {
    event.preventDefault();
    const item = {
      ...form,
      title: form.title.trim(),
      place: form.place.trim(),
      description: form.description.trim(),
      id: editingId || 'draft-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6)
    };
    if (!item.title || !item.date || !item.place) return;
    const next = editingId
      ? drafts.map(d => d.id === editingId ? item : d)
      : [item, ...drafts];
    if (saveArray(STORE_DRAFTS, next, setDrafts)) {
      setComposerOpen(false);
      setNotice('Gathering draft saved on this device. It has not been published.');
      setCategory('All');
      setFormat('Any format');
      setSearch('');
    }
  }

  function removeDraft(id) {
    if (!window.confirm('Delete this gathering draft from this device?')) return;
    const next = drafts.filter(d => d.id !== id);
    if (saveArray(STORE_DRAFTS, next, setDrafts)) setNotice('Draft deleted.');
  }

  return (
    <main className="gather-page">
      <header className="gather-topbar">
        <button className="gather-return" onClick={() => navigate('/sanctuary')}>
          <ArrowLeft size={17} /> Sanctuary
        </button>
        <span className="gather-brand">MAHASA’S CIRCLE <span>✦</span> GATHERINGS</span>
        <button className="gather-top-action" onClick={openNew}><Plus size={16} /> Plan a Gathering</button>
      </header>

      <section className="gather-hero" aria-labelledby="gather-title">
        <div className="gather-stars" aria-hidden="true" />
        <div className="gather-arch" aria-hidden="true">
          <div className="gather-moon" />
          <div className="gather-horizon gather-horizon-back" />
          <div className="gather-horizon gather-horizon-front" />
          <span className="gather-water" />
        </div>
        <div className="gather-hero-content">
          <span className="gather-overline"><Sparkles size={14} /> COME TOGETHER UNDER THE MOON</span>
          <h1 id="gather-title">Gatherings</h1>
          <p className="gather-subtitle">Every flame shines brighter together.</p>
          <p className="gather-description">
            Discover new paths, share sacred moments, and make room for the connections that matter.
            From moonlit rituals to artisan markets, there is a place beside the fire for you.
          </p>
          <div className="gather-hero-actions">
            <button className="gather-primary" onClick={() => listRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Gatherings <ArrowRight size={17} />
            </button>
            <button className="gather-secondary" onClick={openNew}>
              <Plus size={17} /> Plan a Gathering
            </button>
          </div>
        </div>
        <div className="gather-hero-footer"><span>☾</span> CARRY THE TORCH. LIGHT THE WAY. <span>☽</span></div>
      </section>

      <section className="gather-content" ref={listRef} id="gather-list">
        <div className="gather-intro">
          <div>
            <span className="gather-overline gather-overline-small">THE CIRCLE AWAITS</span>
            <h2>Find your gathering place</h2>
            <p>Explore what the Circle could become, or begin planning something of your own.</p>
          </div>
          <div className="gather-stats"><Users size={20} /><strong>{drafts.length}</strong><span>Your local drafts</span></div>
        </div>

        <div className="gather-preview-note" role="note">
          <Flame size={20} />
          <p><strong>Early preview.</strong> Example gatherings below are concepts, not real events.
          Your drafts and saved ideas stay in this browser; public event listings and RSVPs are not connected yet.</p>
        </div>

        {notice && <div className="gather-notice" role="status"><Check size={17} /> {notice}
          <button onClick={() => setNotice('')} aria-label="Dismiss notification"><X size={16} /></button>
        </div>}

        <div className="gather-filter-bar">
          <div className="gather-search">
            <Search size={19} aria-hidden="true" />
            <input aria-label="Search gatherings" placeholder="Search gatherings or ideas..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <label className="gather-select-label">
            <span>Format</span>
            <select value={format} onChange={e => setFormat(e.target.value)}>
              <option>Any format</option>
              <option>In person</option>
              <option>Online</option>
            </select>
          </label>
        </div>

        <div className="gather-tabs" aria-label="Gathering categories">
          {categories.map(name => (
            <button key={name} className={category === name ? 'active' : ''}
              aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>
          ))}
        </div>

        <div className="gather-grid">
          {filtered.map(item => {
            const isSaved = savedIdeas.includes(item.id);
            return (
              <article className={'gather-card gather-tone-' + (item.tone || 'violet')} key={item.id}>
                <div className="gather-card-visual">
                  <GatheringScene type={item.id} />
                  <span className="gather-card-ribbon">{item.isDraft ? 'YOUR PRIVATE DRAFT' : 'EXAMPLE • NOT LIVE'}</span>
                </div>
                <div className="gather-card-body">
                  <div className="gather-meta"><span>{item.category}</span><span>·</span>
                    <span>{item.format === 'Online' ? <Compass size={13} /> : <MapPin size={13} />}{item.format}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description || 'A new gathering is taking shape.'}</p>
                  <div className="gather-card-bottom">
                    <span className="gather-card-date">
                      <CalendarDays size={15} />
                      {item.isDraft ? dateLabel(item.date, item.time) : 'Inspiration for the Circle'}
                    </span>
                    {item.isDraft ? (
                      <div className="gather-card-actions">
                        <button onClick={() => openEdit(item)}>Edit</button>
                        <button onClick={() => removeDraft(item.id)} aria-label={'Delete ' + item.title}><Trash2 size={16} /></button>
                      </div>
                    ) : (
                      <button className={'gather-save' + (isSaved ? ' saved' : '')}
                        onClick={() => toggleIdea(item.id)} aria-pressed={isSaved}>
                        <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                        {isSaved ? 'Saved' : 'Save idea'}
                      </button>
                    )}
                  </div>
                  {item.isDraft && <p className="gather-draft-location">{item.place}</p>}
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="gather-empty"><Moon size={32} />
            <h3>No gatherings match yet</h3>
            <p>Try another category or search term, or start a new gathering draft.</p>
            <button className="gather-primary" onClick={() => {setCategory('All');setFormat('Any format');setSearch('');}}>Clear filters</button>
          </div>
        )}

        <section className="gather-last-call">
          <span aria-hidden="true">✦</span>
          <div>
            <h2>Have a flame to share?</h2>
            <p>Begin planning your own ritual, workshop, market, or community circle. We’ll save your draft here while Mahasa’s Circle grows.</p>
          </div>
          <button className="gather-primary" onClick={openNew}>Create a draft <ArrowRight size={17} /></button>
        </section>
      </section>

      <footer className="gather-footer">MAHASA’S CIRCLE <span>✦</span> CARRY THE TORCH. LIGHT THE WAY.</footer>

      {composerOpen && (
        <div className="gather-modal-backdrop" onMouseDown={e => {
          if (e.currentTarget === e.target) setComposerOpen(false);
        }}>
          <section className="gather-modal" role="dialog" aria-modal="true" aria-labelledby="gather-modal-title">
            <header className="gather-modal-head">
              <div><span className="gather-overline gather-overline-small">A NEW FLAME</span>
                <h2 id="gather-modal-title">{editingId ? 'Edit your gathering' : 'Plan a gathering'}</h2></div>
              <button onClick={() => setComposerOpen(false)} aria-label="Close gathering planner"><X size={22} /></button>
            </header>
            <p className="gather-modal-note"><Heart size={16} /> This is a private planning draft, not a public event listing.</p>
            <form onSubmit={submitDraft} className="gather-form">
              <label>Gathering name *
                <input value={form.title} onChange={e => updateForm('title', e.target.value)}
                  required maxLength={90} placeholder="A moonlit evening together" />
              </label>
              <div className="gather-form-row">
                <label>Category
                  <select value={form.category} onChange={e => updateForm('category', e.target.value)}>
                    {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label>Format
                  <select value={form.format} onChange={e => updateForm('format', e.target.value)}>
                    <option>In person</option><option>Online</option>
                  </select>
                </label>
              </div>
              <div className="gather-form-row">
                <label>Date *
                  <input type="date" value={form.date} onChange={e => updateForm('date', e.target.value)} required />
                </label>
                <label>Time
                  <input type="time" value={form.time} onChange={e => updateForm('time', e.target.value)} />
                </label>
              </div>
              <label>{form.format === 'Online' ? 'Online platform or meeting plan *' : 'City or location *'}
                <input value={form.place} onChange={e => updateForm('place', e.target.value)}
                  required maxLength={120} placeholder={form.format === 'Online' ? 'Private link to be added later' : 'Columbus, Ohio'} />
              </label>
              <label>About the gathering
                <textarea value={form.description} onChange={e => updateForm('description', e.target.value)}
                  rows={4} maxLength={600} placeholder="What will people experience?" />
              </label>
              <div className="gather-form-actions">
                <button type="button" className="gather-secondary" onClick={() => setComposerOpen(false)}>Cancel</button>
                <button type="submit" className="gather-primary"><Check size={16} /> Save private draft</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
