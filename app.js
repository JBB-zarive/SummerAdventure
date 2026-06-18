/**
 * app.js – Summer Adventure v1.0
 * Architecture : Sheets = Source unique de vérité
 * Genré selon config (fille / garçon / neutre)
 */

/* ══════════════════════════════════════════════════════════════
   CONFIG HELPERS
══════════════════════════════════════════════════════════════ */
const CONFIG_KEY = 'summer_config_v1';

function getConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}
function saveConfig(cfg) {
  try { localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg)); } catch(e) {}
}
function isConfigured() {
  // On a juste besoin du prénom et du genre — l'URL est dans config.js
  const cfg = getConfig();
  return cfg && cfg.childName && cfg.gender;
}

/* ══════════════════════════════════════════════════════════════
   GENRE HELPERS  (fille | garçon | neutre)
══════════════════════════════════════════════════════════════ */
function getGender() {
  const cfg = getConfig();
  return (cfg && cfg.gender) || 'neutre';
}
// Retourne la bonne variante selon le genre actuel
function g(fille, garcon, neutre) {
  const gender = getGender();
  if (gender === 'fille')  return fille;
  if (gender === 'garcon') return garcon;
  return neutre;
}

/* ══════════════════════════════════════════════════════════════
   BADGES  (42 badges, noms/desc genrés dynamiquement)
══════════════════════════════════════════════════════════════ */
function buildBadges() {
  return [
    // ── Missions ──────────────────────────────────────────────
    { id: 'first_mission', icon: '⭐', name: g('Premiers pas','Premiers pas','Premiers pas'),          desc: g('1ère mission accomplie','1er mission accomplie','1ère mission accomplie'),        xpReward: 5,   condition: { type: 'missions_total', value: 1   } },
    { id: 'missions_5',    icon: '🌱', name: g('Débutante','Débutant','Débutant·e'),                   desc: '5 missions accomplies',                                                            xpReward: 10,  condition: { type: 'missions_total', value: 5   } },
    { id: 'missions_10',   icon: '🏅', name: g('Aventurière','Aventurier','Aventurier·ère'),            desc: '10 missions accomplies',                                                           xpReward: 15,  condition: { type: 'missions_total', value: 10  } },
    { id: 'missions_25',   icon: '🥈', name: g('Vaillante','Vaillant','Vaillant·e'),                   desc: '25 missions accomplies',                                                           xpReward: 25,  condition: { type: 'missions_total', value: 25  } },
    { id: 'missions_50',   icon: '🥇', name: g('Héroïne','Héros','Héro·ïne'),                         desc: '50 missions accomplies',                                                           xpReward: 50,  condition: { type: 'missions_total', value: 50  } },
    { id: 'missions_100',  icon: '🎖️', name: 'Centurion',                                             desc: '100 missions accomplies',                                                          xpReward: 100, condition: { type: 'missions_total', value: 100 } },
    { id: 'missions_200',  icon: '🏆', name: g('Légendaire','Légendaire','Légendaire'),                desc: '200 missions accomplies',                                                          xpReward: 200, condition: { type: 'missions_total', value: 200 } },
    // ── Streaks ───────────────────────────────────────────────
    { id: 'streak_3',      icon: '🔥', name: 'En feu !',                                              desc: '3 jours d\'affilée',                                                               xpReward: 10,  condition: { type: 'streak', value: 3   } },
    { id: 'streak_7',      icon: '🌟', name: 'Semaine parfaite',                                      desc: '7 jours d\'affilée',                                                               xpReward: 20,  condition: { type: 'streak', value: 7   } },
    { id: 'streak_14',     icon: '🔥', name: 'Deux semaines !',                                       desc: '14 jours d\'affilée',                                                              xpReward: 35,  condition: { type: 'streak', value: 14  } },
    { id: 'streak_21',     icon: '💪', name: 'Trois semaines !',                                      desc: '21 jours d\'affilée',                                                              xpReward: 50,  condition: { type: 'streak', value: 21  } },
    { id: 'streak_30',     icon: '💎', name: g('Mois légendaire','Mois légendaire','Mois légendaire'), desc: '30 jours d\'affilée',                                                              xpReward: 75,  condition: { type: 'streak', value: 30  } },
    { id: 'streak_60',     icon: '🌈', name: 'Deux mois !',                                           desc: '60 jours d\'affilée',                                                              xpReward: 150, condition: { type: 'streak', value: 60  } },
    { id: 'streak_100',    icon: '👑', name: 'Centenaire de feu',                                     desc: '100 jours d\'affilée',                                                             xpReward: 300, condition: { type: 'streak', value: 100 } },
    // ── Quêtes ────────────────────────────────────────────────
    { id: 'first_quete',   icon: '🗺️', name: g('Quêteuse','Quêteur','Quêteur·euse'),                  desc: g('1ère quête accomplie','1er quête accomplie','1ère quête accomplie'),              xpReward: 15,  condition: { type: 'quetes_total', value: 1  } },
    { id: 'quetes_3',      icon: '🧭', name: g('Exploratrice','Explorateur','Explorateur·ice'),        desc: '3 quêtes accomplies',                                                              xpReward: 30,  condition: { type: 'quetes_total', value: 3  } },
    { id: 'quetes_5',      icon: '🗺️', name: g('Grande Quêteuse','Grand Quêteur','Grand·e Quêteur·euse'), desc: '5 quêtes accomplies',                                                         xpReward: 50,  condition: { type: 'quetes_total', value: 5  } },
    { id: 'quetes_10',     icon: '🌍', name: g('Maîtresse des quêtes','Maître des quêtes','Maître·sse des quêtes'), desc: '10 quêtes accomplies',                                              xpReward: 100, condition: { type: 'quetes_total', value: 10 } },
    // ── XP ────────────────────────────────────────────────────
    { id: 'xp_100',        icon: '💫', name: 'Première centaine',                                     desc: '100 XP gagnés',                                                                    xpReward: 5,   condition: { type: 'total_xp', value: 100   } },
    { id: 'xp_250',        icon: '✨', name: 'En route !',                                            desc: '250 XP gagnés',                                                                    xpReward: 10,  condition: { type: 'total_xp', value: 250   } },
    { id: 'xp_500',        icon: '🌠', name: g('Chasseuse d\'étoiles','Chasseur d\'étoiles','Chasseur·euse d\'étoiles'), desc: '500 XP gagnés',                                               xpReward: 20,  condition: { type: 'total_xp', value: 500   } },
    { id: 'xp_1000',       icon: '💰', name: 'Millionnaire XP',                                       desc: '1000 XP gagnés',                                                                   xpReward: 30,  condition: { type: 'total_xp', value: 1000  } },
    { id: 'xp_2000',       icon: '🌟', name: g('Super active','Super actif','Super actif·ve'),        desc: '2000 XP gagnés',                                                                   xpReward: 50,  condition: { type: 'total_xp', value: 2000  } },
    { id: 'xp_5000',       icon: '🚀', name: 'Astronaute XP',                                         desc: '5000 XP gagnés',                                                                   xpReward: 100, condition: { type: 'total_xp', value: 5000  } },
    { id: 'xp_10000',      icon: '🌌', name: 'Galaxie XP',                                            desc: '10000 XP gagnés',                                                                  xpReward: 200, condition: { type: 'total_xp', value: 10000 } },
    // ── Niveaux ───────────────────────────────────────────────
    { id: 'level_5',       icon: '🛡️', name: g('Gardienne','Gardien','Gardien·ne'),                   desc: 'Atteindre le niveau 5',                                                            xpReward: 25,  condition: { type: 'level', value: 5  } },
    { id: 'level_10',      icon: '⚔️', name: g('Maîtresse des quêtes','Maître des quêtes','Maître·sse des quêtes'), desc: 'Atteindre le niveau 10',                                           xpReward: 50,  condition: { type: 'level', value: 10 } },
    { id: 'level_15',      icon: '🏆', name: g('Conquérante','Conquérant','Conquérant·e'),            desc: 'Atteindre le niveau 15',                                                           xpReward: 100, condition: { type: 'level', value: 15 } },
    { id: 'level_20',      icon: '👑', name: g('Héroïne Familiale','Héros Familial','Héro·ïne Familial·e'), desc: 'Atteindre le niveau 20',                                                   xpReward: 150, condition: { type: 'level', value: 20 } },
    { id: 'level_25',      icon: '💫', name: g('Étoile filante','Étoile filante','Étoile filante'),   desc: 'Atteindre le niveau 25',                                                           xpReward: 250, condition: { type: 'level', value: 25 } },
    { id: 'level_30',      icon: '👸', name: g('La Magnifique','Le Magnifique','Le·a Magnifique'),    desc: 'Atteindre le niveau 30 !',                                                         xpReward: 500, condition: { type: 'level', value: 30 } },
    // ── Catégories ────────────────────────────────────────────
    { id: 'quotidien_7',   icon: '☀️', name: 'Habitudes de vie',                                      desc: '7 missions Quotidien',                                                             xpReward: 20,  condition: { type: 'cat_missions', value: 7,  cat: 'Quotidien'  } },
    { id: 'quotidien_20',  icon: '🌅', name: 'Routine parfaite',                                      desc: '20 missions Quotidien',                                                            xpReward: 50,  condition: { type: 'cat_missions', value: 20, cat: 'Quotidien'  } },
    { id: 'maison_5',      icon: '🏠', name: g('Fée du logis','As du logis','As du logis'),           desc: '5 missions Maison',                                                                xpReward: 15,  condition: { type: 'cat_missions', value: 5,  cat: 'Maison'     } },
    { id: 'maison_15',     icon: '🏡', name: g('Super intendante','Super intendant','Super intendant·e'), desc: '15 missions Maison',                                                           xpReward: 40,  condition: { type: 'cat_missions', value: 15, cat: 'Maison'     } },
    { id: 'nature_3',      icon: '🌱', name: g('Amie de la nature','Ami de la nature','Ami·e de la nature'), desc: '3 missions Nature',                                                        xpReward: 10,  condition: { type: 'cat_missions', value: 3,  cat: 'Nature'     } },
    { id: 'nature_10',     icon: '🌿', name: g('Gardienne de la Terre','Gardien de la Terre','Gardien·ne de la Terre'), desc: '10 missions Nature',                                           xpReward: 35,  condition: { type: 'cat_missions', value: 10, cat: 'Nature'     } },
    { id: 'reading_3',     icon: '📖', name: g('Lectrice','Lecteur','Lecteur·ice'),                   desc: '3 missions Lecture',                                                               xpReward: 10,  condition: { type: 'cat_missions', value: 3,  cat: 'Lecture'    } },
    { id: 'reading_10',    icon: '📚', name: g('Grande Lectrice','Grand Lecteur','Grand·e Lecteur·ice'), desc: '10 missions Lecture',                                                          xpReward: 35,  condition: { type: 'cat_missions', value: 10, cat: 'Lecture'    } },
    { id: 'creative_3',    icon: '🎨', name: g('Artiste','Artiste','Artiste'),                        desc: '3 missions Créativité',                                                            xpReward: 10,  condition: { type: 'cat_missions', value: 3,  cat: 'Créativité' } },
    { id: 'creative_10',   icon: '🎭', name: g('Grande Artiste','Grand Artiste','Grand·e Artiste'),   desc: '10 missions Créativité',                                                           xpReward: 35,  condition: { type: 'cat_missions', value: 10, cat: 'Créativité' } },
    { id: 'special_3',     icon: '⚡', name: g('Spécialiste','Spécialiste','Spécialiste'),            desc: '3 missions Spécial',                                                               xpReward: 20,  condition: { type: 'cat_missions', value: 3,  cat: 'Spécial'    } },
    { id: 'special_5',     icon: '💥', name: g('Super Spécialiste','Super Spécialiste','Super Spécialiste'), desc: '5 missions Spécial',                                                       xpReward: 50,  condition: { type: 'cat_missions', value: 5,  cat: 'Spécial'    } },
  ];
}
// ALL_BADGES est recalculé à chaque accès pour tenir compte du genre
Object.defineProperty(window, 'ALL_BADGES', { get: buildBadges, configurable: true });

/* ══════════════════════════════════════════════════════════════
   NIVEAUX  (noms genrés)
══════════════════════════════════════════════════════════════ */
function buildLevels() {
  return [
    { level:  1, name: g('Exploratrice','Explorateur','Explorateur·ice'),              min: 0,     max: 100,    emoji: '🌱' },
    { level:  2, name: g('Aventurière','Aventurier','Aventurier·ère'),                 min: 100,   max: 250,    emoji: '🧭' },
    { level:  3, name: g('Randonneuse','Randonneur','Randonneur·euse'),                min: 250,   max: 450,    emoji: '🥾' },
    { level:  4, name: g('Voyageuse','Voyageur','Voyageur·euse'),                      min: 450,   max: 700,    emoji: '🎒' },
    { level:  5, name: g('Gardienne','Gardien','Gardien·ne'),                          min: 700,   max: 1000,   emoji: '🛡️' },
    { level:  6, name: g('Chasseuse de quêtes','Chasseur de quêtes','Chasseur·euse de quêtes'), min: 1000, max: 1400, emoji: '🗺️' },
    { level:  7, name: g('Aventurière confirmée','Aventurier confirmé','Aventurier·ère confirmé·e'), min: 1400, max: 1900, emoji: '⛺' },
    { level:  8, name: g('Protectrice nature','Protecteur nature','Protecteur·ice nature'), min: 1900, max: 2500, emoji: '🌿' },
    { level:  9, name: g('Aventurière stellaire','Aventurier stellaire','Aventurier·ère stellaire'), min: 2500, max: 3200, emoji: '🌟' },
    { level: 10, name: g('Maîtresse des quêtes','Maître des quêtes','Maître·sse des quêtes'), min: 3200, max: 4000, emoji: '⚔️' },
    { level: 11, name: g('Gardienne des étoiles','Gardien des étoiles','Gardien·ne des étoiles'), min: 4000, max: 4950, emoji: '🔭' },
    { level: 12, name: g('Exploratrice légendaire','Explorateur légendaire','Explorateur·ice légendaire'), min: 4950, max: 6050, emoji: '🏕️' },
    { level: 13, name: g('Chercheuse de trésors','Chercheur de trésors','Chercheur·euse de trésors'), min: 6050, max: 7300, emoji: '💎' },
    { level: 14, name: g('Navigatrice des mers','Navigateur des mers','Navigateur·ice des mers'), min: 7300, max: 8700, emoji: '⚓' },
    { level: 15, name: g('Conquérante','Conquérant','Conquérant·e'),                  min: 8700,  max: 10250,  emoji: '🏆' },
    { level: 16, name: g('Gardienne de la forêt','Gardien de la forêt','Gardien·ne de la forêt'), min: 10250, max: 11950, emoji: '🌳' },
    { level: 17, name: g('Exploratrice experte','Explorateur expert','Explorateur·ice expert·e'), min: 11950, max: 13800, emoji: '🛞' },
    { level: 18, name: g('Astronaute junior','Astronaute junior','Astronaute junior'), min: 13800, max: 15800, emoji: '🚀' },
    { level: 19, name: g('Exploratrice galactique','Explorateur galactique','Explorateur·ice galactique'), min: 15800, max: 17950, emoji: '🌌' },
    { level: 20, name: g('Héroïne Familiale','Héros Familial','Héro·ïne Familial·e'), min: 17950, max: 20250, emoji: '👑' },
    { level: 21, name: g('Légende de la nature','Légende de la nature','Légende de la nature'), min: 20250, max: 22750, emoji: '🦋' },
    { level: 22, name: g('Maîtresse du temps','Maître du temps','Maître·sse du temps'), min: 22750, max: 25450, emoji: '⏳' },
    { level: 23, name: g('Protectrice du monde','Protecteur du monde','Protecteur·ice du monde'), min: 25450, max: 28350, emoji: '🌍' },
    { level: 24, name: g('Reine de l\'aventure','Roi de l\'aventure','Royauté de l\'aventure'), min: 28350, max: 31450, emoji: '👸' },
    { level: 25, name: g('Étoile filante','Étoile filante','Étoile filante'),          min: 31450, max: 34750, emoji: '💫' },
    { level: 26, name: g('Gardienne de l\'univers','Gardien de l\'univers','Gardien·ne de l\'univers'), min: 34750, max: 38250, emoji: '🌠' },
    { level: 27, name: g('Phénix aventurière','Phénix aventurier','Phénix aventurier·ère'), min: 38250, max: 41950, emoji: '🔥' },
    { level: 28, name: g('Lumière du monde','Lumière du monde','Lumière du monde'),    min: 41950, max: 45850, emoji: '✨' },
    { level: 29, name: g('Légende éternelle','Légende éternelle','Légende éternelle'), min: 45850, max: 49950, emoji: '🌈' },
    { level: 30, name: g('La Magnifique','Le Magnifique','Le·a Magnifique'),           min: 49950, max: 999999, emoji: '👸🌟' },
  ];
}
function getLevels() { return buildLevels(); }

function getChildName() {
  const cfg = getConfig();
  return (cfg && cfg.childName) || 'Aventurier';
}

const CONGRATS_TEMPLATES = [
  'Bravo {name} ! 🎉',
  'Mission accomplie ! ⭐',
  'Tu es un·e vrai·e aventurier·ère ! 🗺️',
  'Incroyable ! Continue comme ça ! 🔥',
  'Quelle championne/champion ! 🏆',
  'Tu assures ! 💪',
  'Super boulot ! ✨',
  "L'aventure continue ! 🌟",
  'Waouh ! 🌟',
];
function getCongratsMsg() {
  const name = getChildName();
  const tpl = CONGRATS_TEMPLATES[Math.floor(Math.random() * CONGRATS_TEMPLATES.length)];
  return tpl.replace('{name}', name).replace('championne/champion', g('championne','champion','champion·ne')).replace('un·e vrai·e aventurier·ère', g('une vraie aventurière','un vrai aventurier','un·e vrai·e aventurier·ère'));
}

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
const STATE = {
  missions: [],
  completions: {},
  user: { id: 'child', name: '', xp: 0, totalXp: 0, streak: 0, lastActiveDate: null, level: 1, missionsDone: 0, quetesDone: 0 },
  validations: [],
  rewards: [],
  unlockedBadges: [],
  history: [],
  settings: {},
  pin: '1234',
  theme: 'light',
  parentsAuth: false,
  currentTab: 'home',
  syncInterval: null,
  syncing: false,
  syncBlocked: false,
  recentlyValidated: {},
  obtainedRewards: [],
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const today = () => {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
};
const formatDate = iso => { try { return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }); } catch(e) { return ''; } };

function getLevelInfo(xp) { const lvls = getLevels(); return lvls.find(l => xp >= l.min && xp < l.max) ?? lvls[lvls.length - 1]; }
function getXpProgress(xp) {
  const lvl = getLevelInfo(xp);
  return { progress: Math.min(((xp - lvl.min) / (lvl.max - lvl.min)) * 100, 100), current: xp - lvl.min, needed: lvl.max - lvl.min, lvl };
}
function getBadgesWithStatus() {
  return ALL_BADGES.map(b => {
    const unlocked = STATE.unlockedBadges.find(ub => ub.badgeId === b.id);
    return { ...b, unlocked: !!unlocked, unlockedAt: unlocked?.unlockedAt || null };
  });
}
function getWeekStart() {
  const now = new Date(); const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now); monday.setDate(now.getDate() + diff); monday.setHours(0,0,0,0);
  return monday.toISOString().slice(0, 10);
}
function getCompletionStatus(missionId) {
  const comp = STATE.completions[missionId];
  if (!comp) return null;
  if (comp.status === 'pending') return 'pending';
  if (comp.status === 'done') return 'done';
  return null;
}

let toastContainer;
function showToast(msg, type = 'info', duration = 3000) {
  if (!toastContainer) { toastContainer = document.createElement('div'); toastContainer.className = 'toast-container'; document.body.appendChild(toastContainer); }
  const t = document.createElement('div'); t.className = 'toast ' + type; t.textContent = msg; toastContainer.appendChild(t);
  setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 300); }, duration);
}

const CACHE_KEY = 'summer_v1_cache';
const LOCAL_KEY  = 'summer_v1_local';

function saveCache() {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      missions: STATE.missions, completions: STATE.completions, user: STATE.user,
      validations: STATE.validations, rewards: STATE.rewards, unlockedBadges: STATE.unlockedBadges,
      history: STATE.history, settings: STATE.settings, obtainedRewards: STATE.obtainedRewards || [],
      cachedAt: new Date().toISOString(),
    }));
  } catch(e) {}
}
function saveLocal() {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify({ pin: STATE.pin, theme: STATE.theme })); } catch(e) {}
}
function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY); if (!raw) return false;
    const c = JSON.parse(raw);
    if (c.missions?.length) STATE.missions = c.missions;
    if (c.completions) STATE.completions = c.completions;
    if (c.user) Object.assign(STATE.user, c.user);
    if (c.validations) STATE.validations = c.validations;
    if (c.rewards?.length) STATE.rewards = c.rewards;
    if (c.unlockedBadges) STATE.unlockedBadges = c.unlockedBadges;
    if (c.history) STATE.history = c.history;
    if (c.settings) STATE.settings = c.settings;
    if (c.obtainedRewards) STATE.obtainedRewards = c.obtainedRewards;
    if (!STATE.recentlyValidated) STATE.recentlyValidated = {};
    if (!STATE.obtainedRewards) STATE.obtainedRewards = [];
    return true;
  } catch(e) { return false; }
}
function loadLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY); if (!raw) return;
    const l = JSON.parse(raw);
    if (l.pin) STATE.pin = l.pin;
    if (l.theme) STATE.theme = l.theme;
  } catch(e) {}
}

/* ══════════════════════════════════════════════════════════════
   SYNC  (Sheets = source de vérité)
══════════════════════════════════════════════════════════════ */
async function syncFromSheets() {
  if (STATE.syncing) return;
  if (STATE.syncBlocked) return;
  STATE.syncing = true;
  updateSyncStatus('🔄 Synchronisation...');
  try {
    const result = await API.getAll(STATE.user.id);
    if (!result.ok || !result.data) { updateSyncStatus('⚠️ Hors-ligne'); STATE.syncing = false; return false; }
    const d = result.data;
    if (d.missions?.length) {
      STATE.missions = d.missions.map(m => ({ ...m, xp: Number(m.xp) || 0, validation: m.validation === true || m.validation === 'TRUE', secret: m.secret === true || m.secret === 'TRUE' }));
    }
    if (d.completions) {
      STATE.completions = {};
      const todayStr = today(); const weekStart = getWeekStart();
      const allMissions = d.missions || STATE.missions;
      (Array.isArray(d.completions) ? d.completions : []).forEach(c => {
        const mission = allMissions.find(m => m.id === c.missionId); if (!mission) return;
        const freq = mission.freq; const type = mission.type;
        if (freq === 'quotidien') {
          if (c.date === todayStr) STATE.completions[c.missionId] = { status: c.status || 'done', date: c.date };
        } else if (freq === 'hebdo') {
          if (c.date >= weekStart) STATE.completions[c.missionId] = { status: c.status || 'done', date: c.date };
        } else if (freq === 'unique') {
          if (type === 'quete') STATE.completions[c.missionId] = { status: c.status || 'done', date: c.date };
          else if (c.date === todayStr) STATE.completions[c.missionId] = { status: c.status || 'done', date: c.date };
        } else {
          STATE.completions[c.missionId] = { status: c.status || 'done', date: c.date };
        }
      });
    }
    if (d.user) {
      Object.assign(STATE.user, {
        xp: Number(d.user.xp) || 0, totalXp: Number(d.user.totalXp) || 0,
        streak: Number(d.user.streak) || 0, level: Number(d.user.level) || 1,
        missionsDone: Number(d.user.missionsDone) || 0, quetesDone: Number(d.user.quetesDone) || 0,
        lastActiveDate: d.user.lastActiveDate || null,
        name: d.user.name || getChildName(),
      });
    }
    if (d.validations) {
      STATE.validations = Array.isArray(d.validations) ? d.validations : [];
      if (!STATE.recentlyValidated) STATE.recentlyValidated = {};
      STATE.validations.forEach(v => {
        if (v.status === 'pending') {
          const existing = STATE.completions[v.missionId];
          if (existing && existing.status === 'done') return;
          const rv = STATE.recentlyValidated[v.missionId];
          if (rv && (Date.now() - rv) < 60000) return;
          if (!existing) STATE.completions[v.missionId] = { status: 'pending', date: v.submittedAt ? v.submittedAt.slice(0,10) : today() };
        }
      });
      Object.keys(STATE.recentlyValidated).forEach(mId => { if (Date.now() - STATE.recentlyValidated[mId] > 60000) delete STATE.recentlyValidated[mId]; });
    }
    if (d.rewards?.length) STATE.rewards = d.rewards.map(r => ({ ...r, cost: Number(r.cost) || 0, available: r.available === true || r.available === 'TRUE' }));
    if (d.badges) STATE.unlockedBadges = Array.isArray(d.badges) ? d.badges : [];
    if (d.history) {
      STATE.history = Array.isArray(d.history) ? d.history : [];
      const rewardTitles = new Set(
        STATE.history.filter(h => h.title && h.title.startsWith('Récompense : ')).map(h => h.title.replace('Récompense : ', ''))
      );
      STATE.obtainedRewards = STATE.rewards.filter(r => rewardTitles.has(r.title)).map(r => r.id);
    }
    if (d.settings?.pin) STATE.pin = String(d.settings.pin); else STATE.pin = STATE.pin || '1234';
    saveCache(); renderAll();
    updateSyncStatus('✅ Synchronisé à ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    STATE.syncing = false;
    return true;
  } catch(e) { updateSyncStatus('⚠️ Erreur : ' + e.message); STATE.syncing = false; return false; }
}
function updateSyncStatus(msg) { const el = $('#sync-status'); if (el) el.textContent = msg; }
function startAutoSync() {
  // Priorité : 1) config.js (fichier déployé) 2) localStorage (saisi dans l'app)
  const configUrl = (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.API_URL) ? APP_CONFIG.API_URL : null;
  const cfg = getConfig();
  const apiUrl = configUrl || (cfg && cfg.apiUrl) || '';
  if (apiUrl) {
    API.setApiUrl(apiUrl);
    // Met aussi à jour le localStorage pour cohérence
    if (cfg) { cfg.apiUrl = apiUrl; saveConfig(cfg); }
    syncFromSheets().then(() => {
      setTimeout(() => checkAbsenceNews(), 500);
    }).catch(() => {});
  }
  STATE.syncInterval = setInterval(() => {
    if (API.getApiUrl() && document.visibilityState !== 'hidden' && !STATE.syncBlocked) syncFromSheets();
  }, 60000);
}

const APP_VERSION = 'v1.0';

/* ══════════════════════════════════════════════════════════════
   SETUP SCREEN  (premier lancement)
══════════════════════════════════════════════════════════════ */
function showSetupScreen() {
  const setup = document.getElementById('setup-screen');
  if (setup) setup.classList.remove('hidden');
}
function hideSetupScreen() {
  const setup = document.getElementById('setup-screen');
  if (setup) setup.classList.add('hidden');
}

let setupStep = 1;
function initSetupScreen() {
  const btnFinish = document.getElementById('setup-finish-btn');
  if (btnFinish) btnFinish.addEventListener('click', () => {
    const name   = document.getElementById('setup-child-name')?.value.trim();
    const gender = document.querySelector('input[name="setup-gender"]:checked')?.value;
    if (!name)   { showToast('Entre un prénom !', 'error'); return; }
    if (!gender) { showToast('Choisis un genre !', 'error'); return; }
    // L'URL vient de config.js uniquement
    const apiUrl = (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.API_URL) ? APP_CONFIG.API_URL : '';
    const cfg = { childName: name, gender, apiUrl };
    saveConfig(cfg);
    if (apiUrl) API.setApiUrl(apiUrl);
    STATE.user.name = name;
    STATE.user.id   = 'child';
    hideSetupScreen();
    hideSplash();
    startAutoSync();
  });
}

/* ══════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════ */
function initApp() {
  loadLocal(); loadCache();
  // Charge le nom depuis la config locale si pas encore synced depuis Sheets
  const cfg = getConfig();
  if (cfg && cfg.childName && !STATE.user.name) STATE.user.name = cfg.childName;
  if (cfg && cfg.apiUrl) API.setApiUrl(cfg.apiUrl);
  applyTheme(); renderAll(); bindEvents(); initPWA(); initSetupScreen();

  const versionEl = document.getElementById('splash-version');
  if (versionEl) versionEl.textContent = APP_VERSION;

  // Correction streak (one-time fix)
  const streakFixKey = 'summer_streak_fix_v1';
  if (!localStorage.getItem(streakFixKey)) {
    STATE.user.streak = Math.max(STATE.user.streak, 0);
    STATE.user.lastActiveDate = today();
    localStorage.setItem(streakFixKey, '1');
    saveCache();
    API.updateUser(STATE.user.id, { streak: STATE.user.streak, lastActiveDate: STATE.user.lastActiveDate }).finally(() => {
      afterInit();
    });
  } else {
    afterInit();
  }
}

function afterInit() {
  // Charge l'URL depuis config.js en priorité
  const configUrl = (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.API_URL) ? APP_CONFIG.API_URL : null;
  console.log('[CONFIG] APP_CONFIG:', typeof APP_CONFIG !== 'undefined' ? APP_CONFIG : 'NON CHARGÉ ⚠️');
  console.log('[CONFIG] URL depuis config.js:', configUrl || 'VIDE');
  console.log('[CONFIG] URL depuis localStorage:', (getConfig() && getConfig().apiUrl) || 'VIDE');
  if (configUrl) API.setApiUrl(configUrl);

  if (!isConfigured()) {
    // Pas encore configuré → affiche l'écran setup
    // Si config.js a l'URL, on saute l'étape 2 du setup (pré-remplie)
    const splash = document.getElementById('splash-screen');
    if (splash) splash.classList.add('hidden');
    showSetupScreen();
  } else {
    const cfg = getConfig();
    const apiUrl = configUrl || (cfg && cfg.apiUrl) || '';
    if (apiUrl) API.setApiUrl(apiUrl);
    if (!STATE.missions.length && API.getApiUrl()) {
      syncFromSheets().finally(() => hideSplash());
      setTimeout(hideSplash, 6000);
    } else {
      setTimeout(hideSplash, 2000);
      startAutoSync();
    }
  }
}

function hideSplash() {
  const splash = $('#splash-screen');
  if (!splash || splash.classList.contains('hidden')) return;
  splash.classList.add('fade-out');
  setTimeout(() => {
    splash.classList.add('hidden');
    $('#app').classList.remove('hidden');
    startAutoSync();
  }, 600);
}

/* ══════════════════════════════════════════════════════════════
   RENDER
══════════════════════════════════════════════════════════════ */
function renderAll() {
  renderHero(); renderHomePage(); renderMissionsPage(); renderQuetesPage();
  renderBadgesPage(); renderRewardsPage();
  if (STATE.parentsAuth) { renderAdminMissions(); renderAdminQuetes(); renderAdminRewards(); renderAdminValidations(); renderAdminHistory(); }
}

function renderHero() {
  const u = STATE.user; const info = getXpProgress(u.xp); const lvl = info.lvl;
  const displayName = u.name || getChildName();
  $('#avatar-emoji').textContent = lvl.emoji;
  $('#hero-name').textContent = displayName;
  $('#hero-title').textContent = lvl.name;
  $('#home-level-badge').textContent = 'Niv. ' + lvl.level;
  $('#xp-bar').style.width = info.progress + '%';
  $('#xp-label').textContent = info.current + ' / ' + info.needed + ' XP';
  $('#stat-streak').textContent = u.streak;
  $('#stat-total-xp').textContent = u.totalXp;
  $('#stat-badges').textContent = STATE.unlockedBadges.length;
  $('#stat-missions-done').textContent = u.missionsDone;
  $('#header-xp-value').textContent = u.xp;
}

function renderHomePage() {
  const dailyMissions = STATE.missions.filter(m => m.cat === 'Quotidien' && !m.secret);
  const dailyRemaining = dailyMissions.filter(m => getCompletionStatus(m.id) !== 'done');
  const counter = $('#daily-counter');
  if (counter) {
    counter.textContent = dailyRemaining.length === 0 && dailyMissions.length > 0
      ? '🎉 Toutes les missions du jour sont faites !'
      : dailyRemaining.length + ' mission' + (dailyRemaining.length > 1 ? 's' : '') + ' quotidienne' + (dailyRemaining.length > 1 ? 's' : '') + ' restante' + (dailyRemaining.length > 1 ? 's' : '');
    counter.style.color = dailyRemaining.length === 0 ? 'var(--green)' : 'var(--text-secondary)';
  }
  const todayMissions = STATE.missions
    .filter(m => m.type === 'mission' && (m.freq === 'quotidien' || m.freq === 'unique') && !m.secret && getCompletionStatus(m.id) !== 'done')
    .sort((a, b) => a.xp - b.xp).slice(0, 3);
  const $ml = $('#home-missions-list');
  $ml.innerHTML = todayMissions.length ? todayMissions.map(missionCardHTML).join('') : '<div class="empty-state"><span class="empty-state-icon">🎉</span>Toutes les missions du jour sont faites !</div>';
  bindMissionCards($ml);
  const activeQuetes = STATE.missions.filter(m => m.type === 'quete' && !m.secret && getCompletionStatus(m.id) !== 'done').slice(0, 2);
  const $ql = $('#home-quetes-list');
  $ql.innerHTML = activeQuetes.length ? activeQuetes.map(missionCardHTML).join('') : '<div class="empty-state"><span class="empty-state-icon">🗺️</span>Aucune quête active.</div>';
  bindMissionCards($ql);
  const badges = getBadgesWithStatus();
  $('#home-badges-list').innerHTML = badges.filter(b => b.unlocked).slice(-4).map(badgeMiniHTML).join('') || '<div class="empty-state" style="padding:12px">Accomplis des missions pour gagner des badges !</div>';
  $('#home-rewards-list').innerHTML = STATE.rewards.filter(r => r.available && !(STATE.obtainedRewards||[]).includes(r.id)).slice(0, 3).map(rewardMiniHTML).join('');
}

function renderMissionsPage(filter = 'all') {
  const missions = STATE.missions.filter(m => m.type === 'mission' && !m.secret);
  const filtered = (filter === 'all' ? missions : missions.filter(m => m.cat === filter)).sort((a, b) => a.xp - b.xp);
  const active = filtered.filter(m => getCompletionStatus(m.id) !== 'done');
  const done   = filtered.filter(m => getCompletionStatus(m.id) === 'done');
  const $list = $('#missions-list');
  if (!filtered.length) {
    $list.innerHTML = '<div class="empty-state"><span class="empty-state-icon">🎯</span>Aucune mission ici.</div>';
  } else {
    let html = active.map(missionCardHTML).join('');
    if (done.length > 0) {
      html += '<div class="done-separator"><span>✅ Accomplies</span></div>';
      html += done.map(missionCardHTML).join('');
    }
    $list.innerHTML = html;
  }
  bindMissionCards($list);
}

function renderQuetesPage() {
  const quetes = STATE.missions.filter(m => m.type === 'quete' && !m.secret);
  const active = quetes.filter(m => getCompletionStatus(m.id) !== 'done');
  const done   = quetes.filter(m => getCompletionStatus(m.id) === 'done');
  const $activeList = $('#quetes-active-list');
  $activeList.innerHTML = active.length ? active.map(missionCardHTML).join('') : '<div class="empty-state">Aucune quête active.</div>';
  bindMissionCards($activeList);
  const $doneList = $('#quetes-done-list');
  if (done.length > 0) {
    $doneList.innerHTML = '<div class="done-separator"><span>✅ Accomplies</span></div>' + done.map(missionCardHTML).join('');
  } else {
    $doneList.innerHTML = '';
  }
  bindMissionCards($doneList);
}

function renderBadgesPage() {
  const badges = getBadgesWithStatus();
  const unlocked = badges.filter(b => b.unlocked).length;
  $('#badges-progress-fill').style.width = (badges.length ? (unlocked / badges.length * 100) : 0) + '%';
  $('#badges-progress-label').textContent = unlocked + ' / ' + badges.length + ' débloqués';
  const badgesSorted = [...badges].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    if (a.unlocked && b.unlocked) return new Date(a.unlockedAt || 0) - new Date(b.unlockedAt || 0);
    return (a.xpReward || 0) - (b.xpReward || 0);
  });
  $('#badges-grid').innerHTML = badgesSorted.map(b =>
    '<div class="badge-card ' + (b.unlocked ? 'unlocked' : 'locked') + '">' +
    '<span class="badge-icon">' + b.icon + '</span>' +
    '<div class="badge-name">' + b.name + '</div>' +
    '<div class="badge-desc">' + (b.unlocked ? '✅ ' + (b.unlockedAt ? formatDate(b.unlockedAt) : 'Débloqué') : b.desc) + '</div>' +
    '<div class="badge-xp ' + (b.unlocked ? 'earned' : '') + '">+' + (b.xpReward || 0) + ' XP</div>' +
    '</div>'
  ).join('');
  const trophees = STATE.missions.filter(m => m.type === 'quete' && !m.secret && getCompletionStatus(m.id) === 'done');
  const trophSection = $('#trophees-section');
  if (trophSection) {
    trophSection.style.display = trophees.length ? 'block' : 'none';
    $('#trophees-list').innerHTML = trophees.map(m =>
      '<div class="history-item"><span class="history-icon">' + (m.icon || '🏅') + '</span>' +
      '<div class="history-body"><div class="history-title">' + m.title + '</div>' +
      '<div class="history-date">' + (STATE.completions[m.id]?.date ? formatDate(STATE.completions[m.id].date) : '') + '</div></div>' +
      '<div class="history-xp">+' + m.xp + ' XP</div></div>'
    ).join('');
  }
}

function renderRewardsPage() {
  $('#balance-xp').textContent = STATE.user.xp + ' XP';
  const obtained = STATE.obtainedRewards || [];
  const available = STATE.rewards.filter(r => r.available && !obtained.includes(r.id)).sort((a, b) => a.cost - b.cost);
  const done = STATE.rewards.filter(r => r.available && obtained.includes(r.id)).sort((a, b) => a.cost - b.cost);
  let html = available.map(rewardCardHTML).join('');
  if (done.length > 0) {
    html += '<div class="rewards-separator"><span>✅ Déjà obtenues</span></div>';
    html += done.map(rewardCardObtainedHTML).join('');
  }
  $('#rewards-list').innerHTML = html;
  bindRewardCards($('#rewards-list'));
}

function renderAdminMissions() {
  const missions = STATE.missions.filter(m => m.type === 'mission');
  $('#admin-missions-list').innerHTML = missions.length ? missions.map(adminItemHTML).join('') : '<div class="empty-state">Aucune mission.</div>';
}
function renderAdminQuetes() {
  const quetes = STATE.missions.filter(m => m.type === 'quete');
  $('#admin-quetes-list').innerHTML = quetes.length ? quetes.map(adminItemHTML).join('') : '<div class="empty-state">Aucune quête.</div>';
}
function renderAdminValidations() {
  const $list = $('#admin-validations-list');
  $list.innerHTML = STATE.validations.length
    ? STATE.validations.map(v =>
      '<div class="validation-item"><div class="validation-header"><div class="validation-title">' + (v.missionTitle || v.missionId) + '</div>' +
      '<div class="validation-date">' + (v.submittedAt ? formatDate(v.submittedAt) : '') + '</div></div>' +
      '<div class="validation-btns"><button class="btn-approve" onclick="doValidate(\'' + v.id + '\', true)">✅ Valider</button>' +
      '<button class="btn-refuse" onclick="doValidate(\'' + v.id + '\', false)">❌ Refuser</button></div></div>'
    ).join('')
    : '<div class="empty-state">Aucune mission en attente. 🎉</div>';
}
function renderAdminRewards() {
  $('#admin-rewards-list').innerHTML = STATE.rewards.map(r =>
    '<div class="admin-item"><span style="font-size:1.4rem">' + r.icon + '</span>' +
    '<div class="admin-item-info"><div class="admin-item-title">' + r.title + '</div>' +
    '<div class="admin-item-meta">' + r.cost + ' XP · ' + (r.desc || '') + '</div></div>' +
    '<div class="admin-item-btns"><button class="btn-icon" onclick="openEditReward(\'' + r.id + '\')">✏️</button>' +
    '<button class="btn-danger" onclick="doDeleteReward(\'' + r.id + '\')">🗑️</button></div></div>'
  ).join('');
}
function renderAdminHistory() {
  const $list = $('#admin-history-list');
  if (!STATE.history.length) { $list.innerHTML = '<div class="empty-state">Aucun historique.</div>'; return; }
  $list.innerHTML = STATE.history.map(h =>
    '<div class="history-item"><span class="history-icon">' + (h.icon || '📌') + '</span>' +
    '<div class="history-body"><div class="history-title">' + (h.title || '') + '</div>' +
    '<div class="history-date">' + (h.date ? formatDate(h.date) : '') + '</div></div>' +
    '<div class="history-xp ' + (Number(h.xp) < 0 ? 'malus' : '') + '">' + (Number(h.xp) > 0 ? '+' : '') + (h.xp || 0) + ' XP</div></div>'
  ).join('');
}

/* ══════════════════════════════════════════════════════════════
   CARD HTML
══════════════════════════════════════════════════════════════ */
function missionCardHTML(m) {
  const status = getCompletionStatus(m.id);
  const isDone = status === 'done'; const isPending = status === 'pending'; const isQuete = m.type === 'quete';
  const statusClass = isDone ? 'done' : isPending ? 'pending' : isQuete ? 'quete-card' : '';
  var dueLine = '';
  if (m.due) {
    try {
      const dueDate = new Date(m.due); const todayDate = new Date(); todayDate.setHours(0,0,0,0);
      const diffDays = Math.ceil((dueDate - todayDate) / 86400000);
      const dueStr = diffDays < 0 ? 'Expirée' : diffDays === 0 ? "Aujourd'hui !" : diffDays === 1 ? 'Demain' : "Jusqu'au " + dueDate.toLocaleDateString('fr-FR', {day:'numeric',month:'short'});
      const dueColor = diffDays <= 1 ? 'var(--red)' : diffDays <= 3 ? 'var(--amber)' : 'var(--text-muted)';
      dueLine = '<span class="mission-due" style="color:' + dueColor + '">📅 ' + dueStr + '</span>';
    } catch(e) {}
  }
  return '<div class="mission-card ' + statusClass + '" data-id="' + m.id + '">' +
    '<div class="mission-icon-wrap"><span>' + (m.icon || '🎯') + '</span></div>' +
    '<div class="mission-body"><div class="mission-title">' + m.title + '</div>' +
    (m.desc ? '<div class="mission-desc">' + m.desc + '</div>' : '') +
    '<div class="mission-meta"><span class="mission-tag ' + (isQuete ? 'quete-tag' : '') + '">' + (isQuete ? '🗺️ Quête' : m.cat) + '</span>' +
    (m.freq === 'quotidien' ? '<span class="mission-tag">🔁</span>' : m.freq === 'hebdo' ? '<span class="mission-tag">📆</span>' : '') +
    '<span class="mission-xp">+' + m.xp + ' XP</span>' + dueLine + '</div></div>' +
    '<div class="mission-action"><button class="complete-btn ' + (isDone ? 'done-btn' : isPending ? 'pending-btn' : '') + '" data-id="' + m.id + '" ' + (isDone || isPending ? 'disabled' : '') + '>' +
    (isDone ? '✓' : isPending ? '⏳' : '○') + '</button></div></div>';
}
function adminItemHTML(m) {
  const typeLabel = m.type === 'quete' ? '🗺️ Quête' : '🎯 Mission';
  return '<div class="admin-item"><span style="font-size:1.3rem">' + (m.icon || '🎯') + '</span>' +
    '<div class="admin-item-info"><div class="admin-item-title">' + m.title + '</div>' +
    '<div class="admin-item-meta">' + typeLabel + ' · ' + m.xp + ' XP · ' + m.freq + (m.secret ? ' · 🔒' : '') + (m.due ? ' · 📅 ' + formatDate(m.due) : '') + '</div></div>' +
    '<div class="admin-item-btns"><button class="btn-icon" onclick="openEditMission(\'' + m.id + '\')">✏️</button>' +
    '<button class="btn-danger" onclick="doDeleteMission(\'' + m.id + '\')">🗑️</button></div></div>';
}
function badgeMiniHTML(b) {
  return '<div class="badge-card-mini ' + (b.unlocked ? 'unlocked' : 'locked') + '"><span class="badge-icon">' + b.icon + '</span><div class="badge-name">' + b.name + '</div></div>';
}
function rewardCardHTML(r) {
  const can = STATE.user.xp >= r.cost;
  return '<div class="reward-card"><div class="reward-icon-wrap">' + (r.icon || '🎁') + '</div>' +
    '<div class="reward-body"><div class="reward-title">' + r.title + '</div><div class="reward-desc">' + (r.desc || '') + '</div>' +
    '<div class="reward-cost">⚡ ' + r.cost + ' XP</div></div>' +
    '<button class="reward-buy-btn" data-id="' + r.id + '" ' + (can ? '' : 'disabled') + '>' + (can ? 'Obtenir' : 'Il manque ' + (r.cost - STATE.user.xp) + ' XP') + '</button></div>';
}
function rewardCardObtainedHTML(r) {
  return '<div class="reward-card reward-obtained"><div class="reward-icon-wrap">' + (r.icon || '🎁') + '</div>' +
    '<div class="reward-body"><div class="reward-title">' + r.title + '</div><div class="reward-desc">' + (r.desc || '') + '</div>' +
    '<div class="reward-cost">⚡ ' + r.cost + ' XP</div></div><div class="reward-check">✅</div></div>';
}
function rewardMiniHTML(r) {
  return '<div class="reward-card-mini"><div class="reward-icon-wrap">' + (r.icon || '🎁') + '</div><div class="reward-title">' + r.title + '</div><div class="reward-cost">⚡ ' + r.cost + '</div></div>';
}

/* ══════════════════════════════════════════════════════════════
   MISSIONS LOGIC
══════════════════════════════════════════════════════════════ */
function completeMission(id) {
  const mission = STATE.missions.find(m => m.id === id); if (!mission) return;
  const status = getCompletionStatus(id);
  if (status === 'done' || status === 'pending') return;
  if (mission.validation) {
    STATE.completions[id] = { status: 'pending', date: today() };
    STATE.validations.push({ id: uid(), userId: STATE.user.id, missionId: id, missionTitle: mission.title, xp: mission.xp, submittedAt: new Date().toISOString(), status: 'pending' });
    showToast('En attente de validation parentale ⏳', 'info');
    saveCache(); renderAll();
    API.submitValidation(STATE.user.id, id, mission.title, mission.xp).catch(() => {});
  } else {
    awardMission(id, mission);
  }
}

function awardMission(id, mission) {
  const prevLevel = STATE.user.level;
  STATE.completions[id] = { status: 'done', date: today() };
  STATE.user.xp += mission.xp; STATE.user.totalXp += mission.xp;
  if (mission.type === 'quete') STATE.user.quetesDone++; else STATE.user.missionsDone++;
  const t = today();

  // Streak : uniquement missions quotidiennes
  const dailyDoneToday = STATE.missions.filter(m =>
    m.freq === 'quotidien' && !m.secret &&
    STATE.completions[m.id]?.status === 'done' &&
    STATE.completions[m.id]?.date === t
  ).length;

  const STREAK_MIN_MISSIONS = 3;
  if (dailyDoneToday >= STREAK_MIN_MISSIONS) {
    if (STATE.user.lastActiveDate !== t) {
      const last = STATE.user.lastActiveDate;
      const diff = last ? Math.floor((new Date(t) - new Date(last)) / 86400000) : 0;
      STATE.user.streak = diff === 1 ? STATE.user.streak + 1 : diff === 0 ? STATE.user.streak : 1;
      STATE.user.lastActiveDate = t;
    }
  }
  const newLvl = getLevelInfo(STATE.user.xp);
  STATE.user.level = newLvl.level;
  saveCache(); renderAll(); showSuccessModal(mission);
  checkAndUnlockBadges();
  if (newLvl.level > prevLevel) setTimeout(() => showLevelUpModal(newLvl), 1800);
  API.saveCompletion(STATE.user.id, id, 'done', t).catch(() => {});
  API.addPoints(STATE.user.id, mission.xp, 'Mission : ' + mission.title).catch(() => {});
  STATE.syncBlocked = true;
  API.updateUser(STATE.user.id, {
    xp:             STATE.user.xp,
    totalXp:        STATE.user.totalXp,
    streak:         STATE.user.streak,
    lastActiveDate: STATE.user.lastActiveDate,
    level:          STATE.user.level,
    missionsDone:   STATE.user.missionsDone,
    quetesDone:     STATE.user.quetesDone,
  }).then(() => { STATE.syncBlocked = false; }).catch(() => { STATE.syncBlocked = false; });
}

function checkAndUnlockBadges() {
  const u = STATE.user;
  const doneMissions = STATE.missions.filter(m => getCompletionStatus(m.id) === 'done');
  const levelInfo = getLevelInfo(u.xp);
  const alreadyUnlocked = STATE.unlockedBadges.map(b => b.badgeId);
  const newBadges = [];
  ALL_BADGES.forEach(b => {
    if (alreadyUnlocked.includes(b.id)) return;
    const c = b.condition; let earned = false;
    switch (c.type) {
      case 'missions_total': earned = u.missionsDone >= c.value; break;
      case 'quetes_total':   earned = u.quetesDone >= c.value; break;
      case 'streak':         earned = u.streak >= c.value; break;
      case 'total_xp':       earned = u.totalXp >= c.value; break;
      case 'level':          earned = levelInfo.level >= c.value; break;
      case 'cat_missions':   earned = doneMissions.filter(m => m.cat === c.cat).length >= c.value; break;
    }
    if (earned) {
      const unlockedAt = new Date().toISOString();
      STATE.unlockedBadges.push({ badgeId: b.id, unlockedAt });
      newBadges.push({ ...b, unlockedAt });
      if (b.xpReward && b.xpReward > 0) {
        STATE.user.xp += b.xpReward; STATE.user.totalXp += b.xpReward;
        STATE.user.level = getLevelInfo(STATE.user.xp).level;
      }
      API.unlockBadge(STATE.user.id, b.id).catch(() => {});
    }
  });
  if (newBadges.length) {
    saveCache(); renderAll();
    const totalBadgeXp = newBadges.reduce((sum, b) => sum + (b.xpReward || 0), 0);
    if (totalBadgeXp > 0) {
      API.updateUser(STATE.user.id, { xp: STATE.user.xp, totalXp: STATE.user.totalXp, level: STATE.user.level }).catch(() => {});
    }
    setTimeout(() => showBadgeModal(newBadges[0]), 1500);
  }
}

window.doValidate = async function(validationId, approved) {
  showToast(approved ? 'Validation en cours...' : 'Refus en cours...', 'info');
  const validation = STATE.validations.find(v => v.id === validationId);
  const result = await API.validateMission(validationId, approved, '', 0);
  if (result.ok) {
    if (validation) {
      if (approved) {
        STATE.completions[validation.missionId] = { status: 'done', date: today() };
        if (!STATE.recentlyValidated) STATE.recentlyValidated = {};
        STATE.recentlyValidated[validation.missionId] = Date.now();
        const mission = STATE.missions.find(m => m.id === validation.missionId);
        if (mission) {
          STATE.user.xp += mission.xp; STATE.user.totalXp += mission.xp; STATE.user.missionsDone++;
          const newLvl = getLevelInfo(STATE.user.xp); const prevLevel = STATE.user.level;
          STATE.user.level = newLvl.level;
          if (newLvl.level > prevLevel) setTimeout(() => showLevelUpModal(newLvl), 500);
        }
      } else { delete STATE.completions[validation.missionId]; }
      STATE.validations = STATE.validations.filter(v => v.id !== validationId);
    }
    saveCache(); renderAll();
    showToast(approved ? 'Mission validée ! ✅' : 'Mission refusée.', approved ? 'success' : 'error');
    STATE.syncBlocked = true;
    setTimeout(() => { STATE.syncBlocked = false; syncFromSheets(); }, 15000);
  } else { showToast('Erreur : ' + (result.error || 'Inconnue'), 'error'); }
};

function buyReward(id) {
  const reward = STATE.rewards.find(r => r.id === id); if (!reward) return;
  if (STATE.user.xp < reward.cost) { showToast('Pas assez de XP !', 'error'); return; }
  showConfirmModal('🎁', 'Obtenir "' + reward.title + '" ?', 'Coût : ' + reward.cost + ' XP. Il te restera ' + (STATE.user.xp - reward.cost) + ' XP.', async () => {
    STATE.user.xp -= reward.cost;
    if (!STATE.obtainedRewards) STATE.obtainedRewards = [];
    STATE.obtainedRewards.push(id);
    saveCache(); renderAll();
    showToast('Profite bien de "' + reward.title + '" ! 🎉', 'success', 4000);
    const result = await API.redeemReward(STATE.user.id, id);
    if (!result.ok) {
      STATE.user.xp += reward.cost;
      STATE.obtainedRewards = STATE.obtainedRewards.filter(rid => rid !== id);
      saveCache(); renderAll(); showToast('Erreur.', 'error');
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   ADMIN FORMS
══════════════════════════════════════════════════════════════ */
let editingMissionId = null;
function openMissionForm(id = null, defaultType = 'mission') {
  editingMissionId = id; $('#mission-form').reset();
  if (id) {
    const m = STATE.missions.find(ms => ms.id === id); if (!m) return;
    $('#mission-form-title').textContent = 'Modifier';
    $('#mission-icon-input').value = m.icon || '🎯';
    $('#mission-title-input').value = m.title;
    $('#mission-desc-input').value = m.desc || '';
    $('#mission-type-input').value = m.type || 'mission';
    $('#mission-cat-input').value = m.cat;
    $('#mission-points-input').value = m.xp;
    $('#mission-freq-input').value = m.freq || 'unique';
    $('#mission-due-input').value = m.due || '';
    $('#mission-validation-input').checked = m.validation || false;
  } else {
    $('#mission-form-title').textContent = defaultType === 'quete' ? 'Nouvelle quête' : 'Nouvelle mission';
    $('#mission-type-input').value = defaultType;
    $('#mission-icon-input').value = defaultType === 'quete' ? '🗺️' : '🎯';
  }
  $('#mission-form-modal').classList.remove('hidden');
}
window.openEditMission = openMissionForm;
async function handleMissionFormSubmit(e) {
  e.preventDefault();
  const mission = {
    id: editingMissionId || uid(),
    icon: $('#mission-icon-input').value.trim() || '🎯',
    title: $('#mission-title-input').value.trim(),
    desc: $('#mission-desc-input').value.trim(),
    type: $('#mission-type-input').value,
    cat: $('#mission-cat-input').value,
    xp: parseInt($('#mission-points-input').value) || 20,
    freq: $('#mission-freq-input').value,
    due: $('#mission-due-input').value || '',
    validation: $('#mission-validation-input').checked,
    secret: false,
    createdAt: new Date().toISOString(),
  };

  // 1. Mise à jour locale immédiate (optimistic update)
  if (editingMissionId) {
    const idx = STATE.missions.findIndex(m => m.id === editingMissionId);
    if (idx !== -1) STATE.missions[idx] = mission;
  } else {
    STATE.missions.push(mission);
  }
  saveCache(); renderAll();
  $('#mission-form-modal').classList.add('hidden');
  editingMissionId = null;
  showToast(mission.type === 'quete' ? 'Quête créée ! 🗺️' : 'Mission créée ! 🎯', 'success');

  // 2. Envoi vers Sheets
  STATE.syncBlocked = true;
  const result = editingMissionId
    ? await API.updateMission(mission.id, mission)
    : await API.createMission(mission);

  if (result.ok === false) {
    showToast('⚠️ Erreur envoi Sheets : ' + (result.error || 'Inconnue'), 'error', 5000);
  }

  // 3. Resync après 4s pour laisser Sheets écrire
  setTimeout(async () => {
    STATE.syncBlocked = false;
    await syncFromSheets();
  }, 4000);
}
window.doDeleteMission = function(id) {
  showConfirmModal('🗑️', 'Supprimer ?', 'Cette action est irréversible.', async () => {
    // Suppression locale immédiate
    STATE.missions = STATE.missions.filter(m => m.id !== id);
    saveCache(); renderAll();
    showToast('Supprimé.', 'info');
    STATE.syncBlocked = true;
    await API.deleteMission(id);
    setTimeout(async () => { STATE.syncBlocked = false; await syncFromSheets(); }, 4000);
  });
};

let editingRewardId = null;
function openRewardForm(id = null) {
  editingRewardId = id; $('#reward-form').reset();
  if (id) {
    const r = STATE.rewards.find(rw => rw.id === id); if (!r) return;
    $('#reward-form-title').textContent = 'Modifier';
    $('#reward-icon-input').value = r.icon || '🎁';
    $('#reward-title-input').value = r.title;
    $('#reward-desc-input').value = r.desc || '';
    $('#reward-cost-input').value = r.cost;
    $('#reward-available-input').checked = r.available !== false;
  } else {
    $('#reward-form-title').textContent = 'Nouvelle récompense';
    $('#reward-icon-input').value = '🎁';
  }
  $('#reward-form-modal').classList.remove('hidden');
}
window.openEditReward = openRewardForm;
async function handleRewardFormSubmit(e) {
  e.preventDefault();
  const reward = {
    id: editingRewardId || uid(),
    icon: $('#reward-icon-input').value.trim() || '🎁',
    title: $('#reward-title-input').value.trim(),
    desc: $('#reward-desc-input').value.trim(),
    cost: parseInt($('#reward-cost-input').value) || 100,
    available: $('#reward-available-input').checked
  };

  // 1. Mise à jour locale immédiate
  if (editingRewardId) {
    const idx = STATE.rewards.findIndex(r => r.id === editingRewardId);
    if (idx !== -1) STATE.rewards[idx] = reward;
  } else {
    STATE.rewards.push(reward);
  }
  saveCache(); renderAll();
  $('#reward-form-modal').classList.add('hidden');
  editingRewardId = null;
  showToast(reward.title ? 'Récompense créée ! 🎁' : 'Modifié ✓', 'success');

  // 2. Envoi vers Sheets
  STATE.syncBlocked = true;
  const result = editingRewardId
    ? await API.updateReward(reward.id, reward)
    : await API.createReward(reward);

  if (result.ok === false) {
    showToast('⚠️ Erreur envoi Sheets : ' + (result.error || 'Inconnue'), 'error', 5000);
  }

  // 3. Resync après 4s
  setTimeout(async () => {
    STATE.syncBlocked = false;
    await syncFromSheets();
  }, 4000);
}
window.doDeleteReward = function(id) {
  showConfirmModal('🗑️', 'Supprimer ?', 'Irréversible.', async () => {
    STATE.rewards = STATE.rewards.filter(r => r.id !== id);
    saveCache(); renderAll();
    showToast('Supprimée.', 'info');
    STATE.syncBlocked = true;
    await API.deleteReward(id);
    setTimeout(async () => { STATE.syncBlocked = false; await syncFromSheets(); }, 4000);
  });
};

/* ══════════════════════════════════════════════════════════════
   SETTINGS / PARENTS
══════════════════════════════════════════════════════════════ */
async function saveNewPin() {
  const p = $('#new-pin-input').value.trim();
  if (!/^\d{4}$/.test(p)) { showToast('PIN : 4 chiffres requis.', 'error'); return; }
  STATE.pin = p; saveLocal();
  await API.saveSettings({ pin: p });
  $('#new-pin-input').value = '';
  showToast('PIN mis à jour ✓', 'success');
}

async function giveBonus() {
  const pts    = parseInt($('#bonus-points-input').value) || 0;
  const reason = $('#bonus-reason-input').value.trim() || 'Bonus parental';
  if (pts <= 0) { showToast('Entrez un nombre valide.', 'error'); return; }
  const result = await API.addPoints(STATE.user.id, pts, reason);
  if (result.ok) { showToast('+' + pts + ' XP attribués ! 🌟', 'success'); await syncFromSheets(); }
  else { showToast('Erreur lors de l\'envoi.', 'error'); }
}

async function deductPoints() {
  const pts    = parseInt($('#deduct-points-input').value) || 0;
  const reason = $('#deduct-reason-input').value.trim();
  if (pts <= 0)  { showToast('Entrez un nombre valide.', 'error'); return; }
  if (!reason)   { showToast('La raison est obligatoire.', 'error'); return; }
  showConfirmModal('⚠️', 'Déduire ' + pts + ' XP ?', reason, async () => {
    const result = await API.deductPoints(STATE.user.id, pts, reason);
    if (result.ok) {
      showToast('-' + pts + ' XP déduits.', 'error');
      $('#deduct-points-input').value = '';
      $('#deduct-reason-input').value = '';
      await syncFromSheets();
    }
  });
}

function saveApiUrl() {
  API.setApiUrl($('#api-url-input').value.trim());
  // Met aussi à jour la config locale
  const cfg = getConfig() || {};
  cfg.apiUrl = $('#api-url-input').value.trim();
  saveConfig(cfg);
  showToast('URL enregistrée ✓', 'success');
  if (API.getApiUrl()) syncFromSheets();
}

function saveChildSettings() {
  const name   = $('#child-name-input')?.value.trim();
  const gender = document.querySelector('input[name="child-gender"]:checked')?.value;
  if (!name) { showToast('Prénom requis.', 'error'); return; }
  if (!gender) { showToast('Genre requis.', 'error'); return; }
  const cfg = getConfig() || {};
  cfg.childName = name;
  cfg.gender    = gender;
  saveConfig(cfg);
  STATE.user.name = name;
  // Pousse le nom vers Sheets
  API.updateUser(STATE.user.id, { name }).catch(() => {});
  renderAll();
  showToast('Infos enfant mises à jour ✓', 'success');
}

async function pushAllToSheets() {
  showToast('Envoi complet vers Sheets...', 'info');
  const result = await API.pushAll({ missions: STATE.missions, rewards: STATE.rewards, user: STATE.user, completions: STATE.completions });
  if (result.ok) { showToast('Tout envoyé ! ✅', 'success', 4000); await syncFromSheets(); }
  else { showToast('Erreur.', 'error'); }
}

function clearAppCache() {
  showToast('Nettoyage...', 'info', 1500);
  if ('caches' in window) caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).catch(() => {});
  if ('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister())).catch(() => {});
  setTimeout(() => { window.location.href = window.location.href.split('?')[0] + '?v=' + Date.now(); }, 1500);
}

/* ══════════════════════════════════════════════════════════════
   NAVIGATION & UI
══════════════════════════════════════════════════════════════ */
function navigateTo(tab) {
  STATE.currentTab = tab;
  $$('.page').forEach(p => p.classList.remove('active'));
  $$('.nav-btn').forEach(b => b.classList.remove('active'));
  const pageMap = { home:'home', missions:'missions', quetes:'quetes', badges:'badges', rewards:'rewards', parents:'parents' };
  $('#page-' + (pageMap[tab] || tab))?.classList.add('active');
  $('.nav-btn[data-tab="' + tab + '"]')?.classList.add('active');
  if (tab === 'parents') { STATE.parentsAuth ? showParentsContent() : showParentsLocked(); }
}

let pinBuffer = '';
function openPinModal()  { pinBuffer = ''; updatePinDisplay(); $('#pin-modal').classList.remove('hidden'); $('#pin-error').classList.add('hidden'); }
function closePinModal() { $('#pin-modal').classList.add('hidden'); }
function handlePinDigit(d) { if (pinBuffer.length >= 4) return; pinBuffer += d; updatePinDisplay(); if (pinBuffer.length === 4) setTimeout(verifyPin, 200); }
function handlePinBack() { pinBuffer = pinBuffer.slice(0, -1); updatePinDisplay(); }
function resetPin()      { pinBuffer = ''; updatePinDisplay(); }
function updatePinDisplay() { $$('.pin-dot').forEach((dot, i) => dot.classList.toggle('filled', i < pinBuffer.length)); }
function verifyPin() {
  if (pinBuffer === STATE.pin) { closePinModal(); STATE.parentsAuth = true; showParentsContent(); showToast('Bienvenue 👋', 'success'); }
  else { $('#pin-error').classList.remove('hidden'); resetPin(); setTimeout(() => $('#pin-error')?.classList.add('hidden'), 2000); }
}
function showParentsContent() {
  $('#parents-locked').classList.add('hidden'); $('#parents-content').classList.remove('hidden');
  renderAdminMissions(); renderAdminQuetes(); renderAdminRewards(); renderAdminValidations(); renderAdminHistory();
  // Pré-remplit les champs config enfant
  const cfg = getConfig() || {};
  if ($('#child-name-input')) $('#child-name-input').value = cfg.childName || '';
  const genderRadio = document.querySelector('input[name="child-gender"][value="' + (cfg.gender || 'neutre') + '"]');
  if (genderRadio) genderRadio.checked = true;
  if ($('#api-url-input')) $('#api-url-input').value = API.getApiUrl() || '';
}
function showParentsLocked() { $('#parents-locked').classList.remove('hidden'); $('#parents-content').classList.add('hidden'); }
function logoutParents() { STATE.parentsAuth = false; showParentsLocked(); showToast('Déconnecté.', 'info'); }

function applyTheme() { document.body.className = 'theme-' + STATE.theme; $('#theme-toggle').textContent = STATE.theme === 'dark' ? '☀️' : '🌙'; }
function toggleTheme() { STATE.theme = STATE.theme === 'light' ? 'dark' : 'light'; applyTheme(); saveLocal(); }

/* ══════════════════════════════════════════════════════════════
   BIND EVENTS
══════════════════════════════════════════════════════════════ */
function bindEvents() {
  $$('.nav-btn').forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.tab)));
  $$('.see-all-btn').forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.tab)));
  $$('#missions-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#missions-filter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMissionsPage(btn.dataset.filter);
    });
  });
  $('#refresh-btn')?.addEventListener('click', () => {
    const btn = $('#refresh-btn'); if (btn) btn.style.animation = 'spin 0.6s linear';
    clearAppCache();
  });
  $('#theme-toggle')?.addEventListener('click', toggleTheme);
  $('#open-pin-btn')?.addEventListener('click', openPinModal);
  $('#pin-cancel')?.addEventListener('click', closePinModal);
  $('#parents-logout')?.addEventListener('click', logoutParents);
  $$('.pin-key').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.digit !== undefined) handlePinDigit(btn.dataset.digit);
      else if (btn.dataset.action === 'back') handlePinBack();
      else if (btn.dataset.action === 'clear') resetPin();
    });
  });
  $$('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.admin-tab').forEach(t => t.classList.remove('active'));
      $$('.admin-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      $('#admin-' + tab.dataset.admin)?.classList.add('active');
    });
  });
  $$('.modal-backdrop').forEach(bd => bd.addEventListener('click', closeAllModals));
  $('#success-close')?.addEventListener('click', () => $('#success-modal').classList.add('hidden'));
  $('#badge-modal-close')?.addEventListener('click', () => $('#badge-modal').classList.add('hidden'));
  $('#confirm-cancel')?.addEventListener('click', () => $('#confirm-modal').classList.add('hidden'));
  $('#confirm-ok')?.addEventListener('click', () => { $('#confirm-modal').classList.add('hidden'); confirmCallback?.(); confirmCallback = null; });
  $('#add-mission-btn')?.addEventListener('click', () => openMissionForm(null, 'mission'));
  $('#add-quete-btn')?.addEventListener('click', () => openMissionForm(null, 'quete'));
  $('#mission-form-cancel')?.addEventListener('click', () => $('#mission-form-modal').classList.add('hidden'));
  $('#mission-form')?.addEventListener('submit', handleMissionFormSubmit);
  $('#add-reward-btn')?.addEventListener('click', () => openRewardForm());
  $('#reward-form-cancel')?.addEventListener('click', () => $('#reward-form-modal').classList.add('hidden'));
  $('#reward-form')?.addEventListener('submit', handleRewardFormSubmit);
  $('#save-pin-btn')?.addEventListener('click', saveNewPin);
  $('#give-bonus-btn')?.addEventListener('click', giveBonus);
  $('#deduct-btn')?.addEventListener('click', deductPoints);
  $('#save-child-btn')?.addEventListener('click', saveChildSettings);
  $('#save-api-btn')?.addEventListener('click', saveApiUrl);
  $('#sync-btn')?.addEventListener('click', async () => { showToast('Synchronisation...', 'info'); await syncFromSheets(); });
  $('#push-btn')?.addEventListener('click', pushAllToSheets);
  document.getElementById('clear-cache-btn')?.addEventListener('click', clearAppCache);
  if ($('#api-url-input')) $('#api-url-input').value = API.getApiUrl() || '';
  $$('.emoji-input').forEach(input => input.addEventListener('focus', () => input.select()));
  document.getElementById('absence-close')?.addEventListener('click', () => {
    document.getElementById('absence-modal').classList.add('hidden');
  });
}
function bindMissionCards(ctx) { $$('.complete-btn', ctx).forEach(btn => { btn.addEventListener('click', e => { e.stopPropagation(); completeMission(btn.dataset.id); }); }); }
function bindRewardCards(ctx) { $$('.reward-buy-btn', ctx).forEach(btn => btn.addEventListener('click', () => buyReward(btn.dataset.id))); }

/* ══════════════════════════════════════════════════════════════
   MODALS
══════════════════════════════════════════════════════════════ */
function closeAllModals() { $$('.modal').forEach(m => m.classList.add('hidden')); }
function showSuccessModal(mission) {
  $('#success-emoji').textContent = mission.icon || '⭐';
  $('#success-title').textContent = mission.type === 'quete' ? 'Quête accomplie ! 🗺️' : 'Mission accomplie !';
  $('#success-message').textContent = getCongratsMsg();
  $('#success-points').textContent = '+' + mission.xp + ' XP';
  $('#success-modal').classList.remove('hidden');
  launchConfetti('#confetti-container');
  if (navigator.vibrate) navigator.vibrate([50, 30, 80]);
}
function showLevelUpModal(lvl) {
  const modal = document.getElementById('badge-modal'); if (!modal) return;
  document.getElementById('badge-modal-icon').textContent = lvl.emoji;
  document.getElementById('badge-modal-name').textContent = 'Niveau ' + lvl.level + ' atteint !';
  document.getElementById('badge-modal-desc').textContent = 'Tu es maintenant : ' + lvl.name;
  modal.classList.remove('hidden'); launchConfetti('#badge-confetti');
  if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
}
function showBadgeModal(badge) {
  document.getElementById('badge-modal-icon').textContent = badge.icon;
  document.getElementById('badge-modal-name').textContent = badge.name;
  document.getElementById('badge-modal-desc').textContent = badge.desc + (badge.xpReward ? ' (+' + badge.xpReward + ' XP)' : '');
  document.getElementById('badge-modal').classList.remove('hidden');
  launchConfetti('#badge-confetti');
}
let confirmCallback = null;
function showConfirmModal(icon, title, msg, onConfirm) {
  $('#confirm-icon').textContent = icon; $('#confirm-title').textContent = title;
  $('#confirm-message').textContent = msg; confirmCallback = onConfirm;
  $('#confirm-modal').classList.remove('hidden');
}

function launchConfetti(selector) {
  const container = $(selector); if (!container) return; container.innerHTML = '';
  const colors = ['#6C63FF','#F5A623','#2ECC71','#FF6B9D','#3A9AD9','#A855F7'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div'); p.className = 'confetti-piece';
    p.style.cssText = 'left:' + (Math.random()*100) + '%;top:' + (-10-Math.random()*20) + 'px;background:' + colors[Math.floor(Math.random()*colors.length)] + ';width:' + (4+Math.random()*8) + 'px;height:' + (4+Math.random()*8) + 'px;border-radius:' + (Math.random()>.5?'50%':'2px') + ';animation-duration:' + (1.5+Math.random()*2) + 's;animation-delay:' + (Math.random()*.4) + 's;';
    container.appendChild(p);
  }
  setTimeout(() => { if(container) container.innerHTML = ''; }, 4000);
}

/* ══════════════════════════════════════════════════════════════
   MODAL "PENDANT TON ABSENCE"
══════════════════════════════════════════════════════════════ */
function checkAbsenceNews() {
  const lastSeen = localStorage.getItem('summer_last_seen');
  const now = new Date().toISOString();
  localStorage.setItem('summer_last_seen', now);
  if (!lastSeen) return;
  const news = [];
  const newBadges = STATE.unlockedBadges.filter(b => b.unlockedAt && b.unlockedAt > lastSeen);
  if (newBadges.length > 0) {
    const badgeDetails = newBadges.map(ub => {
      const badge = ALL_BADGES.find(b => b.id === ub.badgeId);
      return badge ? badge.icon + ' ' + badge.name : '🏆 Badge';
    });
    news.push({ section: '🏆 Badges débloqués', items: badgeDetails, color: 'var(--amber)' });
  }
  const recentHistory = STATE.history.filter(h => h.date && h.date > lastSeen);
  const bonusItems = recentHistory.filter(h => h.title && (h.title.startsWith('Bonus') || h.title.startsWith('Malus') || h.title.includes('déduits') || h.title.includes('attribués')));
  if (bonusItems.length > 0) {
    news.push({ section: '⭐ Points', items: bonusItems.map(h => (Number(h.xp) > 0 ? '+' : '') + h.xp + ' XP — ' + h.title), color: 'var(--violet)' });
  }
  const newMissions = STATE.missions.filter(m => m.createdAt && m.createdAt > lastSeen && !m.secret);
  if (newMissions.length > 0) {
    news.push({ section: '🎯 Nouvelles missions', items: newMissions.map(m => (m.icon || '🎯') + ' ' + m.title + ' (+' + m.xp + ' XP)'), color: 'var(--blue)' });
  }
  const doneMissions = recentHistory.filter(h => h.title && h.title.startsWith('Mission :'));
  if (doneMissions.length > 0) {
    news.push({ section: '✅ Missions accomplies', items: doneMissions.map(h => h.icon + ' ' + h.title.replace('Mission : ', '') + ' (+' + h.xp + ' XP)'), color: 'var(--green)' });
  }
  if (news.length === 0) return;
  setTimeout(() => showAbsenceModal(news), 2000);
}

function showAbsenceModal(news) {
  const modal = document.getElementById('absence-modal');
  const content = document.getElementById('absence-content');
  if (!modal || !content) return;
  content.innerHTML = news.map(section =>
    '<div class="absence-section">' +
    '<div class="absence-section-title" style="color:' + section.color + '">' + section.section + '</div>' +
    section.items.map(item => '<div class="absence-item">' + item + '</div>').join('') +
    '</div>'
  ).join('');
  modal.classList.remove('hidden');
}

function initPWA() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('service-worker.js').then(reg => {
    reg.update();
    if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing; if (!newSW) return;
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
          newSW.postMessage({ type: 'SKIP_WAITING' });
          navigator.serviceWorker.addEventListener('controllerchange', () => { window.location.reload(); });
        }
      });
    });
  }).catch(() => {});
}

document.addEventListener('DOMContentLoaded', initApp);
