import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Check, Compass, Flame, MapPin, Plus, Search, ShieldCheck, Sparkles, Trash2, Users, X } from 'lucide-react';
import './LocalCircle.css';

const TYPES = ['All', 'Circles', 'Artisans', 'Gatherings', 'Spaces'];
const EXAMPLES = [
  { id:'circles', category:'Circles', title:'Kindred Circles', subtitle:'Find a place to belong', description:'A future home for small, respectful groups built around shared paths and meaningful connection.', symbol:'☾', color:'violet' },
  { id:'makers', category:'Artisans', title:'Moonlit Makers', subtitle:'Handcrafted with intention', description:'A future directory of artisans, ritual tools, creative work, and independent small businesses.', symbol:'◇', color:'gold' },
  { id:'events', category:'Gatherings', title:'Gather Beneath the Moon', subtitle:'Rituals, classes & events', description:'A pathway to gatherings and community events, starting with our interactive Gatherings preview.', symbol:'✦', color:'rose' },
  { id:'places', category:'Spaces', title:'Welcoming Spaces', subtitle:'A doorway to discovery', description:'A future guide to community-friendly spaces and resources shared with consent and care.', symbol:'⚿', color:'silver' }
];
const DRAFTS_KEY='mahasa.localCircle.drafts.v1';
const SAVED_KEY='mahasa.localCircle.savedIdeas.v1';
const AREA_KEY='mahasa.localCircle.preferredArea.v1';
const EMPTY={title:'',category:'Circles',area:'',description:''};
function load(key, fallback) {
  try { const v=JSON.parse(window.localStorage.getItem(key)||'null'); return v===null?fallback:v; }
  catch { return fallback; }
}
function persist(key,value) {
  try { window.localStorage.setItem(key,JSON.stringify(value)); return true; }
  catch { return false; }
}
export default function LocalCircle({navigate}) {
  const [category,setCategory]=useState('All');
  const [query,setQuery]=useState('');
  const [drafts,setDrafts]=useState(()=>{
    const v=load(DRAFTS_KEY,[]);return Array.isArray(v)?v:[];
  });
  const [saved,setSaved]=useState(()=>{
    const v=load(SAVED_KEY,[]);return Array.isArray(v)?v:[];
  });
  const [area,setArea]=useState(()=>{
    const v=load(AREA_KEY,'');return typeof v==='string'?v:'';
  });
  const [areaInput,setAreaInput]=useState(area);
  const [open,setOpen]=useState(false);
  const [privacyOpen,setPrivacyOpen]=useState(false);
  const [form,setForm]=useState(EMPTY);
  const [editing,setEditing]=useState(null);
  const [notice,setNotice]=useState('');

  useEffect(()=>{
    if(!open&&!privacyOpen)return;
    const close=e=>{if(e.key==='Escape'){setOpen(false);setPrivacyOpen(false);}};
    window.addEventListener('keydown',close);
    return ()=>window.removeEventListener('keydown',close);
  },[open,privacyOpen]);

  const filtered=useMemo(()=>{
    const search=query.trim().toLowerCase();
    return [...drafts.map(d=>({...d,isDraft:true,color:'violet',symbol:'✧'})),...EXAMPLES].filter(item=>
      (category==='All'||item.category===category)&&
      (!search||[item.title,item.category,item.area,item.subtitle,item.description]
        .some(t=>String(t||'').toLowerCase().includes(search)))
    );
  },[category,query,drafts]);

  function setField(field,value){setForm(f=>({...f,[field]:value}));}
  function beginDraft(){setEditing(null);setForm({...EMPTY,area});setOpen(true);}
  function editDraft(d){setEditing(d.id);setForm({title:d.title,category:d.category,area:d.area,description:d.description});setOpen(true);}
  function saveDraft(e){
    e.preventDefault();
    const d={
      id:editing||'lc-'+Date.now()+'-'+Math.random().toString(36).slice(2,6),
      title:form.title.trim(),category:form.category,area:form.area.trim(),description:form.description.trim()
    };
    if(!d.title||!d.area)return;
    const next=editing?drafts.map(old=>old.id===editing?d:old):[d,...drafts];
    if(!persist(DRAFTS_KEY,next)){setNotice('This browser could not save the draft.');return;}
    setDrafts(next);setOpen(false);setNotice('Private draft saved on this device. Nothing was published.');
    setQuery('');setCategory('All');
  }
  function deleteDraft(id){
    if(!window.confirm('Delete this private draft from this browser?'))return;
    const next=drafts.filter(x=>x.id!==id);
    if(persist(DRAFTS_KEY,next)){setDrafts(next);setNotice('Draft deleted.');}
    else setNotice('Could not remove this draft.');
  }
  function toggleSaved(id){
    const next=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];
    if(persist(SAVED_KEY,next)){setSaved(next);setNotice(next.includes(id)?'Idea saved on this device.':'Idea removed.');}
    else setNotice('Your browser could not save that idea.');
  }
  function saveArea(e){
    e.preventDefault();
    const next=areaInput.trim();
    if(persist(AREA_KEY,next)){setArea(next);setNotice(next?'Preferred area saved on this device. Live matching is not active yet.':'Preferred area cleared.');}
    else setNotice('Unable to save this area in your browser.');
  }
  return <main className="local-circle">
    <header className="lc-topbar">
      <button onClick={()=>navigate('/sanctuary')} className="lc-nav"><ArrowLeft size={17}/> Sanctuary</button>
      <span className="lc-wordmark">MAHASA’S CIRCLE <b>✦</b> LOCAL CIRCLE</span>
      <button className="lc-nav lc-top-action" onClick={beginDraft}><Plus size={16}/> Suggest a Listing</button>
    </header>

    <section className="lc-hero" aria-labelledby="lc-title">
      <div className="lc-stone-window" aria-hidden="true">
        <span className="lc-moon"/><span className="lc-landscape lc-landscape-one"/>
        <span className="lc-landscape lc-landscape-two"/><span className="lc-reflection"/>
      </div>
      <div className="lc-hero-content">
        <p className="lc-eyebrow"><Sparkles size={14}/> ROOTED IN PLACE • CONNECTED BY SPIRIT</p>
        <h1 id="lc-title">Local Circle</h1>
        <p className="lc-tagline">Find your people. Follow the light.</p>
        <p className="lc-lede">A doorway to kindred spirits, independent makers, gatherings, and welcoming spaces—built on trust, respect, and the freedom to choose what you share.</p>
        <div className="lc-hero-actions">
          <button className="lc-primary" onClick={()=>document.getElementById('lc-discover')?.scrollIntoView({behavior:'smooth'})}>Explore the vision <ArrowRight size={17}/></button>
          <button className="lc-outline" onClick={()=>setPrivacyOpen(true)}><ShieldCheck size={17}/> Our privacy approach</button>
        </div>
      </div>
      <div className="lc-hero-footer">☾ &nbsp; CARRY THE TORCH. LIGHT THE WAY. &nbsp; ☽</div>
    </section>

    <section className="lc-content" id="lc-discover">
      <div className="lc-heading">
        <div><div className="lc-eyebrow lc-small">A PLACE TO BELONG</div>
          <h2>Explore the paths ahead</h2>
          <p>These are ideas for what Local Circle could become—not real members, venues, or events.</p>
        </div>
        <div className="lc-draft-count"><Users size={20}/><strong>{drafts.length}</strong><span>Your private drafts</span></div>
      </div>
      <div className="lc-preview-note"><Flame size={20}/><p><strong>Development preview.</strong> This is not a live directory. No public member profiles, precise location tracking, nearby matching, messaging, or reservations are connected. Sample cards are concepts; drafts remain in this browser.</p></div>
      {notice&&<div className="lc-feedback" role="status"><Check size={16}/>{notice}<button aria-label="Dismiss notice" onClick={()=>setNotice('')}><X size={16}/></button></div>}

      <form className="lc-area" onSubmit={saveArea}>
        <div className="lc-area-label"><Compass size={22}/><div><strong>Your preferred discovery area</strong><span>City or general region only—never a street address.</span></div></div>
        <label><span className="lc-screen-reader">Preferred city or region</span>
          <input placeholder="e.g., Central Ohio" value={areaInput} maxLength={70} onChange={e=>setAreaInput(e.target.value)} />
        </label>
        <button className="lc-outline" type="submit">Save area</button>
      </form>
      {area&&<p className="lc-area-status">Saved area: <strong>{area}</strong> · This preference is local to your browser and does not filter live listings.</p>}

      <div className="lc-toolbar">
        <label className="lc-search"><Search size={18}/><input aria-label="Search Local Circle ideas and drafts" placeholder="Search ideas or drafts..." value={query} onChange={e=>setQuery(e.target.value)}/></label>
        <button onClick={beginDraft} className="lc-outline"><Plus size={16}/> Create private draft</button>
      </div>
      <div className="lc-tabs" role="group" aria-label="Local Circle categories">
        {TYPES.map(t=><button key={t} className={category===t?'active':''} aria-pressed={category===t} onClick={()=>setCategory(t)}>{t}</button>)}
      </div>

      <div className="lc-grid">
        {filtered.map(item=>{
          const marked=saved.includes(item.id);
          return <article className={'lc-card lc-'+(item.color||'violet')} key={item.id}>
            <div className="lc-card-art">
              <div className="lc-card-arch"><span className="lc-card-moon"/><span className="lc-card-hills"/></div>
              <div className="lc-card-symbol" aria-hidden="true">{item.symbol||'✧'}</div>
              <span className="lc-card-badge">{item.isDraft?'YOUR PRIVATE DRAFT':'ILLUSTRATIVE • NOT LIVE'}</span>
            </div>
            <div className="lc-card-body">
              <span className="lc-category">{item.category}</span>
              <h3>{item.title}</h3>
              {item.subtitle&&<p className="lc-card-subtitle">{item.subtitle}</p>}
              <p className="lc-card-description">{item.description||'An idea waiting to take shape.'}</p>
              {item.isDraft&&<p className="lc-card-place"><MapPin size={15}/>{item.area}</p>}
              <div className="lc-card-actions">
                {item.isDraft?<><button onClick={()=>editDraft(item)}>Edit draft</button><button onClick={()=>deleteDraft(item.id)} aria-label={'Delete '+item.title}><Trash2 size={16}/></button></>
                  :item.id==='events'?<><button onClick={()=>navigate('/section/gatherings')}>Open Gatherings <ArrowRight size={15}/></button><button onClick={()=>toggleSaved(item.id)} aria-label={marked?'Remove saved idea':'Save idea'}><Bookmark size={16} fill={marked?'currentColor':'none'}/></button></>
                  :<button onClick={()=>toggleSaved(item.id)} aria-pressed={marked}><Bookmark size={16} fill={marked?'currentColor':'none'}/>{marked?'Saved idea':'Save idea'}</button>}
              </div>
            </div>
          </article>;
        })}
      </div>
      {filtered.length===0&&<div className="lc-empty"><Moon size={32}/><h3>No matching ideas yet</h3><p>Try another category, or start a new private draft.</p><button className="lc-primary" onClick={()=>{setCategory('All');setQuery('');}}>Clear filters</button></div>}
      <section className="lc-cta"><span className="lc-cta-medallion">✦</span><div><h2>Every path begins with connection.</h2><p>Help shape what a safer, more welcoming local spiritual community could look like.</p></div><button onClick={beginDraft} className="lc-primary">Start a private draft <ArrowRight size={16}/></button></section>
    </section>

    <footer className="lc-footer">MAHASA’S CIRCLE <span>✦</span> CARRY THE TORCH. LIGHT THE WAY.</footer>

    {privacyOpen&&<div className="lc-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setPrivacyOpen(false);}}>
      <section className="lc-dialog" role="dialog" aria-modal="true" aria-labelledby="lc-privacy-heading"><button className="lc-close" aria-label="Close privacy notes" onClick={()=>setPrivacyOpen(false)}><X size={20}/></button>
        <div className="lc-eyebrow lc-small"><ShieldCheck size={14}/> DESIGN PRINCIPLE</div><h2 id="lc-privacy-heading">Your location is yours.</h2>
        <p>In this prototype, entering a city or general region only saves it inside this browser. We do not request GPS permission, publish that area, or use it to identify nearby members.</p>
        <p>Before any real community discovery launches, location visibility, moderation, reporting, and member consent will need a full design and security review.</p>
        <button className="lc-primary" onClick={()=>setPrivacyOpen(false)}>Understood <Check size={16}/></button>
      </section>
    </div>}

    {open&&<div className="lc-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false);}}>
      <section className="lc-dialog" role="dialog" aria-modal="true" aria-labelledby="lc-compose-heading">
        <button className="lc-close" aria-label="Close listing draft" onClick={()=>setOpen(false)}><X size={20}/></button>
        <div className="lc-eyebrow lc-small"><Plus size={14}/> A NEW CONNECTION</div>
        <h2 id="lc-compose-heading">{editing?'Edit your draft':'Suggest a listing'}</h2>
        <p className="lc-dialog-note">This is a private idea draft on your device, not a public submission.</p>
        <form className="lc-form" onSubmit={saveDraft}>
          <label>Listing name *<input required maxLength={90} placeholder="A kindred circle" value={form.title} onChange={e=>setField('title',e.target.value)}/></label>
          <label>Category<select value={form.category} onChange={e=>setField('category',e.target.value)}>{TYPES.filter(t=>t!=='All').map(t=><option key={t}>{t}</option>)}</select></label>
          <label>City or general region *<input required maxLength={70} placeholder="Central Ohio" value={form.area} onChange={e=>setField('area',e.target.value)}/></label>
          <label>About this idea<textarea rows={4} maxLength={500} placeholder="What kind of connection would this create?" value={form.description} onChange={e=>setField('description',e.target.value)}/></label>
          <div className="lc-form-actions"><button type="button" className="lc-outline" onClick={()=>setOpen(false)}>Cancel</button><button className="lc-primary" type="submit"><Check size={16}/> Save private draft</button></div>
        </form>
      </section>
    </div>}
  </main>;
}
