import React,{useEffect,useState} from 'react';
import FlameTransition from '../components/FlameTransition';
import AmbientAudio from '../components/AmbientAudio';

export default function Landing({navigate}) {
  const [transition,setTransition]=useState(null);
  const [returning,setReturning]=useState(false);

  useEffect(()=>{
    setReturning(localStorage.getItem('mahasaHasEntered')==='true');
  },[]);

  const enterCircle=()=>{
    localStorage.setItem('mahasaHasEntered','true');
    localStorage.setItem('mahasaFirstFlameCeremonySeen','true');
    setTransition({
      target:'/sanctuary',
      title:returning ? 'Welcome home.' : 'Cleansing your path.',
      subtitle:returning ? 'Your flame has been waiting.' : 'Release • Renew • Enter'
    });
  };

  const beginJourney=()=>navigate('/join');

  return (
    <main className="landing-artwork-page">
      <div className="landing-artwork-backdrop" aria-hidden="true"/>
      <div className="procedural-stars" aria-hidden="true"/>

      <section
        className="landing-artwork-frame"
        role="img"
        aria-label="Mahasa's Circle moonlit sanctuary entrance with a living violet flame"
      >
        <div className="landing-artwork-flame-life" aria-hidden="true">
          <span className="art-flame-glow g1"/>
          <span className="art-flame-glow g2"/>
          <span className="art-flame-glow g3"/>
          <span className="art-flame-spark s1"/>
          <span className="art-flame-spark s2"/>
          <span className="art-flame-spark s3"/>
          <span className="art-flame-spark s4"/>
        </div>

        <button
          className="landing-artwork-hit enter"
          onClick={enterCircle}
          aria-label={returning ? 'Enter the Sanctuary' : 'Enter the Circle'}
        />

        <button
          className="landing-artwork-hit journey"
          onClick={beginJourney}
          aria-label="Begin your journey and create an account"
        />
      </section>

      <div className="landing-controls">
        <AmbientAudio compact/>
      </div>

      <FlameTransition
        active={Boolean(transition)}
        title={transition?.title}
        subtitle={transition?.subtitle}
        onComplete={()=>navigate(transition.target)}
      />
    </main>
  );
}
