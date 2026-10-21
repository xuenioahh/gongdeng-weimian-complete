(function(){
  const PORCELAIN = {"gu":{"name":"顾明宜","vessel":"甜白釉凤尾瓶","note":"器身太整齐，底部仍留一块没有修掉的灰斑。","image":"assets/asset-017.webp"},"shen":{"name":"沈知微","vessel":"影青釉旧茶梅瓶","note":"影青近乎透明，旧茶与细线纹像被压住的旧事。","image":"assets/asset-018.webp"},"zhou":{"name":"周清漪","vessel":"月白长颈瓶","note":"月白水纹三次停住，像把话咽回去的瞬间。","image":"assets/asset-019.webp"},"wenheng":{"name":"闻人蘅","vessel":"冷白釉银簪长颈瓶","note":"冷白、细银线与收束的口沿，像把锋利藏在礼法里。","image":"assets/asset-020.webp"},"baopu":{"name":"闻人抱朴","vessel":"胭脂红花觚","note":"最艳的一件，越到底部越空，热闹里有退潮。","image":"assets/asset-021.webp"},"hanzhang":{"name":"闻人含章","vessel":"鸦青釉棋纹长瓶","note":"深青近黑，棋路与细碎断点藏在釉色里。","image":"assets/asset-022.webp"},"ning":{"name":"邵明贞","vessel":"青黛釉方肩瓶","note":"方肩端稳，暗纹像被反复改写过的中宫方向。","image":"assets/asset-023.webp"},"zhangyuanzhao":{"name":"张元照","vessel":"青白釉琮式瓶","note":"写错的一行永远留在那里，旁边重新作答。","image":"assets/asset-024.webp"},"fang":{"name":"方小满","vessel":"豆青釉小苹果尊","note":"圆圆小器，猫爪、杏仁花与歪针脚都还带着日常气。","image":"assets/asset-025.webp"},"ke":{"name":"霍素英","vessel":"铁锈釉箭筒瓶","note":"直挺如箭筒，北地铁锈色里留着风沙与锋芒。","image":"assets/asset-026.webp"},"hui":{"name":"崔静仪","vessel":"粉白釉折枝盖罐","note":"粉白折枝纹不抢眼，细看才见被压下去的锋利。","image":"assets/asset-027.webp"},"daila":{"name":"黛拉","vessel":"松石绿描金双耳壶","note":"松石绿、葡萄叶与细锁链纹，壶嘴略扬像在笑。","image":"assets/asset-028.webp"},"afu":{"name":"阿芙","vessel":"粗白釉提梁小壶","note":"米白粗瓷、烟灰和钥匙纹，壶把被摸得发亮。","image":"assets/asset-029.webp"},"xulingyi":{"name":"许令宜","vessel":"白釉朱线卷口瓶","note":"瓶口像卷起的纸页，背面留着被抽走的一页空框。","image":"assets/asset-030.webp"}};
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
})();
