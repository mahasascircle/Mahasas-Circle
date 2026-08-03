import React, { useEffect, useState } from 'react';
import Landing from './pages/Landing';
import Sanctuary from './pages/Sanctuary';
import Forge from './pages/Forge';
import Torch from './pages/Torch';

const routes = {
  '/': Landing,
  '/sanctuary': Sanctuary,
  '/forge': Forge,
  '/torch': Torch,
};

function currentPath() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  return routes[raw] ? raw : '/';
}

export default function App() {
  const [path, setPath] = useState(currentPath());

  useEffect(() => {
    const onHash = () => setPath(currentPath());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const Page = routes[path];

  return <Page navigate={(to) => { window.location.hash = to; }} />;
}
