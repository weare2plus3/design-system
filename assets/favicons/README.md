# Favicons

The mark, prepared for browser tabs and home screens. At 16 and 32px the logo's 7.85-unit slits fall between pixels and blur, so these are redrawn on a 32-pixel grid: 2px slits, 11px digits, a 2px + in `signal`. Same design, snapped to whole pixels.

- `favicon.svg`: the pixel-fitted mark as SVG. It switches to the dark-theme colours (cream square, dark digits, `#a3bb9e` +) when the device is in dark mode. Modern browsers use this one.
- `favicon-32.png`, `favicon-16.png`: fallbacks for older browsers.
- `apple-touch-icon.png` (180×180): iPhone and iPad home screens. iOS rounds the corners itself.
- `icon-512.png` (512×512): Android home screens and web app manifests.

Add to every page's `<head>`, in this order: `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`, `<link rel="icon" href="/favicon-32.png" sizes="32x32">`, `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`. A `favicon.ico` for very old browsers can be made from the two PNGs if ever needed.
