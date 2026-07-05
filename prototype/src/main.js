import { state, subscribe, navigate, toast } from './state.js';
import { render as renderS1, onConnect, onLoadDone } from './screens/s1.js';
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
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
    const link = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (link) link.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const el = document.getElementById('page-' + page);
    if (el) el.classList.add('active');
    if (RENDERERS[page]) RENDERERS[page]();
  },

  nav(page) {
    navigate(page);
    App.renderCurrent();
  },

  navFilter(page, filter) {
    if (page === 's1' && filter === 'connect') {
      onConnect();
    } else {
      App.nav(page);
    }
  },

  loadDone() {
    onLoadDone();
    App.renderCurrent();
  },

  selectBucket(key) { selectBucket(key); },
  threadAction(id, action) { threadAction(id, action); },

  memoryTab(idx) { memorySetTab(idx); },
  suggestionAction(id, action) { suggestionAction(id, action); },

  toggleEvent(i) { toggleEvent(i); },
  logFilter(f) { logFilter(f); },

  settingsTab(idx) { settingsSetTab(idx); },
  updateCadence(key, val) { updateCadence(key, val); },
  toggleNotif(key) { toggleNotif(key); },
  removeExclude(type, id) { removeExclude(type, id); },

  resetAll() {
    localStorage.clear();
    location.reload();
  }
};

window.toast = toast;

subscribe((key) => {
  if (key === 'currentPage') App.renderCurrent();
});

App.renderCurrent();
