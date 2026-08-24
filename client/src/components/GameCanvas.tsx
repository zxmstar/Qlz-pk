// Style reminder: 胶囊星球像素剧场；Babylon 只负责全屏画布边界，像素战斗逻辑保持清晰、即时、可验证。
import { useEffect, useRef } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { createGameScene } from "@/game/scene";

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || mountedRef.current) return;
    mountedRef.current = true;
    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    let disposed = false;
    let handle: { dispose: () => void } | null = null;

    createGameScene(engine, canvas).then((created) => {
      if (disposed) {
        created.dispose();
        return;
      }
      handle = created;
      engine.runRenderLoop(() => created.scene.render());
    });

    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      handle?.dispose();
      engine.stopRenderLoop();
      engine.dispose();
      mountedRef.current = false;
    };
  }, []);

  return <canvas ref={canvasRef} className="game-canvas" aria-label="Capsule Planet Fighter game canvas" />;
}
