import React, { useCallback, useEffect, useState } from 'react';
import FirstFlameCeremony from '../components/FirstFlameCeremony';
import AmbientAudio from '../components/AmbientAudio';

const links = [
  ['top-home','/sanctuary'],
  ['top-threads','/section/threads'],
  ['top-hearths','/section/hearths'],
  ['top-local','/section/local'],
  ['top-gatherings','/section/gatherings'],
  ['top-market','/section/marketplace'],
  ['top-library','/section/library'],

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
  ['nav-flame','/torch'],

  ['card-threads','/section/threads'],
  ['card-hearths','/section/hearths'],
  ['card-local','/section/local'],
  ['card-gatherings','/section/gatherings'],
  ['card-market','/section/marketplace'],
  ['card-library','/section/library'],
  ['card-profile','/torch'],
  ['card-bookmarks','/section/bookmarks'],

  ['upcoming','/section/upcoming'],
  ['local-map','/section/map'],
  ['activity','/section/activity'],
  ['feature-moon','/section/moonwork'],
  ['feature-hecate','/section/hecate'],
  ['feature-shop','/section/shop']
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
      <div className="approved-dashboard-wrap">
        <div className="approved-dashboard-art" role="img" aria-label="Mahasa's Circle approved dashboard">
          <div className="dashboard-atmosphere" aria-hidden="true">
            <span className="moon-glow" />
            <span className="torch-glow" />
            <span className="lake-shimmer" />
            <span className="ember e1" />
            <span className="ember e2" />
            <span className="ember e3" />
            <span className="ember e4" />
          </div>
          {links.map(([className,target]) => (
            <button key={className} className={`approved-hotspot ${className}`} onClick={() => navigate(target)}
              aria-label={className.replaceAll('-',' ')} />
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
