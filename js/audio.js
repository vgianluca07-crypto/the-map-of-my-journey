/* Small synthesized cues. No sound files, loops, or autoplay. */
window.Journey = window.Journey || {};

Journey.makeAudio = function makeAudio(enabled) {
  const Audio = window.AudioContext || window.webkitAudioContext;
  let context;

  const cues = {
    select: [[523.25, 0, .11, 'sine', .045]],
    place: [[659.25, 0, .14, 'sine', .06], [880, .08, .18, 'sine', .045]],
    open: [[392, 0, .17, 'triangle', .045], [587.33, .10, .21, 'sine', .05]],
    stamp: [[523.25, 0, .25, 'sine', .055], [659.25, .08, .25, 'sine', .05], [783.99, .17, .34, 'triangle', .043]],
    dawn: [[392, 0, .9, 'sine', .045], [523.25, .19, .84, 'sine', .04], [659.25, .36, 1, 'sine', .04], [783.99, .56, 1.03, 'sine', .034]]
  };

  return {
    play(cue) {
      if (!Audio || !enabled() || !cues[cue]) return;
      try {
        context ??= new Audio();
        if (context.state === 'suspended') void context.resume().catch(() => {});
        const now = context.currentTime + .012;
        cues[cue].forEach(([frequency, delay, length, type, volume]) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const start = now + delay;
          oscillator.type = type;
          oscillator.frequency.value = frequency;
          gain.gain.setValueAtTime(.001, start);
          gain.gain.exponentialRampToValueAtTime(volume, start + .023);
          gain.gain.exponentialRampToValueAtTime(.001, start + length);
          oscillator.connect(gain).connect(context.destination);
          oscillator.start(start);
          oscillator.stop(start + length + .005);
          oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();
          };
        });
      } catch {
        // Sound enhancement is optional.
      }
    },
    stop() {
      if (context?.state === 'running') void context.suspend().catch(() => {});
    }
  };
};
