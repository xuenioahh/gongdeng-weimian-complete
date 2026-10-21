window.__PORCELAIN_PROFILES__ = PORCELAIN;

document.documentElement.dataset.build = 'v133-porcelain-profile';

if (document.title && !document.title.includes('人物瓷谱')) document.title = document.title + ' · 人物瓷谱';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function block(key, inModal) {
    const item = PORCELAIN[key];
    if (!item) return '';
    return `<figure class="v133-porcelain-profile${inModal ? ' is-modal' : ''}" data-porcelain-key="${esc(key)}">
      <img src="${item.image}" alt="${esc(item.name)}瓷器形象" loading="lazy" decoding="async">
      <figcaption>
        <span class="v133-porcelain-eyebrow">人物瓷谱</span>
        <p class="v133-porcelain-title">${esc(item.name)}｜${esc(item.vessel)}</p>
        <p class="v133-porcelain-note">${esc(item.note)}</p>
      </figcaption>
    </figure>`;
  }

function injectIntoHTML(html) {
    const box = document.createElement('div');
    box.innerHTML = String(html || '');
    box.querySelectorAll('.person-card[data-person]').forEach(card => {
      const key = card.getAttribute('data-person');
      if (!PORCELAIN[key] || card.querySelector('.v133-porcelain-profile')) return;
      const target = card.querySelector(':scope > div:last-child') || card;
      target.insertAdjacentHTML('beforeend', block(key, false));
    });
    return box.innerHTML;
  }

function decoratePeopleDOM(root) {
    (root || document).querySelectorAll('.person-card[data-person]').forEach(card => {
      const key = card.getAttribute('data-person');
      if (!PORCELAIN[key] || card.querySelector('.v133-porcelain-profile')) return;
      const target = card.querySelector(':scope > div:last-child') || card;
      target.insertAdjacentHTML('beforeend', block(key, false));
    });
  }

function decorateModal(key) {
    if (!PORCELAIN[key]) return;
    const scope = document.querySelector('.modal-person') || document.querySelector('.modal.open') || document.querySelector('dialog[open]') || document;
    if (!scope || scope.querySelector('.v133-porcelain-profile')) return;
    const target = scope.querySelector('.modal-person > div:last-child') || scope.querySelector(':scope > div:last-child') || scope;
    target.insertAdjacentHTML('beforeend', block(key, true));
  }

function bindCards(root) {
    (root || document).querySelectorAll('.person-card[data-person]').forEach(card => {
      if (card.dataset.v133PorcelainBound) return;
      card.dataset.v133PorcelainBound = '1';
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-person');
        if (typeof window.modal === 'function') window.modal(key);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const key = card.getAttribute('data-person');
          if (typeof window.modal === 'function') window.modal(key);
        }
      });
    });
  }

function install() {
    if (typeof window.peopleView === 'function' && !window.peopleView.__v133Porcelain) {
      const previousPeopleView = window.peopleView;
      const wrappedPeopleView = function(...args) {
        return injectIntoHTML(previousPeopleView.apply(this, args));
      };
      wrappedPeopleView.__v133Porcelain = true;
      wrappedPeopleView.__previousPeopleView = previousPeopleView;
      window.peopleView = wrappedPeopleView;
    }

    if (typeof window.modal === 'function' && !window.modal.__v133Porcelain) {
      const previousModal = window.modal;
      const wrappedModal = function(key, ...args) {
        const result = previousModal.call(this, key, ...args);
        setTimeout(() => decorateModal(key), 0);
        return result;
      };
      wrappedModal.__v133Porcelain = true;
      wrappedModal.__previousModal = previousModal;
      window.modal = wrappedModal;
    }

    if (typeof window.render === 'function' && !window.render.__v133Porcelain) {
      const previousRender = window.render;
      const wrappedRender = function(...args) {
        const result = previousRender.apply(this, args);
        decoratePeopleDOM(document);
        bindCards(document);
        return result;
      };
      wrappedRender.__v133Porcelain = true;
      wrappedRender.__previousRender = previousRender;
      window.render = wrappedRender;
    }

    decoratePeopleDOM(document);
    bindCards(document);
  }

install();

window.addEventListener('DOMContentLoaded', install, { once: true });

window.addEventListener('load', () => { install(); decoratePeopleDOM(document); bindCards(document); });

setTimeout(() => { install(); decoratePeopleDOM(document); bindCards(document); }, 150);
