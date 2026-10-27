// Shared portrait helpers: face-crop rendering + full-size lightbox.
// crop = { cx, cy, zoom }  — cx/cy are the face centre as fractions (0–1) of
// the image width/height; zoom 1 = largest square that fits, higher = closer.

// Fill a square element with the face crop of the full image.
function renderPortrait(el, url, crop) {
  el.innerHTML = '';
  el.style.overflow = 'hidden';
  el.style.position = 'relative';
  if (!url) return;
  const img = new Image();
  img.draggable = false;
  img.style.cssText = 'position:absolute;max-width:none;';
  img.onload = () => {
    const w = img.naturalWidth, h = img.naturalHeight;
    const c = crop || { cx: 0.5, cy: 0.5, zoom: 1 };
    const u = Math.min(w, h) / c.zoom / w;       // crop side as a fraction of image width
    const ar = h / w;
    img.style.width  = (100 / u) + '%';
    img.style.left   = (50 - c.cx * 100 / u) + '%';
    img.style.top    = (50 - c.cy * ar * 100 / u) + '%';
  };
  img.src = url;
  el.appendChild(img);
}

// Click-to-enlarge overlay showing the full image.
function openPortraitLightbox(url) {
  if (!url) return;
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(4,8,12,0.92);z-index:9999;' +
    'display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:20px;';
  ov.innerHTML = '<img src="' + url + '" style="max-width:100%;max-height:100%;' +
    'border:2px solid #0a4a60;border-radius:6px;box-shadow:0 0 30px rgba(0,229,255,0.2);" />';
  ov.onclick = () => ov.remove();
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { ov.remove(); document.removeEventListener('keydown', esc); }
  });
  document.body.appendChild(ov);
}
