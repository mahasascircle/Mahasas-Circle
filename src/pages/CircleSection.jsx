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
  activity: ['Recent Activity', 'Meaningful changes and moments from your Circle.']
};

const featurePages = {
  moonwork: {
    eyebrow: 'Lunar Practice',
    title: 'Moon Work',
    symbol: '☾',
    glow: 'rgba(190,170,235,.34)',
    accent: '#d8c8ef',
    description: 'A quiet place to reflect with the moon, record intentions, release what is finished, and return to the practices that keep you centered.',
    note: 'Living lunar phase, personal moon journal, and saved rituals can be connected as the Sanctuary grows.',
    cards: [
      ['Tonight’s Moon', 'A place for the current phase, its atmosphere, and a short reflection prompt.'],
      ['Intentions & Release', 'Write what you are calling in, what you are tending, and what you are ready to let go.'],
      ['Ritual Journal', 'Keep private notes, moon water records, candle work, dreams, and personal observations.'],
      ['Cycle Archive', 'Return to previous moon entries and notice the patterns that repeat across your path.']
    ]
  },
  hecate: {
    eyebrow: 'Crossroads • Keys • Flame',
    title: "Hecate’s Hearth",
    symbol: '✦',
    glow: 'rgba(151,76,201,.38)',
    accent: '#c98beb',
    description: 'A reverent hearth for learning, reflection, devotional practice, crossroads work, and conversation centered on Hecate.',
    note: 'This space can grow into devotional resources, private reflections, community discussion, and carefully curated educational material.',
    cards: [
      ['At the Crossroads', 'Prompts for transition, choice, boundaries, shadow work, and moments of becoming.'],
      ['Keys & Torches', 'Explore symbols, historical context, devotional practices, and personal meaning.'],
      ['Offerings & Devotion', 'Keep notes on prayers, offerings, altar care, and the practices that matter to you.'],
      ['The Hearth', 'A dedicated gathering place for respectful discussion, shared learning, and community support.']
    ]
  },
  artisans: {
    eyebrow: 'Made by Hand • Made with Intention',
    title: 'Artisans Circle',
    symbol: '◇',
    glow: 'rgba(225,181,110,.34)',
    accent: '#e1b56e',
    description: 'A curated home for makers, craftspeople, readers, artists, and small spiritual businesses whose work belongs inside the Circle.',
    note: 'Like the Moon Craft is presented here as a founding artisan while leaving room for the Circle to welcome other carefully chosen makers.',
    featured: {
      name: 'Like the Moon Craft',
      kicker: 'Founding Artisan',
      body: 'Handmade ritual tools, candles, oils, wands, staffs, besoms, altar pieces, and one-of-a-kind work created with intention.'
    },
    cards: [
      ['Ritual Tools', 'Wands, staffs, besoms, altar tools, handcrafted ritual pieces, and devotional work.'],
      ['Candles & Oils', 'Small-batch candles, ritual oils, anointing blends, and intention-focused creations.'],
      ['Adornment & Art', 'Jewelry, artwork, home pieces, talismans, and objects made to carry meaning.'],
      ['Readers & Makers', 'A future place for approved readers, artisans, and creators to share their work with the Circle.']
    ]
  }
};

// Keep the former route working for anyone who already followed it.
featurePages.shop = featurePages.artisans;

function ReturnButton({ navigate }) {
  return (
    <button className="circle-return" onClick={() => navigate('/sanctuary')}>
      ← Return to the Sanctuary
    </button>
  );
}

function FeaturePage({ data, navigate }) {
  return (
    <main
      className="circle-feature-page"
      style={{
        '--feature-accent': data.accent,
        '--feature-glow': data.glow
      }}
    >
      <style>{`
        .circle-feature-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          color: #f7f1f8;
          padding: 24px;
          background:
            radial-gradient(circle at 50% 0, var(--feature-glow), transparent 27%),
            radial-gradient(circle at 12% 72%, rgba(104,47,132,.18), transparent 28%),
            linear-gradient(180deg,#09040d 0%,#030105 72%);
        }

        .circle-feature-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .34;
          background-image:
            radial-gradient(circle at 13% 18%, rgba(255,255,255,.8) 0 1px, transparent 1.6px),
            radial-gradient(circle at 76% 12%, rgba(227,199,240,.7) 0 1px, transparent 1.6px),
            radial-gradient(circle at 88% 52%, rgba(255,255,255,.55) 0 1px, transparent 1.6px);
          background-size: 180px 180px, 240px 240px, 285px 285px;
        }

        .circle-feature-shell {
          position: relative;
          z-index: 1;
          width: min(1080px, 100%);
          margin: 0 auto;
        }

        .circle-return {
          border: 1px solid rgba(238,225,244,.23);
          border-radius: 999px;
          padding: 10px 18px;
          color: #f7f1f8;
          background: rgba(8,4,12,.64);
          cursor: pointer;
          backdrop-filter: blur(12px);
        }

        .circle-feature-hero {
          margin: 54px auto 24px;
          text-align: center;
          padding: 54px 24px 42px;
          border: 1px solid color-mix(in srgb, var(--feature-accent) 34%, transparent);
          border-radius: 28px;
          background:
            radial-gradient(circle at 50% 18%, var(--feature-glow), transparent 30%),
            linear-gradient(145deg,rgba(18,9,25,.93),rgba(5,2,8,.82));
          box-shadow: 0 35px 90px rgba(0,0,0,.44);
        }

        .circle-feature-eyebrow {
          margin: 0 0 16px;
          color: var(--feature-accent);
          text-transform: uppercase;
          letter-spacing: .19em;
          font-size: 11px;
        }

        .circle-feature-symbol {
          width: 118px;
          height: 118px;
          margin: 0 auto 20px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid color-mix(in srgb, var(--feature-accent) 62%, transparent);
          color: var(--feature-accent);
          font: 52px Georgia, serif;
          background: radial-gradient(circle, var(--feature-glow), rgba(5,2,8,.92) 68%);
          box-shadow: 0 0 46px var(--feature-glow);
        }

        .circle-feature-hero h1 {
          margin: 0;
          font: 400 clamp(46px,8vw,78px)/1 Georgia, serif;
          letter-spacing: -.02em;
        }

        .circle-feature-description {
          max-width: 760px;
          margin: 22px auto 0;
          color: #d9cddd;
          font-size: 17px;
          line-height: 1.75;
        }

        .circle-feature-grid {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 14px;
          margin: 18px 0;
        }

        .circle-feature-card,
        .artisan-founder {
          border: 1px solid rgba(235,225,241,.15);
          border-radius: 20px;
          padding: 24px;
          background: linear-gradient(145deg,rgba(18,9,25,.91),rgba(6,3,10,.86));
          box-shadow: 0 20px 50px rgba(0,0,0,.22);
        }

        .circle-feature-card h2,
        .artisan-founder h2 {
          margin: 0 0 10px;
          color: #fff8ff;
          font: 400 25px Georgia, serif;
        }

        .circle-feature-card p,
        .artisan-founder p {
          margin: 0;
          color: #cbbdce;
          line-height: 1.65;
        }

        .circle-feature-card::before {
          content: "✦";
          display: block;
          margin-bottom: 14px;
          color: var(--feature-accent);
          font-size: 18px;
        }

        .artisan-founder {
          margin: 18px 0;
          border-color: color-mix(in srgb, var(--feature-accent) 48%, transparent);
          background:
            radial-gradient(circle at 85% 0, var(--feature-glow), transparent 34%),
            linear-gradient(135deg,rgba(24,12,30,.96),rgba(7,3,10,.9));
        }

        .artisan-kicker {
          display: inline-block;
          margin-bottom: 12px;
          color: var(--feature-accent);
          text-transform: uppercase;
          letter-spacing: .15em;
          font-size: 10px;
        }

        .circle-feature-note {
          margin: 18px auto 46px;
          padding: 18px 20px;
          text-align: center;
          border-top: 1px solid rgba(235,225,241,.13);
          color: #ad9ab5;
          font: italic 14px/1.6 Georgia, serif;
        }

        @media (max-width: 720px) {
          .circle-feature-page { padding: 16px; }
          .circle-feature-hero { margin-top: 34px; padding: 38px 18px 32px; }
          .circle-feature-grid { grid-template-columns: 1fr; }
          .circle-feature-description { font-size: 15px; }
        }
      `}</style>

      <div className="circle-feature-shell">
        <ReturnButton navigate={navigate} />

        <section className="circle-feature-hero">
          <p className="circle-feature-eyebrow">{data.eyebrow}</p>
          <div className="circle-feature-symbol" aria-hidden="true">{data.symbol}</div>
          <h1>{data.title}</h1>
          <p className="circle-feature-description">{data.description}</p>
        </section>

        {data.featured ? (
          <section className="artisan-founder">
            <span className="artisan-kicker">{data.featured.kicker}</span>
            <h2>{data.featured.name}</h2>
            <p>{data.featured.body}</p>
          </section>
        ) : null}

        <section className="circle-feature-grid">
          {data.cards.map(([title,body]) => (
            <article className="circle-feature-card" key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </section>

        <p className="circle-feature-note">{data.note}</p>
      </div>
    </main>
  );
}

export default function CircleSection({ section, navigate }) {
  if (featurePages[section]) {
    return <FeaturePage data={featurePages[section]} navigate={navigate} />;
  }

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
      <ReturnButton navigate={navigate} />

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
          ✦
        </div>

        <p style={{color:'#bca9c6'}}>
          This path is connected. Its full experience will continue to grow with the Circle.
        </p>
      </section>
    </main>
  );
}
