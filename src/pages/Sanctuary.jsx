import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FirstFlameCeremony from '../components/FirstFlameCeremony';
import AmbientAudio from '../components/AmbientAudio';

const searchDestinations = [
  ['Silver Threads', 'Private conversations and meaningful connections', '/section/threads'],
  ['Hearths', 'Communities gathered around shared paths', '/section/hearths'],
  ['Local Circle', 'Nearby people, practitioners, shops, and gatherings', '/section/local'],
  ['Gatherings', 'Events, rituals, workshops, and celebrations', '/section/gatherings'],
  ['Marketplace', 'Artisans, handmade tools, and offerings', '/section/marketplace'],
  ['Library', 'Knowledge, stories, practices, and resources', '/section/library'],
  ['Moon Work', 'Lunar reflection, ritual, and journaling', '/section/moonwork'],
  ["Hecate's Hearth", 'Crossroads, keys, devotion, and sacred practice', '/section/hecate'],
  ['Artisans Circle', 'Curated makers and founding artisan Like the Moon Craft', '/section/artisans'],
  ['Messages', 'Your conversations and active Silver Threads', '/section/messages'],
  ['Bookmarks', 'Everything you chose to keep close', '/section/bookmarks'],
  ['Settings', 'Privacy, accessibility, sound, and preferences', '/section/settings'],
  ['Personal Torch', 'Your profile and personal presence in the Circle', '/torch']
];

const links = [
  ['nav-threads','/section/threads'],
  ['nav-hearths','/section/hearths'],
  ['nav-local','/section/local'],
  ['nav-gatherings','/section/gatherings'],
  ['nav-market','/section/marketplace'],
  ['nav-library','/section/library'],
  ['nav-profile','/torch'],
  ['nav-bookmarks','/section/bookmarks'],
  ['nav-messages','/section/messages'],
  ['nav-settings','/section/settings'],

  // Three visible arched destination windows.
  ['portal-threads','/section/threads',null,{left:'30.1%',top:'47.3%',width:'11.8%',height:'22.1%'}],
  ['portal-hearths','/section/hearths',null,{left:'43.0%',top:'47.3%',width:'21.0%',height:'22.1%'}],
  ['portal-gatherings','/section/gatherings',null,{left:'77.2%',top:'47.3%',width:'20.4%',height:'22.1%'}]
];

const features = [
  ['feature-moon','/section/moonwork','Moon Work','☾','Lunar reflection & ritual',{left:'22.6%',top:'85.4%',width:'22.2%',height:'7.8%'}],
  ['feature-hecate','/section/hecate',"Hecate's Hearth",'⚿','Crossroads, keys & flame',{left:'48.8%',top:'85.4%',width:'22.2%',height:'7.8%'}],
  ['feature-artisans','/section/artisans','Artisans Circle','◇','Makers & sacred craft',{left:'75.0%',top:'85.4%',width:'22.2%',height:'7.8%'}]
];

export default function Sanctuary({ navigate }) {
  const [ceremony, setCeremony] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const seen = localStorage.getItem('mahasaFirstFlameCeremonySeen') === 'true';
    if (!seen) setCeremony(true);
    else setTimeout(() => setRevealed(true), 250);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const completeCeremony = useCallback(() => {
    localStorage.setItem('mahasaFirstFlameCeremonySeen','true');
    setCeremony(false);
    setTimeout(() => setRevealed(true), 180);
  }, []);

  const filteredSearch = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return searchDestinations.slice(0, 7);
    return searchDestinations.filter(([title,description]) =>
      `${title} ${description}`.toLowerCase().includes(needle)
    );
  }, [query]);

  const openDestination = (target) => {
    setSearchOpen(false);
    setNotificationsOpen(false);
    navigate(target);
  };

  return (
    <main className={`approved-sanctuary ${revealed ? 'revealed' : ''}`}>
      <style>{`
        /* Neutralize the temporary magenta debug layer without touching the locked left-nav coordinates. */
        .approved-sanctuary .approved-hotspot {
          background: transparent !important;
          outline: 0 !important;
        }

        .approved-sanctuary .approved-hotspot:focus-visible {
          outline: 2px solid rgba(245,228,255,.95) !important;
          outline-offset: 2px;
        }

        .approved-hotspot.portal-threads,
        .approved-hotspot.portal-hearths,
        .approved-hotspot.portal-gatherings {
          border-radius: 28px 28px 14px 14px;
          transition: box-shadow .2s ease, background .2s ease, transform .2s ease;
        }

        .approved-hotspot.portal-threads:hover,
        .approved-hotspot.portal-hearths:hover,
        .approved-hotspot.portal-gatherings:hover,
        .approved-hotspot.portal-threads:focus-visible,
        .approved-hotspot.portal-hearths:focus-visible,
        .approved-hotspot.portal-gatherings:focus-visible {
          background: radial-gradient(circle at 50% 74%, rgba(189,120,239,.12), transparent 64%) !important;
          box-shadow: inset 0 0 0 1px rgba(225,181,110,.48),
                      0 0 30px rgba(189,120,239,.25);
          transform: translateY(-2px);
        }

        .sanctuary-top-hit {
          position: absolute;
          z-index: 8;
          border: 0;
          padding: 0;
          background: transparent;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .sanctuary-search-hit {
          left: 29.2%;
          top: 3.15%;
          width: 50.8%;
          height: 4.3%;
          border-radius: 999px;
        }

        .sanctuary-notification-hit {
          left: 83.4%;
          top: 2.65%;
          width: 5.8%;
          height: 5.4%;
          border-radius: 50%;
        }

        .sanctuary-profile-hit {
          left: 90.1%;
          top: 2.15%;
          width: 7.8%;
          height: 6.5%;
          border-radius: 50%;
        }

        .sanctuary-top-hit:hover,
        .sanctuary-top-hit:focus-visible {
          outline: 1px solid rgba(225,181,110,.7);
          box-shadow: 0 0 22px rgba(189,120,239,.28);
        }

        .feature-destination {
          border-radius: 18px !important;
          display: grid !important;
          place-items: center;
          overflow: visible;
        }

        .feature-plaque {
          width: 94%;
          min-height: 66px;
          display: grid;
          grid-template-columns: 48px 1fr;
          align-items: center;
          gap: 10px;
          padding: 8px 13px 8px 9px;
          border: 1px solid rgba(225,181,110,.62);
          border-radius: 18px;
          background:
            radial-gradient(circle at 18% 50%, rgba(189,120,239,.22), transparent 28%),
            linear-gradient(135deg,rgba(10,4,14,.93),rgba(31,10,40,.86));
          color: #f7edf9;
          box-shadow:
            inset 0 0 20px rgba(255,255,255,.025),
            0 0 26px rgba(130,47,170,.28);
          backdrop-filter: blur(9px);
          pointer-events: none;
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
        }

        .feature-plaque-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid rgba(236,203,154,.62);
          background: radial-gradient(circle,rgba(170,84,215,.24),rgba(6,2,10,.92) 72%);
          color: #efd5ff;
          font: 26px/1 Georgia, serif;
          box-shadow: 0 0 18px rgba(189,120,239,.24);
        }

        .feature-plaque-copy {
          min-width: 0;
          text-align: left;
        }

        .feature-plaque-copy strong {
          display: block;
          color: #fff5ff;
          font: 500 15px/1.1 Georgia, serif;
          letter-spacing: .025em;
        }

        .feature-plaque-copy span {
          display: block;
          margin-top: 4px;
          color: #cbb8d1;
          font-size: 9px;
          line-height: 1.2;
          text-transform: uppercase;
          letter-spacing: .095em;
        }

        .feature-destination:hover .feature-plaque,
        .feature-destination:focus-visible .feature-plaque {
          transform: translateY(-3px);
          border-color: rgba(242,210,159,.94);
          box-shadow: 0 0 34px rgba(189,120,239,.42);
        }

        .sanctuary-overlay {
          position: fixed;
          inset: 0;
          z-index: 10020;
          display: grid;
          place-items: start center;
          padding: max(76px,8vh) 18px 30px;
          background: rgba(2,1,5,.72);
          backdrop-filter: blur(12px);
        }

        .sanctuary-panel {
          width: min(680px,100%);
          max-height: min(760px,80vh);
          overflow: auto;
          border: 1px solid rgba(225,181,110,.34);
          border-radius: 24px;
          background:
            radial-gradient(circle at 50% 0,rgba(112,46,148,.23),transparent 31%),
            rgba(8,4,12,.97);
          box-shadow: 0 32px 100px rgba(0,0,0,.64);
          color: #f7f1f8;
        }

        .sanctuary-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 18px 20px;
          border-bottom: 1px solid rgba(235,225,241,.12);
        }

        .sanctuary-panel-head h2 {
          margin: 0;
          font: 400 25px Georgia, serif;
        }

        .sanctuary-panel-close {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(235,225,241,.18);
          background: rgba(255,255,255,.04);
          color: #fff;
          cursor: pointer;
        }

        .circle-search-input {
          width: calc(100% - 40px);
          margin: 18px 20px 8px;
          padding: 14px 16px;
          border: 1px solid rgba(225,181,110,.38);
          border-radius: 14px;
          outline: 0;
          color: #fff;
          background: rgba(0,0,0,.34);
        }

        .circle-search-input:focus {
          border-color: rgba(201,139,235,.9);
          box-shadow: 0 0 0 3px rgba(189,120,239,.09);
        }

        .search-results {
          display: grid;
          gap: 8px;
          padding: 10px 20px 22px;
        }

        .search-result {
          border: 1px solid rgba(235,225,241,.12);
          border-radius: 14px;
          padding: 13px 14px;
          text-align: left;
          color: #fff;
          background: rgba(255,255,255,.025);
          cursor: pointer;
        }

        .search-result:hover,
        .search-result:focus-visible {
          border-color: rgba(201,139,235,.58);
          background: rgba(189,120,239,.08);
        }

        .search-result strong {
          display: block;
          font: 17px Georgia, serif;
        }

        .search-result span {
          display: block;
          margin-top: 4px;
          color: #bfaec5;
          font-size: 12px;
        }

        .notification-body {
          padding: 30px 24px 34px;
          text-align: center;
        }

        .notification-orb {
          width: 86px;
          height: 86px;
          margin: 0 auto 18px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid rgba(225,181,110,.38);
          background: radial-gradient(circle,rgba(189,120,239,.2),rgba(6,2,10,.9) 72%);
          font-size: 34px;
          box-shadow: 0 0 34px rgba(189,120,239,.18);
        }

        .notification-body h3 {
          margin: 0 0 8px;
          font: 400 25px Georgia, serif;
        }

        .notification-body p {
          max-width: 440px;
          margin: 0 auto;
          color: #c4b3c9;
          line-height: 1.6;
        }

        .notification-actions {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 22px;
        }

        .notification-actions button {
          padding: 10px 14px;
          border: 1px solid rgba(225,181,110,.32);
          border-radius: 999px;
          color: #fff;
          background: rgba(189,120,239,.08);
          cursor: pointer;
        }

        @media (max-width: 650px) {
          .feature-plaque {
            min-height: 52px;
            grid-template-columns: 34px 1fr;
            gap: 7px;
            padding: 6px 8px;
          }

          .feature-plaque-icon {
            width: 31px;
            height: 31px;
            font-size: 19px;
          }

          .feature-plaque-copy strong { font-size: 11px; }
          .feature-plaque-copy span { display: none; }
        }
      `}</style>

      <div className="approved-dashboard-wrap">
        <div className="approved-dashboard-art" role="img" aria-label="Mahasa's Circle Sanctuary">
          <div className="dashboard-atmosphere" aria-hidden="true">
            <span className="moon-glow" />
            <span className="torch-glow" />
            <span className="lake-shimmer" />
            <span className="ember e1" />
            <span className="ember e2" />
            <span className="ember e3" />
            <span className="ember e4" />
          </div>

          <button
            className="sanctuary-top-hit sanctuary-search-hit"
            onClick={() => setSearchOpen(true)}
            aria-label="Search Mahasa's Circle"
          />
          <button
            className="sanctuary-top-hit sanctuary-notification-hit"
            onClick={() => setNotificationsOpen(true)}
            aria-label="Open notifications"
          />
          <button
            className="sanctuary-top-hit sanctuary-profile-hit"
            onClick={() => navigate('/torch')}
            aria-label="Open your profile"
          />

          {links.map(([className,target,label,style]) => (
            <button
              key={className}
              className={`approved-hotspot ${className} ${label ? 'feature-destination' : ''}`}
              style={style}
              onClick={() => navigate(target)}
              aria-label={label || className.replaceAll('-',' ')}
            />
          ))}

          {features.map(([className,target,label,icon,subtitle,style]) => (
            <button
              key={className}
              className={`approved-hotspot feature-destination ${className}`}
              style={style}
              onClick={() => navigate(target)}
              aria-label={label}
            >
              <span className="feature-plaque">
                <span className="feature-plaque-icon" aria-hidden="true">{icon}</span>
                <span className="feature-plaque-copy">
                  <strong>{label}</strong>
                  <span>{subtitle}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="approved-page-controls">
        <button className="portal-return" onClick={() => navigate('/')}>← Portal</button>
        <AmbientAudio compact />
      </div>

      {searchOpen ? (
        <div className="sanctuary-overlay" role="dialog" aria-modal="true" aria-label="Search the Circle" onMouseDown={(e) => {
          if (e.target === e.currentTarget) setSearchOpen(false);
        }}>
          <section className="sanctuary-panel">
            <header className="sanctuary-panel-head">
              <h2>Search the Circle</h2>
              <button className="sanctuary-panel-close" onClick={() => setSearchOpen(false)} aria-label="Close search">×</button>
            </header>
            <input
              className="circle-search-input"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people, hearths, gatherings, or wisdom..."
            />
            <div className="search-results">
              {filteredSearch.length ? filteredSearch.map(([title,description,target]) => (
                <button className="search-result" key={title} onClick={() => openDestination(target)}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </button>
              )) : (
                <div className="search-result" aria-live="polite">
                  <strong>No path found yet</strong>
                  <span>Try a broader word such as moon, hearth, gathering, artisan, or library.</span>
                </div>
              )}
            </div>
          </section>
        </div>
      ) : null}

      {notificationsOpen ? (
        <div className="sanctuary-overlay" role="dialog" aria-modal="true" aria-label="Notifications" onMouseDown={(e) => {
          if (e.target === e.currentTarget) setNotificationsOpen(false);
        }}>
          <section className="sanctuary-panel">
            <header className="sanctuary-panel-head">
              <h2>Circle Notifications</h2>
              <button className="sanctuary-panel-close" onClick={() => setNotificationsOpen(false)} aria-label="Close notifications">×</button>
            </header>
            <div className="notification-body">
              <div className="notification-orb" aria-hidden="true">✦</div>
              <h3>Your Circle is quiet right now.</h3>
              <p>New messages, gathering updates, hearth activity, and other meaningful changes will appear here as those live systems come online.</p>
              <div className="notification-actions">
                <button onClick={() => openDestination('/section/messages')}>Open Messages</button>
                <button onClick={() => openDestination('/section/gatherings')}>View Gatherings</button>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      <FirstFlameCeremony active={ceremony} onComplete={completeCeremony} />
    </main>
  );
}
