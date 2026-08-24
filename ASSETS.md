# Assets

**Art direction:** “胶囊星球像素剧场”——32-bit 日式街机像素美术、异星青绿色天空、墨蓝远景、暖橙角色、Capsule Amber 命中火花；强调清晰轮廓、战斗可读性、有限视差和强反馈。

## Generated runtime assets

| Name | Description | Size | URL |
|---|---|---:|---|
| `capsule_planet_battlefield` | 异星天空、月亮、远山、胶囊建筑、树木与岩石平台的 16:9 战斗场景 | 1920×1080 fullscreen | `/manus-storage/capsule-planet-battlefield_23b7c8e5.png` |
| `original_fighter_duo` | 原创橙衣少年武道家与紫衣对手的动作 Sprite Sheet | 1024×576 source, ~112px display height | `/manus-storage/original-fighter-duo-sprite-sheet_c5ad7706.png` |
| `arcade_combat_effects` | 命中火花、冲刺残影、尘土、碎石、能量球、Aura 与变身特效套件 | 1024×576 source | `/manus-storage/arcade-combat-effects-kit_5a3d26f9.png` |
| `capsule_arcade_mark` | 无文字三条上冲像素斜线徽记 | 512×512 | `/manus-storage/capsule-arcade-mark_140b3e71.png` |

## Implementation notes

The scene plate is used as a background layer with object-position center and CSS/canvas scaling. Runtime UI bars, timer, combo count and virtual controls are drawn in code so values remain crisp and responsive. The character sheet is treated as an identity/style anchor; if exact crop boundaries are ambiguous, the runtime uses procedural pixel silhouettes and generated effects to preserve gameplay readability rather than shipping a visibly broken crop.
