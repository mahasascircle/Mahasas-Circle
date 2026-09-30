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
    setTransition({
      target:'/sanctuary',
      title:returning ? 'Welcome home.' : 'Carry the torch.',
      subtitle:returning ? 'Your flame has been waiting.' : 'Pass through the flame.'
    });
  };

  const beginJourney=()=>navigate('/join');

  return (
    <main className={`landing-page ${returning?'returning':'first-arrival'}`}>
      <div className="landing-blur"/>
      <div className="procedural-stars"/>
      <div className="portal-fog fog-one"/>
      <div className="portal-fog fog-two"/>

      <section className="landing-art" aria-label="Mahasa's Circle moonlit portal">
        <div className="living-moon-overlay"/>
        <div className="living-torch-overlay"><span/><span/><span/></div>

        <button
          className="landing-hit join"
          onClick={beginJourney}
          aria-label="Join the Circle"
        />

        <button
          className="landing-hit enter"
          onClick={enterCircle}
          aria-label="Enter the Circle"
        />

        <button
          className="landing-hit member"
          onClick={beginJourney}
          aria-label="Become a Member"
        />

        <button
          className="landing-hit journey"
          onClick={beginJourney}
          aria-label="Begin your journey and sign up"
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
