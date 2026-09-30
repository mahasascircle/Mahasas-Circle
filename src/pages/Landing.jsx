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
    <main className={`landing-page landing-v2 ${returning?'returning':'first-arrival'}`}>
      <div className="landing-v2-backdrop" aria-hidden="true"/>
      <div className="procedural-stars" aria-hidden="true"/>
      <div className="portal-fog fog-one" aria-hidden="true"/>
      <div className="portal-fog fog-two" aria-hidden="true"/>

      <section className="landing-v2-scene" aria-label="Mahasa's Circle moonlit portal">
        <button className="landing-v2-join" onClick={beginJourney}>
          Join the Circle <span aria-hidden="true">☾</span>
        </button>

        <div className="landing-v2-moon" aria-hidden="true">
          <span className="moon-crater c1"/>
          <span className="moon-crater c2"/>
          <span className="moon-crater c3"/>
        </div>

        <div className="landing-v2-torch" aria-label="Living violet torch">
          <div className="landing-v2-flame" aria-hidden="true">
            <i className="v2-flame outer"/>
            <i className="v2-flame violet"/>
            <i className="v2-flame blue"/>
            <i className="v2-flame gold"/>
            <i className="v2-flame core"/>
          </div>
          <div className="landing-v2-cup"><span>☾</span></div>
          <div className="landing-v2-stem"/>
        </div>

        <div className="landing-v2-copy">
          <div className="landing-v2-mark" aria-hidden="true">☾ ✦ ☽</div>
          <h1>Mahasa’s Circle</h1>
          <p className="landing-v2-kicker">A safe space. Every path. One Circle.</p>
          <h2>The fire is already burning.</h2>
          <p className="landing-v2-intro">
            A sacred space to learn, teach, gather, and walk your own path.
            Every circle begins with a single step.
          </p>

          <button className="landing-v2-enter" onClick={enterCircle}>
            <span aria-hidden="true">✦</span>
            {returning ? 'Enter the Sanctuary' : 'Enter the Circle'}
          </button>

          <button className="landing-v2-begin" onClick={beginJourney}>
            <span aria-hidden="true">❖</span>
            <span>
              <strong>Begin Your Journey</strong>
              <small>Create your account and join the Circle</small>
            </span>
          </button>
        </div>
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
