import React,{useEffect} from 'react';

function vibrate(pattern){
  if('vibrate' in navigator){
    try{navigator.vibrate(pattern)}catch{}
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
    vibrate(14);
    const a=setTimeout(()=>vibrate([18,24,28,22,34]),520);
    const b=setTimeout(()=>vibrate([12,18,10]),2200);
    const c=setTimeout(onComplete,3250);
    return()=>{clearTimeout(a);clearTimeout(b);clearTimeout(c)};
  },[active,onComplete]);

  if(!active) return null;

  return (
    <div className="flame-transition flame-walkthrough" aria-live="polite">
      <div className="walkthrough-source" aria-hidden="true"/>
      <div className="walkthrough-vignette" aria-hidden="true"/>

      <div className="walkthrough-fire left" aria-hidden="true">
        {Array.from({length:10}).map((_,i)=><i key={i} className={`walk-flame f${i+1}`}/>)}
      </div>

      <div className="walkthrough-fire right" aria-hidden="true">
        {Array.from({length:10}).map((_,i)=><i key={i} className={`walk-flame f${i+1}`}/>)}
      </div>

      <div className="walkthrough-fire bottom" aria-hidden="true">
        {Array.from({length:12}).map((_,i)=><i key={i} className={`walk-flame b${i+1}`}/>)}
      </div>

      <div className="walkthrough-embers" aria-hidden="true">
        {Array.from({length:48}).map((_,i)=>(
          <i
            key={i}
            style={{
              '--x':`${3+(i*11.7)%94}%`,
              '--delay':`${(i%16)*.045}s`,
              '--size':`${2+(i%4)}px`,
              '--drift':`${-55+(i%13)*9}px`
            }}
          />
        ))}
      </div>

      <div className="walkthrough-heat" aria-hidden="true"/>
      <div className="walkthrough-bloom" aria-hidden="true"/>

      <div className="transition-copy walkthrough-copy">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
