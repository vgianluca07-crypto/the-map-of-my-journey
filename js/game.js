/* Completion is a count of consecutive checkpoints. Unlocks and stamps derive from it. */
window.Journey = window.Journey || {};

Journey.createGame = function createGame() {
  const key = 'gianluca-valentini-journey-v1';
  const count = Journey.story.levels.length;
  const initial = () => ({ started: false, completed: 0, sound: false, draft: null });
  let state = initial();

  try {
    const saved = JSON.parse(window.localStorage.getItem(key));
    if (saved && typeof saved === 'object' && saved.started === true) {
      state = {
        started: true,
        completed: Number.isInteger(saved.completed) ? Math.min(count, Math.max(0, saved.completed)) : 0,
        sound: saved.sound === true,
        draft: saved.draft && typeof saved.draft === 'object' ? saved.draft : null
      };
    } else if (saved?.sound === true) {
      state.sound = true;
    }
  } catch {
    // Private browsing or an invalid record can leave the game running in memory.
  }

  function save() {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Storage is optional for the current visit.
    }
  }

  function available(level) {
    return state.started && Number.isInteger(level) &&
      level >= 1 && level <= Math.min(count, state.completed + 1);
  }

  return {
    get started() { return state.started; },
    get completed() { return state.completed; },
    get finished() { return state.completed === count; },
    get sound() { return state.sound; },
    available,
    start() {
      state.started = true;
      save();
    },
    complete(level) {
      if (!available(level)) return false;
      if (level <= state.completed) return 'revisit';
      state.completed = level;
      state.draft = null;
      save();
      return 'new';
    },
    draftFor(level) {
      return level === state.completed + 1 && state.draft?.level === level
        ? state.draft.task : null;
    },
    saveDraft(level, task) {
      if (!available(level) || level !== state.completed + 1) return;
      state.draft = { level, task };
      save();
    },
    toggleSound() {
      state.sound = !state.sound;
      save();
      return state.sound;
    },
    restart() {
      state = initial();
      save();
    }
  };
};
