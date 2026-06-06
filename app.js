// live ADS-B map filtered to interesting aircraft
// Data: airplanes.live REST API (CORS-enabled, no key needed, ~1 req/s limit)

const API = 'https://api.airplanes.live/v2';
const POLL_MS = 15000;        
const LOCAL_RADIUS_NM = 250;  // max the API allows for the point endpoint
const STALE_MS = 60000;       // drop aircraft not seen for a minute
const BIG_MOVE_KM = 100;      // pan further than this -> refetch immediately

const statusEl = document.getElementById('status');
const listEl = document.getElementById('plane-list');

// worldCopyJump: when panning across the date line onto a repeated copy of the
// world, jump back to the canonical copy so markers are always on the map you see
const map = L.map('map', { zoomControl: true, worldCopyJump: true }).setView([50, 10], 5);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO &middot; data: airplanes.live',
  maxZoom: 12,
}).addTo(map);

// never yank the map away
let userMoved = false;
map.on('dragstart zoomstart', () => { userMoved = true; });
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => { if (!userMoved) map.setView([pos.coords.latitude, pos.coords.longitude], 7); },
    () => {}, { timeout: 5000 }
  );
}

// hex -> { ac, cool, marker, lastSeen }
const tracked = new Map();
const photoCache = new Map();

function planeIcon(cool, track) {
  const color = TIER_INFO[cool.tier].color;
  const rot = track ?? 0;
  const html = `<svg width="26" height="26" viewBox="0 0 24 24" style="transform: rotate(${rot}deg)">
    <path fill="${color}" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>`;
  return L.divIcon({
    className: 'plane-icon' + (cool.tier === 0 ? ' emergency' : ''),
    html, iconSize: [26, 26], iconAnchor: [13, 13],
  });
}

// military often transmit a zeroed flight ID  fall back to registration, then hex
function displayName(ac) {
  const flight = (ac.flight || '').trim();
  if (flight && !/^0+$/.test(flight)) return flight;
  return ac.r || ac.hex;
}

function fmtAlt(ac) {
  if (ac.alt_baro === 'ground') return 'on ground';
  return ac.alt_baro != null ? `${ac.alt_baro.toLocaleString()} ft` : '—';
}

function popupHtml(ac, cool) {
  const callsign = displayName(ac);
  return `<div class="popup">
    <div class="pname">${cool.name}</div>
    <div class="preg">${callsign}${ac.r && ac.r !== callsign ? ' · ' + ac.r : ''} · ${(ac.t || '').trim() || '?'}</div>
    <table>
      <tr><td>Altitude</td><td>${fmtAlt(ac)}</td></tr>
      <tr><td>Speed</td><td>${ac.gs != null ? Math.round(ac.gs) + ' kt' : '—'}</td></tr>
      <tr><td>Squawk</td><td>${ac.squawk || '—'}</td></tr>
      <tr><td>Hex</td><td>${ac.hex}</td></tr>
      <tr><td>Why cool</td><td>${cool.reason}</td></tr>
    </table>
    ${cool.fact ? `<div class="fact">💡 ${cool.fact}</div>` : ''}
    <div class="photo" id="photo-${ac.hex}"></div>
    <div style="margin-top:6px;font-size:11px">
      <a href="https://globe.airplanes.live/?icao=${ac.hex}" target="_blank">live track ↗</a>
      ${COOL_TYPES[(ac.t || '').trim().toUpperCase()]
        ? ` · <a href="https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(cool.name)}" target="_blank">wikipedia ↗</a>`
        : ''}
    </div>
  </div>`;
}

async function loadPhoto(hex) {
  const slot = document.getElementById(`photo-${hex}`);
  if (!slot) return;
  if (photoCache.has(hex)) { slot.innerHTML = photoCache.get(hex) || ''; return; }
  try {
    const res = await fetch(`https://api.planespotters.net/pub/photos/hex/${hex}`);
    const data = await res.json();
    const p = data.photos && data.photos[0];
    const html = p
      ? `<a href="${p.link}" target="_blank"><img src="${p.thumbnail_large.src}" alt=""></a>
         <div class="credit">© ${p.photographer} / planespotters.net</div>`
      : null;
    photoCache.set(hex, html);
    if (html) slot.innerHTML = html;
  } catch { photoCache.set(hex, null); }
}

function upsert(ac, cool) {
  if (ac.lat == null || ac.lon == null) return;
  const existing = tracked.get(ac.hex);
  if (existing) {
    existing.ac = ac;
    existing.cool = cool;
    existing.lastSeen = Date.now();
    existing.marker.setLatLng([ac.lat, ac.lon]);
    existing.marker.setIcon(planeIcon(cool, ac.track));
    if (existing.marker.isPopupOpen()) {
      existing.marker.setPopupContent(popupHtml(ac, cool));
      loadPhoto(ac.hex);
    }
  } else {
    const marker = L.marker([ac.lat, ac.lon], { icon: planeIcon(cool, ac.track) })
      .addTo(map)
      .bindPopup(popupHtml(ac, cool));
    marker.on('popupopen', () => loadPhoto(ac.hex));
    tracked.set(ac.hex, { ac, cool, marker, lastSeen: Date.now() });
  }
}

function prune() {
  const now = Date.now();
  for (const [hex, entry] of tracked) {
    if (now - entry.lastSeen > STALE_MS) {
      map.removeLayer(entry.marker);
      tracked.delete(hex);
    }
  }
}

function renderSidebar() {
  const center = map.getCenter();
  const entries = [...tracked.values()].sort((a, b) =>
    a.cool.tier - b.cool.tier ||
    center.distanceTo([a.ac.lat, a.ac.lon]) - center.distanceTo([b.ac.lat, b.ac.lon])
  );
  if (!entries.length) {
    listEl.innerHTML = '<div id="empty">No cool planes in view right now.<br>Boring 737s and A320s have been hidden, as requested.</div>';
    return;
  }
  let html = '';
  let lastTier = -1;
  for (const { ac, cool } of entries) {
    if (cool.tier !== lastTier) {
      lastTier = cool.tier;
      const t = TIER_INFO[cool.tier];
      html += `<div class="tier-header" style="color:${t.color}">${t.label}</div>`;
    }
    const callsign = displayName(ac);
    const km = Math.round(center.distanceTo([ac.lat, ac.lon]) / 1000);
    html += `<div class="plane-item" data-hex="${ac.hex}" style="border-left-color:${TIER_INFO[cool.tier].color}">
      <div class="dot" style="background:${TIER_INFO[cool.tier].color}"></div>
      <div class="info">
        <div class="callsign">${callsign}</div>
        <div class="typename">${cool.name}</div>
      </div>
      <div class="dist">${km.toLocaleString()} km</div>
    </div>`;
  }
  listEl.innerHTML = html;
}

listEl.addEventListener('click', e => {
  const item = e.target.closest('.plane-item');
  if (!item) return;
  const entry = tracked.get(item.dataset.hex);
  if (!entry) return;
  map.setView(entry.marker.getLatLng(), Math.max(map.getZoom(), 8));
  entry.marker.openPopup();
});

// the API occasionally drops connections mid-response; retry once before giving up
async function fetchJson(url) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} from API`);
      return res.json();
    } catch (err) {
      if (attempt >= 1) throw err;
      await new Promise(r => setTimeout(r, 1200));
    }
  }
}

let polling = false;
let lastFetchCenter = null;
async function poll() {
  if (polling) return;
  polling = true;
  try {
    lastFetchCenter = map.getCenter();
    // .wrap() normalizes longitude to [-180, 180] after dragging across the date line
    const c = lastFetchCenter.wrap();
    // global military sweep + everything cool near the current map view,
    // fetched sequentially to respect the API's ~1 req/s limit;
    // one feed failing shouldn't lose the other
    let mil = null, local = null;
    let failed = [];
    try { mil = await fetchJson(`${API}/mil`); } catch { failed.push('military'); }
    try { local = await fetchJson(`${API}/point/${c.lat.toFixed(3)}/${c.lng.toFixed(3)}/${LOCAL_RADIUS_NM}`); } catch { failed.push('local'); }
    if (!mil && !local) throw new Error('both feeds unreachable');
    const seen = new Set();
    for (const ac of [...(mil?.ac || []), ...(local?.ac || [])]) {
      if (seen.has(ac.hex)) continue;
      seen.add(ac.hex);
      const cool = classify(ac);
      if (cool) upsert(ac, cool);
    }
    prune();
    renderSidebar();
    statusEl.className = '';
    statusEl.textContent = `${tracked.size} cool aircraft · updated ${new Date().toLocaleTimeString()}`
      + (failed.length ? ` · ${failed.join('+')} feed failed, retrying` : '');
  } catch (err) {
    statusEl.className = 'error';
    statusEl.textContent = `update failed: ${err.message} — retrying`;
  } finally {
    polling = false;
  }
}

poll();
setInterval(poll, POLL_MS);

// re-sort on every pan; refetch immediately only after a big location change
// (small pans are already covered by the 250nm fetch radius + 15s cycle)
let moveTimer;
map.on('moveend', () => {
  renderSidebar();
  if (!lastFetchCenter) return;
  const movedKm = map.getCenter().distanceTo(lastFetchCenter) / 1000;
  if (movedKm < BIG_MOVE_KM) return;
  clearTimeout(moveTimer);
  moveTimer = setTimeout(poll, 800);
});
