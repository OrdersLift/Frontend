# Demo photography

Stock photography for the `/demo/burger-blaze` and `/demo/prime-table` brand
demos. Sourced from [Unsplash](https://unsplash.com) under the
[Unsplash License](https://unsplash.com/license) — free for commercial use, no
attribution required.

Self-hosted rather than hot-linked so the demos keep working offline, build
deterministically, and don't depend on a third-party CDN staying up.

All files are WebP, pre-cropped to the aspect ratio they're rendered at:

| Path | Rendered as | Size |
|---|---|---|
| `*/hero.webp` | full-bleed hero background | 1800×1200 |
| `burger-blaze/band-*.webp` | section background wash | 1800×900 |
| `burger-blaze/menu/*.webp` | menu card thumbnails | 800×520 |
| `prime-table/about.webp` | portrait panel | 900×1125 |
| `prime-table/band-room.webp` | section background wash | 1800×900 |
| `prime-table/gallery/*.webp` | masonry gallery tiles | 700–1200 wide |

To swap in a client's real photography, replace the file at the same path and
keep the aspect ratio — nothing in the components needs to change.
