// Read-only visits use the existing archive format. Never replay choice effects.
var finaleReview149=null;
function completedEnding149(pack){return !!(pack?.game==='gongdeng'&&pack.schema===1&&pack.build===52&&pack.state?.version===26&&pack.state.index===CHAPTERS.length&&pack.state.flags?.v82FinaleComplete)}
function endingAvailable149(){return !!(state.index===CHAPTERS.length&&state.flags?.v82FinaleComplete)||!!globalThis.V52_ARCHIVES?.endings?.().length}
function endingCaption149(pack){
  const f=pack.state.flags;
  const route=f.v74ShaoThenZhang?'两次受印':'张氏接印';
  const heir=f.v81PrinceOpenEnding?'杨顺恭继位':'杨顺谦继位';
  const shen={death:'知微诀别',fief:'知微远行',religion:'知微归观'}[f.v75ShenFate]||'';
  return [route,heir,shen].filter(Boolean).join(' · ');
}
function endingLinks149(){
  const ends=globalThis.V52_ARCHIVES?.endings?.()||[];
  if(!ends.length)return '';
  return `<section class="ending-revisit"><span class="eyebrow">已阅之卷</span><h2>卷终回访</h2><div class="ending-revisit-links">${ends.map(({key,pack})=>`<button class="ghost" data-ending-key="${esc136(key)}">${esc136(endingCaption149(pack))}</button>`).join('')}</div></section>`;
}
function endingMenu149(){
  return `<main class="ending finale-menu" aria-label="全剧终"><span class="eyebrow">承熙纪事 · 终</span><h1>宫灯未眠</h1><p class="finale-seal">全剧终</p><div class="finale-entries">
    <button id="finale-memory-start">重温走马灯</button><button data-ending-action="read">回看结局</button>
    <button data-view="people" data-ending-gallery="people">人物瓷谱</button><button data-ending-action="directory">返回目录</button><button data-ending-action="cover">返回首页</button>
  </div></main>`;
}
function beginEndingReview149(key='',mode='read'){
  // Capture the formal save before changing route, titles or presentation.
  if(finaleReview149){
    if(!key||key===finaleReview149.key){
      state.view='story';coverPreview=false;
      state.finalMontage147={version:147,status:mode==='montage'?'playing':mode==='menu'?'complete':'reading',beat:0,elapsed:0,paused:false};
      render136();return;
    }
    leaveEndingReview149('',false);
  }
  stopFinaleReveal146();stopFinalMontage147();
  const api=globalThis.V52_ARCHIVES,original=api.pack(),originCover=coverPreview;
  const archived=api.endings?.()||[];
  const entry=key?archived.find(x=>x.key===key):completedEnding149(original)?{key:'current',pack:original}:archived.at(-1);
  if(!entry||!completedEnding149(entry.pack))return false;
  api.restore(entry.pack,false);
  finaleReview149={key:entry.key,original,originCover};
  coverPreview=false;state.view='story';
  state.finalMontage147={version:147,status:mode==='montage'?'playing':mode==='menu'?'complete':'reading',beat:0,elapsed:0,paused:false};
  render136();window.scrollTo({top:0,left:0,behavior:'instant'});return true;
}
function leaveEndingReview149(destination='',paint=true){
  stopFinaleReveal146();stopFinalMontage147();
  if(finaleReview149){
    const session=finaleReview149;finaleReview149=null;
    globalThis.V52_ARCHIVES.restore(session.original,false);
    state.view=session.original.state.view;coverPreview=session.originCover;
  }
  if(destination==='cover'){CoverDirector147.show();return}
  if(destination){state.view=destination;coverPreview=false;}
  if(paint)render136();
}
function endingNavigation149(action){
  if(action==='read')return beginEndingReview149('','read');
  if(action==='menu'){
    if(finaleReview149)return beginEndingReview149('','menu');
    if(state.index===CHAPTERS.length&&state.flags?.v82FinaleComplete){state.view='story';coverPreview=false;state.finalMontage147={version:147,status:'complete'};save();render136();return;}
    return beginEndingReview149('','menu');
  }
  if(action==='directory')return leaveEndingReview149('chronicle');
  if(action==='cover')return leaveEndingReview149('cover');
  return leaveEndingReview149();
}
function mountEndingNavigation149(){
  // Reuse the existing chronicles for the directory, and retain its chapter links.
  const chronicle=document.querySelector('main.chronicle');
  if(chronicle&&!chronicle.querySelector('.ending-revisit'))chronicle.insertAdjacentHTML('afterbegin',endingLinks149());
  if(endingAvailable149()&&!document.querySelector('.palace-opening')){
    const header=document.querySelector('header');
    if(header&&!header.querySelector('[data-ending-action="menu"]'))header.insertAdjacentHTML('beforeend','<button class="ghost" data-ending-action="menu">卷终回访</button>');
  }
  const host=document.querySelector('#app');
  if(finaleReview149&&host&&!host.querySelector('.ending-review-bar')){
    const bar=document.createElement('aside');bar.className='ending-review-bar';bar.setAttribute('aria-label','结局回顾导航');
    bar.innerHTML='<span>卷终回顾</span><button data-ending-action="menu">返回卷终</button><button data-ending-action="return">返回游戏</button>';
    const header=host.querySelector('header');if(header)header.after(bar);else host.prepend(bar);
  }
  // Completed canonical galleries also have a direct, visible return path.
  if(!finaleReview149&&state.index===CHAPTERS.length&&state.flags?.v82FinaleComplete){
    const gallery=document.querySelector('main:not(.ending):not(.final-montage):not(.palace-opening)');
    if(gallery&&!gallery.querySelector('.ending-back'))gallery.insertAdjacentHTML('afterbegin','<button class="ghost ending-back" data-ending-action="menu">返回卷终</button>');
  }
  if(finaleReview149)host?.querySelectorAll('[data-replay]').forEach(b=>{b.disabled=true;b.title='返回游戏后可重新选择章节'});
  host?.querySelectorAll('[data-ending-action]').forEach(b=>b.onclick=()=>endingNavigation149(b.dataset.endingAction));
  host?.querySelectorAll('[data-ending-key]').forEach(b=>b.onclick=()=>beginEndingReview149(b.dataset.endingKey,'menu'));
  const montage=host?.querySelector('#finale-memory-start');if(montage)montage.onclick=startFinalMontage147;
}
globalThis.FinaleReview149={get active(){return !!finaleReview149},get original(){return finaleReview149?.original},leave:leaveEndingReview149,open:beginEndingReview149,isComplete:completedEnding149};
