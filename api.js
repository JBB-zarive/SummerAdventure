/**
 * api.js – Chloé Aventure v7
 * Sheets = Source unique de vérité
 * Chaque action écrit immédiatement dans Sheets
 */

const API = (() => {
  const API_URL_KEY = 'chloe_api_url';
  const DEFAULT_URL = 'https://script.google.com/macros/s/AKfycbwRZdioao9ygpcse4ouQlG9Fhb4VPzPVreSvSBOdbdWzpxEX0COXUx8iZL0dv-NjKRg/exec';

  function getApiUrl() {
    return localStorage.getItem(API_URL_KEY) || DEFAULT_URL;
  }
  function setApiUrl(url) {
    localStorage.setItem(API_URL_KEY, url);
  }

  async function get(action, params = {}) {
    const url = getApiUrl();
    if (!url) return { ok: false, error: 'API non configurée' };
    try {
      const qs = new URLSearchParams({ action, ...params }).toString();
      const res = await fetch(`${url}?${qs}`, { method: 'GET' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      return { ok: true, data };
    } catch(err) {
      return { ok: false, error: err.message, offline: true };
    }
  }

  async function post(action, payload = {}) {
    const url = getApiUrl();
    if (!url) return { ok: false, error: 'API non configurée' };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action, ...payload })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      return { ok: true, data };
    } catch(err) {
      return { ok: false, error: err.message, offline: true };
    }
  }

  return {
    getApiUrl,
    setApiUrl,

    // ── Sync complète ────────────────────────────────────────
    async getAll(userId) {
      return get('getAll', { userId });
    },

    // ── Missions ─────────────────────────────────────────────
    async createMission(mission) {
      return post('createMission', { mission });
    },
    async updateMission(id, mission) {
      return post('updateMission', { id, mission });
    },
    async deleteMission(id) {
      return post('deleteMission', { id });
    },

    // ── Completions ───────────────────────────────────────────
    async saveCompletion(userId, missionId, status, date) {
      return post('saveCompletion', { userId, missionId, status, date });
    },
    async deleteCompletion(userId, missionId) {
      return post('deleteCompletion', { userId, missionId });
    },

    // ── Validations ───────────────────────────────────────────
    async submitValidation(userId, missionId, missionTitle, xp) {
      return post('submitValidation', { userId, missionId, missionTitle, xp });
    },
    async validateMission(id, approved, comment, bonus) {
      return post('validateMission', { id, approved, comment, bonus });
    },

    // ── User ──────────────────────────────────────────────────
    async updateUser(userId, data) {
      return post('updateUser', { userId, data });
    },
    async addPoints(userId, points, reason) {
      return post('addPoints', { userId, points, reason });
    },
    async deductPoints(userId, points, reason) {
      return post('deductPoints', { userId, points, reason });
    },

    // ── Badges ────────────────────────────────────────────────
    async unlockBadge(userId, badgeId) {
      return post('unlockBadge', { userId, badgeId });
    },

    // ── Rewards ───────────────────────────────────────────────
    async createReward(reward) {
      return post('createReward', { reward });
    },
    async updateReward(id, reward) {
      return post('updateReward', { id, reward });
    },
    async deleteReward(id) {
      return post('deleteReward', { id });
    },
    async redeemReward(userId, rewardId) {
      return post('redeemReward', { userId, rewardId });
    },

    // ── Settings ──────────────────────────────────────────────
    async saveSettings(settings) {
      return post('saveSettings', { settings });
    },

    // ── Push complet ──────────────────────────────────────────
    async pushAll(data) {
      return post('pushAll', data);
    },
  };
})();
