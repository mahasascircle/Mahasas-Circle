import React, { useCallback, useEffect, useState } from 'react';
import FirstFlameCeremony from '../components/FirstFlameCeremony';
import AmbientAudio from '../components/AmbientAudio';

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

  // The three visible Sanctuary arches are the primary destination portals.
  ['portal-threads','/section/threads',null,{left:'30%',top:'47.1%',width:'12.3%',height:'22.4%'}],
  ['portal-hearths','/section/hearths',null,{left:'42.2%',top:'47.1%',width:'22.5%',height:'22.4%'}],
  ['portal-gatherings','/section/gatherings',null,{left:'64.7%',top:'47.1%',width:'13.2%',height:'22.4%'}],

  // Bottom feature destinations, left to right.
  ['feature-moon','/section/moonwork','Moon Work',{left:'2.8%',top:'68.3%',width:'29%',height:'14%'}],
  ['feature-hecate','/section/hecate',"Hecate's Hearth",{left:'32.4%',top:'68.3%',width:'33%',height:'14%'}],
  ['feature-artisans','/section/artisans','Artisans Circle',{left:'66%',top:'68.3%',width:'31.5%',height:'14%'}]
];

export default function Sanctuary({ navigate }) {
  const [ceremony, setCeremony] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('mahasaFirstFlameCeremonySeen') === 'true';
    if (!seen) setCeremony(true);
    else setTimeout(() => setRevealed(true), 250);
  }, []);

  const completeCeremony = useCallback(() => {
    localStorage.setItem('mahasaFirstFlameCeremonySeen','true');
    setCeremony(false);
    setTimeout(() => setRevealed(true), 180);
  }, []);

  return (
    <main className={`approved-sanctuary ${revealed ? 'revealed' : ''}`}>
      <style>{`
        .approved-hotspot.portal-threads,
        .approved-hotspot.portal-hearths,
        .approved-hotspot.portal-gatherings {
          border-radius: 24px 24px 14px 14px;
        }

        .approved-hotspot.portal-threads:hover,
        .approved-hotspot.portal-hearths:hover,
        .approved-hotspot.portal-gatherings:hover,
        .approved-hotspot.portal-threads:focus-visible,
        .approved-hotspot.portal-hearths:focus-visible,
        .approved-hotspot.portal-gatherings:focus-visible {
          box-shadow: inset 0 0 0 1px rgba(225,181,110,.42),
                      0 0 26px rgba(189,120,239,.28);
        }

        .feature-destination {
          border-radius: 20px !important;
        }

        .feature-hotspot-label {
          position: absolute;
          left: 50%;
          bottom: 8px;
          transform: translateX(-50%);
          width: max-content;
          max-width: calc(100% - 16px);
          padding: 7px 12px;
          border: 1px solid rgba(225,181,110,.52);
          border-radius: 999px;
          background: rgba(7,3,11,.82);
          color: #f4e8f8;
          box-shadow: 0 0 20px rgba(157,74,201,.22);
          backdrop-filter: blur(8px);
          font: 500 12px/1.15 Georgia, serif;
          letter-spacing: .08em;
          white-space: nowrap;
          pointer-events: none;
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }

        .feature-destination:hover .feature-hotspot-label,
        .feature-destination:focus-visible .feature-hotspot-label {
          transform: translateX(-50%) translateY(-2px);
          border-color: rgba(226,194,140,.9);
          box-shadow: 0 0 28px rgba(189,120,239,.42);
        }

        @media (max-width: 650px) {
          .feature-hotspot-label {
            padding: 5px 8px;
            font-size: 9px;
            letter-spacing: .04em;
          }
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

          {links.map(([className,target,label,style]) => (
            <button
              key={className}
              className={`approved-hotspot ${className} ${label ? 'feature-destination' : ''}`}
              style={style}
              onClick={() => navigate(target)}
              aria-label={label || className.replaceAll('-',' ')}
            >
              {label ? <span className="feature-hotspot-label">{label}</span> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="approved-page-controls">
        <button className="portal-return" onClick={() => navigate('/')}>← Portal</button>
        <AmbientAudio compact />
      </div>
      <FirstFlameCeremony active={ceremony} onComplete={completeCeremony} />
    </main>
  );
}
