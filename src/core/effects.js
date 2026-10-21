function map136(target,map){
    if(!map||typeof map!=='object')return;
    for(const [k,v] of Object.entries(map))target[k]=clamp136((Number(target[k])||0)+(Number(v)||0));
  }

function name136(k){return PEOPLE?.[k]?.name||k}

function rank136(k){try{return courtTitle(state,k)||state.ranks?.[k]||''}catch(_e){return state.ranks?.[k]||''}}

function promote136(k,maxRank){
    try{
      if(typeof promoteToward==='function'&&maxRank)return promoteToward(k,maxRank);
      if(typeof promoteRank==='function')return promoteRank(k);
    }catch(_e){}
    return false;
  }

function changes136(before){
    const changes=[];
    for(const type of ['bond','trust'])for(const [k,v] of Object.entries(state[type]||{})){const d=(Number(v)||0)-(Number(before[type]?.[k])||0);if(d)changes.push(`${name136(k)}${type==='bond'?'亲近':'信任'} ${d>0?'+':''}${d}`)}
    for(const [k,v] of Object.entries(state.ranks||{}))if(v!==before.ranks?.[k])changes.push(`${name136(k)} → ${v}`);
    if((Number(state.mind)||0)!==(Number(before.mind)||0))changes.push(`帝王心术 ${(Number(state.mind)||0)-(Number(before.mind)||0)}`);
    return changes;
  }

function effects136(c){
    const sealKey=c?.v55Promote||Object.keys(c?.effects?.flags||{}).find(k=>k.startsWith('v55Seal_'))?.slice('v55Seal_'.length);
    if(sealKey&&!person138(sealKey).admitted)return [];

    const before=JSON.parse(JSON.stringify({bond:state.bond||{},trust:state.trust||{},ranks:state.ranks||{},flags:state.flags||{},mind:state.mind}));
    if(legacyEffects136){
      // Canonical templates are no longer rebuilt by legacy state handlers.
      // Pass a private choice because the old conditional-effects rule temporarily
      // switches c.effects; authored chapter/scene identities remain in place.
      const copy=v=>Array.isArray(v)?v.map(copy):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,copy(x)])):v;
      const position={index:state.index,chapterStep:state.chapterStep};
      try{
        const out=legacyEffects136(copy(c));
        if(c.effects?.flags?.v75ShenFate==='religion'&&!state.flags.v138ShenDemoted){
          const ladder=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃'],i=ladder.indexOf(baseRank138(before.ranks.shen));
          if(i>0)state.ranks.shen=ladder[i-1];state.flags.v138ShenDemoted=true;
        }

        settleHeirs139(c,before.flags);
        if(c?.v70TwinDeathOrder){state.flags.v70TwinDeathOrder=true;state.flags.v70TwinDeathOrderIssued=true}
        return Array.isArray(out)?out:changes136(before);
      }catch(e){
        console.warn('v136 retained legacy choice effects after a legacy display error',e);
        return changes136(before);
      }finally{
        state.index=position.index;state.chapterStep=position.chapterStep;
        for(const k of consorts138){const p=person138(k);if(p.dead&&p.admitted&&!/^故/.test(state.ranks[k]||''))state.ranks[k]=p.title;}
        if(state.flags.v82SecondController)state.ranks.zhangyuanzhao='皇太后';
      }
    }
    const e=c?.effects||{},changes=[];
    map136(state.bond,e.bond);map136(state.trust,e.trust);
    for(const [k,v] of Object.entries(e.bond||{}))changes.push(`${name136(k)}亲近 ${Number(v)>0?'+':''}${v}`);
    for(const [k,v] of Object.entries(e.trust||{}))changes.push(`${name136(k)}信任 ${Number(v)>0?'+':''}${v}`);
    Object.assign(state.ranks,e.ranks||{});Object.assign(state.flags,e.flags||{});
    for(const [k,v] of Object.entries(e.ranks||{}))changes.push(`${name136(k)} → ${v}`);
    if(e.final!=null)state.flags.final=e.final;
    if(c?.costMind){state.mind=Math.max(0,(Number(state.mind)||0)-Number(c.costMind));changes.push(`帝王心术 -${c.costMind}`)}
    const f=e.flags||{};
    // 这些属性由旧版 applyChoiceEffects 的后置包装处理；v136 为避免早期章节的旧渲染报错改成显式效果后，需在这里保留同样的状态更新。
    if(f.v123FangInitialRank){
      const current=state.ranks?.fang||'';
      if(current==='宫女'||current==='御花园宫女'){
        state.ranks.fang=String(f.v123FangInitialRank);
        changes.push(`${name136('fang')} → ${state.ranks.fang}`);
      }
    }
    if(f.v123FangFirstPromotion){
      const current=state.ranks?.fang||'';
      if(current==='答应'||current==='方答应'){
        state.ranks.fang='常在';
        changes.push(`${name136('fang')}晋一级 → ${state.ranks.fang}`);
      }
    }
    if(c?.v38TwinFate){
      state.flags.twinBoyFate=c.v38TwinFate;
      state.flags.twinGirlBorn=true;
      state.flags.twinBoyRegistered=c.v38TwinFate==='keep';
      if(c.v69CruelTwin){
        state.flags.v69TwinOrderedDead=true;
        state.flags.twinBoyFate='kill';
        state.flags.twinBoyRegistered=false;
      }
      if(c.v70TwinDeathOrder){
        state.flags.v70TwinDeathOrder=true;
        state.flags.v70TwinDeathOrderIssued=true;
      }
      if(typeof CHILDREN!=='undefined'){
        if(state.flags.twinGirlBorn)CHILDREN.twinGirl={name:'杨昭焉',order:'五公主',age:'承熙元年二月生',mother:'zhou',note:'与一名皇子同胎而生。她本身健康，出生当夜却因同胞兄弟的先天异相一起卷入宫中议论；本卷暂不安排成长线。'};
        else delete CHILDREN.twinGirl;
        if(state.flags.twinBoyFate==='keep')CHILDREN.twinBoy={name:'杨顺安',order:'四皇子',age:'承熙元年二月生',mother:'zhou',note:'与五公主同胎。出生时左眼瞳色极浅、右手六指，太医认为不妨碍当时的呼吸与吃奶，钦天监却以“异相”上奏。主控选择照常入玉牒。本卷暂不安排成长线。'};
        else delete CHILDREN.twinBoy;
      }
      changes.push(state.flags.twinBoyFate==='keep'?'四皇子、五公主入玉牒':state.flags.twinBoyFate==='send'?'双生皇子出宫抚养，不入玉牒':'双生皇子不入玉牒');
    }
    const promotions=[
      ['advanceBaopuYear4','baopu','嫔','baopuYear4Promoted'],
      ['advanceBaopuYear5','baopu','嫔','baopuYear5Promoted'],
      ['advanceHanzhangYear4','hanzhang','贵人','hanzhangYear4Promoted'],
      ['promoteBaopu','baopu',null,null],['promoteHanzhang','hanzhang',null,null],['promoteFang','fang',null,null]
    ];
    for(const [flag,key,max,done] of promotions){
      if(f[flag]&&promote136(key,max)){if(done)state.flags[done]=true;changes.push(`${name136(key)}晋一级 → ${rank136(key)}`)}
    }
    return changes;
  }
