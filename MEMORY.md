# Memory

## Current implementation

The project now runs as a full-screen React + Babylon.js browser game. The playable slice includes a lock-on side-view arena, original Nova and Vex fighters, keyboard controls, touch buttons, movement, jump, light/heavy attack, guard, charge, transform, local opponent behavior, hitstop, knockback, impact sparks, combo state, health/energy HUD, timer, victory overlay and a deterministic `?demo` mode.

## Visual verification

Desktop and narrow portrait screenshots were captured from the WebDev preview. The generated capsule-planet battlefield is visible in the desktop proof, the HUD remains readable, and the portrait layout presents a tall version of the same arena with controls docked at the bottom. Babylon reports WebGL2 and the latest browser sessions do not show new runtime errors; older console entries contain a previously fixed cross-origin DynamicTexture error from before the background/foreground split.

## Known boundaries

This is a high-fidelity playable foundation, not a claim of frame-for-frame parity with every unseen game system. The reference video contains a larger character roster, richer cut-ins, more moves and an audio layer that cannot autoplay before a browser gesture. The current build uses original assets and a compact move set so the user can validate the feel before the next expansion pass.

## Next iteration candidates

Add sprite-sheet frame slicing once the generated fighter asset is finalized, add a dedicated energy projectile and super move cut-in, refine hitbox debug view, add sound unlock after first input, and tune mobile camera framing for very narrow portrait containers.
