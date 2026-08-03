import React, { useEffect, useState } from 'react';
const lines=['Welcome.','Every journey begins with a single flame.','Carry the Torch.','No light is diminished by lighting another.','The Circle remembers every flame.'];
export default function FirstFlameCeremony({active,onComplete}){
 const [index,setIndex]=useState(0); const [dissolve,setDissolve]=useState(false);
 useEffect(()=>{if(!active)return;setIndex(0);setDissolve(false);const timers=[];lines.forEach((_,i)=>timers.push(setTimeout(()=>setIndex(i),700+i*1650)));timers.push(setTimeout(()=>setDissolve(true),700+lines.length*1650));timers.push(setTimeout(onComplete,700+lines.length*1650+1300));return()=>timers.forEach(clearTimeout)},[active,onComplete]);
 if(!active)return null;
 return <div className={`first-flame-ceremony ${dissolve?'dissolve':''}`} aria-live="polite"><div className="ceremony-fire"><i/><i/><i/></div><div className="ceremony-embers">{Array.from({length:28}).map((_,i)=><span key={i} style={{'--x':`${8+(i*13)%84}%`,'--delay':`${(i%9)*.15}s`,'--duration':`${4+(i%5)*.7}s`}}/>)}</div><p key={index} className={`ceremony-line line-${index}`}>{lines[index]}</p></div>
}
