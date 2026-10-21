(()=>{try{
  const CHX=t=>(CHAPTERS||[]).find(c=>c.title===t);
  const contextualRank=(k,s=state)=>{
    const ci=s?.index??state.index??0, si=s?.chapterStep??state.chapterStep??0;
    const c=(CHAPTERS||[])[ci];
    if(c?.title==='拾遗阁开门'){
      const seal=c.steps?.findIndex(x=>String(x.heading||'').includes('第一份册封'))??-1;
      if(seal>=0&&si<seal){if(k==='baopu')return '蘅国长女';if(k==='hanzhang')return '蘅国次女';}
    }
    if(c?.title==='母至'){
      const seal=c.steps?.findIndex(x=>String(x.heading||'').includes('册页上那一行不能由皇后替我写'))??-1;
      if(seal>=0&&si<seal&&k==='wenheng')return '蘅国旧后';
    }
    if(c?.title==='一碟杏仁酥'){
      const elev=c.steps?.findIndex(x=>String(x.heading||'').includes('离开宫女籍之前'))??-1;
      if(elev>=0&&si<=elev&&!s.flags?.fangElevated&&k==='fang')return '御花园宫女';
    }
    return null;
  };
  if(typeof displayRank==='function'&&!globalThis.__v123bDisplay){
    globalThis.__v123bDisplay=true;const old=displayRank;
    displayRank=function(k,s=state){return contextualRank(k,s)||old(k,s)};
  }
  try{
    if(typeof VOICE_PROFILES!=='undefined'){
      if(VOICE_PROFILES.baopu)VOICE_PROFILES.baopu.label='闻人抱朴';
      if(VOICE_PROFILES.hanzhang)VOICE_PROFILES.hanzhang.label='闻人含章';
      if(VOICE_PROFILES.wenheng)VOICE_PROFILES.wenheng.label='闻人蘅';
      if(VOICE_PROFILES.fang)VOICE_PROFILES.fang.label='方小满';
    }
  }catch(_e){}
  function syncFangHome(){
    if(!PEOPLE?.fang||!PEOPLE?.afu)return;
    const r=state?.ranks?.fang||'宫女';
    if(r==='宫女'||r==='御花园宫女'){
      PEOPLE.fang.home='御花园花房值房';PEOPLE.afu.home='御花园花房值房';PEOPLE.afu.title='御花园宫女';
    }else{
      PEOPLE.fang.home='听雨轩';PEOPLE.afu.home='听雨轩耳房';PEOPLE.afu.title='听雨轩宫女';
    }
  }
  syncFangHome();
  const oldR=typeof render==='function'?render:null;
  if(oldR&&!globalThis.__v123bRender){globalThis.__v123bRender=true;render=function(){syncFangHome();const out=oldR.apply(this,arguments);syncFangHome();document.documentElement.dataset.build='v123';document.title='宫灯未眠 · 前期称号与方小满位分修订 v123';return out}}
  try{render()}catch(e){console.error('v123b final ui render failed',e)}
}catch(e){console.error('v123b historical rank ui failed',e)}})();
