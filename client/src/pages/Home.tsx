// Style reminder: 胶囊星球像素剧场；顶部 HUD 像街机状态栏，控制区低调悬浮，画面核心始终留给战斗。
import { useEffect, useState } from "react";
import GameCanvas from "@/components/GameCanvas";

type MatchState={pHp:number;pKi:number;eHp:number;eKi:number;time:number;combo:number;state:string;enemyState:string;transform:boolean};
type PadProps={label:string; action:string; keyName?:string};
const keys:Record<string,string>={left:"a",right:"d",jump:"w",light:"j",heavy:"k",guard:"l",charge:"i",transform:"o",dash:"Shift"};
function press(action:string, down:boolean){ const key=keys[action]; if(!key)return; window.dispatchEvent(new KeyboardEvent(down?"keydown":"keyup",{key,bubbles:true})); }
function Pad({label,action,keyName}:PadProps){return <button className="control-pad" onPointerDown={()=>press(action,true)} onPointerUp={()=>press(action,false)} onPointerLeave={()=>press(action,false)} aria-label={label}><span>{label}</span>{keyName&&<kbd>{keyName}</kbd>}</button>}
const initial:MatchState={pHp:100,pKi:34,eHp:100,eKi:34,time:72,combo:0,state:"idle",enemyState:"idle",transform:false};
export default function Home(){
  const [muted,setMuted]=useState(false); const [match,setMatch]=useState(initial);
  useEffect(()=>{const stop=(e:TouchEvent)=>e.preventDefault();const sync=(e:Event)=>setMatch((e as CustomEvent<MatchState>).detail);document.addEventListener("touchmove",stop,{passive:false});window.addEventListener("cpf-state",sync);return()=>{document.removeEventListener("touchmove",stop);window.removeEventListener("cpf-state",sync)};},[]);
  const finished=match.pHp<=0||match.eHp<=0||match.time<=0;
  return <main className="game-shell">
    <GameCanvas /><div className="scanlines" aria-hidden="true" />
    <header className="hud-top">
      <div className="fighter-hud p1"><div className="portrait portrait-nova">N</div><div className="hud-copy"><span className="tag">P1 // NOVA {match.transform&&<em className="transform-tag">ASCEND</em>}</span><div className="bar hp"><i style={{width:`${match.pHp}%`}} /></div><div className="bar ki"><i style={{width:`${match.pKi}%`}} /></div></div></div>
      <div className="round-readout"><span>ROUND 01</span><strong>{Math.ceil(match.time).toString().padStart(2,"0")}</strong><small>CAPSULE PLANET</small></div>
      <div className="fighter-hud p2"><div className="hud-copy"><span className="tag">RIVAL // VEX</span><div className="bar hp"><i style={{width:`${match.eHp}%`}} /></div><div className="bar ki"><i style={{width:`${match.eKi}%`}} /></div></div><div className="portrait portrait-vex">V</div></div>
    </header>
    <div className="match-badge"><span className="live-dot" /> LOCAL // TRAINING MATCH</div>
    {match.combo>0&&<div className="combo-readout"><strong>{match.combo}</strong><span>HIT<br/>CHAIN</span></div>}
    {finished&&<div className="round-end"><span>{match.eHp<=0?"NOVA WINS":"ROUND DRAW"}</span><small>PRESS J TO REMATCH</small></div>}
    <section className="controls" aria-label="移动端格斗控制"><div className="dpad"><Pad label="◀" action="left"/><Pad label="▶" action="right"/><Pad label="▲" action="jump"/></div><div className="action-cluster"><Pad label="A" action="light" keyName="J"/><Pad label="B" action="heavy" keyName="K"/><Pad label="G" action="guard" keyName="L"/><Pad label="KI" action="charge" keyName="I"/><Pad label="TR" action="transform" keyName="O"/><Pad label="DASH" action="dash" keyName="SHIFT"/></div></section>
    <footer className="game-footer"><span>WASD MOVE</span><span>J LIGHT · K HEAVY</span><span>I CHARGE · O TRANSFORM</span><button onClick={()=>setMuted(!muted)}>{muted?"SOUND OFF":"SOUND ON"}</button></footer>
  </main>
}
