// Tiny pub-sub so Home's hero reveal can wait for Preloader to finish,
// without needing a full context provider. Preloader only ever runs once
// per page load (App mounts once), so this is safe as module state.
let done = false;
const listeners = new Set();

export function isPreloaderDone() {
  return done;
}

export function markPreloaderDone() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onPreloaderDone(fn) {
  if (done) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
