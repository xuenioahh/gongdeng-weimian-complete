(()=>{try{
  const LOW=['cao2','zhao2','lin2','ye2','du2','su2'];
  function hash(str){let h=2166136261>>>0;for(const ch of String(str)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return h>>>0}
  function normalizeManual(list){return [...new Set((list||[]).filter(k=>LOW.includes(k)))].sort((a,b)=>LOW.indexOf(a)-LOW.indexOf(b))}
  function stableLow(s,list){const a=normalizeManual(list);s.flags=s.flags||{};s.flags.lowConsorts=[...a];s.flags.v78LowSelected=[...a];if(!a.length){s.flags.lowPregnancyKey=null;s.flags.lowAccompliceKey=null;return}const sig=a.join('|');s.flags.lowPregnancyKey=a[hash('preg|'+sig)%a.length];const b=a.filter(k=>k!=='zhao2');s.flags.lowAccompliceKey=b.length?b[hash('accomp|'+sig)%b.length]:null;LOW.forEach(k=>{if(!a.includes(k)){s.ranks[k]='待选';if(PEOPLE[k])PEOPLE[k].introducedAt=9999}})}
  function cn(n){const a=['零','一','二','三','四','五','六','七','八','九','十'];return a[n]||String(n)}
  function stableExtra(s,round,key){
    s.flags=s.flags||{};s.flags.extraHeirs=s.flags.extraHeirs||{};const low=normalizeManual(s.flags.lowConsorts);const sig=[round,key,low.join(','),s.flags.year3Favor||'',s.flags.twinBoyRegistered?'T':''].join('|');
    const gender=hash('sex|'+sig)%100<52?'F':'M',boys=['杨顺昭','杨顺安','杨顺平','杨顺礼','杨顺嘉','杨顺宁','杨顺和'],girls=['杨清而','杨嘉则','杨和乃','杨贞亦','杨安以','杨柔于','杨宛然'];
    const used=new Set();Object.values(CHILDREN||{}).forEach(x=>x?.name&&used.add(x.name));Object.entries(s.flags.extraHeirs).forEach(([r,x])=>{if(Number(r)!==Number(round)&&x?.name)used.add(x.name)});
    const pool=(gender==='M'?boys:girls).filter(n=>!used.has(n));const name=pool.length?pool[hash('name|'+sig)%pool.length]:(gender==='M'?'杨顺康':'杨昭焉');
    let n=gender==='M'?(s.flags?.twinBoyRegistered?6:5):8;for(let r=1;r<round;r++){const x=s.flags.extraHeirs?.[r];if(x&&!x.skipped&&x.gender===gender)n++}
    const born=!!s.flags.extraHeirs?.[round]?.born;s.flags.extraHeirs[round]={...(s.flags.extraHeirs[round]||{}),mother:key,gender,name,order:`${cn(n)}${gender==='M'?'皇子':'公主'}`,born,v40:true,v95Stable:true};
  }
  const prev=applyChoiceEffects;
  applyChoiceEffects=function(c){
    const replay=globalThis.__v95ReplayRoster;const manual=(c?.v78ConfirmLow||c?.v95ConfirmLow)?normalizeManual(replay?(replay.low?.length?replay.low:replay.selected):state.flags?.v78LowSelected):null;
    if(manual)state.flags.v78LowSelected=[...manual];
    const out=prev(c);
    if(manual)stableLow(state,manual);
    if(c?.v40Heir?.key){const {round,key}=c.v40Heir;if(LOW.includes(key)&&!normalizeManual(state.flags?.lowConsorts).includes(key)){if(state.flags?.extraHeirs?.[round]?.mother===key)delete state.flags.extraHeirs[round];}else stableExtra(state,round,key)}
    return out;
  };

  // 人物页也固定为具体信息，避免旧动态简介重新盖回作者式总结。
  const bios={
    liang2:'父亲在东南水师任职多年。她的箱笼习惯用黑桐油绳，见到弓先摸弦有没有返潮；说起海防器械时话会突然多起来。',
    song2:'家里熟悉漕运、织造和仓储。她看到三张领物单总想先并成一张，算转运与损耗很快；进宫后最先问清的是库房、验收和领物处。',
    xu2:'父亲是京中给事中，家中没有重兵财权。她紧张时会在心里数行礼步数，终选第一礼便行重了；放松下来以后爱拿这件事笑自己。'
  };
  const pv=peopleView;peopleView=function(){let h=pv();for(const [k,b] of Object.entries(bios)){const old=PEOPLE[k]?.bio||'';if(old&&old!==b)h=h.replace(old,b);if(PEOPLE[k])PEOPLE[k].bio=b}return h};

  const oldQA=globalThis.V95_QA?.run;globalThis.V95_QA.run=function(s=state){const q=oldQA?oldQA(s):{ok:true,issues:[]};const issues=[...(q.issues||[])];const sel=(CHAPTERS.find(c=>c.title==='御前终选')?.steps||[]).find(st=>st.v95ManualRoster);if(!sel||sel.choices?.length!==1)issues.push('第一次低位自由点名未锁定');return {...q,ok:issues.length===0,issues};};
  try{save()}catch(_e){};try{render()}catch(_e){}
}catch(e){console.error('v95b deterministic guard failed',e)}})();
