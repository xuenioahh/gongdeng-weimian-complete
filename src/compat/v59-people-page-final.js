(()=>{try{
  const esc59=s=>String(s??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
  function known59(k){
    const p=PEOPLE[k];if(!p||k==='chen')return false;
    if(['emperor','taihou','gu','shen','zhou','peiyan'].includes(k))return true;
    if((p.introducedAt??99)>state.index)return false;
    if(['liang2','song2','xu2'].includes(k)&&state.index>=CHAPTERS.findIndex(c=>c.title==='窗开半扇'))return true;
    if(['cao2','zhao2','lin2','ye2','du2','su2'].includes(k)&&state.flags?.lowConsorts?.includes(k))return true;
    for(let ci=0;ci<=Math.min(state.index,CHAPTERS.length-1);ci++){
      const c=CHAPTERS[ci],n=ci===state.index?(state.chapterStep||0):(c.steps||[]).length-1;
      for(let si=0;si<=n;si++)if(c.steps?.[si]?.cast?.includes(k))return true;
    }
    return false;
  }
  function glimpse59(k){
    const step=CHAPTERS[state.index]?.steps?.[state.chapterStep||0];if(!step)return'';
    let arr=[];try{arr=typeof step.text==='function'?step.text(state):step.text||[];}catch(_e){}
    arr=Array.isArray(arr)?arr:[arr];const names=[PEOPLE[k]?.name,courtTitle(state,k)].filter(Boolean);
    for(const raw of arr){const plain=String(raw).replace(/<[^>]+>/g,'');for(const sentence of plain.match(/[^。！？]+[。！？]?/g)||[]){if(sentence.length<170&&names.some(n=>n&&sentence.includes(n))&&/笑|皱|眉|抬眼|低头|手|指|停|看|望|声音|脸色|袖|坐|站/.test(sentence))return sentence;}}
    return'';
  }
  function info59(k){const p=PEOPLE[k],g=glimpse59(k);return `<span class="rank">${esc59(displayRank(k))}</span><h2>${esc59(p.name)}</h2><p class="meta">${esc59(p.age)} · ${esc59(p.home||'')}</p><div class="tags">${(p.tags||[]).map(t=>`<span>${esc59(t)}</span>`).join('')}</div><p>${esc59(p.bio||'')}</p>${g?`<p class="v52-observation"><small>眼前所见</small>${esc59(g)}</p>`:''}${meters(k)}`;}
  peopleView=function(){const ks=Object.keys(PEOPLE).filter(known59);return `<main class="page"><div class="page-title"><span class="eyebrow">人物录</span><h1>我所认识的人</h1><p>这里只写已经见过的人。人物会被后来的选择改变，但不会提前把未来写在这里。</p></div><div class="people-grid">${ks.map(k=>`<article class="person-card" tabindex="0" data-person="${k}">${portrait(PEOPLE[k])}<div>${info59(k)}</div></article>`).join('')}</div></main>`;};
  modal=function(k){if(!known59(k))return;const d=document.querySelector('#modal');d.innerHTML=`<button class="close" aria-label="关闭人物资料">×</button><div class="modal-person">${portrait(PEOPLE[k])}<div>${info59(k)}</div></div>${WARDROBE?.[k]?wardrobeControls(k):''}`;if(!d.open)d.showModal();d.querySelector('.close').onclick=()=>d.close();d.querySelectorAll('[data-look]').forEach(b=>b.onclick=()=>{if(b.dataset.look==='auto')delete wardrobePrefs[k];else wardrobePrefs[k]=b.dataset.look;try{save()}catch(_e){}d.close();modal(k);});};
  try{render()}catch(_e){}
}catch(e){console.error('v59 people page final failed',e)}})();
