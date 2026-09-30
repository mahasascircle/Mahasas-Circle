import React,{useEffect} from 'react';

function vibrate(pattern){
  if('vibrate' in navigator){
    try{ navigator.vibrate(pattern); }catch{}
  }
}

export default function FlameTransition({
  active,
  onComplete,
  title='Cleansing your path.',
  subtitle='Release • Renew • Enter'
}){
  useEffect(()=>{
    if(!active) return;
    vibrate(12);
    const a=setTimeout(()=>vibrate([18,28,26,24,34]),460);
    const b=setTimeout(()=>vibrate(10),2050);
    const c=setTimeout(onComplete,2700);
    return()=>{clearTimeout(a);clearTimeout(b);clearTimeout(c)};
  },[active,onComplete]);

  if(!active) return null;

  return (
    <div className="flame-transition flame-cleanse" aria-live="polite">
      <div className="flame-darken"/>
      <div className="transition-stars"/>

      <div className="cleanse-glow violet" aria-hidden="true"/>
      <div className="cleanse-glow blue" aria-hidden="true"/>
      <div className="cleanse-glow gold" aria-hidden="true"/>

      <div className="embers cleanse-embers" aria-hidden="true">
        {Array.from({length:42}).map((_,i)=>(
          <i key={i} style={{
            '--x':`${2+(i*7.1)%96}%`,
            '--delay':`${(i%13)*.055}s`,
            '--scale':`${.5+(i%7)*.12}`,
            '--drift':`${-34+(i%11)*7}px`
          }}/>
        ))}
      </div>

      <div className="cleanse-fire left" aria-hidden="true">
        {Array.from({length:9}).map((_,i)=><span key={i} className={`cleanse-tongue t${i+1}`}/>)}
      </div>

      <div className="cleanse-fire right" aria-hidden="true">
        {Array.from({length:9}).map((_,i)=><span key={i} className={`cleanse-tongue t${i+1}`}/>)}
      </div>

      <div className="cleanse-sweep" aria-hidden="true"/>
      <div className="heat-haze"/>
      <div className="transition-copy">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
