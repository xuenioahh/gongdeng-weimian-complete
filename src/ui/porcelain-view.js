function portrait138(k){
    const front=personPortrait136(k,false),item=window.__PORCELAIN_PROFILES__?.[k];
    if(state.index<CHAPTERS.length||!item)return front;
    return `<div class="portrait v134-porcelain-flip" data-porcelain-key="${k}" role="button" tabindex="0" aria-pressed="false" aria-label="点击翻转查看${esc136(PEOPLE[k].name)}的人物瓷谱"><div class="v134-flip-inner"><div class="v134-flip-face v134-flip-front">${front}</div><figure class="v134-flip-face v134-flip-back">${ceramic141(k,item)}<figcaption class="v134-flip-caption"><small>人物瓷谱</small><b>${esc136(item.vessel)}</b></figcaption></figure></div></div>`;
  }

function bindFlip138(){
    document.querySelectorAll('[data-porcelain-key]').forEach(el=>{
      const flip=e=>{e.preventDefault();e.stopPropagation();const on=el.classList.toggle('is-flipped');el.setAttribute('aria-pressed',String(on));};
      el.onclick=flip;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')flip(e)};
    });
  }
