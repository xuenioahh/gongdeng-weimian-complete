// Additive event records; build-52 archives and existing choice arrays stay valid.
// No fact is inferred from an unchosen button or from a character's later title.
const sceneRows151=new Map(SCENE_IDENTITIES_151.flatMap(row=>[row.heading,...(row.aliases||[])].map(heading=>[row.chapter+'\0'+heading,row])));
const sceneIds151=new Map(SCENE_IDENTITIES_151.map(row=>[row.id,row]));
function sceneIdentity151(chapter,step){return sceneRows151.get(chapter?.title+'\0'+step?.heading)||null;}
function bindSceneIdentities151(){
 for(const chapter of CHAPTERS)for(const step of chapter.steps||[]){const row=sceneIdentity151(chapter,step);if(row)Object.defineProperty(step,'sceneId',{value:row.id,configurable:true,enumerable:false});}
}
function occurrenceDate154(heading,fallback){
 const prefix=String(heading||'').match(/^(承熙[元一二三四五六七八九十廿]+年[^·]*)/);
 return prefix?prefix[1].replace(/回望|旧事/g,'').trim():fallback;
}
function beginHistoryEvent151(chapter,step,choice){
 const identity=sceneIdentity151(chapter,step);if(!identity)return null;
 const actors=Object.fromEntries((step.cast||[]).filter(k=>PEOPLE[k]).map(k=>{const p=person138(k,state);return [k,{name:p.name,title:p.title,home:p.home,status:p.status}]}));
 return {id:identity.id,chapterId:identity.chapterId,chapterIndex:state.index,sceneIndex:state.chapterStep,pick:step.choices.indexOf(choice),date:occurrenceDate154(step.heading,chapter.date),chapterDate:chapter.date,heading:historyHeading150(chapter,step,state),actors,ranks:{...state.ranks},flags:{...state.flags}};
}
function rankFacts151(before,after){
 const order=['答应','常在','贵人','嫔','妃','贵妃','皇贵妃','皇后','皇太后'];
 const base=r=>{for(let i=order.length-1;i>=0;i--)if(String(r||'').endsWith(order[i]))return i;return -1;};
 const out=[];
 for(const [key,to] of Object.entries(after||{})){
  if(before?.[key]===to||base(to)<0||/^(故|废)/.test(to))continue;
  const a=base(before?.[key]),b=base(to),name=PEOPLE[key]?.name;if(!name)continue;
  out.push(`${name}${a<0?'初授':b>a?'晋为':b<a?'降为':'改封'}${to}。`);
 }
 return out;
}
function finishHistoryEvent151(before,choice){
 if(!before)return;
 const f=state.flags||{},ef=choice.effects?.flags||{},facts=rankFacts151(before.ranks,state.ranks);
 let command=null,execution=null,investigation=null,settlement=null;const privateFacts=[];
 if(choice.v78ConfirmLow){const names=(f.lowConsorts||[]).map(k=>PEOPLE[k]?.name).filter(Boolean);command=`帝择${names.join('、')}留牌，命另议初封。`;facts.unshift(command);}
 if(ef.v46EpidemicPolicy){command={full:'准张元照持御前临时牌，协同皇后、太医院办理疫务。',record:'皇后总领疫务，张元照核册与查漏。',old:'太医院照旧处置，张元照所呈草册只作旁证。'}[f.v46EpidemicPolicy];facts.unshift(command);}
 if(ef.v60NoBlameNotice){command='命各值房张贴告示：报病不扣月例、不罚误值。';execution='告示送至各值房。';facts.unshift(command,execution);}
 if(ef.v56DailaFate){command={return:'准黛拉自请归珂兰，以王族使节礼送出西门。',stay:'依黛拉本人意愿续留京中，保留名位而不入侍寝册。',hold:'密信案尚未清，暂留黛拉于承露馆，互市复核后再问本人。'}[f.v56DailaFate];execution=f.v56DailaFate==='return'?'黛拉离京，现居珂兰。':'黛拉仍居承露馆。';facts.unshift(command,execution);}
 if(ef.v75ShenFate){command={death:'帝裁沈知微私留机务副稿之罪，命赐死，罪名实录，不改病亡。',fief:'沈知微失御前文字与六宫实权，随皇嗣赴封地。',religion:'沈知微离宫入女观，退出机务。'}[f.v75ShenFate];settlement=command;facts.unshift(command);}
 if(ef.shunwangFinalFate){settlement=f.shunwangFinalFate==='capital'?'顺王留京中王府，依明旨受限。':'顺王赴旧封别业。';facts.unshift(settlement);}
 if(choice.v69Final||ef.v69HiddenPrinceFinal){
  command=f.v69HiddenPrinceFinal==='hide'?'以冒籍撤陆氏婚议，血脉不载公开纪事。':'陆氏身世依本次裁断公开，婚议撤回，不补皇子序齿。';facts.unshift(command);
  if(f.v69HiddenPrinceFinal==='hide')privateFacts.push('御前密档留陆氏血脉；二公主只获知冒籍与撤婚，未被告知双生血缘。');
  else privateFacts.push('二公主获知陆氏为自己的双生弟弟；是否露面及往后去处依本次裁断。');
 }
 if(before.heading.includes('三次转手的军令')){investigation='裴景和呈前线原令、京中转抄与军法判词，日期和定罪用语有异；旧粮簿、军籍与残信分别核查。';facts.unshift(investigation);}
 if(before.heading.includes('十月二十三，凤仪宫灯灭')&&f.guDead){settlement='承熙十一年十月二十三日，皇后顾明宜薨。凤仪宫正殿闭，中宫暂虚。';facts.unshift(settlement);}
 const event={id:before.id,chapterId:before.chapterId,chapterIndex:before.chapterIndex,sceneIndex:before.sceneIndex,pick:before.pick,date:before.date,chapterDate:before.chapterDate,heading:before.heading,actors:before.actors,command,execution,investigation,settlement,facts:facts.filter(Boolean),privateFacts};
 const revision=typeof characterRecord153==='function'?characterRecord153(before):null;
 if(revision)event.revision153=revision;
 state.events151??={};state.events151[before.id]=event;
 state.sceneChoices151??={};state.sceneChoices151[before.id]=before.pick;
}
function recordedChapterEvents151(ci,s=state){return Object.values(s.events151||{}).filter(e=>e.chapterIndex===ci).sort((a,b)=>a.sceneIndex-b.sceneIndex);}
globalThis.SceneHistory151={
 bind:bindSceneIdentities151,
 identity:sceneIdentity151,
 events:recordedChapterEvents151,
 position(s){const ch=CHAPTERS[s.index],st=ch?.steps?.[s.chapterStep||0],row=sceneIdentity151(ch,st);return row?{sceneId:row.id,chapterId:row.chapterId}:{}},
 resolve(id){const row=sceneIds151.get(id);if(!row)return null;const ci=CHAPTERS.findIndex(c=>c.title===row.chapter),si=CHAPTERS[ci]?.steps.findIndex(st=>sceneIdentity151(CHAPTERS[ci],st)?.id===id);return ci>=0&&si>=0?{ci,si}:null;}
};
bindSceneIdentities151();

// Correct only the previously authored false knowledge sentence in old events.
// Missing records remain missing; no later flag is used to invent past knowledge.
function repairHistoryKnowledge154(s){
 for(const event of Object.values(s.events151||{})){
  if(!Array.isArray(event.privateFacts)||!String(event.command||'').includes('血脉不载公开纪事'))continue;
  event.privateFacts=event.privateFacts.map(f=>f==='御前密档留陆氏血脉；婚议所涉皇女本人已被告知。'?'御前密档留陆氏血脉；二公主只获知冒籍与撤婚，未被告知双生血缘。':f);
 }
}
