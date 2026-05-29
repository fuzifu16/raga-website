/* ===== RAGA 瑞基 - i18n Switching Engine ===== */
const I18N = {
  currentLang: 'zh',

  getSavedLang() {
    // Priority: URL param > localStorage > default 'zh'
    const urlParams = new URLSearchParams(window.location.search);
    const fromUrl = urlParams.get('lang');
    if (fromUrl === 'en' || fromUrl === 'zh' || fromUrl === 'zh-TW') return fromUrl;
    try {
      const saved = localStorage.getItem('raga_lang');
      if (saved === 'en' || saved === 'zh' || saved === 'zh-TW') return saved;
    } catch(e) {}
    return 'zh';
  },

  init() {
    if (typeof i18nData === 'undefined') return;
    this.currentLang = this.getSavedLang();
    this.applyLanguage();
    this.setupSwitcher();
  },

  t(key) {
    return i18nData[this.currentLang]?.[key];
  },

  applyLanguage() {
    document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : this.currentLang === 'zh-TW' ? 'zh-Hant' : 'en';

    // data-i18n: replace textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = this.t(key);
      if (text !== undefined) el.textContent = text;
    });

    // data-i18n-html: replace innerHTML (for elements with <br> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      const text = this.t(key);
      if (text !== undefined) el.innerHTML = text;
    });

    // data-i18n-placeholder: replace placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const text = this.t(key);
      if (text !== undefined) el.placeholder = text;
    });

    // data-i18n-value: replace value attribute
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
      const key = el.dataset.i18nValue;
      const text = this.t(key);
      if (text !== undefined && el.tagName === 'OPTION' && !el.value) el.textContent = text;
    });

    // Update <title>
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const key = titleEl.dataset.i18n;
      const text = this.t(key);
      if (text !== undefined) document.title = text;
    }

    // Toggle active class on lang switcher
    document.querySelectorAll('.lang-switch a[data-lang]').forEach(el => {
      el.classList.toggle('active', el.dataset.lang === this.currentLang);
    });
  },

  switchLang(lang) {
    if (lang === this.currentLang) return;
    this.currentLang = lang;
    // Save to localStorage (works in Chrome/Edge)
    try { localStorage.setItem('raga_lang', lang); } catch(e) {}
    // Also save to URL param as backup (works in all browsers for file://)
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
    this.applyLanguage();
  },

  setupSwitcher() {
    document.querySelectorAll('.lang-switch a[data-lang]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        this.switchLang(el.dataset.lang);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => I18N.init());
