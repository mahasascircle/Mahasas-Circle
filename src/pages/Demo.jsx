import React, { useEffect, useMemo, useState } from 'react';

const scenes = [
  {
    duration: 7000,
    art: 'landing',
    eyebrow: 'A new kind of spiritual community',
    title: "Mahasa's Circle",
    body: 'A living sanctuary for connection, practice, learning, local discovery, sacred craft, and meaningful community.',
    quote: 'Carry the Torch. Light the Way.'
  },
  {
    duration: 7000,
    art: 'landing',
    eyebrow: 'The First Flame',
    title: 'Enter through intention — not just another feed.',
    body: 'Members cross the threshold through a cinematic violet-flame welcome designed to feel like entering a sanctuary, not opening another social app.',
    badges: ['Ritual-inspired welcome', 'Atmospheric design', 'Calm, intentional entry']
  },
  {
    duration: 9000,
    art: 'sanctuary',
    eyebrow: 'Inside the Circle',
    title: 'The Sanctuary',
    body: 'The main gathering place brings the whole experience together: conversation, community, local discovery, events, learning, practice, makers, and personal space.',
    badges: ['Silver Threads', 'Hearths', 'Local Circle', 'Gatherings', 'Library', 'Marketplace']
  },
  {
    duration: 8000,
    art: 'sanctuary',
    eyebrow: 'Connect deeply',
    title: 'Silver Threads + Hearths',
    body: 'Silver Threads are for meaningful one-to-one conversation. Hearths are smaller communities built around shared paths, practices, interests, and traditions.',
    badges: ['Private conversation', 'Shared-path communities', 'Less noise, more depth'],
    focus: 'connect'
  },
  {
    duration: 8000,
    art: 'sanctuary',
    eyebrow: 'Find your people nearby',
    title: 'Local Circle + Gatherings',
    body: 'Discover nearby practitioners, shops, groups, workshops, rituals, classes, meetups, and celebrations — bringing online connection into real-world community.',
    badges: ['Nearby discovery', 'Events & workshops', 'Community beyond the screen'],
    focus: 'local'
  },
  {
    duration: 8000,
    art: 'sanctuary',
    eyebrow: 'Practice with intention',
    title: "Moon Work + Hecate's Hearth",
    body: "A quieter place for lunar reflection, journaling, ritual, crossroads work, keys, flame, devotion, and sacred practice.",
    badges: ['Lunar reflection', 'Ritual & journaling', 'Devotional space'],
    focus: 'practice'
  },
  {
    duration: 8000,
    art: 'sanctuary',
    eyebrow: 'Support sacred craft',
    title: 'Marketplace + Artisans Circle',
    body: 'A curated place to discover makers, handmade tools, ritual objects, art, and offerings — with Like the Moon Craft represented as a founding artisan.',
    badges: ['Independent makers', 'Handmade offerings', 'Curated discovery'],
    focus: 'makers'
  },
  {
    duration: 8000,
    art: 'sanctuary',
    eyebrow: 'Learn, save, return',
    title: 'Library + Personal Torch',
    body: 'Members can explore knowledge and stories, keep what matters close, shape their profile, manage privacy and accessibility, and build a presence that feels personal.',
    badges: ['Knowledge & resources', 'Bookmarks', 'Profile & privacy', 'Accessibility']
  },
  {
    duration: 8000,
    art: 'sanctuary',
    eyebrow: 'Built around belonging',
    title: 'Not another endless-scroll social network.',
    body: "Mahasa's Circle is being designed around depth, discovery, intentional community, real-world connection, spiritual practice, and the people who keep the torch lit.",
    quote: 'The fire is already burning.'
  },
  {
    duration: 7000,
    art: 'landing',
    eyebrow: 'Mahasa’s Circle',
    title: 'Carry the Torch. Light the Way.',
    body: 'A new circle is forming.',
    quote: 'Connection • Practice • Community • Craft'
  }
];

export default function Demo({ navigate }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % scenes.length);
    }, scenes[index].duration);
    return () => window.clearTimeout(id);
  }, [index, paused]);

  const scene = scenes[index];
  const progress = useMemo(() => ((index + 1) / scenes.length) * 100, [index]);

  const requestFullscreen = async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    } catch {}
  };

  return (
    <main className={`event-demo event-demo-${scene.art}`}>
      <div className="event-demo-backdrop" aria-hidden="true" />

      <section key={index} className="event-demo-stage">
        <div className="event-demo-art" aria-hidden="true" />
        <div className="event-demo-shade" aria-hidden="true" />

        {scene.focus ? <div className={`event-demo-focus focus-${scene.focus}`} aria-hidden="true" /> : null}

        <div className="event-demo-copy">
          <div className="event-demo-eyebrow">{scene.eyebrow}</div>
          <h1>{scene.title}</h1>
          <p>{scene.body}</p>

          {scene.badges ? (
            <div className="event-demo-badges">
              {scene.badges.map((badge) => <span key={badge}>{badge}</span>)}
            </div>
          ) : null}

          {scene.quote ? <div className="event-demo-quote">{scene.quote}</div> : null}
        </div>

        <div className="event-demo-brand">MAHASA'S CIRCLE</div>
        <div className="event-demo-count">{String(index + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</div>
      </section>

      <div className="event-demo-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="event-demo-controls">
        <button onClick={() => setPaused((value) => !value)}>{paused ? 'Play loop' : 'Pause'}</button>
        <button onClick={requestFullscreen}>Fullscreen</button>
        <button onClick={() => { setIndex(0); setPaused(false); }}>Restart</button>
        <button onClick={() => navigate('/')}>Exit demo</button>
      </div>
    </main>
  );
}
