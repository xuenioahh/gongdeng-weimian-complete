(()=>{try{
  const LOW=['cao2','zhao2','lin2','ye2','du2','su2'];
  const NAMES={cao2:'何超英',zhao2:'王静娴',lin2:'林淑贞',ye2:'陈婉仪',du2:'张淑华',su2:'刘玉贞'};
  const SURN={cao2:'何',zhao2:'王',lin2:'林',ye2:'陈',du2:'张',su2:'刘'};
  const firstIdx=Math.max(0,CHAPTERS.findIndex(c=>c.title==='御前终选'));
  const concreteBios={
    liang2:'父亲在东南水师任职多年。她的箱笼习惯用黑桐油绳，见到弓先摸弦有没有返潮；说起海防器械时话会突然多起来。',
    song2:'家里熟悉漕运、织造和仓储。她看到三张领物单总想先并成一张，算转运与损耗很快；进宫后最先问清的是库房、验收和领物处。',
    xu2:'父亲是京中给事中，家中没有重兵财权。她紧张时会在心里数行礼步数，终选第一礼便行重了；放松下来以后爱拿这件事笑自己。'
  };
  function cloneArr(x){return Array.isArray(x)?[...x]:x}
  // 这份快照在所有 v87-v95 修订之后生成，专门压住 v86 的旧快照回滚。
  const BASE95=CHAPTERS.map(ch=>({ch,steps:[...(ch.steps||[])],stepData:new Map((ch.steps||[]).map(st=>[st,{heading:st.heading,cast:cloneArr(st.cast),text:st.text,choices:cloneArr(st.choices),narrative:st.narrative,keyDecision:st.keyDecision,fx:st.fx}]))}));
  function restore95(){
    for(const snap of BASE95){snap.ch.steps=[...snap.steps];for(const st of snap.steps){const d=snap.stepData.get(st);if(!d)continue;st.heading=d.heading;st.cast=cloneArr(d.cast);st.text=d.text;st.choices=cloneArr(d.choices);st.narrative=d.narrative;st.keyDecision=d.keyDecision;st.fx=d.fx;}}
  }
  function selected(s=state){return new Set((s.flags?.lowConsorts||[]).filter(k=>LOW.includes(k)))}
  function selectionDone(s=state){return !!(s.flags?.v78ManualLowSelection||s.flags?.firstGrandSelectionDone||(s.flags?.lowConsorts||[]).length)}
  function lineMentions(line,k){const z=String(line||'');if(z.includes(NAMES[k]))return true;if(k!=='du2'&&new RegExp(`${SURN[k]}(?:答应|常在|贵人|嫔|妃|贵妃|皇贵妃)`).test(z))return true;return false}
  function choiceRefs(c,k){let z='';try{z=[String(c?.label||''),String(c?.hint||''),typeof c?.result==='string'?c.result:'',JSON.stringify(c?.effects||{}),String(c?.v40Heir?.key||'')].join('\n')}catch(_e){}return z.includes(k)||z.includes(NAMES[k])||(k!=='du2'&&new RegExp(`${SURN[k]}(?:答应|常在|贵人|嫔|妃|贵妃|皇贵妃)`).test(z))}
  function syncPresence95(s=state){
    for(const [k,b] of Object.entries(concreteBios))if(PEOPLE[k])PEOPLE[k].bio=b;
    if(!selectionDone(s))return;
    const keep=selected(s),gone=LOW.filter(k=>!keep.has(k));
    for(const k of LOW){
      if(!PEOPLE[k])continue;
      if(keep.has(k)){PEOPLE[k].introducedAt=firstIdx;if(PEOPLE[k].home==='未入宫')PEOPLE[k].home='储秀宫西院';if(HAREM_KEYS&&!HAREM_KEYS.includes(k))HAREM_KEYS.push(k)}
      else{PEOPLE[k].introducedAt=9999;PEOPLE[k].home='未入宫';if(s.ranks)s.ranks[k]='未入宫';let i;while((i=HAREM_KEYS.indexOf(k))>=0)HAREM_KEYS.splice(i,1)}
    }
    if(globalThis.__canonicalStory155)return;
    for(let ci=firstIdx+1;ci<CHAPTERS.length;ci++){
      const ch=CHAPTERS[ci],next=[];
      for(const st of ch.steps||[]){
        const cast=Array.isArray(st.cast)?st.cast:[];st.cast=cast.filter(k=>!LOW.includes(k)||keep.has(k));
        const head=String(st.heading||'');if(gone.some(k=>head.includes(NAMES[k])))continue;
        if(cast.length&&cast.every(k=>LOW.includes(k))&&st.cast.length===0)continue;
        if(st.text){const old=st.text;st.text=function(ss){let a;try{a=typeof old==='function'?old(ss):old}catch(_e){a=[]}a=Array.isArray(a)?a:[a];return a.filter(line=>!gone.some(k=>lineMentions(line,k)));};}
        if(Array.isArray(st.choices)){st.choices=st.choices.filter(c=>!gone.some(k=>choiceRefs(c,k)));if(!st.choices.length)st.choices=[{label:'继续',effects:{flags:{}},result:''}];}
        next.push(st);
      }
      ch.steps=next;
    }
  }
  function hash(str){let h=2166136261>>>0;for(const ch of String(str)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return h>>>0}
  function norm(list){return [...new Set((list||[]).filter(k=>LOW.includes(k)))].sort((a,b)=>LOW.indexOf(a)-LOW.indexOf(b))}
  function stabilizeLow(s,list){const a=norm(list);s.flags.lowConsorts=[...a];s.flags.v78LowSelected=[...a];if(!a.length){s.flags.lowPregnancyKey=null;s.flags.lowAccompliceKey=null;return}const sig=a.join('|');s.flags.lowPregnancyKey=a[hash('preg|'+sig)%a.length];const b=a.filter(k=>k!=='zhao2');s.flags.lowAccompliceKey=b.length?b[hash('acc|'+sig)%b.length]:null}
  function cn(n){return ['零','一','二','三','四','五','六','七','八','九','十'][n]||String(n)}
  function stabilizeHeir(s,round,key){
    s.flags.extraHeirs=s.flags.extraHeirs||{};const sig=[round,key,norm(s.flags.lowConsorts).join(','),s.flags.year3Favor||'',s.flags.twinBoyRegistered?'T':''].join('|');const gender=hash('sex|'+sig)%100<52?'F':'M';
    const boys=['杨顺昭','杨顺安','杨顺平','杨顺礼','杨顺嘉','杨顺宁','杨顺和'],girls=['杨清而','杨嘉则','杨和乃','杨贞亦','杨安以','杨柔于','杨宛然'];const used=new Set();Object.values(CHILDREN||{}).forEach(x=>x?.name&&used.add(x.name));Object.entries(s.flags.extraHeirs).forEach(([r,x])=>Number(r)!==Number(round)&&x?.name&&used.add(x.name));const p=(gender==='M'?boys:girls).filter(n=>!used.has(n));const name=p.length?p[hash('name|'+sig)%p.length]:(gender==='M'?'杨顺康':'杨昭焉');let n=gender==='M'?(s.flags.twinBoyRegistered?6:5):8;for(let r=1;r<round;r++){const x=s.flags.extraHeirs[r];if(x&&!x.skipped&&x.gender===gender)n++}const born=!!s.flags.extraHeirs?.[round]?.born;s.flags.extraHeirs[round]={...(s.flags.extraHeirs[round]||{}),mother:key,gender,name,order:`${cn(n)}${gender==='M'?'皇子':'公主'}`,born,v40:true,v95Stable:true};
  }

  // 最外层 effects：先让旧逻辑完成必要的数值，再用 v95 快照恢复正文结构。
  const prev=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const replay=globalThis.__v95ReplayRoster;const manual=(c?.v78ConfirmLow||c?.v95ConfirmLow)?norm(replay?(replay.low?.length?replay.low:replay.selected):state.flags?.v78LowSelected):null;
    if(manual)state.flags.v78LowSelected=[...manual];
    const out=prev(c);
    if(manual)stabilizeLow(state,manual);
    if(c?.v95SecondEnroll){for(const k of ['liang2','song2','xu2']){state.ranks[k]='答应';if(PEOPLE[k]){PEOPLE[k].title='答应';PEOPLE[k].introducedAt=Math.max(0,CHAPTERS.findIndex(x=>x.title==='空宫点灯'))};if(!HAREM_KEYS.includes(k))HAREM_KEYS.push(k)}}
    if(c?.v40Heir?.key){const {round,key}=c.v40Heir;if(LOW.includes(key)&&!norm(state.flags.lowConsorts).includes(key)){if(state.flags.extraHeirs?.[round]?.mother===key)delete state.flags.extraHeirs[round]}else stabilizeHeir(state,round,key)}
    if(!globalThis.__canonicalStory155)restore95();syncPresence95(state);return out;
  };

  // 任何纯页面重绘也先回到 v95 结构；不会再掉回 v86 快照。
  const renderPrev=render;render=function(){restore95();syncPresence95(state);return renderPrev()};
  restore95();syncPresence95(state);
  document.documentElement.dataset.build='v95';document.title='宫灯未眠 · 跳转、三新人介绍与随机分支校准 v95';
  globalThis.V95_QA.structureSnapshot='v95-final';
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v95c final structure snapshot failed',e)}})();
