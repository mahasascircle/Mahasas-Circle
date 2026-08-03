import React,{useEffect} from 'react';
function vibrate(pattern){if('vibrate'in navigator){try{navigator.vibrate(pattern)}catch{}}}
export default function FlameTransition({active,onComplete,title='Carry the torch.',subtitle='The Circle opens.'}){
 useEffect(()=>{if(!active)return;vibrate(12);const a=setTimeout(()=>vibrate([18,30,28,28,40]),520);const b=setTimeout(()=>vibrate(10),2180);const c=setTimeout(onComplete,2850);return()=>{clearTimeout(a);clearTimeout(b);clearTimeout(c)}},[active,onComplete]);
 if(!active)return null;
 return <div className="flame-transition" aria-live="polite"><div className="flame-darken"/><div className="transition-stars"/><div className="embers">{Array.from({length:30}).map((_,i)=><i key={i} style={{'--x':`${2+i*3.25}%`,'--delay':`${(i%11)*.07}s`,'--scale':`${.55+(i%7)*.13}`,'--drift':`${-26+(i%9)*7}px`}}/>)}</div><div className="flame-bed">{Array.from({length:12}).map((_,i)=><span key={i} className={`flame-tongue flame-${i+1}`}/>)}</div><div className="heat-haze"/><div className="flame-lens"><span className="lens-swirl one"/><span className="lens-swirl two"/></div><div className="transition-copy"><strong>{title}</strong><span>{subtitle}</span></div></div>
}
