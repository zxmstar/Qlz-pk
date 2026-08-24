# Structure: Capsule Planet Fighter

## Runtime shape

React provides only the full-screen frame and lifecycle boundary. `GameCanvas.tsx` owns one Babylon Engine and one Scene, cleans up listeners on unmount, resizes the engine and exposes the canvas to the game runtime. The game itself is framework-agnostic TypeScript under `client/src/game/`.

## Modules

| Module | Responsibility | Public contract |
|---|---|---|
| `scene.ts` | Create orthographic pixel stage, camera, background layers, fighters, particles and render loop hooks | `createGameScene(engine, canvas): Promise<GameHandle>` |
| `GameWorld.ts` | Own match state, timer, players, opponent AI, camera target and event queue | `update(dt)`, `dispatch(action)`, `snapshot()` |
| `Fighter.ts` | Own fighter state, movement, attack windows, health/energy, animation frame selection and hit reaction | `update(dt, input, opponent)`, `draw(ctx)` |
| `InputManager.ts` | Normalize keyboard and touch controls to semantic actions | `isDown(action)`, `consume(action)` |
| `CombatSystem.ts` | Resolve active hitboxes, hitstop, knockback, combo and impact events | `resolve(world, dt)` |
| `FxSystem.ts` | Emit dust, hit sparks, aura, screen flash and camera shake | `emit(event)`, `update(dt)`, `draw(ctx)` |
| `Hud.tsx` | Render responsive HTML HUD and touch controls over the canvas | callbacks use semantic `InputAction` values |
| `Home.tsx` | Mount the game frame and HUD without unrelated template content | full-screen match route |

## Coordinate model

World coordinates use a 960×540 logical stage with an orthographic camera. Fighters are rendered as pixel-art planes or canvas sprites at approximately 112 logical pixels tall. The arena bounds are x=80..880 and the ground line is y=424. The camera follows the midpoint of both fighters and clamps to the arena, with a bounded zoom based on separation.

## State vocabulary

`idle`, `walk`, `run`, `jump`, `attackLight`, `attackHeavy`, `kick`, `guard`, `charge`, `transform`, `hit`, `knockback`, `down`, `victory`.

## Asset hints

Use the generated `/manus-storage/` URLs in `ASSETS.md`; do not copy large PNGs into the project. If a sprite sheet is not perfectly sliceable, use it as a style reference and render crisp procedural silhouettes plus generated VFX while keeping the same palette and composition.

## Verification hooks

The runtime supports `?demo` for deterministic autopilot, `?debug=1` for hitbox overlays and `?mobile=1` for touch controls. `GameWorld` exposes debug snapshots in the HUD so behavior can be validated without React owning gameplay state.
