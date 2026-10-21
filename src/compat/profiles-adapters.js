const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

function originFor(key, item) {
    if (key === 'fang') {
      const rank = String((typeof state !== 'undefined' && state?.ranks?.fang) || (typeof PEOPLE !== 'undefined' && PEOPLE?.fang?.title) || '');
      if (/宫女/.test(rank) && !(typeof state !== 'undefined' && state?.flags?.fangElevated)) {
        return '御花园花房宫女，与阿芙同房当差。她抱花盆走错过门，也会为救受伤的猫把手划破；此时她还没有进入后宫，人物志不会提前替她决定以后。';
      }
    }
    if (key === 'wenheng') {
      const rank = String((typeof state !== 'undefined' && state?.ranks?.wenheng) || (typeof PEOPLE !== 'undefined' && PEOPLE?.wenheng?.title) || '');
      if (!/蘅嫔/.test(rank) && !(typeof state !== 'undefined' && state?.flags?.wenhengInHarem)) {
        return '蘅国旧后、闻人抱朴与闻人含章之母，暂以旧国女眷身份留京。她是否成为大晟妃嫔要由剧情中的御前决定，此时不能按普通宫嫔排列。';
      }
    }
    return item.origin;
  }

function profileHTML(key) {
    const item = PROFILE[key];
    if (!item) return '';
    return `<section class="v135-consort-profile" data-v135-profile="${esc(key)}">
      <p><b>长相</b>${esc(item.appearance)}</p>
      <p><b>性格</b>${esc(item.temperament)}</p>
      <p><b>身世</b>${esc(originFor(key, item))}</p>
    </section>`;
  }

function enrich(root) {
    (root || document).querySelectorAll('.person-card[data-person]').forEach(card => {
      const key = card.dataset.person;
      if (!PROFILE[key] || card.querySelector(':scope .v135-consort-profile')) return;
      const copy = card.querySelector(':scope > div:not(.portrait):not(.v134-porcelain-flip)');
      if (copy) copy.insertAdjacentHTML('beforeend', profileHTML(key));
    });

    const modalRoot = (root || document).querySelector('#modal .modal-person, dialog .modal-person');
    if (modalRoot && !modalRoot.querySelector('.v135-consort-profile')) {
      const key = window.__v134LastModalKey || window.__v135LastModalKey;
      const copy = modalRoot.querySelector(':scope > div:not(.portrait):not(.v134-porcelain-flip)');
      if (copy && PROFILE[key]) copy.insertAdjacentHTML('beforeend', profileHTML(key));
    }
  }

function enrichHTML(html) {
    const box = document.createElement('div');
    box.innerHTML = String(html || '');
    enrich(box);
    return box.innerHTML;
  }

function install() {
    document.documentElement.dataset.build = 'v135-consort-profiles';
    document.title = '宫灯未眠 · 妃嫔长相性格人物志 v135';

    if (typeof window.peopleView === 'function' && !window.peopleView.__v135ConsortProfiles) {
      const previousPeopleView = window.peopleView;
      const wrappedPeopleView = function(...args) {
        return enrichHTML(previousPeopleView.apply(this, args));
      };
      wrappedPeopleView.__v135ConsortProfiles = true;
      wrappedPeopleView.__previousPeopleView = previousPeopleView;
      window.peopleView = wrappedPeopleView;
    }

    if (typeof window.modal === 'function' && !window.modal.__v135ConsortProfiles) {
      const previousModal = window.modal;
      const wrappedModal = function(key, ...args) {
        window.__v135LastModalKey = key;
        const result = previousModal.call(this, key, ...args);
        enrich(document);
        setTimeout(() => enrich(document), 60);
        return result;
      };
      wrappedModal.__v135ConsortProfiles = true;
      wrappedModal.__previousModal = previousModal;
      window.modal = wrappedModal;
    }

    if (typeof window.render === 'function' && !window.render.__v135ConsortProfiles) {
      const previousRender = window.render;
      const wrappedRender = function(...args) {
        const result = previousRender.apply(this, args);
        enrich(document);
        return result;
      };
      wrappedRender.__v135ConsortProfiles = true;
      wrappedRender.__previousRender = previousRender;
      window.render = wrappedRender;
    }

    enrich(document);
  }

window.V135_CONSORT_PROFILES = PROFILE;

install();

window.addEventListener('DOMContentLoaded', install, { once: true });

window.addEventListener('load', () => { install(); enrich(document); });

setTimeout(() => { install(); enrich(document); }, 220);
