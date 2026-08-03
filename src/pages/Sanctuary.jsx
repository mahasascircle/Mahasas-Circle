import React, { useCallback, useEffect, useState } from 'react';
import FirstFlameCeremony from '../components/FirstFlameCeremony';
import AmbientAudio from '../components/AmbientAudio';

const links = [
  ['top-home','/sanctuary'],['top-threads','/sanctuary'],['top-hearths','/sanctuary'],
  ['top-local','/sanctuary'],['top-gatherings','/sanctuary'],['top-market','/sanctuary'],['top-library','/sanctuary'],
  ['nav-home','/sanctuary'],['nav-threads','/sanctuary'],['nav-hearths','/sanctuary'],['nav-local','/sanctuary'],
  ['nav-gatherings','/sanctuary'],['nav-market','/sanctuary'],['nav-library','/sanctuary'],
  ['nav-profile','/torch'],['nav-bookmarks','/sanctuary'],['nav-messages','/sanctuary'],['nav-settings','/torch'],
  ['nav-flame','/torch'],['card-threads','/sanctuary'],['card-hearths','/sanctuary'],['card-local','/sanctuary'],
  ['card-gatherings','/sanctuary'],['card-market','/sanctuary'],['card-library','/sanctuary'],
  ['card-profile','/torch'],['card-bookmarks','/sanctuary'],['upcoming','/sanctuary'],
  ['local-map','/sanctuary'],['activity','/sanctuary'],['feature-moon','/sanctuary'],
  ['feature-hecate','/sanctuary'],['feature-shop','/sanctuary']
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
