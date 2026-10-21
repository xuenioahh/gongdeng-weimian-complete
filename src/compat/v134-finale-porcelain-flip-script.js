(function(){
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const data = () => window.__PORCELAIN_PROFILES__ || {};
  const isFinale = () => {
    try {
      return typeof state !== 'undefined' && typeof CHAPTERS !== 'undefined' &&
        (((state.index || 0) >= CHAPTERS.length) || !!(state.flags && state.flags.final));
    } catch (_e) { return false; }
  };

  function removeOldPorcelain(root) {
    (root || document).querySelectorAll('.v133-porcelain-profile').forEach(el => el.remove());
  }

  function flipHTML(key, portraitHTML) {
    const item = data()[key];
    if (!item) return portraitHTML;
    return `<div class="portrait v134-porcelain-flip" data-porcelain-key="${esc(key)}" role="button" tabindex="0" aria-label="点击翻转查看${esc(item.name)}的人物瓷谱">
      <div class="v134-flip-inner">
        <div class="v134-flip-face v134-flip-front">${portraitHTML}</div>
        <figure class="v134-flip-face v134-flip-back" aria-label="${esc(item.name)}｜${esc(item.vessel)}">
          <img src="${item.image}" alt="${esc(item.name)}瓷器形象" loading="lazy" decoding="async">
          <figcaption class="v134-flip-caption"><small>人物瓷谱</small><b>${esc(item.name)}｜${esc(item.vessel)}</b></figcaption>
        </figure>
      </div>
    </div>`;
  }

  function decorateCard(card) {
    const key = card && card.getAttribute('data-person');
    if (!key || !data()[key]) return;
    removeOldPorcelain(card);
    if (!isFinale()) return;
    if (card.querySelector(':scope > .v134-porcelain-flip')) return;
    const portrait = card.querySelector(':scope > .portrait');
    if (!portrait) return;
    portrait.outerHTML = flipHTML(key, portrait.outerHTML);
  }

  function decorateModal() {
    removeOldPorcelain(document.querySelector('#modal') || document);
    if (!isFinale()) return;
    const modalRoot = document.querySelector('#modal .modal-person') || document.querySelector('dialog[open] .modal-person');
    if (!modalRoot || modalRoot.querySelector(':scope > .v134-porcelain-flip')) return;
    const key = document.querySelector('#modal .v134-modal-key')?.dataset.person ||
      document.querySelector('#modal [data-person]')?.dataset.person ||
      window.__v134LastModalKey;
    if (!key || !data()[key]) return;
    const portrait = modalRoot.querySelector(':scope > .portrait');
    if (!portrait) return;
    portrait.outerHTML = flipHTML(key, portrait.outerHTML);
  }

  function decorateDOM(root) {
    removeOldPorcelain(root || document);
    (root || document).querySelectorAll('.person-card[data-person]').forEach(decorateCard);
    bindFlips(root || document);
  }

  function decorateHTML(html) {
    const box = document.createElement('div');
    box.innerHTML = String(html || '');
    removeOldPorcelain(box);
    if (isFinale()) {
      const title = box.querySelector('.page-title');
      if (title && !title.querySelector('.v134-finale-note')) {
        title.insertAdjacentHTML('beforeend', '<p class="v134-finale-note">卷终后，人物瓷谱已解锁：点击立绘可翻到瓷器背面。</p>');
      }
      box.querySelectorAll('.person-card[data-person]').forEach(decorateCard);
    }
    return box.innerHTML;
  }

  function bindFlips(root) {
    (root || document).querySelectorAll('.v134-porcelain-flip').forEach(el => {
      if (el.dataset.v134FlipBound) return;
      el.dataset.v134FlipBound = '1';
      const toggle = (event) => {
        event.preventDefault();
        event.stopPropagation();
        el.classList.toggle('is-flipped');
      };
      el.addEventListener('click', toggle);
      el.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') toggle(event);
      });
    });
  }

  function install() {
    document.documentElement.dataset.build = 'v134-finale-porcelain-flip';
    if (document.title && !document.title.includes('结局翻转瓷谱')) document.title = document.title.replace('人物瓷谱', '结局翻转瓷谱');

    if (typeof window.peopleView === 'function' && !window.peopleView.__v134PorcelainFlip) {
      const previousPeopleView = window.peopleView;
      const wrappedPeopleView = function(...args) {
        return decorateHTML(previousPeopleView.apply(this, args));
      };
      wrappedPeopleView.__v134PorcelainFlip = true;
      wrappedPeopleView.__previousPeopleView = previousPeopleView;
      window.peopleView = wrappedPeopleView;
    }

    if (typeof window.modal === 'function' && !window.modal.__v134PorcelainFlip) {
      const previousModal = window.modal;
      const wrappedModal = function(key, ...args) {
        window.__v134LastModalKey = key;
        const result = previousModal.call(this, key, ...args);
        setTimeout(() => { decorateModal(); bindFlips(document); }, 30);
        return result;
      };
      wrappedModal.__v134PorcelainFlip = true;
      wrappedModal.__previousModal = previousModal;
      window.modal = wrappedModal;
    }

    if (typeof window.render === 'function' && !window.render.__v134PorcelainFlip) {
      const previousRender = window.render;
      const wrappedRender = function(...args) {
        const result = previousRender.apply(this, args);
        decorateDOM(document);
        return result;
      };
      wrappedRender.__v134PorcelainFlip = true;
      wrappedRender.__previousRender = previousRender;
      window.render = wrappedRender;
    }

    decorateDOM(document);
  }

  install();
  window.addEventListener('DOMContentLoaded', install, { once: true });
  window.addEventListener('load', () => { install(); decorateDOM(document); });
  setTimeout(() => { install(); decorateDOM(document); }, 180);
})();
