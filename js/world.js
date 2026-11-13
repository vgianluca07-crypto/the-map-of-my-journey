/* Map layouts, moving routes and the illustrated scenes that surround the story. */
(() => {
  const { island, lookout, traveler, dog, mountain, at, plot, tree, court, shore, building, factoryColors, campusColors, homeColors, seeded } = Journey.art;

  const layouts = {
    desktop: {
      width: 1240, height: 630,
      sites: [
        { x: 186, y: 443, size: 1.14, pin: [185,461], label: [180,531] },
        { x: 410, y: 281, size: 1.03, pin: [424,304], label: [419,374] },
        { x: 627, y: 423, size: 1.10, pin: [621,441], label: [631,511] },
        { x: 846, y: 277, size: 1.04, pin: [852,298], label: [854,367] },
        { x: 1061, y: 167, size: 1.10, pin: [1060,196], label: [1056,267] }
      ],
      routes: [
        'M185 461L424 304',
        'M424 304C504 323 484 386 525 423Q565 455 621 441',
        'M621 441C716 459 718 383 742 347Q781 291 852 298',
        'M852 298C940 301 922 228 970 210Q1013 184 1060 196'
      ],
      forks: [
        { after: 3, path: 'M742 347C730 321 733 283 768 259', end: [768,259] },
        { after: 4, path: 'M970 210C966 182 943 171 937 148', end: [937,148] }
      ],
      exit: 'M1060 196C1133 221 1131 116 1204 114'
    },
    mobile: {
      width: 420, height: 1190,
      sites: [
        { x: 163, y: 120, size: .96, pin: [163,141], label: [157,203] },
        { x: 257, y: 350, size: .90, pin: [256,370], label: [264,431] },
        { x: 161, y: 565, size: .96, pin: [157,582], label: [151,649] },
        { x: 251, y: 789, size: .94, pin: [251,810], label: [262,873] },
        { x: 190, y: 1009, size: 1.03, pin: [190,1034], label: [182,1101] }
      ],
      routes: [
        'M163 141L256 370',
        'M256 370C330 433 91 450 109 523Q121 566 157 582',
        'M157 582C106 645 335 662 307 745Q290 788 251 810',
        'M251 810C317 866 98 899 128 971Q149 1015 190 1034'
      ],
      forks: [
        { after: 3, path: 'M307 745Q343 730 369 755', end: [369,755] },
        { after: 4, path: 'M128 971Q95 976 68 953', end: [68,953] }
      ],
      exit: 'M190 1034C205 1075 292 1077 315 1145'
    },
    hero: {
      width: 1240, height: 790,
      sites: [
        { x: 487, y: 443, size: .91, pin: [481,456] },
        { x: 664, y: 287, size: .87, pin: [663,306] },
        { x: 815, y: 416, size: .93, pin: [819,431] },
        { x: 976, y: 298, size: .88, pin: [977,320] },
        { x: 1127, y: 178, size: .93, pin: [1129,199] }
      ],
      routes: [
        'M481 456C562 458 548 339 603 319Q628 302 663 306',
        'M663 306C728 315 725 398 776 421Q798 430 819 431',
        'M819 431C911 447 877 352 938 331Q956 320 977 320',
        'M977 320C1038 318 1026 242 1071 213Q1097 194 1129 199'
      ],
      exit: 'M1129 199c50 2 54-54 98-62'
    }
  };

  function cloud(x, y, scale, delay, dawn) {
    const color = dawn ? '#ffc79f' : '#6488ac';
    return at(x,y,scale, `<g class="sky-cloud" style="--delay:${delay}s" fill="${color}">
      <path d="M-111 8q20-14 47-10 5-22 32-21 16-22 42-10 16 2 21 17 38-5 49 19l41 5q-75 15-232 0Z" opacity=".17"/>
      <path d="M-77 8Q-35 4-13-2 24-9 66 8l24 3q-82 10-167-3Z" opacity=".13"/>
      <path d="M-105 15q109 14 220-1" fill="none" stroke="${color}" stroke-opacity=".19"/>
    </g>`);
  }

  function sky(prefix, width, height, dawn = false, compact = false) {
    const moon = [width * .77,height * (compact ? .21 : .22)];
    const random = seeded(compact ? 18 : 92);
    const starCount = compact ? 36 : 92;
    const stars = Array.from({ length: starCount }, (_, index) => {
      const x = (random() * width).toFixed(1);
      const y = (random() * height * .91).toFixed(1);
      const r = (random() * 1.1 + .3).toFixed(1);
      const alpha = (random() * .53 + .14).toFixed(2);
      if (index % 17 === 0) {
        return `<path class="sky-spark" style="--delay:-${index / 8}s" d="M${x} ${y}m-3 0h6m-3-3v6" stroke="#f5dda9" opacity="${alpha}" stroke-linecap="round"/>`;
      }
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${index % 3 ? '#c8e5ff' : '#fbe2a8'}" opacity="${alpha}"/>`;
    }).join('');
    const horizon = height * .60;
    const landscape = [
      [0,.50], [.07,.42], [.15,.46], [.25,.29], [.31,.43], [.39,.36],
      [.49,.52], [.60,.40], [.72,.23], [.79,.34], [.88,.26], [.97,.44], [1,.36]
    ].map(([x,y]) => `${x * width} ${y * height}`).join(' L');
    const fog = [cloud(width*.18,height*.34,1,-1,dawn), cloud(width*.86,height*.37,1.5,-8,dawn),
      cloud(width*.52,height*.65,1.1,-4,dawn), cloud(width*.21,height*.8,1.4,-6,dawn), cloud(width*.83,height*.82,1.8,-12,dawn)].join('');
    return `<defs>
      <linearGradient id="${prefix}-sky" x2=".62" y2="1">
        <stop stop-color="#0a172c"/><stop offset=".56" stop-color="#142c49"/><stop offset="1" stop-color="#0b1c32"/>
      </linearGradient>
      <radialGradient id="${prefix}-blue">
        <stop stop-color="#3b6593" stop-opacity=".48"/><stop offset="1" stop-color="#172f52" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="${prefix}-halo">
        <stop stop-color="#fff2bd" stop-opacity=".52"/><stop offset=".32" stop-color="#ffb382" stop-opacity=".31"/><stop offset="1" stop-color="#ff9686" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="${prefix}-dawn" x2=".14" y2="1">
        <stop stop-color="#202944"/><stop offset=".44" stop-color="#745975"/><stop offset=".72" stop-color="#cf826f"/><stop offset="1" stop-color="#222e4b"/>
      </linearGradient>
      <linearGradient id="${prefix}-peaks" x2="0" y2="1">
        <stop stop-color="${dawn ? '#5e526f' : '#193653'}" stop-opacity=".87"/><stop offset="1" stop-color="#0e1d35" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#${prefix}-sky)"/>
    <ellipse cx="${width*.59}" cy="${height*.41}" rx="${width*.57}" ry="${height*.54}" fill="url(#${prefix}-blue)"/>
    ${dawn ? `<g class="dawn-light"><rect width="${width}" height="${height}" fill="url(#${prefix}-dawn)"/>
      <ellipse cx="${moon[0]}" cy="${moon[1]}" rx="${width*.34}" ry="${height*.54}" fill="url(#${prefix}-halo)"/>
      <circle cx="${moon[0]}" cy="${moon[1]}" r="${compact ? 29 : 57}" fill="#ffe4ae"/>
      <circle cx="${moon[0]}" cy="${moon[1]}" r="${compact ? 43 : 79}" fill="none" stroke="#ffe0aa" stroke-opacity=".29"/>
      </g>` : ''}
    <g class="sky-stars" opacity="${dawn ? '.58' : '1'}">${stars}</g>
    <path d="M${landscape}L${width} ${horizon} 0 ${horizon}Z" fill="url(#${prefix}-peaks)"/>
    <path d="M${landscape}" stroke="${dawn ? '#f8b9b3' : '#577998'}" stroke-opacity=".14" stroke-width="1.4" fill="none"/>
    ${dawn ? '' : `<g opacity="${compact ? '.42' : '.75'}">
      <circle cx="${moon[0]}" cy="${moon[1]}" r="${compact ? 18 : 30}" fill="#e5e7cd"/>
      <circle cx="${moon[0]+8}" cy="${moon[1]-5}" r="${compact ? 17 : 29}" fill="#1d3555"/>
      <circle cx="${moon[0]}" cy="${moon[1]}" r="${compact ? 28 : 42}" fill="none" stroke="#bdd3dc" opacity=".25"/>
      </g>`}
    ${fog}`;
  }

  function cartography(width, height, mobile) {
    const cx = width * (mobile ? .55 : .57);
    const cy = height * .49;
    const spread = mobile ? 172 : 444;
    const rings = [1,.86,.68].map((scale, i) => `<ellipse cx="${cx}" cy="${cy}" rx="${spread*scale}" ry="${height*.39*scale}" transform="rotate(${mobile ? '-8' : '-22'} ${cx} ${cy})" stroke-dasharray="${i === 1 ? '1 9' : 'none'}"/>`).join('');
    return `<g fill="none" stroke="#8db5cf" stroke-opacity=".15" stroke-width="1">
      ${rings}<path d="M0 ${height*.71}Q${width*.44} ${height*.82} ${width} ${height*.41}M0 ${height*.75}Q${width*.46} ${height*.86} ${width} ${height*.47}"/>
    </g>`;
  }

  function route(path, index, lit, distant) {
    const className = lit ? 'route-segment is-lit' : 'route-segment';
    return `<g class="${className}${distant ? ' route-distant' : ''}">
      <path d="${path}" class="route-shadow"/>
      <path d="${path}" class="route-trail" pathLength="100"/>
      <path d="${path}" class="route-light" pathLength="100" ${index >= 0 ? `data-route="${index}"` : ''}/>
    </g>`;
  }

  function landscape(layout, prefix, options = {}) {
    const { width, height, sites, routes, exit } = layout;
    const { dawn = false, mobile = false, progress = 0, hero = false, animateIndex = -1 } = options;
    const terrain = sites.map(({ x, y, size }, index) => ({ x,y,size,index }))
      .sort((a,b) => a.y - b.y)
      .map(({ x,y,size,index }) => island(`${prefix}-land-${index}`, index, x,y,size)).join('');
    const pins = sites.map(({ pin: [x,y] },index) => {
      const color = Journey.story.levels[index].color;
      const status = index < progress ? 'passed' : index === progress ? 'current' : 'locked';
      return `<g class="world-pin pin-${status}" transform="translate(${x} ${y})" style="--pin:${color}">
        <ellipse class="pin-pulse" rx="${mobile ? 12 : 16}" ry="${mobile ? 6 : 8}"/>
        <ellipse rx="7" ry="3.5" fill="#152943" stroke="${color}" stroke-opacity=".8"/>
        <path d="M0-1 0-13" stroke="${color}" stroke-width="1.6"/>
        <path d="m0-20 5 6-5 5-5-5Z" fill="${color}"/>
      </g>`;
    }).join('');
    const paths = routes.map((path,index) => route(path,index,index < progress,hero || dawn)).join('');
    const forks = (layout.forks || []).filter(fork => progress >= fork.after).map(({ path, end: [x,y] }) =>
      `<g class="route-fork"><path d="${path}"/><circle cx="${x}" cy="${y}" r="3.4"/></g>`).join('');
    const exitPath = route(exit,-1,progress >= 5,hero || dawn);
    const skyArt = sky(prefix,width,height,dawn,mobile);
    const avatarIndex = Math.min(sites.length - 1, animateIndex >= 0 ? animateIndex : progress);
    const [px, py] = sites[avatarIndex].pin;
    const person = hero || dawn ? '' : `<g class="map-avatar" transform="translate(${px} ${py-4}) scale(${mobile ? '.31' : '.39'})">${traveler()}</g>`;
    return `${skyArt}${cartography(width,height,mobile)}
      <g class="world-terrain">${terrain}</g>
      <g class="world-roads">${paths}${forks}${exitPath}</g>
      ${hero || dawn ? '' : `<g>${pins}</g>`}
      ${person}`;
  }

  function map(progress, mobile, animateIndex) {
    const layout = mobile ? layouts.mobile : layouts.desktop;
    const svg = `<svg class="map-art" viewBox="0 0 ${layout.width} ${layout.height}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${landscape(layout,'map',{ mobile, progress, animateIndex })}</svg>`;
    return { svg, layout };
  }

  function travel(svg, layout, from, to, reduced) {
    const avatar = svg.querySelector('.map-avatar');
    const path = svg.querySelector(`[data-route="${from}"]`);
    if (!avatar || from < 0 || to <= from) return;
    const scale = layout === layouts.mobile ? '.31' : '.39';
    const place = (x, y) => avatar.setAttribute('transform', `translate(${round(x)} ${round(y - 4)}) scale(${scale})`);
    const [endX,endY] = layout.sites[to].pin;
    if (reduced || !path || !path.getTotalLength) {
      place(endX,endY);
      return;
    }
    const length = path.getTotalLength();
    const start = performance.now();
    avatar.classList.add('is-walking');
    path.classList.add('new-road');
    function frame(now) {
      if (!avatar.isConnected) return;
      const t = Math.min(1,(now - start) / 1380);
      const ease = t * t * (3 - 2 * t);
      const point = path.getPointAtLength(ease * length);
      place(point.x,point.y);
      if (t < 1) requestAnimationFrame(frame);
      else avatar.classList.remove('is-walking');
    }
    requestAnimationFrame(frame);
  }
  const round = value => Math.round(value * 10) / 10;

  function opening() {
    const art = landscape(layouts.hero,'opening',{ progress: 5, hero: true });
    return `<svg class="opening-art" viewBox="0 0 1240 790" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      ${art}
      <path d="M692 621C671 578 526 568 503 502q-8-18-15-42" fill="none" stroke="#f4cd81" stroke-opacity=".60" stroke-width="2.1" stroke-dasharray="3 10" stroke-linecap="round"/>
      ${lookout('opening-lookout', 746, 607, 2.06, false)}
      ${cloud(449,615,1.32,-5,false)}${cloud(1024,587,1.52,-9,false)}
    </svg>`;
  }

  function finale() {
    const art = landscape(layouts.desktop,'finale',{ dawn: true, progress: 5 });
    return `<svg class="final-world" viewBox="0 0 1240 674" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      ${art}
      ${lookout('finale-lookout', 843, 494, 1.73, true)}
      ${cloud(540,520,1.48,-3,true)}${cloud(1050,512,1.62,-6,true)}
    </svg>`;
  }

  function territory(level, prefix) {
    const width = 440, height = 220;
    return `<svg class="territory-art" viewBox="0 0 ${width} ${height}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      ${sky(prefix,width,height,level === 5,true)}
      ${cartography(width,height,false)}
      ${island(prefix + '-island',level-1,221,level === 5 ? 116 : 109,1.16)}
    </svg>`;
  }

  function vignette(kind, prefix) {
    let illustration;
    const backdrop = sky(prefix,300,170,kind === 'horizon' || kind === 'beach',true);
    switch (kind) {
      case 'basketball':
        illustration = at(157,104,1.72, court(-23,-15) + tree(-22,-22,.57) + tree(23,19,.56));
        break;
      case 'milan':
        illustration = at(145,102,1.5, building(-27,-25,53,43,34,campusColors,17) +
          building(-9,-41,18,17,53,campusColors,10) + tree(-30,23,.8));
        break;
      case 'sweden':
        illustration = at(150,105,1.26, building(-36,-28,36,31,25,homeColors,17) +
          building(9,-18,24,21,20,campusColors,12) + tree(37,19,.8,'ice') + tree(-50,6,1,'ice'));
        break;
      case 'canada':
        illustration = island(prefix+'-mem',4,154,113,.86);
        break;
      case 'home':
        illustration = at(150,109,1.6, tree(-20,-31,.9) + building(-27,-16,39,33,29,homeColors,17) + tree(29,18,.84,'amber'));
        break;
      case 'kobe':
        illustration = at(150,122,1.57,dog());
        break;
      case 'beach':
        illustration = at(153,110,1.77, shore(0,0));
        break;
      case 'factory':
        illustration = island(prefix+'-mem',1,149,108,.83);
        break;
      case 'workbench':
        illustration = at(150,110,1.42, building(-46,-17,70,39,39,factoryColors,7) +
          building(28,-3,16,24,15,homeColors,8));
        break;
      case 'bridge':
        illustration = island(prefix+'-mem',2,152,105,.88);
        break;
      case 'crossroads':
        illustration = island(prefix+'-mem',3,152,107,.84);
        break;
      case 'horizon':
        illustration = mountain(211,119,.98) + mountain(263,118,.70) + at(105,149,.81,traveler());
        break;
      default:
        illustration = at(150,144,.78,traveler());
    }
    return `<svg class="memory-art" viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      ${backdrop}
      <ellipse cx="151" cy="134" rx="98" ry="22" fill="#17344f" opacity=".55"/>
      <ellipse cx="151" cy="136" rx="113" ry="25" fill="none" stroke="#94b9c5" opacity=".20"/>
      ${illustration}
    </svg>`;
  }

  function crossing(progress, animate) {
    const stones = [[227,115],[319,102],[411,116]].map(([x,y],index) => {
      const lit = index < progress;
      return `<g class="bridge-stone ${lit ? 'stone-lit' : ''} ${animate && lit && index === progress-1 ? 'stone-new' : ''}" transform="translate(${x} ${y})">
        <path d="m-42 4 39 16 42-16-6 22-35 18-36-15Z" fill="${lit ? '#337394' : '#23364e'}"/>
        <path d="m-42 4 37-16 44 16-42 16Z" fill="${lit ? '#92cde7' : '#314b69'}" stroke="${lit ? '#d5f3e5' : '#57728b'}" stroke-width="${lit ? '2' : '1'}" stroke-dasharray="${lit ? 'none' : '3 5'}"/>
        <text x="-1" y="8" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="13" fill="${lit ? '#0b2947' : '#b5c7d4'}">${index+1}</text>
      </g>`;
    }).join('');
    const foot = [[101,112],[227,111],[319,98],[515,112]][progress];
    const walker = `<g${animate && progress === 3 ? ' class="bridge-finish"' : ''}>${at(0,0,.36,traveler())}</g>`;
    return `<svg class="bridge-art" viewBox="0 0 640 230" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      ${sky('crossing',640,230,false,true)}
      <path d="M56 209q87-30 143-28 60 2 101-28t132 14q74 36 208 22v41H0Z" fill="#245476" opacity=".82"/>
      <path class="water-shimmer" d="M154 208c58 5 104-43 157-43 53 0 63 35 121 39m-252 20c48-6 100-44 133-44 43-1 69 37 116 42" fill="none" stroke="#6babc0" stroke-opacity=".62" stroke-width="2"/>
      <path d="M0 96 66 80l101 24 24 29-20 29-76 37L0 186Z" fill="#294e73"/>
      <path d="M0 92 76 76l88 21 27 36-64 18L0 124Z" fill="#568498" stroke="#a2c8d7" stroke-width="1.7"/>
      <path d="m0 124 126 27-31 48L0 186Z" fill="#1c3b63"/>
      <path d="m640 83-83-12-71 28-26 33 15 31 79 23 86-21Z" fill="#2a5075"/>
      <path d="m640 83-83-12-71 28-26 33 69 13 111-20Z" fill="#5d8fa0" stroke="#a2c8d7" stroke-width="1.7"/>
      <path d="m640 125-111 20 25 41 86-21Z" fill="#254561"/>
      ${at(65,97,.85,tree(0,0,1,'ice'))}${at(552,91,.79,tree(0,0,1,'ice'))}
      <path d="M148 118q163-74 342 1" fill="none" stroke="#a0c0ce" stroke-dasharray="2 8" stroke-width="1.5" opacity=".55"/>
      ${stones}${at(foot[0],foot[1],1,walker)}
    </svg>`;
  }

  const shapes = [
    [126,132,174,132,222,132,284,132,320,132,380,132,447,132,500,132,560,132],
    [126,131,166,81,219,81,271,81,320,143,380,136,445,129,502,132,560,132],
    [113,134,158,81,219,81,274,81,285,171,380,165,456,160,506,134,560,132],
    [118,147,156,66,219,74,291,79,288,174,379,163,453,156,465,79,560,132]
  ];

  function roadGeometry(shape) {
    return `M62 132C${shape.slice(0,6).map(round).join(' ')}C${shape.slice(6,12).map(round).join(' ')}C${shape.slice(12).map(round).join(' ')}`;
  }

  function road(progress) {
    const path = roadGeometry(shapes[progress]);
    return `<svg class="road-art" data-road-stage="${progress}" viewBox="0 0 620 218" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="road-sky" x2=".36" y2="1"><stop stop-color="#1c2f53"/><stop offset="1" stop-color="#594666"/></linearGradient>
      <radialGradient id="road-haze"><stop stop-color="#f6c453" stop-opacity=".26"/><stop offset="1" stop-color="#f6c453" stop-opacity="0"/></radialGradient></defs>
      <rect width="620" height="218" fill="url(#road-sky)"/>
      <ellipse cx="464" cy="105" rx="174" ry="104" fill="url(#road-haze)"/>
      <g fill="none" stroke="#a3b9cd" stroke-opacity=".25">
        <path d="M0 68c105 32 90-57 209-41s127 67 223 44 99-55 188-17M0 80c112 24 92-55 213-36s132 61 223 38 99-55 184-11M0 91c109 23 108-50 217-34s127 57 223 39 109-50 180-12"/>
        <path d="M0 178c129-40 131 30 228 24s108-44 214-15 123 26 178 8M0 193c117-32 133 30 218 22s126-47 228-20 123 24 174 13"/>
      </g>
      <g fill="none" stroke="#f6c453" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round">
        <path class="road-branch branch-one" d="M211 77q18-34 72-29l40 13"/>
        <path class="road-branch branch-two" d="M380 163q36 31 87 25"/>
        <path class="road-branch branch-three" d="M475 115q-2-35 43-50l39-8"/>
      </g>
      <path data-geometry d="${path}" fill="none" stroke="#12223c" stroke-width="13" stroke-linecap="round"/>
      <path data-geometry d="${path}" fill="none" stroke="#f7d18a" stroke-width="3.4" stroke-linecap="round"/>
      <g fill="#19304c" stroke="#ffe1a6" stroke-width="2"><circle cx="62" cy="132" r="14"/><circle cx="560" cy="132" r="14"/></g>
      <g fill="#fff2d1" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle"><text x="62" y="137">A</text><text x="560" y="137">B</text></g>
      <circle class="route-spark" r="4" cx="82" cy="132" fill="#ffedb2" opacity=".92"/>
    </svg>`;
  }

  function bendRoad(svg, from, to, reduced) {
    if (!svg) return;
    if (svg.roadAnimation) cancelAnimationFrame(svg.roadAnimation);
    const paths = [...svg.querySelectorAll('[data-geometry]')];
    const spark = svg.querySelector('.route-spark');
    const begin = svg.roadShape || shapes[from];
    const finish = shapes[to];
    const start = performance.now();
    svg.dataset.roadStage = to;
    function frame(now) {
      if (!svg.isConnected) return;
      const t = reduced ? 1 : Math.min(1,(now - start) / 750);
      const ease = t * t * (3 - 2 * t);
      const shape = begin.map((value,index) => value + (finish[index] - value) * ease);
      const path = roadGeometry(shape);
      svg.roadShape = shape;
      paths.forEach(element => element.setAttribute('d',path));
      const point = paths[1].getPointAtLength(paths[1].getTotalLength() * (to * .19 + ease * .11));
      spark.setAttribute('cx',point.x);
      spark.setAttribute('cy',point.y);
      if (t < 1) svg.roadAnimation = requestAnimationFrame(frame);
    }
    frame(start);
  }

  Journey.world = { map, travel, opening, finale, territory, vignette, crossing, road, bendRoad };
})();
