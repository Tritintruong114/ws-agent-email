import { state, subscribe, navigate, toast } from './state.js';
import { render as renderS1 } from './screens/s1.js';
import { render as renderS4 } from './screens/s4.js';
import { render as renderS2, selectBucket, threadAction } from './screens/s2.js';
import { render as renderS5, setTab as memorySetTab, suggestionAction } from './screens/s5.js';
import { render as renderS6, toggleEvent, setFilter as logFilter } from './screens/s6.js';
import { render as renderS7, setTab as settingsSetTab, updateCadence, toggleNotif, removeExclude } from './screens/s7.js';

const RENDERERS = {
  s1: renderS1, s4: renderS4, s2: renderS2,
  s5: renderS5, s6: renderS6, s7: renderS7
};

window.App = {
  currentPage: 's1',

  renderCurrent() {
    const page = state.currentPage;
    // Update nav
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
    const link = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (link) link.classList.add('active');
    // Show/hide pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const el = document.getElementById('page-' + page);
    if (el) el.classList.add('active');
    // Render
    if (RENDERERS[page]) RENDERERS[page]();
  },

  nav(page) {
    const result = navigate(page);
    App.currentPage = result;
    App.renderCurrent();
  },

  navFilter(page, filter) {
    App.nav(page);
  },

  // S2
  selectBucket(key) { selectBucket(key); },
  threadAction(id, action) { threadAction(id, action); },

  // S5
  memoryTab(idx) { memorySetTab(idx); },
  suggestionAction(id, action) { suggestionAction(id, action); },

  // S6
  toggleEvent(i) { toggleEvent(i); },
  logFilter(f) { logFilter(f); },

  // S7
  settingsTab(idx) { settingsSetTab(idx); },
  updateCadence(key, val) { updateCadence(key, val); },
  toggleNotif(key) { toggleNotif(key); },
  removeExclude(type, id) { removeExclude(type, id); },

  resetAll() {
    localStorage.clear();
    location.reload();
  }
};

// Expose toast globally for onclick handlers in rendered HTML
window.toast = toast;

// Subscribe to state changes — re-render if page changes
subscribe((key) => {
  if (key === 'currentPage') App.renderCurrent();
});

// Initial render
App.renderCurrent();