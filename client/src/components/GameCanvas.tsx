// Babylon provides the full-screen canvas; v2 contains the responsive combat state machine.
import { useEffect, useRef } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { createGameScene } from "@/game/scene-v2";

export default function GameCanvas(){
 const canvasRef=useRef<HTMLCanvasElement|null>(null);const mountedRef=useRef(false);
 useEffect(()=>{const canvas=canvasRef.current;if(!canvas||mountedRef.current)return;mountedRef.current=true;const engine=new Engine(canvas,true,{preserveDrawingBuffer:true,stencil:true});let disposed=false;let handle:{dispose:()=>void}|null=null;
 createGameScene(engine,canvas).then(created=>{if(disposed){created.dispose();return}handle=created;engine.runRenderLoop(()=>created.scene.render())});
 const resize=()=>engine.resize();window.addEventListener("resize",resize);return()=>{disposed=true;window.removeEventListener("resize",resize);handle?.dispose();engine.stopRenderLoop();engine.dispose();mountedRef.current=false}},[]);
 return <canvas ref={canvasRef} className="game-canvas" aria-label="Capsule Planet Fighter game canvas"/>;
}
