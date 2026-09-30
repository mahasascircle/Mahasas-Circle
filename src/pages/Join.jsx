import React, { useMemo, useState } from 'react';

export default function Join({ navigate }) {
  const existing = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('mahasaMemberProfile') || 'null');
    } catch {
      return null;
    }
  }, []);

  const [circleName, setCircleName] = useState(existing?.circleName || '');
  const [email, setEmail] = useState(existing?.email || '');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const cleanName = circleName.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setError('Choose the name you want the Circle to know you by.');
      return;
    }

    if (!/^\\S+@\\S+\\.\\S+$/.test(cleanEmail)) {
      setError('Enter a valid email address.');
      return;
    }

    if (!agreed) {
      setError('Please agree to enter the Circle with respect and care.');
      return;
    }

    localStorage.setItem('mahasaMemberProfile', JSON.stringify({
      circleName: cleanName,
      email: cleanEmail,
      joinedAt: new Date().toISOString()
    }));
    localStorage.setItem('mahasaHasEntered', 'true');
    localStorage.setItem('mahasaFirstFlameCeremonySeen', 'false');

    navigate('/forge');
  };

  return (
    <main style={{
      minHeight:'100svh',
      display:'grid',
      placeItems:'center',
      padding:'28px 18px',
      color:'#f8f2fa',
      background:'radial-gradient(circle at 50% 10%,rgba(114,45,150,.28),transparent 27%),radial-gradient(circle at 18% 82%,rgba(74,27,98,.22),transparent 28%),#030106'
    }}>
      <section style={{
        width:'min(620px,100%)',
        padding:'34px',
        border:'1px solid rgba(225,181,110,.34)',
        borderRadius:'28px',
        background:'radial-gradient(circle at 50% 0,rgba(150,68,197,.18),transparent 34%),rgba(10,5,14,.95)',
        boxShadow:'0 36px 110px rgba(0,0,0,.58)'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            border:'1px solid rgba(238,225,244,.18)',
            borderRadius:'999px',
            padding:'9px 14px',
            background:'rgba(255,255,255,.025)',
            color:'#f4eaf6',
            cursor:'pointer'
          }}
        >
          ← Back to the Moon
        </button>

        <div style={{
          width:'92px',
          height:'92px',
          margin:'30px auto 18px',
          display:'grid',
          placeItems:'center',
          borderRadius:'50%',
          border:'1px solid rgba(225,181,110,.5)',
          background:'radial-gradient(circle,rgba(195,103,236,.25),rgba(5,2,8,.95) 70%)',
          boxShadow:'0 0 40px rgba(189,120,239,.28)',
          font:'42px Georgia, serif',
          color:'#e7c8f7'
        }}>
          ✦
        </div>

        <div style={{textAlign:'center'}}>
          <p style={{margin:'0 0 9px',color:'#d1a8e7',fontSize:'11px',letterSpacing:'.2em',textTransform:'uppercase'}}>
            The First Flame
          </p>
          <h1 style={{margin:0,font:'400 clamp(42px,8vw,68px)/1 Georgia, serif'}}>
            Begin Your Journey
          </h1>
          <p style={{maxWidth:'500px',margin:'18px auto 28px',color:'#cbbdce',lineHeight:'1.7'}}>
            Choose how the Circle will know you. Your first step leads to the sigil forge,
            where your Personal Torch begins.
          </p>
        </div>

        <form onSubmit={submit} style={{display:'grid',gap:'14px'}}>
          <label style={{display:'grid',gap:'7px'}}>
            <span style={{color:'#ddcedf',fontSize:'12px'}}>Circle name</span>
            <input
              value={circleName}
              onChange={(event) => setCircleName(event.target.value)}
              autoComplete="nickname"
              placeholder="The name others will see"
              style={{
                width:'100%',
                padding:'13px 14px',
                border:'1px solid rgba(235,225,241,.18)',
                borderRadius:'13px',
                outline:0,
                color:'#fff',
                background:'rgba(0,0,0,.28)'
              }}
            />
          </label>

          <label style={{display:'grid',gap:'7px'}}>
            <span style={{color:'#ddcedf',fontSize:'12px'}}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              style={{
                width:'100%',
                padding:'13px 14px',
                border:'1px solid rgba(235,225,241,.18)',
                borderRadius:'13px',
                outline:0,
                color:'#fff',
                background:'rgba(0,0,0,.28)'
              }}
            />
          </label>

          <label style={{display:'flex',gap:'10px',alignItems:'flex-start',color:'#bfaec5',fontSize:'12px',lineHeight:'1.5'}}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              style={{marginTop:'3px'}}
            />
            <span>I enter the Circle with respect, care, and regard for the people gathered here.</span>
          </label>

          {error ? <p role="alert" style={{margin:0,color:'#f1a6ca',fontSize:'12px'}}>{error}</p> : null}

          <button
            type="submit"
            style={{
              marginTop:'4px',
              padding:'14px 18px',
              border:'1px solid rgba(228,190,139,.58)',
              borderRadius:'14px',
              background:'linear-gradient(180deg,#7f3ca7,#4f2368)',
              color:'#fff',
              font:'500 16px Georgia, serif',
              cursor:'pointer',
              boxShadow:'0 0 28px rgba(156,71,200,.24)'
            }}
          >
            Light My First Flame
          </button>
        </form>

        <p style={{margin:'18px 0 0',textAlign:'center',color:'#8f7f96',fontSize:'11px',lineHeight:'1.5'}}>
          Prototype membership is saved on this device for now. Secure account login and server-side membership will be connected before launch.
        </p>
      </section>
    </main>
  );
}
