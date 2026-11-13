/* Original SVG artwork. Ground coordinates are projected onto an isometric plane. */
(() => {
  const icons = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/><path d="M12 3v2m0 14v2M3 12h2m14 0h2"/>',
    spark: '<path d="M12 2c0 6.5 3.5 10 10 10-6.5 0-10 3.5-10 10 0-6.5-3.5-10-10-10 6.5 0 10-3.5 10-10Z"/><path d="M20 3v4m-2-2h4M4 17v4m-2-2h4"/>',
    bridge: '<path d="M2 16h20M4 16V7m16 9V7M4 8c4 8 12 8 16 0M8 12v4m8-4v4m-4-3v3M2 20c2.5-2 4.5-2 7 0 2.5-2 4.5-2 7 0 2-1.5 4-1.8 6 0"/>',
    crossroads: '<path d="M12 22V12m0 0L4 4m8 8 8-8M3 9V3h6m6 0h6v6"/><circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none"/>',
    sunrise: '<path d="M2 17h20M5 21h14m-12-4a5 5 0 0 1 10 0M12 5v3m8-.5-2 2m-12 0-2-2M2 13l3 .5m14 0 3-.5"/>',
    ball: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6a11 11 0 0 1 12.8 12.8M18.4 5.6A11 11 0 0 0 5.6 18.4M3 12h18m-9-9v18"/>',
    house: '<path d="m3 11 9-7 9 7m-2-1v10H5V10m5 10v-6h4v6"/>',
    plane: '<path d="m3 13 18-9-7 16-3-6-8-1Zm8 1 10-10"/>',
    leaf: '<path d="M12 22v-5m0 1-7-3 1.3-2.3L4 9l4 .7L8 6l2.2 1L12 2l1.8 5L16 6v3.7l4-.7-2.3 3.7L19 15l-7 3Z"/>',
    factory: '<path d="M3 21V10l6 3V8l6 3V5h4l2 16H3Zm4-5v2m5-2v2m5-2v2"/>',
    book: '<path d="M12 5c-2-2-6-2-9-1v15c3-1 7-1 9 1 2-2 6-2 9-1V4c-3-1-7-1-9 1Zm0 0v15M6 8h3m-3 4h3m6-4h3m-3 4h3"/>',
    case: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M9 7V4h6v3M3 12h18M8 11v3m8-3v3"/>',
    scale: '<path d="M12 3v17m-5 1h10M4 7h16M6 7l-4 8h8L6 7Zm12 0-4 8h8l-4-8Z"/>',
    passport: '<rect x="4.5" y="2.5" width="15" height="19" rx="2"/><path d="M8 3v18m2.5-4h6"/><circle cx="13.5" cy="10" r="3"/><path d="M10.5 10h6m-3-3c1.5 1.6 1.5 4.4 0 6"/>',
    sound: '<path d="M3 9h4l5-4v14l-5-4H3Z"/><path d="M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
    muted: '<path d="M3 9h4l5-4v14l-5-4H3Zm13 0 5 6m0-6-5 6"/>',
    arrow: '<path d="M3 12h17m-7-7 7 7-7 7"/>',
    back: '<path d="M21 12H4m7 7-7-7 7-7"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15"/>',
    photo: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m4 17 5-5 3 3 4-5 4 5"/><circle cx="8" cy="8" r="1"/>',
    shell: '<path d="M12 20c-5.5 0-9-4.5-9-9a3 3 0 0 1 4-3 3 3 0 0 1 5-3 3 3 0 0 1 5 3 3 3 0 0 1 4 3c0 4.5-3.5 9-9 9Zm0 0V5m0 15L7 8m5 12 5-12"/>',
    paw: '<path d="M7 17c0-2.8 2.6-5 5-5s5 2.2 5 5c0 2-2 2.5-5 1.3C9 19.5 7 19 7 17Z"/><ellipse cx="5.3" cy="10.2" rx="1.5" ry="2.2"/><ellipse cx="9.7" cy="6.3" rx="1.5" ry="2.2"/><ellipse cx="14.3" cy="6.3" rx="1.5" ry="2.2"/><ellipse cx="18.7" cy="10.2" rx="1.5" ry="2.2"/>',
    print: '<path d="M7 8V3h10v5M7 17H4V9h16v8h-3m-10-3h10v7H7Z"/><path d="M7 11h2"/>',
    restart: '<path d="M4 5v6h6M4 11a8 8 0 1 1 1 7"/>',
    expand: '<path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"/>'
  };

  const palettes = [
    { top: '#39978b', light: '#8bcc91', edge: '#bce8a6', front: '#184e5b', side: '#2a6e6a', dark: '#15364b' },
    { top: '#a65f5d', light: '#dba27b', edge: '#f5bd86', front: '#573750', side: '#795067', dark: '#2c2947' },
    { top: '#3d87a0', light: '#8fc9d7', edge: '#b7e5f0', front: '#1f4e78', side: '#336e8b', dark: '#152e55' },
    { top: '#635ba0', light: '#a396cd', edge: '#d3b7ee', front: '#393761', side: '#4d4f81', dark: '#242747' },
    { top: '#647e98', light: '#c1c8bf', edge: '#d3e1cc', front: '#294b6c', side: '#43697d', dark: '#1a3053' }
  ];

  const project = ([u, v, height = 0]) => [u - v, (u + v) * .46 - height];
  const round = number => Math.round(number * 10) / 10;
  const coordinates = points => points.map(point => point.map(round).join(',')).join(' ');
  const poly = (points, fill, extra = '') => `<polygon points="${coordinates(points)}" fill="${fill}" ${extra}/>`;
  const face = (points, fill, extra = '') => poly(points.map(project), fill, extra);
  const line = (points, stroke, extra = '') => `<polyline points="${coordinates(points.map(project))}" fill="none" stroke="${stroke}" ${extra}/>`;
  const at = (x, y, scale, markup, extra = '') => `<g transform="translate(${x} ${y}) scale(${scale})" ${extra}>${markup}</g>`;
  const plot = (u, v, scale, markup, height = 0) => at(...project([u, v, height]), scale, markup);

  function seeded(seed) {
    return () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  function icon(name, className = '') {
    return `<svg class="${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.compass}</svg>`;
  }

  function stamp(level, earned = true) {
    const title = level.stamp.toUpperCase();
    return `<svg class="stamp-art" viewBox="0 0 110 110" aria-hidden="true" style="--ink:${level.color}">
      <circle cx="55" cy="55" r="48" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <circle cx="55" cy="55" r="43" fill="none" stroke="currentColor" stroke-opacity=".55" stroke-dasharray="1 3.3"/>
      <path d="M17 54h8m60 0h8M55 12v7m0 73v6M24 25l5 5m52 51 5 5m0-61-5 5M29 81l-5 5" stroke="currentColor" stroke-opacity=".65"/>
      <path d="m32 60 23 13 23-13M34 64l21 13 21-13" stroke="currentColor" stroke-opacity=".35" fill="none"/>
      <g transform="translate(36 29) scale(1.58)" stroke="currentColor" fill="none" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">${earned ? icons[level.icon] : icons.lock}</g>
      <text x="55" y="88" fill="currentColor" text-anchor="middle" font-family="monospace" font-weight="700" font-size="8" letter-spacing="1">${title}</text>
    </svg>`;
  }

  function terrain(prefix, theme) {
    const palette = palettes[theme];
    const boundary = [[-71,-42],[-47,-69],[35,-74],[71,-55],[82,-12],[73,45],[37,76],[-15,80],[-55,60],[-83,18],[-83,-15]];
    const drop = [30,42,29,44,55,69,74,54,53,41,36];
    const top = boundary.map(project);
    const bottom = top.map(([x,y], index) => [x * .82 + 4, y + drop[index]]);
    const random = seeded(theme + 46);
    const faces = boundary.map((_, index) => {
      const next = (index + 1) % boundary.length;
      const a = top[index], b = top[next], c = bottom[next], d = bottom[index];
      const mid = [(a[0] + b[0]) * .52, (a[1] + b[1]) * .49 + 17 + random() * 12];
      return poly([a,b,c,d], index % 2 ? palette.front : palette.side) +
        poly([a,mid,d], palette.dark, 'opacity=".45"') +
        poly([b,c,mid], palette.light, 'opacity=".15"') +
        poly([d,mid,c], palette.dark, 'opacity=".6"');
    }).join('');

    const flecks = Array.from({ length: 48 }, () => {
      const [x, y] = project([random() * 136 - 68, random() * 132 - 66]);
      const length = 1.5 + random() * 3.6;
      return `<path d="M${round(x)} ${round(y)}l${round(length)} ${round(length * -.24)}" stroke="${palette.edge}" opacity="${(.14 + random() * .3).toFixed(2)}" stroke-linecap="round"/>`;
    }).join('');
    return `<defs>
        <linearGradient id="${prefix}-ground" x1="0" x2="1" y1="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stop-color="${palette.light}"/><stop offset=".86" stop-color="${palette.top}"/>
        </linearGradient>
      </defs>
      <ellipse cx="5" cy="95" rx="128" ry="29" fill="#040c1c" opacity=".54"/>
      <ellipse cx="4" cy="99" rx="145" ry="32" fill="none" stroke="#70b4d0" stroke-opacity=".12"/>
      ${faces}
      ${poly(top, 'url(#' + prefix + '-ground)', `stroke="${palette.edge}" stroke-width="2" stroke-linejoin="round"`)}
      ${poly(top.map(([x,y]) => [x * .88, y * .77 + 2]), 'none', `stroke="${palette.edge}" opacity=".3"`)}
      ${flecks}`;
  }

  function groundTile(u, v, w, d, fill, extra = '') {
    return face([[u,v],[u+w,v],[u+w,v+d],[u,v+d]], fill, extra);
  }

  function box(u, v, w, d, h, colors, base = 0) {
    const [top, front, side] = colors;
    return face([[u+w,v,base],[u+w,v+d,base],[u+w,v+d,h+base],[u+w,v,h+base]], side) +
      face([[u,v+d,base],[u+w,v+d,base],[u+w,v+d,h+base],[u,v+d,h+base]], front) +
      face([[u,v,h+base],[u+w,v,h+base],[u+w,v+d,h+base],[u,v+d,h+base]], top, 'stroke="#fff4c9" stroke-opacity=".22" stroke-width=".7"');
  }

  function building(u, v, w, d, h, colors, roofHeight = 0) {
    const [top, front, side, roof, window] = colors;
    const shadow = groundTile(u + 4, v + 3, w + 6, d + 7, '#1b2740', 'opacity=".25"');
    let house = box(u, v, w, d, h, [top, front, side]);
    if (roofHeight) {
      const ridge = v + d / 2;
      house += face([[u+w,v,h],[u+w,v+d,h],[u+w,ridge,h+roofHeight]], side) +
        face([[u-2,ridge,h+roofHeight],[u+w+2,ridge,h+roofHeight],[u+w+2,v+d+2,h],[u-2,v+d+2,h]], roof, 'stroke="#f9c6a7" stroke-opacity=".42"') +
        face([[u-2,v-2,h],[u+w+2,v-2,h],[u+w+2,ridge,h+roofHeight],[u-2,ridge,h+roofHeight]], top, 'opacity=".68"');
    }
    const windows = Math.max(1, Math.floor(w / 12));
    for (let column = 0; column < windows; column++) {
      const x = u + (column + .5) * w / windows;
      house += face([[x-2.9,v+d+.3,5],[x+2.9,v+d+.3,5],[x+2.9,v+d+.3,h-4],[x-2.9,v+d+.3,h-4]], window, 'stroke="#45384a" stroke-opacity=".36" stroke-width="1"');
    }
    if (d >= 17) {
      house += face([[u+w+.3,v+5,5],[u+w+.3,v+11,5],[u+w+.3,v+11,h-5],[u+w+.3,v+5,h-5]], window, 'opacity=".76"');
    }
    return shadow + house;
  }

  function tree(u, v, scale, tint = 'pine') {
    const tints = {
      pine: ['#174e55','#2a806c','#64ba86'],
      amber: ['#895252','#cc7865','#f2af73'],
      ice: ['#28627f','#5aa1b4','#9cdee1'],
      lilac: ['#474779','#7d68ad','#bc9bde']
    };
    const [dark, mid, light] = tints[tint];
    return plot(u,v,scale, `<ellipse cx="4" cy="1" rx="13" ry="5" fill="#112940" opacity=".35"/>
      <path d="M-2 0h4v-17h-4Z" fill="#6a5150"/>
      <path d="M0-41-13-10-2-5 15-11Z" fill="${dark}"/>
      <path d="m0-41 1 33 14-3Z" fill="${mid}"/>
      <path d="M0-37-11-18-2-14l12-4Z" fill="${mid}"/>
      <path d="m0-41 0 23 10-2Z" fill="${light}"/>
      <path d="m0-41-8 16 8-4 6 3Z" fill="${light}" opacity=".65"/>`);
  }

  function court(u = 18, v = -48, scale = 1) {
    const x = 44, y = 32;
    const outline = groundTile(0,0,x,y,'#a8554e','stroke="#f8c8a7" stroke-width="1.4"');
    return plot(u, v, scale, outline +
      groundTile(3,3,x-6,y-6,'#b76c58','stroke="#ffd9b8" stroke-width=".65"') +
      line([[22,3],[22,29]], '#ffd9b8', 'stroke-width=".7"') +
      `<ellipse cx="6" cy="17.5" rx="5.3" ry="2.5" fill="none" stroke="#ffdeb2" stroke-width=".7"/>` +
      line([[3,10],[10,10],[10,22],[3,22]], '#ffd9b8', 'stroke-width=".75"') +
      line([[41,10],[34,10],[34,22],[41,22]], '#ffd9b8', 'stroke-width=".75"') +
      plot(41,16,1, `<path d="M0 0v-16l-4-2" fill="none" stroke="#213b5a" stroke-width="1.7"/><path d="M-7-21v6l7 3v-6Z" fill="#f9e4c8" stroke="#34526c" stroke-width=".7"/><ellipse cx="-7" cy="-14" rx="3.4" ry="1.5" fill="none" stroke="#f89a62" stroke-width="1"/>`));
  }

  function shore(u = -61, v = 36, scale = 1) {
    return plot(u,v,scale, `<path d="M-38-1 1-20l38 6-6 20L-8 21Z" fill="#e3bb82"/>
      <path d="M-38-1-8 21l41-15-8 9-32 14-32-22Z" fill="#4da7b1"/>
      <path class="water-shimmer" d="M-40 2-8 25l36-14M-36 9l28 22 27-12" fill="none" stroke="#c6f5e1" stroke-opacity=".64" stroke-width="1.4" stroke-linecap="round"/>
      <path d="m-5 7 0-19m24 16v-13" stroke="#75574d" stroke-width="1.6"/>
      <path d="M-18-8-5-20 9-9-5-5Z" fill="#ef806f"/><path d="m-5-20 3 13L9-9Z" fill="#ffe3bc"/>
      <path d="m10-7 9-9 10 8-9 3Z" fill="#76c1bd"/><path d="m19-16 1 11 9-3Z" fill="#c3ede0"/>
      <path d="m-21 5 5 3 8-4-5-3Z" fill="#f1e1b0"/>`);
  }

  const homeColors = ['#eab28b','#d0b098','#a17670','#a85c5a','#ffe3a2'];
  const campusColors = ['#f0c1a1','#d2b4a7','#9b8083','#805b75','#ffe8aa'];
  const factoryColors = ['#8aa2b4','#687e98','#4c5d7b','#526987','#ffd38a'];

  function discovery() {
    const trail = line([[-72,11],[-38,7],[-11,15],[12,23],[48,16],[74,1]], '#e7d6a6', 'stroke-width="6" stroke-linejoin="round" stroke-linecap="round" opacity=".67"');
    return trail + shore() + tree(-57,-36,.8) + tree(-49,-47,.93) + tree(63,-39,.8) +
      building(-41,-37,39,26,24,campusColors,9) +
      building(-30,-51,14,12,36,campusColors,8) +
      court() + tree(64,-16,.62) + tree(-64,-6,.74,'amber') +
      building(-24,28,24,21,18,homeColors,13) +
      tree(-44,53,.73,'amber') + tree(8,47,.72) + tree(38,48,.91) + tree(53,49,.55) +
      plot(-1,50,.22,dog()) + tree(20,61,.52,'amber');
  }

  function factory() {
    const lot = groundTile(-59,-46,119,86,'#9d777e','opacity=".47"') +
      line([[-52,-12],[62,-12],[62,41]], '#eec0a0', 'stroke-width="2.2" stroke-dasharray="5 4" opacity=".68"');
    const smoke = (u, v, delay) => plot(u,v,1, `<g class="steam" style="--delay:${delay}s"><path d="M-2-49c-13-8-1-13 8-15 9-2 11-9 2-14-5-3-14-1-15-7" stroke="#b6d3dc" stroke-width="7" stroke-linecap="round" fill="none" opacity=".33"/></g>`);
    return lot + tree(-62,-44,.65,'amber') + smoke(-13,-47,-1) + smoke(11,-48,-3) +
      box(-16,-50,9,9,46,['#f0be93','#ac7e82','#775d70']) +
      box(7,-52,10,10,53,['#f0be93','#ac7e82','#775d70']) +
      building(-37,-39,60,35,21,factoryColors,10) +
      building(27,-39,25,20,14,homeColors,7) +
      building(-41,11,31,22,19,['#d89170','#ad6870','#835473','#773b5d','#ffca79'],9) +
      box(32,15,10,12,8,['#eac08a','#c2916e','#99697a']) +
      box(47,25,9,12,9,['#d8a574','#af806f','#99697a']) +
      plot(34,36,.75, `<g class="gear"><path d="m0-17 5 4 6-1 3 6-2 5 4 5-3 6-6 0-4 5-6-1-2-5-6-1-2-6 4-5v-6l6-3Z" fill="#f4ad75" stroke="#633f5f" stroke-width="2"/><circle r="5" fill="#80546d"/></g>`) +
      tree(-59,41,.71,'amber') + tree(64,31,.63,'amber');
  }

  function bridgeTerrain() {
    return `<path d="M-25-45C-40-19-32-2-17 14S-20 43-35 49L-4 57C11 41 13 24-3 5S-13-26 4-49Z" fill="#245b80" opacity=".95"/>
      <path d="M-23-43C-33-23-29-4-11 12S-14 39-27 51" stroke="#7acee1" stroke-width="3" opacity=".65" fill="none"/>
      <path d="M-6-42c-17 26-13 36 4 52s12 25-1 40" stroke="#c8f8f0" stroke-width="1" opacity=".55" fill="none"/>
      <path d="M-31 49-7 56-12 105-24 111Z" fill="#54a8d0" opacity=".69"/>
      <path class="water-shimmer" d="m-27 53 3 45m10-43-4 46" stroke="#c8f8f0" stroke-width="2" opacity=".65"/>
      <path d="M-61 7Q-18-20 35-4l-1 14Q-16-7-57 20Z" fill="#c3a385" stroke="#f3d6a8" stroke-width="1.3"/>
      <path d="M-59 7q38-27 94-11m-91 19q39-25 90-10M-60 7V-3Q-18-28 35-15v11m-70 0v-10m24 4v-10m24 12v-10" stroke="#635e74" stroke-width="2" fill="none"/>` +
      tree(-62,-34,.74,'ice') + tree(-45,-51,.88,'ice') + tree(34,-45,1,'ice') +
      tree(55,-28,.72,'ice') + tree(54,33,.82,'ice') + tree(63,24,.58,'ice') +
      tree(-57,40,.68,'ice') + tree(-44,49,.58,'ice') +
      plot(40,37,.62, `<path d="M0 0v-22l14 4-14 6" fill="#f6c453" stroke="#f9ddab" stroke-width="1.2"/>`);
  }

  function crossroads() {
    const routes = [
      [[-73,12],[-31,9],[-4,5],[27,-3],[68,-3]],
      [[-31,9],[-20,-26],[16,-56]],
      [[-4,5],[6,26],[8,60]]
    ].map((points, index) => line(points, ['#eacfae','#a7dcdb','#e1b5d2'][index], 'stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round" opacity=".83"')).join('');
    const desk = plot(4,-4,1, `<ellipse cx="3" cy="3" rx="24" ry="7" fill="#2c284f" opacity=".3"/>
      <path d="M-14-2v-25m28 30v-25" stroke="#604d6b" stroke-width="3"/>
      <path d="m-18-30 36 7v-18l-36-7Z" fill="#e5c8ad" stroke="#7d5e76" stroke-width="2"/>
      <path d="m-13-43 10 2v8l-10-2Zm15 4 10 2v8l-10-2Z" fill="#7c99c8"/>
      <path d="m-11-41 6 1m-6 2 4 1m12-2 5 1m-5 2 5 1" stroke="#fff0d4" stroke-width=".8"/>`);
    return routes + tree(-57,-44,.97,'lilac') + tree(-63,-26,.78,'lilac') +
      tree(38,-47,.9,'lilac') + tree(58,-36,.72,'lilac') +
      building(-50,-13,19,19,15,campusColors,9) + desk +
      building(26,34,22,17,15,homeColors,9) +
      tree(-43,49,.79,'lilac') + tree(-30,60,.67,'lilac') + tree(47,45,.8,'lilac');
  }

  function mountain(x, y, scale, shade = '#385e84') {
    return at(x,y,scale, `<path d="M-50 4-12-75 0-95 17-63 57 5 4 22Z" fill="#637d9c"/>
      <path d="M0-95 14-48 57 5 4 22Z" fill="${shade}"/>
      <path d="M0-95-12-75-28-42-13-52-5-44 3-61 15-48 29-42 17-63Z" fill="#e0e0d4"/>
      <path d="m0-95 14 47 15 6-12-21Z" fill="#b8cad2"/>
      <path d="m-12-36-22 37L4 22 0-15Z" fill="#8b9ca9" opacity=".44"/>
      <path d="M-44 4 4 21l44-14" stroke="#a2bfcc" opacity=".38" fill="none"/>`);
  }

  function horizon() {
    return mountain(-52,-24,.64) + mountain(49,-20,.72,'#456585') +
      mountain(-3,-29,1.02,'#3b6684') +
      `<path d="M15-15C4 1 16 12 33 14s24 13 19 28l16-6C75 14 53 4 35 3S17-8 25-20Z" fill="#4e9eb5"/>
      <path d="M50 36q7 7 1 19l-5 40 14 4 9-46-1-19Z" fill="#80cddb" opacity=".85"/>
      <path class="water-shimmer" d="M53 41q9 6 4 18l-6 33m12-47-4 45" stroke="#def7e8" stroke-width="2" fill="none"/>
      <ellipse cx="52" cy="100" rx="24" ry="6" fill="#8ad9d8" opacity=".36"/>
      <path d="M-88 16c37 1 38 29 76 22 19-3 33-16 48-15" stroke="#f6d69c" stroke-width="4" fill="none" opacity=".65" stroke-linecap="round"/>` +
      tree(-49,24,.73,'ice') + tree(-62,42,.59,'ice') + tree(43,-32,.62,'ice') +
      tree(62,13,.85,'ice') + tree(40,40,.58) + tree(-5,63,.57,'ice');
  }

  const landmarks = [discovery, factory, bridgeTerrain, crossroads, horizon];

  function island(prefix, theme, x, y, scale) {
    return at(x,y,scale,terrain(prefix,theme) + landmarks[theme](), `class="terrain terrain-${theme + 1}"`);
  }

  let avatarMaskNumber = 0;
  function portrait(key, outline, x, y, width, height) {
    const { zoom = 1, offsetX = 0, offsetY = 0 } = Journey.avatarPhotos[key];
    const mask = `avatar-mask-${++avatarMaskNumber}`;
    const extraWidth = width * (zoom - 1);
    const extraHeight = height * (zoom - 1);
    return `<defs><clipPath id="${mask}"><path d="${outline}"/></clipPath></defs>
      <g class="avatar-photo" clip-path="url(#${mask})">
        <image data-avatar-photo="${key}" x="${x - extraWidth / 2 + offsetX}" y="${y - extraHeight / 2 + offsetY}"
          width="${width + extraWidth}" height="${height + extraHeight}" preserveAspectRatio="xMidYMid slice"/>
        <path d="${outline}" fill="none" stroke="#243449" stroke-width="2.2"/>
      </g>`;
  }

  function traveler() {
    return `<g class="traveler-figure" data-avatar-character stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="2" cy="2" rx="24" ry="6" fill="#061223" opacity=".4"/>
      <g class="leg leg-left"><path d="M-13-45-17-10-23-5q-1 6 13 5l4-5L-1-42" fill="#253d5e" stroke="#132339" stroke-width="2.5"/><path d="M-17-10-23-5q-1 6 13 5l4-5" fill="#d9dfd1"/></g>
      <g class="leg leg-right"><path d="M4-44 6-8 2-3q4 6 18 1l-1-9 2-32" fill="#385577" stroke="#132339" stroke-width="2.5"/><path d="m6-8-4 5q4 6 18 1l-1-9" fill="#f3e5c8"/></g>
      <path d="M-18-80c-12-2-16 6-16 20l2 15 15 3 6-25Z" fill="#b46f52" stroke="#3d3c4c" stroke-width="2.5"/>
      <path d="M-29-71q-6 11-2 20l9 3m-5-20 10 2" fill="none" stroke="#f6c48a" stroke-width="2"/>
      <path d="M-16-87 8-90q11 5 15 18l-1 30q-17 7-39 0l-3-27Z" fill="#4bafad" stroke="#1e5364" stroke-width="2.6"/>
      <path d="M-15-83q-7 19-2 39l13 3V-84" fill="#28858d" opacity=".75"/>
      <path d="M-19-78-25-58l3 12 7-1-1-10 5-11m29-11 10 19-1 14-7 1-1-12-7-10" fill="#66bfba" stroke="#235d69" stroke-width="2.3"/>
      <path d="M-22-48q-5 8 3 9l4-6m35-3q-1 10 5 8 5-2 2-7" fill="#d79c76" stroke="#4c5260" stroke-width="1.7"/>
      <path d="M-8-92-7-82q9 7 16-1l1-11" fill="#ba8165" stroke="#4c5260" stroke-width="1.7"/>
      <path d="M-12-88q10 8 25 0l3 7q-12 7-28-1Z" fill="#ed9275"/>
      <path d="M10-85q9-3 15 3l9 10-14-4-9-4" fill="#ea8a6a"/>
      <g class="traveler-drawn-head">
        <path d="M-19-110q-2-21 17-23 18-2 22 17l-3 14q-4 12-16 13-12-1-17-10Z" fill="#dba17b" stroke="#243449" stroke-width="2.3"/>
        <path d="M-20-108q-9-12-1-20 6-10 18-8 15-5 22 7 5 8 0 16l-5-10q-13 10-28 6l-1 10Z" fill="#233247"/>
        <path d="M-17-126q12-9 25-5" fill="none" stroke="#576275" stroke-width="2.2"/>
        <path d="M-19-111q-9-2-6 6l6 5" fill="#c28b71" stroke="#3f4053" stroke-width="1.6"/>
        <path d="M2-109h.2m12-2h.2" stroke="#223449" stroke-width="2.8"/>
        <path d="M7-101q4 2 7-1" fill="none" stroke="#8b554d" stroke-width="1.45"/>
      </g>
      <g class="traveler-portrait">
        ${portrait('gianluca','M-23-114C-25-128-15-138-1-137 15-138 24-127 22-113L19-102Q15-91 2-89-12-90-17-102L-20-104Q-27-105-25-111Z',-27,-140,52,54)}
      </g>
      <image class="avatar-photo" data-avatar-photo="gianlucaCutout" x="-25" y="-140" width="54" height="54" preserveAspectRatio="xMidYMax meet"/>
      <path d="M-11-85q-5 13-2 23" fill="none" stroke="#efd59c" stroke-width="2.8"/>
      <path d="M6-57h9" stroke="#c0e5d7" stroke-width="1.8" opacity=".62"/>
    </g>`;
  }

  function dog() {
    return `<g class="dog-figure" data-avatar-character stroke="#3e4859" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round">
      <ellipse cx="3" cy="2" rx="37" ry="6" fill="#0b1d2d" stroke="none" opacity=".26"/>
      <g class="dog-drawing">
        <path class="dog-tail" d="M-23-21q-18-4-16-17 7 5 9 11l11 2" fill="#c89069"/>
        <path d="M-25-26q9-10 23-3l17 5 7 12-2 12h-6l-3-10-19 3-2 7h-7l-1-9q-10-6-7-17Z" fill="#d8a77f"/>
        <path d="M5-25q-3 10 8 17l9-3-8-15" fill="#f2d7ad" stroke="none"/>
        <g class="dog-drawn-head">
          <path d="M11-37q1-16 15-14 11 2 14 14l8 5q0 10-14 10-13-2-18-8Z" fill="#e8bf97"/>
          <path d="M14-46q-11 0-10 13 2 5 8 4l10-16" fill="#9e6e61"/>
          <path d="M33-29q1-6 8-6l7 3q0 9-10 9Z" fill="#f5ddbb" stroke="none"/>
          <path d="M33-39h.2m12 7h.2" stroke="#293444" stroke-width="3.6"/>
        </g>
        ${portrait('kobePortrait','M8-37C8-47 17-54 27-52 36-51 41-44 42-39L48-33Q49-24 37-22 24-20 15-28 5-27 5-33Z',4,-55,46,36)}
        <path d="M14-27q6 9 12 7" fill="none" stroke="#60c5bc" stroke-width="3.8"/>
        <circle cx="23" cy="-17" r="2.3" fill="#f6c453" stroke="none"/>
      </g>
      <image class="avatar-photo" data-avatar-photo="kobeCutout" x="-43" y="-61" width="93" height="62" preserveAspectRatio="xMidYMax meet"/>
    </g>`;
  }

  function lookout(prefix, x, y, scale, facingDawn) {
    return at(x,y,scale, terrain(prefix,facingDawn ? 4 : 0) +
      shore(-48,35,.84) + tree(-57,-39,.95) + tree(-47,-47,.7) + tree(57,-49,.8,'ice') +
      building(-39,-12,24,22,16,homeColors,10) +
      line([[-20,20],[6,17],[40,13],[61,7]], '#e9cf9a', 'stroke-width="6" stroke-linecap="round" opacity=".64"') +
      tree(41,48,.63) + tree(50,39,.74,'amber') +
      plot(26,-9,.71, traveler()) + plot(40,12,.64,dog()) +
      plot(13,18,.75,`<path d="M-9-1v-9l7-3 10 5V2l-8 3Z" fill="#9e6b55" stroke="#594c59" stroke-width="1.2"/><path d="m-9-10 9 5 8-3M0-5v10m-4-17 4-3 6 3" fill="none" stroke="#f4cb95" stroke-width="1.2"/>`));
  }

  Journey.art = { icon, stamp, island, traveler, dog, lookout, mountain, tree, at, plot, court, shore, building, factoryColors, campusColors, homeColors, seeded };
})();
