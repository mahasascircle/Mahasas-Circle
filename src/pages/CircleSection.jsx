import React from 'react';

const copy = {
  threads: ['Silver Threads', 'Private conversations woven with care and intention.'],
  hearths: ['Hearths', 'Small communities gathered around shared paths and passions.'],
  local: ['Local Circle', 'Discover nearby people, practitioners, shops, and gatherings.'],
  gatherings: ['Gatherings', 'Events, rituals, workshops, classes, and celebrations.'],
  marketplace: ['Marketplace', 'Artisans, handmade tools, offerings, and treasures.'],
  library: ['Library', 'Knowledge, stories, practices, and resources preserved by the Circle.'],
  bookmarks: ['Bookmarks', 'Everything within the Circle you chose to keep close.'],
  messages: ['Messages', 'Your conversations and active Silver Threads.'],
  settings: ['Settings', 'Your privacy, accessibility, sound, and Circle preferences.'],
  upcoming: ['Upcoming Gatherings', 'See what is approaching within the Circle.'],
  map: ['Local Circle', 'Explore nearby activity while protecting precise locations.'],
  activity: ['Recent Activity', 'Meaningful changes and moments from your Circle.'],
  moonwork: ['Moon Work', 'Lunar reflection, ritual, and practices aligned with the sky.'],
  hecate: ["Hecate's Hearth", 'A space for crossroads, transformation, and sacred practice.'],
  shop: ['Like the Moon Craft', 'The featured artisan space inside Mahasa’s Circle.']
};

export default function CircleSection({ section, navigate }) {
  const [title, description] = copy[section] || [
    'Inside the Circle',
    'This path is still being prepared.'
  ];

  return (
    <main style={{
      minHeight:'100vh',
      background:'radial-gradient(circle at top,#25102f,#050207 55%)',
      color:'white',
      padding:'24px',
      textAlign:'center'
    }}>
      <button
        onClick={() => navigate('/sanctuary')}
        style={{
          background:'transparent',
          color:'white',
          border:'1px solid rgba(255,255,255,.25)',
          borderRadius:'999px',
          padding:'10px 18px',
          cursor:'pointer'
        }}
      >
        ← Return to the Sanctuary
      </button>

      <section style={{
        maxWidth:'680px',
        margin:'70px auto',
        padding:'40px 24px',
        border:'1px solid rgba(201,147,236,.3)',
        borderRadius:'24px',
        background:'rgba(12,5,18,.82)'
      }}>
        <p style={{
          color:'#c993ec',
          textTransform:'uppercase',
          letterSpacing:'.18em'
        }}>
          Mahasa’s Circle
        </p>

        <h1 style={{
          fontFamily:'Georgia, serif',
          fontSize:'clamp(42px,8vw,70px)',
          fontWeight:'400'
        }}>
          {title}
        </h1>

        <p style={{
          fontSize:'18px',
          lineHeight:'1.7',
          color:'#d4c8d9'
        }}>
          {description}
        </p>

        <div style={{
          margin:'42px auto',
          width:'130px',
          height:'130px',
          borderRadius:'50%',
          display:'grid',
          placeItems:'center',
          fontSize:'54px',
          border:'1px solid rgba(210,154,241,.45)',
          boxShadow:'0 0 45px rgba(170,80,220,.25)'
        }}>
          🔥
        </div>

        <p style={{color:'#bca9c6'}}>
          This path is connected. Its full experience will be built in the next sprint.
        </p>
      </section>
    </main>
  );
}
