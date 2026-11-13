/* Scene navigation, the passport, and accessible memory overlays. */
(() => {
  const { story, photos, avatarPhotos, art, world, tasks } = Journey;
  const { icon, stamp } = art;
  const game = Journey.createGame();
  const sound = Journey.makeAudio(() => game.sound);
  const compact = matchMedia('(max-width: 680px)');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const scene = document.querySelector('#scene');
  const topbar = document.querySelector('#topbar');
  const footer = document.querySelector('#site-footer');
  const overlay = document.querySelector('#overlay');
  const announcer = document.querySelector('#announcer');

  const unavailableImages = new Set();
  let pictureNumber = 0;
  let screen = 'intro';
  let currentLevel = 0;
  let currentTask;
  let overlayOpener;
  let toastTimer;

  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  function announce(message) {
    announcer.textContent = message;
  }

  function navButton(label, action, symbol, className = 'button-secondary', attrs = '') {
    return `<button type="button" class="button ${className}" data-do="${action}" ${attrs}>${symbol ? icon(symbol) : ''}<span>${label}</span></button>`;
  }

  function summaryLink(className = 'text-link') {
    return `<a class="${className}" href="./summary.html">${icon('map')}<span>View journey summary</span></a>`;
  }

  function renderNavigation() {
    const stateText = game.sound ? 'Sound on' : 'Sound off';
    topbar.innerHTML = `<div class="topbar-inner">
      <button class="brand" type="button" data-do="home" aria-label="${game.started ? 'Return to world map' : 'Return to opening'}">
        <img src="./assets/illustrations/compass.svg" alt="" width="39" height="39">
        <span><strong>The Map of My Journey</strong><small>BU301 · Fall 2026</small></span>
      </button>
      <div class="top-actions">
        ${game.started && screen !== 'map' ? navButton('Map','map','map','button-quiet header-map','aria-label="World map"') : ''}
        ${navButton(stateText,'sound',game.sound ? 'sound' : 'muted','button-quiet sound-switch',`aria-label="Sound effects" aria-pressed="${game.sound}" title="${stateText}"`)}
        ${game.started ? navButton('Passport','passport','passport','button-passport',`aria-label="Passport, ${game.completed} of 5 stamps collected"`) : ''}
      </div>
    </div>`;
    footer.innerHTML = `<div class="footer-inner">
      <span>Gianluca Valentini <span class="footer-dot">·</span> Wilfrid Laurier University</span>
      <div>${summaryLink()}${game.started ? navButton('Restart journey','confirm-restart','restart','button-quiet restart-link') : ''}</div>
    </div>`;
  }

  function picture(number, variant = '', interactive = true) {
    const config = photos[number];
    if (!config) return '';
    const cardClass = `photo-card ${variant}${config.portrait ? ' photo-portrait' : ''}`;
    const fullVideo = config.video && !interactive;
    const image = config.path && !unavailableImages.has(config.path)
      ? `<img data-photo-src="${escape(config.path)}" alt="${escape(config.alt)}" aria-hidden="true" loading="${variant === 'full-memory' ? 'eager' : 'lazy'}" decoding="async">` : '';
    const player = fullVideo
      ? `<video class="memory-video" data-video-src="${escape(config.video)}"${config.path ? ` poster="${escape(config.path)}"` : ''} controls preload="metadata" playsinline aria-label="${escape(config.caption)}"></video>` : '';
    const playBadge = config.video && interactive
      ? '<span class="memory-video-badge" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="M8 5v14l11-7Z"/></svg></span>' : '';
    const content = `${player}<span class="photo-visual" data-photo-frame${fullVideo ? ' hidden' : ''}>
      <span class="photo-fallback">${world.vignette(config.art,`memory-${++pictureNumber}`)}</span>
      ${image}${playBadge}</span>
      ${fullVideo ? '<p class="memory-video-status" role="status"></p>' : ''}
      <span class="photo-caption">${escape(config.caption)}</span>`;
    const action = config.video ? 'Open video memory' : 'Open memory';
    return interactive
      ? `<button type="button" class="${cardClass}" data-photo="${number}" aria-label="${action}: ${escape(config.caption)}">${content}</button>`
      : `<figure class="${cardClass}">${content}</figure>`;
  }

  function loadImage(image, path, onLoad) {
    if (unavailableImages.has(path)) {
      image.remove();
      return;
    }
    image.addEventListener('load',onLoad,{ once: true });
    image.addEventListener('error', () => {
      unavailableImages.add(path);
      image.remove();
    }, { once: true });
    if (image instanceof SVGElement) image.setAttribute('href',path);
    else image.src = path;
  }

  function hydrate(root) {
    for (const image of root.querySelectorAll('img[data-photo-src]')) {
      const path = image.dataset.photoSrc;
      const frame = image.closest('[data-photo-frame]');
      delete image.dataset.photoSrc;
      loadImage(image,path,() => {
        image.removeAttribute('aria-hidden');
        frame.classList.add('photo-loaded');
      });
    }
    for (const video of root.querySelectorAll('video[data-video-src]')) {
      const path = video.dataset.videoSrc;
      const card = video.closest('.photo-card');
      delete video.dataset.videoSrc;
      video.addEventListener('error', () => {
        video.remove();
        card.querySelector('[data-photo-frame]').hidden = false;
        card.querySelector('.memory-video-status').textContent = 'Video unavailable.';
      }, { once: true });
      video.src = path;
    }
    for (const image of root.querySelectorAll('image[data-avatar-photo]:not([href])')) {
      const key = image.dataset.avatarPhoto;
      const path = avatarPhotos[key].path;
      if (!path) continue;
      loadImage(image,path,() => {
        image.closest('.avatar-photo').classList.add('avatar-photo-loaded');
        image.closest('[data-avatar-character]').classList.add(`has-${key}`);
      });
    }
  }

  function showScene(name, markup, focus = true, keepScroll = false) {
    if (overlay.open) {
      overlayOpener = null;
      overlay.close();
    }
    screen = name;
    scene.className = `scene scene-${name}`;
    scene.innerHTML = markup;
    renderNavigation();
    hydrate(scene);
    if (focus) scene.querySelector('h1')?.focus({ preventScroll: true });
    if (!keepScroll) window.scrollTo(0,0);
  }

  function renderIntro(focus = true) {
    currentLevel = 0;
    showScene('intro',`
      <section class="opening">
        <div class="opening-world">${world.opening()}</div>
        <div class="opening-veil"></div>
        <div class="opening-content">
          <p class="eyebrow opening-kicker"><span class="diamond"></span> From Curiosity to Action</p>
          <h1 tabindex="-1">The Map of<br><em>My Journey</em></h1>
          <p class="opening-subtitle">Beyond My Comfort Zone</p>
          <p class="opening-narration">I have spent years discovering how much I can grow by stepping outside what feels familiar. This is the story of how I began doing the same with my ideas.</p>
          <div class="opening-start">
            <button type="button" class="button button-primary" data-do="start">Start the adventure ${icon('arrow')}</button>
            <p>Five discoveries. One continuing journey.</p>
          </div>
        </div>
        <div class="opening-credit">
          <div><strong>Gianluca Valentini</strong><span>Wilfrid Laurier University · Waterloo, Canada</span></div>
          <div><strong>Personal Entrepreneurial Journey</strong><span>Part 3 · Map Your Journey · Professor Laura Allan</span></div>
        </div>
      </section>`,focus);
  }

  function progressBar() {
    return `<div class="progress-indicator" aria-label="${game.completed} of 5 checkpoints completed">
      <div class="progress-dashes" aria-hidden="true">${story.levels.map((level,index) => `<span class="${index < game.completed ? 'done' : index === game.completed ? 'next' : ''}" style="--checkpoint:${level.color}"></span>`).join('')}</div>
      <span>${game.completed} / 5 stamps</span>
    </div>`;
  }

  function renderMap({ from = -1, opening = false, keepScroll = false } = {}) {
    currentLevel = 0;
    const { svg, layout } = world.map(game.completed,compact.matches,from);
    const points = story.levels.map((level,index) => {
      const [x,y] = layout.sites[index].label;
      const done = index < game.completed;
      const unlocked = game.available(index+1);
      const status = done ? 'Completed' : unlocked ? 'Ready to explore' : 'Locked';
      const symbol = done ? 'check' : unlocked ? level.icon : 'lock';
      return `<button type="button" class="map-point ${done ? 'point-done' : unlocked ? 'point-active' : 'point-locked'}"
        style="--px:${x / layout.width * 100}%;--py:${y / layout.height * 100}%;--checkpoint:${level.color}"
        data-do="level" data-level="${index + 1}" aria-disabled="${!unlocked}" aria-label="Checkpoint ${index + 1}. ${level.name}. ${status}">
        <span class="map-point-icon">${icon(symbol)}</span>
        <span class="map-point-label"><span>${index+1}. ${level.name.replace(/^The /,'')}</span><small>${status}</small></span>
      </button>`;
    }).join('');
    const next = game.completed + 1;
    showScene('map',`
      <section class="map-page">
        <header class="map-heading">
          <div><p class="eyebrow"><span class="diamond"></span> Beyond My Comfort Zone</p>
            <h1 tabindex="-1">The world map</h1>
            <p>${game.finished ? 'Return to any checkpoint or watch the sunrise again.' : 'Follow the illuminated path to the next checkpoint.'}</p>
          </div>
          <div class="map-actions">
            ${progressBar()}
            ${game.finished
              ? navButton('Return to the finale','finale','sunrise','button-primary')
              : `<button type="button" class="button button-primary" data-do="level" data-level="${next}">Enter checkpoint ${next} ${icon('arrow')}</button>`}
          </div>
        </header>
        <div class="map-board ${compact.matches ? 'map-portrait' : ''} ${opening ? 'map-enter' : ''}"
          style="--map-ratio:${layout.width}/${layout.height}" aria-label="Five checkpoints connected by a winding road">
          ${svg}<div class="map-points">${points}</div>
          <div class="map-compass" aria-hidden="true">${icon('compass')}</div>
        </div>
        <div class="map-legend">
          <span><i class="legend-dot legend-active"></i> Ready</span>
          <span><i class="legend-dot legend-done"></i> Completed</span>
          <span><i class="legend-dot legend-locked"></i> Locked</span>
        </div>
      </section>`,!keepScroll,keepScroll);
    const board = scene.querySelector('.map-art');
    if (from >= 0) world.travel(board,layout,from,Math.min(4,game.completed),motion.matches);
  }

  function memories(numbers, title = 'Open the photo album') {
    return `<details class="memory-album">
      <summary>${icon('photo')} ${title}</summary>
      <div class="polaroid-gallery">${numbers.map(number => picture(number,'polaroid')).join('')}</div>
    </details>`;
  }

  function levelExtras(level) {
    switch (level) {
      case 1:
        return `<div class="field-notes">
          <h2>Memories from home</h2>
          <div class="memory-actions">
            ${navButton('A note about my mother','extra','book','button-small button-secondary','data-extra="mother"')}
            ${navButton('Jesolo postcard','extra','shell','button-small button-secondary','data-extra="jesolo"')}
            ${navButton('Meet Kobe','extra','paw','button-small button-secondary','data-extra="kobe"')}
            ${navButton('Take a basketball shot','basketball','ball','button-small button-secondary')}
          </div>
        </div>`;
      case 3:
        return `<details class="commitment-box">
          <summary>${icon('case')} My starting commitments</summary>
          <p>What I was prepared to consider for an initial experiment.</p>
          <div class="commitments">
            ${story.commitments.map(([value,name,text]) => `<details class="luggage-tag"><summary><strong>${value}</strong><span>${name}</span></summary><p>${text}</p></details>`).join('')}
          </div>
          ${picture(9,'polaroid-compact')}
        </details>`;
      case 4:
        return memories([10,11],'Open my class and project memories');
      default:
        return '';
    }
  }

  function reflectionMarkup(level, revisit) {
    const content = story.levels[level-1];
    return `<div class="reflection-main">
      <div class="reflection-copy">
        <p class="eyebrow"><span class="diamond"></span> My reflection</p>
        <h2 id="reflection-title" tabindex="-1">${content.subtitle}</h2>
        ${content.reflection.map(paragraph => `<p>${paragraph}</p>`).join('')}
        ${level === 1 ? `<blockquote class="personal-quote"><span>My WHY</span><p>“${story.why}”</p></blockquote>` : ''}
        ${content.insight ? `<blockquote class="personal-quote"><p>“${content.insight}”</p></blockquote>` : ''}
        ${level === 1 ? memories([1,2,3,4]) : ''}
        ${level === 5 ? picture(14,'reflection-picture',false) : ''}
      </div>
      <div class="reflection-side">
        <div class="change-card"><p class="micro-label">What I thought</p><p>${content.before}</p></div>
        <div class="change-card change-after"><p class="micro-label">What I learned</p><p>${content.after}</p></div>
        <p class="lens-note">BU301 · ${content.lens}</p>
      </div>
    </div>
    <div class="reflection-next">
      <span class="reward-preview">${stamp(content)}<span><small>Passport stamp</small><strong>${content.stamp}</strong></span></span>
      <button type="button" class="button button-primary" data-do="finish-level">${revisit ? 'Return to the map' : level === 5 ? 'Stamp passport & see the sunrise' : 'Stamp passport & continue'} ${icon('arrow')}</button>
    </div>`;
  }

  function renderLevel(level, replay = false) {
    if (!game.available(level)) {
      const previous = story.levels[level - 2];
      if (previous) announce(`Complete ${previous.name} to unlock this checkpoint.`);
      return;
    }
    currentLevel = level;
    const content = story.levels[level-1];
    const revisit = level <= game.completed;
    showScene('level',`
      <article class="level-page" style="--accent:${content.color}">
        <div class="level-nav">
          ${navButton('Back to the map','map','back','button-quiet')}
          ${progressBar()}
        </div>
        <div class="level-layout">
          <div class="level-intro">
            <div class="level-kicker eyebrow"><span class="diamond"></span> Checkpoint ${level} of 5 ${revisit ? '<span class="revisit-label">Completed</span>' : ''}</div>
            <h1 tabindex="-1">${content.name}</h1>
            <p class="level-subtitle">${content.subtitle}</p>
            <p class="level-narration">${content.intro}</p>
            <div class="territory-frame">${world.territory(level,'level-territory')}</div>
            ${levelExtras(level)}
          </div>
          <section class="task-panel" aria-labelledby="task-title">
            <div class="task-title">
              <div class="task-symbol">${icon(content.icon)}</div>
              <div><h2 id="task-title">${content.task}</h2><p>${content.guidance}</p></div>
            </div>
            <div id="task-root"></div>
            <button type="button" class="button button-secondary reflection-jump" data-do="reflection" hidden>
              ${icon('book')} Read my reflection ${icon('arrow')}
            </button>
            ${revisit && !replay ? navButton('Replay this task','replay','restart','button-quiet replay-link') : ''}
          </section>
        </div>
        <section id="reflection" class="reflection" aria-labelledby="reflection-title" hidden></section>
      </article>`);
    const reflection = scene.querySelector('#reflection');
    const jump = scene.querySelector('.reflection-jump');
    currentTask = tasks.mount({
      root: scene.querySelector('#task-root'),
      level,
      draft: game.draftFor(level),
      completed: revisit && !replay,
      photo: picture,
      hydrate,
      play: cue => sound.play(cue),
      save: draft => game.saveDraft(level,draft),
      reduced: () => motion.matches,
      reveal(newlySolved) {
        reflection.innerHTML = reflectionMarkup(level,revisit);
        reflection.hidden = false;
        jump.hidden = false;
        hydrate(reflection);
        if (newlySolved) {
          reflection.classList.add('reflection-revealed');
          announce('My reflection is ready to read.');
          jump.focus({ preventScroll: true });
        }
      }
    });
  }

  function showStamp(level) {
    document.querySelector('.stamp-toast')?.remove();
    clearTimeout(toastTimer);
    const content = story.levels[level-1];
    const toast = document.createElement('aside');
    toast.className = 'stamp-toast';
    toast.setAttribute('role','status');
    toast.innerHTML = `${stamp(content)}<div><small>Passport stamped</small><strong>${content.stamp}</strong></div>`;
    document.body.append(toast);
    toastTimer = setTimeout(() => toast.remove(),3300);
  }

  function finishLevel() {
    if (!currentTask?.solved() || !currentLevel) return;
    const level = currentLevel;
    const result = game.complete(level);
    if (!result) return;
    if (result === 'revisit') {
      renderMap();
      return;
    }
    sound.play('stamp');
    if (game.finished) {
      renderFinale(true);
    } else {
      renderMap({ from: level-1 });
      announce(`${story.levels[level-1].stamp} stamp earned. Checkpoint ${level+1} is now open.`);
    }
    showStamp(level);
  }

  function renderFinale(firstArrival = false) {
    if (!game.finished) return;
    currentLevel = 0;
    showScene('finale',`
      <section class="final-cinema">
        <div class="final-pan">${world.finale()}</div>
        <div class="final-veil"></div>
        <div class="final-title">
          <p class="eyebrow"><span class="diamond"></span> The Horizon of Growth</p>
          <h1 tabindex="-1"><span>The map is complete.</span><em>My journey isn’t.</em></h1>
          <p class="final-promise"><span>This is not the end.</span><strong>It’s my starting point.</strong></p>
        </div>
      </section>
      <section class="final-story" aria-labelledby="final-reflection-title">
        <div class="final-reflection">
          <h2 id="final-reflection-title">What I take with me</h2>
          ${story.finale.map(paragraph => `<p>${paragraph}</p>`).join('')}
        </div>
        ${picture(12,'final-picture')}
      </section>
      <div class="final-actions">
        ${navButton('View my passport','passport','passport','button-primary')}
        ${navButton('Explore the map again','map','map')}
        ${summaryLink('button button-secondary')}
      </div>`);
    if (firstArrival) {
      sound.play('dawn');
      announce('All five checkpoints completed. The finale is open.');
    }
  }

  function openDialog(title, body, className = '') {
    if (!overlay.open) overlayOpener = document.activeElement;
    overlay.querySelector('video')?.pause();
    overlay.className = `overlay ${className}`;
    overlay.innerHTML = `<div class="overlay-shell">
      <button type="button" class="overlay-close" data-do="close" aria-label="Close dialog">${icon('close')}</button>
      <h2 id="overlay-title" tabindex="-1">${escape(title)}</h2>
      ${body}
    </div>`;
    hydrate(overlay);
    if (!overlay.open) overlay.showModal();
    overlay.querySelector('h2').focus({ preventScroll: true });
  }

  function openPassport() {
    if (!game.started) return;
    openDialog('Entrepreneurial Passport',`
      <div class="passport-spread">
        <div class="passport-cover">
          ${icon('passport')}
          <h3>Gianluca Valentini</h3>
          <p>Wilfrid Laurier University<br>BU301 · Fall 2026</p>
          ${progressBar()}
        </div>
        <div class="passport-page">
          <ol class="stamp-grid">
            ${story.levels.map((level,index) => {
              const earned = index < game.completed;
              return `<li class="${earned ? 'stamp-earned' : 'stamp-waiting'}" aria-label="${level.stamp}: ${earned ? 'earned' : 'not earned yet'}">
                ${stamp(level,earned)}<span>${earned ? level.stamp : 'Checkpoint ' + (index+1)}</span>
              </li>`;
            }).join('')}
          </ol>
          <p>Five discoveries. One continuing journey.</p>
        </div>
      </div>`,'passport-overlay');
  }

  function openMemory(number) {
    const config = photos[number];
    if (!config) return;
    const memory = [...story.packing,...story.internships,...Object.values(story.extras)].find(item => item.photo === number);
    openDialog(memory?.name || memory?.title || config.caption,`${picture(number,'full-memory',false)}
      ${memory?.text ? `<p class="memory-text">${escape(memory.text)}</p>` : ''}`,'memory-overlay');
    sound.play('open');
  }

  function openExtra(id) {
    const memory = story.extras[id];
    if (!memory) return;
    openDialog(memory.title,`
      ${memory.photo ? picture(memory.photo,'full-memory',false) : `<div class="postcard-art">${world.vignette(memory.art,'jesolo-postcard')}</div>`}
      <p class="memory-text">${escape(memory.text)}</p>`,`memory-overlay memory-${memory.type}`);
    sound.play('open');
  }

  function basketball() {
    openDialog('A first leap',`
      <p class="memory-text">Basketball was one of the first places I chose a bigger challenge.</p>
      <svg class="hoop-scene" viewBox="0 0 460 210" aria-hidden="true">
        <rect width="460" height="210" fill="#162c49"/>
        <path d="m0 182 460-60v88H0Z" fill="#905c62"/>
        <path d="m41 199 339-46m-120 28 63-42" stroke="#f4caac" stroke-width="2" opacity=".6"/>
        <path d="M388 159V49" stroke="#7797b5" stroke-width="8"/>
        <rect x="328" y="40" width="72" height="46" rx="3" fill="#d1dce0" stroke="#7b9cb6" stroke-width="3"/>
        <path d="M341 59h36v22h-36Z" fill="none" stroke="#728ea8" stroke-width="2"/>
        <ellipse cx="352" cy="85" rx="22" ry="6" fill="none" stroke="#f39272" stroke-width="4"/>
        <path d="m332 86 10 30h21l10-30m-30 0 6 30m10-30-6 30" stroke="#e7e0d0" fill="none" stroke-width="1.4"/>
        <g class="basketball-orb">
          <circle cx="76" cy="155" r="14" fill="#f0a068" stroke="#f7c484" stroke-width="2"/>
          <path d="M62 155h28m-14-14v28m-10-25q13 11 0 22m20-22q-13 11 0 22" fill="none" stroke="#8c4b51" stroke-width="1.3"/>
        </g>
      </svg>
      ${navButton('Shoot','shoot','ball','button-primary')}`,'basketball-overlay');
  }

  function confirmRestart() {
    openDialog('Restart the journey?',`
      <p>This clears the five checkpoints, passport stamps, and any unfinished task on this device.</p>
      <div class="dialog-actions">${navButton('Keep my progress','close','back')}${navButton('Restart journey','restart','restart','button-primary')}</div>`,'restart-overlay');
  }

  document.addEventListener('click',event => {
    const photo = event.target.closest('button[data-photo]');
    if (photo) {
      openMemory(Number(photo.dataset.photo));
      return;
    }
    const control = event.target.closest('[data-do]');
    if (!control) return;
    const { do: action, level, extra } = control.dataset;
    switch (action) {
      case 'start':
        game.start();
        sound.play('open');
        renderMap({ opening: true });
        break;
      case 'home':
        if (game.started) renderMap();
        else renderIntro();
        break;
      case 'map':
        if (game.started) renderMap();
        break;
      case 'level':
        renderLevel(Number(level));
        break;
      case 'sound': {
        const enabled = game.toggleSound();
        if (enabled) sound.play('place');
        else sound.stop();
        renderNavigation();
        topbar.querySelector('[data-do="sound"]').focus({ preventScroll: true });
        announce(enabled ? 'Sound effects on.' : 'Sound effects muted.');
        break;
      }
      case 'passport':
        openPassport();
        break;
      case 'reflection': {
        const heading = scene.querySelector('#reflection-title');
        heading?.focus({ preventScroll: true });
        heading?.scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth', block: 'start' });
        break;
      }
      case 'finish-level':
        finishLevel();
        break;
      case 'replay':
        if (currentLevel && currentLevel <= game.completed) renderLevel(currentLevel,true);
        break;
      case 'extra':
        openExtra(extra);
        break;
      case 'basketball':
        basketball();
        break;
      case 'shoot': {
        const orb = overlay.querySelector('.basketball-orb');
        orb.classList.remove('orb-shot');
        orb.getBoundingClientRect();
        orb.classList.add('orb-shot');
        sound.play('place');
        announce('The ball goes through the hoop.');
        break;
      }
      case 'finale':
        renderFinale();
        break;
      case 'confirm-restart':
        confirmRestart();
        break;
      case 'restart':
        sound.stop();
        game.restart();
        document.querySelector('.stamp-toast')?.remove();
        renderIntro();
        announce('The journey has been restarted.');
        break;
      case 'close':
        overlay.close();
        break;
    }
  });

  overlay.addEventListener('click',event => {
    if (event.target === overlay) overlay.close();
  });
  overlay.addEventListener('close',() => {
    if (overlay.open) return;
    overlay.querySelector('video')?.pause();
    if (overlayOpener?.isConnected) overlayOpener.focus({ preventScroll: true });
    overlayOpener = null;
  });
  compact.addEventListener('change',() => {
    if (screen === 'map') renderMap({ keepScroll: true });
  });

  if (game.started) renderMap({ keepScroll: true });
  else renderIntro(false);
})();
