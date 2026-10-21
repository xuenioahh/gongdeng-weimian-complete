(()=>{try{
  // 容错：旧存档若有早期人物键，落子后的变化提示不再中断页面。
  const effect96=effectText;
  effectText=function(e){try{return effect96(e)}catch(err){const a=[];Object.entries(e?.bond||{}).forEach(([k,v])=>a.push(`${PEOPLE?.[k]?.name||k}亲近 ${v>0?'+':''}${v}`));Object.entries(e?.trust||{}).forEach(([k,v])=>a.push(`${PEOPLE?.[k]?.name||k}信任 ${v>0?'+':''}${v}`));Object.entries(e?.ranks||{}).forEach(([k,v])=>a.push(`${PEOPLE?.[k]?.name||k} → ${v}`));return a}};

  globalThis.v96Jump=function(ci,si=0){
    ci=Math.max(0,Math.min((CHAPTERS?.length||1)-1,Number(ci)||0));
    const ch=CHAPTERS[ci],maxStep=Math.max(0,(ch?.steps?.length||1)-1);
    si=Math.max(0,Math.min(maxStep,Number(si)||0));
    state.index=ci;state.chapterStep=si;state.view='story';state.intro=true;
    state.stepHistory=[];state.stepResults=[];state.stepChanges=[];state.lastChoice=null;
    state.flags=state.flags||{};state.flags.v96FreeJump=true;
    try{save()}catch(_e){};try{render()}catch(e){console.error('v96 jump render',e)}
    try{window.scrollTo({top:0,left:0,behavior:'instant'})}catch(_e){window.scrollTo(0,0)}
  };
  function ensureJumpDialog(){let d=document.getElementById('v96-jump-panel');if(!d){d=document.createElement('dialog');d.id='v96-jump-panel';document.body.appendChild(d)}return d}
  function sceneOptions(ci){const ch=CHAPTERS[ci];if(!ch?.steps?.length)return '<option value="0">本章正文</option>';return ch.steps.map((st,i)=>`<option value="${i}">${i+1}. ${(st.heading||'未命名幕').replace(/<[^>]+>/g,'')}</option>`).join('')}
  globalThis.v96OpenJump=function(){const d=ensureJumpDialog(),current=Math.max(0,Math.min(CHAPTERS.length-1,state.index||0));d.innerHTML=`<div class="v96-jump-inner"><div class="v96-jump-head"><div><span class="eyebrow">全线导航</span><h2>跳到任意章节</h2></div><button class="v96-jump-close">×</button></div><div class="v96-jump-form"><label>章节<select id="v96-jump-ch">${CHAPTERS.map((ch,i)=>`<option value="${i}" ${i===current?'selected':''}>${String(i+1).padStart(2,'0')} · ${ch.title}</option>`).join('')}</select></label><label>幕次<select id="v96-jump-step">${sceneOptions(current)}</select></label><button class="v96-jump-go">前往</button></div><p class="v96-devnote">直接跳转只改变阅读位置，不自动补跑此前没有选择过的分支。</p><div class="v96-jump-list">${CHAPTERS.map((ch,i)=>`<button data-v96-go-ch="${i}"><small>${ch.date||''}</small>${String(i+1).padStart(2,'0')} · ${ch.title}</button>`).join('')}</div></div>`;d.querySelector('.v96-jump-close').onclick=()=>d.close();const cs=d.querySelector('#v96-jump-ch'),ss=d.querySelector('#v96-jump-step');cs.onchange=()=>ss.innerHTML=sceneOptions(+cs.value);d.querySelector('.v96-jump-go').onclick=()=>{d.close();v96Jump(+cs.value,+ss.value)};d.querySelectorAll('[data-v96-go-ch]').forEach(b=>b.onclick=()=>{d.close();v96Jump(+b.dataset.v96GoCh,0)});d.showModal()};
  function wireJumpUI(){const head=document.querySelector('header');if(head&&!document.getElementById('v96-jump-open')){const b=document.createElement('button');b.id='v96-jump-open';b.className='ghost';b.textContent='全线跳转';b.onclick=v96OpenJump;const r=document.getElementById('restart');head.insertBefore(b,r||null)}document.querySelectorAll('.chapters [data-replay]').forEach((b,i)=>{b.disabled=false;const sp=b.querySelector('span');if(sp&&CHAPTERS[i])sp.textContent=CHAPTERS[i].title;b.onclick=e=>{e.preventDefault();v96Jump(+b.dataset.replay,0)}})}
  const render96=render;render=function(){const r=render96();wireJumpUI();document.documentElement.dataset.build='v96';document.title='宫灯未眠 · 全线自由跳转与冰库修复 v96';return r};
  // 最终防线：旧大事录扩展若再被调用，也不显示开发者性质的私线提示。
  const chron96=chronicleView;chronicleView=function(){return String(chron96()).replace(/<section class="v67-thread">[\s\S]*?<\/section>/g,'')};
  try{render()}catch(e){console.error('v96 init',e)}
}catch(e){console.error('v96 patch failed',e)}})();
