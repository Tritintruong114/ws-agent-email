// App state manager — safe, persistent, predictable

export const state = {
  onboarding: { connected: false, loadingComplete: false, confirmed: false },
  currentPage: 's1',
  selectedThread: null,
  threadBucket: undefined, // filter
  eventFilter: 'hom_nay',
  settingsTab: 0,
  memoryTab: 0,
  settings: JSON.parse(localStorage.getItem('aw_settings') || 'null') || null,
  suggestions: JSON.parse(localStorage.getItem('aw_suggestions') || 'null') || null
};

const listeners = [];

export function subscribe(fn) {
  listeners.push(fn);
  return () => listeners.splice(listeners.indexOf(fn), 1);
}

export function save(key, val) {
  state[key] = val;
  listeners.forEach(f => f(key, val));
}

export function persist(key, val) {
  save(key, val);
  localStorage.setItem('aw_' + key, JSON.stringify(val));
}

export function navigate(page) {
  // If onboarding not done, force s1
  if (!state.onboarding.confirmed && page !== 's1') {
    save('currentPage', 's1');
    return 's1';
  }
  save('currentPage', page);
  return page;
}

export function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}