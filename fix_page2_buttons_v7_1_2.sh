#!/usr/bin/env bash
set -euo pipefail

mkdir -p src/pages

cat > src/pages/CircleSection.jsx <<'EOF'
import React from 'react';
import { ArrowLeft, Flame } from 'lucide-react';

const copy = {
  threads: ['Silver Threads', 'Private conversations woven with care and intention.'],
  hearths: ['Hearths', 'Small communities gathered around shared paths and passions.'],
  local: ['Local Circle', 'Discover nearby people, shops, practitioners, and gatherings with privacy first.'],
  gatherings: ['Gatherings', 'Events, rituals, workshops, classes, and celebrations within the Circle.'],
  marketplace: ['Marketplace', 'Handcrafted tools, art, offerings, and treasures from Circle artisans.'],
  library: ['Library', 'Knowledge, stories, practices, and resources preserved by the Circle.'],
  bookmarks: ['Bookmarks', 'The reflections, threads, gatherings, and knowledge you chose to keep.'],
  messages: ['Messages', 'Your private conversations and active Silver Threads.'],
  settings: ['Settings', 'Control your experience, privacy, sound, accessibility, and preferences.'],
  upcoming: ['Upcoming Gatherings', 'See the rituals, workshops, and celebrations approaching next.'],
  map: ['Local Circle Map', 'Explore nearby activity without exposing precise locations.'],
  activity: ['Recent Activity', 'A calm record of meaningful changes within your Circle.'],
  moonwork: ['Moon Work', 'Explore lunar phases, prompts, and practices aligned with the sky.'],
  hecate: ["Hecate's Hearth", 'A focused space for crossroads, transformation, and sacred practice.'],
  shop: ['Like the Moon Craft', 'Visit the featured artisan inside the Circle marketplace.']
};

export default function CircleSection({ section, navigate }) {
  const [title, description] = copy[section] || ['Inside the Circle', 'This destination is being prepared.'];

  return (
    <main className="circle-section-page">
      <header className="section-page-header">
        <button onClick={() => navigate('/sanctuary')} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <span>Mahasa's Circle</span>
          <strong>{title}</strong>
        </div>
        <button onClick={() => navigate('/torch')} aria-label="Open Torch">
          <Flame size={19} />
        </button>
      </header>

      <section className="section-page-card">
        <p className="eyebrow">The path is opening</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="section-sigil"><Flame size={54} /></div>
        <p className="section-status">This destination is connected and ready for its full feature build.</p>
        <button className="primary-action" onClick={() => navigate('/sanctuary')}>
          Return to the Sanctuary
        </button>
      </section>
    </main>
  );
}
EOF

cat > src/App.jsx <<'EOF'
import React, { useEffect, useState } from 'react';
import Landing from './pages/Landing';
import Sanctuary from './pages/Sanctuary';
import Forge from './pages/Forge';
import Torch from './pages/Torch';
import CircleSection from './pages/CircleSection';

const routes = {
  '/': Landing,
  '/sanctuary': Sanctuary,
  '/forge': Forge,
  '/torch': Torch
};

function getPath() {
  return window.location.hash.replace(/^#/, '') || '/';
}

export default function App() {
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const handler = () => setPath(getPath());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (to) => {
    window.location.hash = to;
  };

  const Page = routes[path];
  if (Page) return <Page navigate={navigate} />;

  if (path.startsWith('/section/')) {
    return <CircleSection section={path.replace('/section/', '')} navigate={navigate} />;
  }

  return <Landing navigate={navigate} />;
}
EOF

python3 - <<'PY'
from pathlib import Path

p = Path("src/pages/Sanctuary.jsx")
text = p.read_text()
start = text.index("const links = [")
end = text.index("];", start) + 2

new_links = '''const links = [
  ['top-home','/sanctuary'],
  ['top-threads','/section/threads'],
  ['top-hearths','/section/hearths'],
  ['top-local','/section/local'],
  ['top-gatherings','/section/gatherings'],
  ['top-market','/section/marketplace'],
  ['top-library','/section/library'],
  ['nav-home','/sanctuary'],
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
];'''

p.write_text(text[:start] + new_links + text[end:])
PY

cat >> src/styles/global.css <<'EOF'

.circle-section-page{
  min-height:100svh;
  background:radial-gradient(circle at 50% 10%,rgba(110,43,150,.24),transparent 32%),linear-gradient(180deg,#08030d,#020105);
}
.section-page-header{
  display:grid;
  grid-template-columns:44px 1fr 44px;
  align-items:center;
  gap:10px;
  padding:14px;
  border-bottom:1px solid var(--line);
  background:rgba(5,2,8,.82);
  backdrop-filter:blur(18px);
}
.section-page-header button{
  width:42px;height:42px;border:1px solid var(--line);border-radius:50%;
  background:rgba(255,255,255,.04);display:grid;place-items:center
}
.section-page-header div{text-align:center}
.section-page-header span{display:block;color:#c993ec;font-size:9px;letter-spacing:.18em;text-transform:uppercase}
.section-page-header strong{display:block;margin-top:2px;font:20px Georgia,serif}
.section-page-card{
  width:min(680px,calc(100% - 28px));
  margin:40px auto;
  padding:34px 24px;
  text-align:center;
  border:1px solid var(--line);
  border-radius:24px;
  background:linear-gradient(145deg,rgba(20,9,29,.96),rgba(7,3,11,.96));
}
.section-page-card h1{margin:8px 0 12px;font:400 clamp(42px,9vw,70px) Georgia,serif}
.section-page-card>p{color:#d0c5d5;line-height:1.7}
.section-sigil{
  width:150px;height:150px;margin:32px auto;border:1px solid rgba(225,211,234,.3);
  border-radius:50%;display:grid;place-items:center;color:#d29af1;
  background:radial-gradient(circle,rgba(189,120,239,.18),rgba(9,4,13,.96) 67%);
  box-shadow:0 0 42px rgba(189,120,239,.24)
}
.section-status{font:italic 15px Georgia,serif;color:#bfaacb!important}
EOF

npm run build

echo "Page 2 buttons fixed and build verified."
