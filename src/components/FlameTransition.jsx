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
    const a=setTimeout(()=>vibrate([18,24,30,20,34]),620);
    const b=setTimeout(()=>vibrate([12,16,10]),2500);
    const c=setTimeout(onComplete,3800);
    return()=>{clearTimeout(a);clearTimeout(b);clearTimeout(c)};
  },[active,onComplete]);

  if(!active) return null;

  return (
    <div className="flame-transition flame-walkthrough-real" aria-live="polite">
      <div className="walkthrough-source real-source" aria-hidden="true"/>

      <svg
        className="real-fire-svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="realFireGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
            <stop offset="10%" stopColor="#fdf3ff" stopOpacity=".98"/>
            <stop offset="22%" stopColor="#e9c7ff" stopOpacity=".94"/>
            <stop offset="38%" stopColor="#cf8cff" stopOpacity=".95"/>
            <stop offset="55%" stopColor="#a94dff" stopOpacity=".9"/>
            <stop offset="72%" stopColor="#7a2fff" stopOpacity=".7"/>
            <stop offset="100%" stopColor="#1c082c" stopOpacity="0"/>
          </linearGradient>

          <linearGradient id="realFireCore" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
            <stop offset="18%" stopColor="#fff8ff" stopOpacity=".98"/>
            <stop offset="36%" stopColor="#f3d9ff" stopOpacity=".92"/>
            <stop offset="56%" stopColor="#d59cff" stopOpacity=".78"/>
            <stop offset="78%" stopColor="#9a54ff" stopOpacity=".42"/>
            <stop offset="100%" stopColor="#5f2ea8" stopOpacity="0"/>
          </linearGradient>

          <filter id="realFireTurbulence" x="-35%" y="-35%" width="170%" height="170%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.065"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.012 0.055;0.018 0.095;0.010 0.06;0.012 0.055"
                dur="1.05s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="72"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="1.6" result="soft"/>
            <feMerge>
              <feMergeNode in="soft"/>
              <feMergeNode in="displaced"/>
            </feMerge>
          </filter>

          <filter id="realFireSoft" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.008 0.04"
              numOctaves="3"
              seed="3"
              result="noise2"
            >
              <animate
                attributeName="baseFrequency"
                values="0.008 0.035;0.015 0.06;0.008 0.035"
                dur="1.35s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise2" scale="95" result="wobble"/>
            <feGaussianBlur in="wobble" stdDeviation="5.5"/>
          </filter>
        </defs>

        <g className="fire-sheet fire-sheet-left" filter="url(#realFireTurbulence)">
          <path
            fill="url(#realFireGradient)"
            d="M-40 1030 L-40 730 C80 650 72 535 170 470 C90 378 210 292 144 160 C290 262 260 410 355 495 C305 605 430 735 332 1030 Z"
          />
          <path
            fill="url(#realFireCore)"
            opacity=".78"
            d="M-20 1030 L-20 800 C86 715 112 615 190 560 C145 475 232 390 196 285 C305 395 274 520 342 604 C286 720 358 830 316 1030 Z"
          />
        </g>

        <g className="fire-sheet fire-sheet-right" filter="url(#realFireTurbulence)" transform="translate(1000 0) scale(-1 1)">
          <path
            fill="url(#realFireGradient)"
            d="M-40 1030 L-40 730 C80 650 72 535 170 470 C90 378 210 292 144 160 C290 262 260 410 355 495 C305 605 430 735 332 1030 Z"
          />
          <path
            fill="url(#realFireCore)"
            opacity=".78"
            d="M-20 1030 L-20 800 C86 715 112 615 190 560 C145 475 232 390 196 285 C305 395 274 520 342 604 C286 720 358 830 316 1030 Z"
          />
        </g>

        <g className="fire-sheet fire-sheet-bottom" filter="url(#realFireTurbulence)">
          <path
            fill="url(#realFireGradient)"
            d="M-40 1030 L-40 850 C70 760 112 832 176 700 C236 826 298 756 342 640 C406 786 462 710 505 575 C548 722 616 778 676 648 C728 774 804 710 842 602 C886 734 936 782 1040 694 L1040 1030 Z"
          />
          <path
            fill="url(#realFireCore)"
            opacity=".65"
            d="M-40 1030 L-40 900 C92 820 164 880 234 760 C296 866 350 812 416 710 C474 838 542 794 604 676 C670 806 728 822 792 720 C852 830 922 812 1040 744 L1040 1030 Z"
          />
        </g>

        <g className="fire-haze-sheet" filter="url(#realFireSoft)" opacity=".54">
          <ellipse cx="500" cy="710" rx="470" ry="330" fill="#6e2dc7"/>
          <ellipse cx="500" cy="760" rx="350" ry="250" fill="#b05cff" opacity=".42"/>
          <ellipse cx="500" cy="655" rx="280" ry="220" fill="#8a63ff" opacity=".32"/>
        </g>
      </svg>

      <div className="real-fire-embers" aria-hidden="true">
        {Array.from({length:60}).map((_,i)=>(
          <i
            key={i}
            style={{
              '--x':`${2+(i*9.7)%96}%`,
              '--delay':`${(i%18)*.045}s`,
              '--size':`${2+(i%4)}px`,
              '--drift':`${-70+(i%15)*10}px`
            }}
          />
        ))}
      </div>

      <div className="real-fire-heat" aria-hidden="true"/>
      <div className="real-fire-bloom" aria-hidden="true"/>

      <div className="transition-copy real-fire-copy">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
