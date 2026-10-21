(()=>{try{
  const late=(typeof CHAPTERS!=='undefined'?CHAPTERS:[]).find(x=>x.title==='帘后朱笔');
  if(!late)return;
  // 这条终局只在张元照受凤印的分支真正发生；其他继后分支只读到“另一条路没有发生”，不误写状态。
  for(const st of late.steps||[]){
    for(const c of st.choices||[]){
      if(c.v66Conditionalized)continue;
      c.v66Conditionalized=true;
      c.v66OriginalEffects=c.effects||{};
      c.effects={};
      const ol=c.label;
      try{Object.defineProperty(c,'label',{configurable:true,enumerable:true,get(){return state.flags?.v44NewEmpress==='zhangyuanzhao'?ol:'翻过这条没有发生的路';}})}catch(_e){}
    }
  }
  const sac=late.steps?.find(x=>(x.heading||'').includes('新茶停在两个人中间'))?.choices?.[0];
  if(sac)sac.v66DemoteShen=true;
  const oldApply66=applyChoiceEffects;
  applyChoiceEffects=function(c){
    if(c?.v66Conditionalized){
      const real=state.flags?.v44NewEmpress==='zhangyuanzhao';
      const keep=c.effects;
      c.effects=real?c.v66OriginalEffects:{};
      const out=oldApply66(c);
      c.effects=keep;
      if(real&&c.v66DemoteShen&&typeof demoteRank==='function'){
        const before=state.ranks?.shen;
        if(demoteRank('shen'))out.push(`沈知微降一级：${before} → ${courtTitle(state,'shen')}`);
      }
      return out;
    }
    return oldApply66(c);
  };
  // 修正人物录后期条件：只有张氏真正受凤印且走完这条线，才显示协理朝政。
  const pv=peopleView;
  peopleView=function(){
    if(state.flags?.v44NewEmpress!=='zhangyuanzhao'){
      const z=PEOPLE?.zhangyuanzhao?{tags:[...(PEOPLE.zhangyuanzhao.tags||[])],bio:PEOPLE.zhangyuanzhao.bio}:null;
      const sh=PEOPLE?.shen?{tags:[...(PEOPLE.shen.tags||[])],bio:PEOPLE.shen.bio}:null;
      const h=pv();
      if(z){PEOPLE.zhangyuanzhao.tags=z.tags;PEOPLE.zhangyuanzhao.bio=z.bio}if(sh){PEOPLE.shen.tags=sh.tags;PEOPLE.shen.bio=sh.bio}
      return h;
    }
    return pv();
  };
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v66 branch guard failed',e)}})();
