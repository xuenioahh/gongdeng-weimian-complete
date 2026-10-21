(()=>{try{
  const sync=()=>{
    if(globalThis.PEOPLE?.zhangyuanzhao){
      const p=PEOPLE.zhangyuanzhao;
      p.tags=(p.tags||[]).map(x=>x==='第二批采选'?'承熙三年入宫':x==='新选秀女'?'承熙三年入宫':x);
      if(typeof p.bio==='string')p.bio=p.bio.replaceAll('第二批采选入宫','承熙三年第一次大选入宫').replaceAll('第二次采选入宫','承熙三年第一次大选入宫').replaceAll('从顺王府走进第二次采选','从顺王府走进承熙三年大选');
    }
    for(const c of Object.values(globalThis.CHILDREN||{}))if(c?.motherName)c.motherName=String(c.motherName).replaceAll('本局','御前');
  };
  sync();
  const dedupeCards=h=>{
    try{
      const box=document.createElement('div');box.innerHTML=String(h||'');
      for(const card of box.querySelectorAll('.person-card')){
        const seen=new Set();
        for(const p of card.querySelectorAll('p')){
          if(p.classList.contains('meta'))continue;
          const s=(p.textContent||'').replace(/\s+/g,' ').trim();
          if(!s)continue;
          if(seen.has(s))p.remove();else seen.add(s);
        }
      }
      return box.innerHTML;
    }catch(_e){return h;}
  };
  const op=globalThis.peopleView;if(typeof op==='function'&&!op.__v116final){const w=function(...a){sync();return dedupeCards(op.apply(this,a))};w.__v116final=true;globalThis.peopleView=w;}
  const oc=globalThis.childrenView;if(typeof oc==='function'&&!oc.__v116final){const w=function(...a){sync();return String(oc.apply(this,a)).replaceAll('生母待本局殿选确定','生母依御前留牌确定').replaceAll('本局玉牒','当前玉牒')};w.__v116final=true;globalThis.childrenView=w;}
  const or=globalThis.render;if(typeof or==='function'&&!or.__v116final){const w=function(...a){sync();const r=or.apply(this,a);sync();try{if(state.view==='people'){const el=document.getElementById('app');if(el)el.innerHTML=peopleView();}else if(state.view==='children'){const el=document.getElementById('app');if(el)el.innerHTML=childrenView();}}catch(_e){}document.documentElement.dataset.build='v116';document.title='宫灯未眠 · 全篇语言清稿 v116';return r};w.__v116final=true;globalThis.render=w;}
  try{render()}catch(_e){}
}catch(e){console.error('v116 final view clean failed',e)}})();
