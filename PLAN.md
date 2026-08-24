# Game Plan: Capsule Planet Fighter

## Reference basis

The supplied video is approximately 1 minute 25 seconds, presented as a 16:9 2D side-view fighting game inside a vertical recording container. The observed game uses a lock-on side camera, two fighters, layered alien scenery, top HUD, touch controls, transformation states, energy attacks, hitstop, screen shake, particles and a win flow. The implementation will reproduce the observable gameplay language with original character and scene assets rather than copying protected character artwork.

## Risk Tasks

### 1. Sprite / character animations and state handoff
- **Why isolated:** Fighting-game transitions can pop, reverse direction or show a pose that does not match the current state.
- **Approach:** Use a data-driven animation state machine with explicit idle, walk, run, jump, attack, hit, guard, charge, transform and victory states. Keep the renderer separate from state decisions and interpolate only position/scale while sprite frame changes are deterministic.
- **Verify:** Probe idle → walk → attack → recovery, jump → land → idle, charge → transform → combat stance, and hit → knockback → recovery. Confirm no state shows a frame from the wrong action and no transition snaps the baseline.

### 2. Hitbox / hurtbox and fighting-game feedback
- **Why isolated:** Strong impact depends on reliable timing between active hitboxes, hurtboxes, damage, hitstop and knockback.
- **Approach:** Represent attacks as short-lived semantic actions with startup, active and recovery windows. Use AABB hitboxes, one-hit-per-swing guards, damage scaling for combo count, hitstop timers, brief white flash, impact particles and directional knockback.
- **Verify:** Light and heavy attacks only damage during active windows; each swing hits once; hitstop is visible at contact; heavy hits create larger shake and knockback; combo counter resets after timeout.

### 3. Camera framing and mobile input
- **Why isolated:** The reference uses a combat-follow camera and touch controls that must remain usable across aspect ratios.
- **Approach:** Keep world coordinates in a wide arena and derive camera offset/zoom from the midpoint and separation of both fighters. Use a semantic input layer shared by keyboard and virtual controls; prevent page scrolling while the touch pad is active.
- **Verify:** Both fighters remain visible while moving apart, camera zooms smoothly within bounds, keyboard controls work, touch buttons visibly depress, and no control overlaps the HUD on narrow viewports.

## Main Build

Build a single-route full-screen browser game with an original capsule-planet arena, two original pixel fighters, a local opponent controller, top health and energy HUD, combo counter, transformation/energy action, keyboard controls and mobile virtual controls. The first playable slice prioritizes movement, hitboxes, attack timing, hitstop and camera framing before adding secondary polish.

- **Assets needed:**
  - Full-screen 16:9 alien arena background with sky, moon, mountains, capsule building, trees and rocky platform.
  - Original Fighter A and Fighter B sprite sheet with idle, walk, run, jump, attack, hit, guard and victory poses.
  - Pixel VFX kit for hit sparks, energy orb, dash streak, dust, debris and transformation aura.
  - Small original amber arcade mark for favicon and HUD badge.
  - UI is drawn in CSS/canvas so bars and numbers remain crisp and responsive.
- **Verify:**
  - Player input produces immediate movement, jump, attack, guard, dash, charge and transform responses.
  - Animation direction matches movement direction and state transitions are smooth.
  - Health, delayed damage, energy, timer and combo UI remain readable and do not overflow.
  - Game-specific flow: start → fight → damage/combo → transformation or energy move → health depletion → victory/restart.
  - No missing textures, clipped sprites, obvious placeholder assets or browser console errors.
  - `?demo` runs a deterministic short fight showing movement, hitstop, particles and camera motion.
  - `pnpm check` and `pnpm build` pass.
  - Reference consistency: 16:9 lock-on framing, layered alien palette, top HUD, touch controls and high-impact pixel feedback.
