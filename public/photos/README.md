# Job-site photos

Drop real photos into the buckets below. Components use CSS placeholders by default
and don't require these files to be present, but adding photos here lets you wire
them up by path (e.g. `/photos/finished/kitchen-rebuild.jpg`).

## Buckets

- `finished/` — completed installs, polished work delivered to the customer
- `rough/` — before-state photos: corroded lines, leaks, stoppages, condition on arrival
- `clean/` — in-progress shots showing tidy work areas, drop cloths, organized tools

## Recommended specs

- 1600px on the long edge, JPG or WebP
- Consistent aspect ratio per bucket helps the gallery grid look uniform

## Wiring real photos in

1. Drop files into the appropriate bucket.
2. Open `components/sections/project-gallery.tsx` and `components/sections/hero.tsx`.
3. Replace the `photo-slot` placeholder divs with `<Image src="/photos/<bucket>/<file>" ... />`.
4. The `BeforeAfter` component accepts `beforeSrc` / `afterSrc` props — pass real paths in `before-after-section.tsx` once photos exist.
