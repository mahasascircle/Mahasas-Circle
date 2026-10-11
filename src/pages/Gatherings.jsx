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
                  <span className="gather-card-symbol" aria-hidden="true">{item.symbol || '✦'}</span>
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
