/* The five tasks share selection, drag/drop, focus and feedback behavior. */
(() => {
  const { story, world, art } = Journey;
  const { icon } = art;
  const ids = items => items.map(({ id }) => id);
  const keep = (values, allowed) => Array.isArray(values)
    ? [...new Set(values.filter(value => allowed.includes(value)))] : [];
  const steps = value => Number.isInteger(value) ? Math.max(0, Math.min(3, value)) : 0;

  function restore(level, saved, completed = false) {
    const data = saved && typeof saved === 'object' ? saved : {};
    switch (level) {
      case 1:
        return { placed: completed ? ids(story.packing) : keep(data.placed, ids(story.packing)) };
      case 2: {
        const opened = completed ? ids(story.internships) : keep(data.opened, ids(story.internships));
        return { opened, transformed: opened.length === 2 && (completed || data.transformed === true) };
      }
      case 3:
        return { steps: completed ? 3 : steps(data.steps) };
      case 4: {
        const opened = completed ? ids(story.conversations) : keep(data.opened, ids(story.conversations));
        const placed = completed ? opened.slice() : keep(data.placed, opened);
        return { opened, placed, reframed: placed.length === 2 && (completed || data.reframed === true) };
      }
      case 5:
        return { turns: completed ? [0,1,2] : keep(data.turns, [0,1,2]) };
    }
  }

  function isSolved(level, state) {
    switch (level) {
      case 1: return state.placed.length === 4;
      case 2: return state.transformed;
      case 3: return state.steps === 3;
      case 4: return state.reframed;
      case 5: return state.turns.length === 3;
    }
  }

  const dragButton = (id, label, symbol, selected) => `
    <button type="button" class="object-button" data-task="select" data-id="${id}" data-focus="object-${id}"
      data-drag="${id}" draggable="true" aria-pressed="${selected}">
      ${icon(symbol)}<span>${label}</span>
    </button>`;

  function packing(state, selected, photo) {
    const remaining = ['sweden','basketball','canada','milan'].map(id => story.packing.find(memory => memory.id === id));
    const latest = story.packing.find(memory => memory.id === (selected || state.placed.at(-1)));
    return `
      <div class="suitcase ${state.placed.length === 4 ? 'case-closed' : ''}">
        <div class="suitcase-lid">${icon(state.placed.length === 4 ? 'compass' : 'case')}
          <span>${state.placed.length === 4 ? 'The memories are connected' : 'Memory suitcase'}</span>
          <span class="task-count">${state.placed.length} / 4</span>
        </div>
        ${state.placed.length < 4 ? `<div class="object-tray">
          ${remaining.filter(({ id }) => !state.placed.includes(id)).map(({ id,name,icon: symbol }) => dragButton(id,name,symbol,id === selected)).join('')}
        </div>` : ''}
      </div>
      <ol class="packing-route" aria-label="The memory route">
        ${story.packing.map(({ id, name, slot, icon: symbol, photo: number }, index) => {
          const placed = state.placed.includes(id);
          return `<li>
            ${placed ? `<button type="button" class="route-slot placed" data-photo="${number}" data-focus="slot-${id}" aria-label="Open ${name} memory">
              ${icon(symbol)}<span>${name}</span>${icon('check','slot-check')}
            </button>` : `<button type="button" class="route-slot" data-task="drop-memory" data-id="${id}" data-drop="${id}" data-focus="slot-${id}">
              <span class="slot-index">${index + 1}</span><span>${slot}</span>
            </button>`}
          </li>`;
        }).join('')}
      </ol>
      ${latest ? `<div class="memory-peek">
        ${photo(latest.photo,'polaroid-compact')}
        <div><h3>${latest.name}</h3><p>${latest.text}</p></div>
      </div>` : ''}`;
  }

  function workshop(state, selected, photo) {
    return `<div class="workshop-doors">
      ${story.internships.map(({ id,name,label,icon: symbol,text,photo: number }) => state.opened.includes(id)
        ? `<article class="door door-open" tabindex="-1" data-focus="door-${id}">
          <div class="door-heading">${icon(symbol)}<div><h3>${name}</h3><span>${label}</span></div></div>
          <p>${text}</p>${photo(number,'polaroid-compact')}
        </article>`
        : `<button type="button" class="door" data-task="open-door" data-id="${id}" data-focus="door-${id}">
          ${icon(symbol)}<strong>${name}</strong><span>Open memory</span>
        </button>`).join('')}
      </div>
      ${state.opened.length === 2 && !state.transformed ? `<div class="workbench">
        <p class="task-quote">Different experiences. One important question.</p>
        ${dragButton('problem',story.problem,'book',selected === 'problem')}
        <button class="drop-bench ${selected ? 'ready' : ''}" type="button" data-task="transform" data-drop="workbench" data-focus="bench">
          ${icon('spark')} Place the problem on the workbench
        </button>
      </div>` : ''}
      ${state.transformed ? `<div class="idea-sketch">
        ${icon('spark')}<div><h3>Internship Match</h3><p>${story.concept}</p></div>
      </div>` : ''}`;
  }

  function bridge(state) {
    return `<ol class="stone-list">
      ${story.bridge.map(({ name, icon: symbol, text }, index) => {
        const placed = index < state.steps;
        const current = index === state.steps;
        return `<li>
          <button type="button" class="step-button ${placed ? 'step-placed' : current ? 'step-current' : ''}"
            data-task="place-stone" data-id="${index}" data-focus="stone-${index}" ${current ? '' : 'disabled'}>
            <span class="step-no">${placed ? icon('check') : index + 1}</span>
            <span>${name}</span>${icon(symbol,'step-symbol')}
          </button>
          ${placed ? `<p class="step-note">${text}</p>` : ''}
        </li>`;
      }).join('')}
    </ol>`;
  }

  function perspectives(state, selected) {
    return `<div class="conversation-grid">
      ${story.conversations.map(({ id,name,role,icon: symbol,logo,insight,text }) => {
        const opened = state.opened.includes(id);
        const placed = state.placed.includes(id);
        return `<article class="conversation ${opened ? 'conversation-open' : ''}">
          <div class="speaker">
            ${icon(symbol)}
            <div>
              <div class="speaker-title"><h3>${name}</h3><img class="speaker-logo" src="${logo.path}" alt="${logo.alt}"></div>
              <span>${role}</span>
            </div>
          </div>
          ${opened ? `<p>${text}</p>${placed ? '' : dragButton(id,insight,symbol,selected === id)}`
            : `<button type="button" class="button button-small button-secondary" data-task="open-conversation" data-id="${id}" data-focus="talk-${id}">Open conversation</button>`}
        </article>`;
      }).join('')}
      </div>
      <div class="idea-board">
        <h3>Internship Match idea board</h3>
        ${state.placed.length ? `<ul class="pinned-insights">${story.conversations.filter(({ id }) => state.placed.includes(id)).map(({ insight }) => `<li>${icon('check')}${insight}</li>`).join('')}</ul>` : ''}
        ${state.placed.length < 2 ? `<button type="button" class="drop-bench ${selected ? 'ready' : ''}" data-task="add-insight" data-drop="board" data-focus="board">
          ${icon('crossroads')} Add the selected insight
        </button>` : `<div class="feedback-note ${state.reframed ? 'reframed' : ''}">
          <span class="micro-label">${state.reframed ? 'A better question' : 'An objection to consider'}</span>
          <p>${state.reframed ? story.question : story.objection}</p>
          ${state.reframed ? '' : `<button type="button" class="button button-small button-secondary" data-task="reframe" data-focus="reframe">Reframe the objection ${icon('arrow')}</button>`}
        </div>`}
        ${state.reframed ? `<div class="concepts"><p>Ideas I considered</p><ul>${story.concepts.map(item => `<li>${item}</li>`).join('')}</ul></div>` : ''}
      </div>`;
  }

  function redesign(state) {
    return `<div class="turn-list">
      ${story.turns.map(({ name,icon: symbol,text },index) => {
        const used = state.turns.includes(index);
        return `<div>
          <button type="button" class="turn-button ${used ? 'turn-used' : ''}" data-task="bend" data-id="${index}" data-focus="turn-${index}" aria-pressed="${used}" ${used ? 'disabled' : ''}>
            ${icon(used ? 'check' : symbol)}<span>${name}</span>
          </button>
          ${used ? `<p>${text}</p>` : ''}
        </div>`;
      }).join('')}
    </div>
    ${state.turns.length === 3 ? `<p class="task-quote">The destination is still in view. The road has room for what I learn along the way.</p>` : ''}`;
  }

  const renderers = [packing, workshop, bridge, perspectives, redesign];

  function mount({ root, level, draft, completed, photo, hydrate, play, save, reveal, reduced }) {
    let state = restore(level,draft,completed);
    let selected = '';
    let dragged = '';
    root.innerHTML = `<div class="task-visual" data-task-visual${level === 3 || level === 5 ? '' : ' hidden'}></div>
      <div class="task-controls" data-task-controls></div>
      <p class="task-feedback" data-task-feedback role="status" aria-live="polite"></p>`;
    const visual = root.querySelector('[data-task-visual]');
    const controls = root.querySelector('[data-task-controls]');
    const feedback = root.querySelector('[data-task-feedback]');
    if (level === 5) visual.innerHTML = world.road(state.turns.length);

    function render(focus, previous = state) {
      if (level === 3) {
        visual.innerHTML = world.crossing(state.steps, state.steps > previous.steps);
        hydrate(visual);
      }
      if (level === 5 && state.turns.length !== previous.turns.length) {
        world.bendRoad(visual.querySelector('svg'),previous.turns.length,state.turns.length,reduced());
      }
      controls.innerHTML = renderers[level-1](state,selected,photo);
      hydrate(controls);
      if (focus) {
        const target = controls.querySelector(`[data-focus="${focus}"]:not(:disabled)`);
        (target || controls.querySelector('[data-focus]:not(:disabled)'))?.focus({ preventScroll: true });
      }
    }

    function update(next, message, focus, cue = 'place') {
      const previous = state;
      state = restore(level,next);
      save(state);
      render(focus,previous);
      feedback.textContent = message;
      play(cue);
      if (!isSolved(level,previous) && isSolved(level,state)) reveal(true);
    }

    function placeMemory(target, item) {
      if (!item) {
        feedback.textContent = 'Choose a memory from the suitcase first.';
        return;
      }
      if (!ids(story.packing).includes(item) || state.placed.includes(item)) return;
      if (target !== item) {
        feedback.textContent = 'Try another place on the route. The memory stays selected.';
        return;
      }
      selected = '';
      const { name } = story.packing.find(memory => memory.id === item);
      update({ placed: [...state.placed,item] },`${name} is on the route.`,`slot-${item}`);
    }

    function transform(item) {
      if (state.opened.length !== 2 || state.transformed || (item && item !== 'problem')) return;
      selected = '';
      update({ ...state, transformed: true },'The problem became the first sketch of Internship Match.');
    }

    function addInsight(item) {
      if (!item) {
        feedback.textContent = 'Open a conversation and select its insight first.';
        return;
      }
      if (!state.opened.includes(item) || state.placed.includes(item)) return;
      selected = '';
      const name = story.conversations.find(person => person.id === item).name;
      const placed = [...state.placed,item];
      update({ ...state, placed },`${name}’s insight is on the board.`,placed.length === 2 ? 'reframe' : 'board');
    }

    root.onclick = event => {
      const button = event.target.closest('button[data-task]');
      if (!button || !root.contains(button) || button.disabled) return;
      const { task, id } = button.dataset;
      switch (task) {
        case 'select':
          selected = selected === id ? '' : id;
          render(`object-${id}`);
          feedback.textContent = selected ? 'Selected. Choose where to place it.' : 'Selection cleared.';
          play('select');
          break;
        case 'drop-memory':
          placeMemory(id,selected);
          break;
        case 'open-door': {
          if (state.opened.includes(id)) break;
          update({ ...state, opened: [...state.opened,id] },'Memory opened.',`door-${id}`,'open');
          break;
        }
        case 'transform':
          transform(selected);
          break;
        case 'place-stone': {
          const index = Number(id);
          if (index !== state.steps) break;
          update({ steps: index + 1 },index === 2 ? 'The crossing is complete.' : 'Stepping stone placed.',`stone-${index + 1}`);
          break;
        }
        case 'open-conversation':
          if (state.opened.includes(id)) break;
          update({ ...state, opened: [...state.opened,id] },'Conversation opened. An insight is ready to collect.',`object-${id}`,'open');
          break;
        case 'add-insight':
          addInsight(selected);
          break;
        case 'reframe':
          if (state.placed.length === 2 && !state.reframed) {
            update({ ...state, reframed: true },'The objection became a new question.');
          }
          break;
        case 'bend': {
          const index = Number(id);
          if (state.turns.includes(index) || !story.turns[index]) break;
          const next = [0,1,2].find(value => value !== index && !state.turns.includes(value));
          update({ turns: [...state.turns,index] },`${story.turns[index].name} changed the route.`,`turn-${next}`);
          break;
        }
      }
    };

    root.ondragstart = event => {
      const item = event.target.closest('[data-drag]');
      if (!item || !event.dataTransfer) return;
      dragged = item.dataset.drag;
      event.dataTransfer.setData('text/plain',dragged);
      event.dataTransfer.effectAllowed = 'move';
      root.classList.add('is-dragging');
    };
    root.ondragover = event => {
      if (!dragged || !event.target.closest('[data-drop]')) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    };
    root.ondrop = event => {
      const target = event.target.closest('[data-drop]');
      if (!target || !dragged) return;
      event.preventDefault();
      const item = dragged;
      const destination = target.dataset.drop;
      dragged = '';
      root.classList.remove('is-dragging');
      if (level === 1) {
        selected = item;
        placeMemory(destination,item);
        if (!state.placed.includes(item)) render(`object-${item}`);
      } else if (level === 2 && destination === 'workbench') {
        transform(item);
      } else if (level === 4 && destination === 'board') {
        addInsight(item);
      }
    };
    root.ondragend = () => {
      dragged = '';
      root.classList.remove('is-dragging');
    };

    render();
    if (isSolved(level,state)) reveal(false);
    return { solved: () => isSolved(level,state) };
  }

  Journey.tasks = { mount };
})();
