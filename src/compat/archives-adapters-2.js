function known(k){if(!PEOPLE[k]||k==='chen')return false;if(['emperor','taihou','gu','shen','zhou','peiyan'].includes(k))return true;
 if((PEOPLE[k].introducedAt??99)>state.index)return false;
 for(let ci=0;ci<=Math.min(state.index,CHAPTERS.length-1);ci++){const c=CHAPTERS[ci];const n=ci===state.index?(state.chapterStep||0):c.steps.length-1;for(let si=0;si<=n;si++)if(c.steps[si]?.cast?.includes(k))return true;}
 return ['cao2','zhao2','lin2','ye2','du2','su2'].includes(k)&&state.flags.lowConsorts?.includes(k);
}

const observable=/笑|抿|皱|眉|抬眼|垂眼|低头|眼眶|望|看着|手指|指尖|握|攥|攥紧|停顿|吸气|颤|脸色|唇|拢|袖口/;

function currentLines(){const step=CHAPTERS[state.index]?.steps?.[state.chapterStep||0];if(!step)return[];try{return step.text(state)||[];}catch{return[];}}

function glimpse(k,lines=currentLines()){
 const names=[PEOPLE[k]?.name,courtTitle(state,k)].filter(x=>x&&x.length>1&&!/待选|待封/.test(x));
 for(const line of lines){const plain=String(line).replace(/<[^>]*>/g,'');for(const sentence of plain.match(/[^。！？]+[。！？]?/g)||[]){if(sentence.length<180&&names.some(n=>sentence.includes(n))&&observable.test(sentence))return sentence;}}
 return '';
}

function info(k){return `<span class="rank">${esc(displayRank(k))}</span><h2>${esc(PEOPLE[k].name)}</h2><p class="meta">${esc(PEOPLE[k].age)}</p><p>${esc(BIOS[k]||'我已见过此人，尚未有更多交谈。')}</p>${glimpse(k)?`<p class="v52-observation"><small>眼前所见</small>${esc(glimpse(k))}</p>`:''}${meters(k)}`;}

peopleView=()=>`<main class="page"><div class="page-title"><span class="eyebrow">人物录</span><h1>我所认识的人</h1><p>记下已经见过的面容与言行。</p></div><div class="people-grid">${Object.keys(PEOPLE).filter(known).map(k=>`<article class="person-card" tabindex="0" data-person="${k}">${portrait(PEOPLE[k])}<div>${info(k)}</div></article>`).join('')}</div></main>`;

modal=function(k){if(!known(k))return;const d=document.querySelector('#modal');d.innerHTML=`<button class="close" aria-label="关闭人物资料">×</button><div class="modal-person">${portrait(PEOPLE[k])}<div>${info(k)}</div></div>${WARDROBE[k]?wardrobeControls(k):''}`;if(!d.open)d.showModal();d.querySelector('.close').onclick=()=>d.close();d.querySelectorAll('[data-look]').forEach(b=>b.onclick=()=>{if(b.dataset.look==='auto')delete wardrobePrefs[k];else wardrobePrefs[k]=b.dataset.look;save();d.close();modal(k);});};
