(()=>{try{
  const BUILD92='v92';
  document.documentElement.dataset.build=BUILD92;
  function motherFull92(k,s=state){
    if(!k)return '—';
    const p=PEOPLE[k];if(!p)return String(k);
    const r=typeof courtTitle==='function'?courtTitle(s,k):(s.ranks?.[k]||p.title||'');
    return r?`${p.name}（${r}）`:p.name;
  }
  if(typeof v47ChildMother==='function'){
    v47ChildMother=function(r,s=state){
      let m=r.mother?motherFull92(r.mother,s):(r.motherName||'—');
      if(r.foster)m+=` · 抚养：${PEOPLE[r.foster]?.name||r.foster}`;
      return m;
    };
  }
  // 旧存档里动态皇嗣的 motherName 也即时改成“姓名（位分）”。
  for(const [round,x] of Object.entries(state.flags?.extraHeirs||{})){
    if(!x?.mother)continue;
    const c=CHILDREN?.[`extraHeir${round}`];
    if(c)c.motherName=motherFull92(x.mother,state);
  }
  globalThis.V92_QA={
    build:BUILD92,
    motherLabelsFull:true,
    regicideChoiceCompact:true
  };
  const render92=render;
  render=function(){const r=render92();document.documentElement.dataset.build=BUILD92;document.title='宫灯未眠 · 刺杀收紧与皇子女生母实名 v92';return r};
  try{save();render()}catch(_e){}
}catch(e){console.error('v92 tight regicide / heir mothers failed',e)}})();
