(()=>{
 const result={routes:[],scenes:[],people:Object.entries(PEOPLE).map(([key,p])=>({key,name:p.name,age:p.age,title:p.title,home:p.home,introducedAt:p.introducedAt,bio:p.bio,signature:p.signature,tags:p.tags})),failures:[],renderLimitations:[]};
 const text=(x,s)=>{try{return typeof x==='function'?String(x(JSON.parse(JSON.stringify(s)))??''):String(x??'')}catch(e){return '[动态求值失败] '+e.message}};
 for(const route of ['direct','ning']){
  replay(0);state.intro=true;state.view='story';render();let n=0;
  while(state.index<CHAPTERS.length&&n++<600){
   const ch=CHAPTERS[state.index],st=ch.steps[state.chapterStep||0];
   if(st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow))state.flags.v78LowSelected=['cao2','zhao2','lin2','ye2','du2'];
   const before=JSON.parse(JSON.stringify(state));
   const choices=st.choices.map((c,i)=>({i,label:text(c.label,state),hint:text(c.hint,state),result:text(c.result,state),effects:c.effects||{},requires:c.requires?String(c.requires):'',eligible:(!c.requires||c.requires(state))&&((Number(c.costMind)||0)<=(Number(state.mind)||0)),costMind:c.costMind||0,special:Object.fromEntries(Object.entries(c).filter(([k])=>!['label','hint','result','effects','requires','costMind'].includes(k)).map(([k,v])=>[k,typeof v==='function'?String(v):v]))}));
   let pick=st.choices.some(c=>c.v74ShaoThenZhang)?st.choices.findIndex(c=>route==='ning'?c.v74ShaoThenZhang:c.effects?.flags?.v44NewEmpress==='zhangyuanzhao'):-1;
   if(pick<0)pick=choices.findIndex(c=>c.eligible);
   const row={route,ci:state.index,si:state.chapterStep,title:ch.title,date:ch.date,heading:st.heading,narrative:!!st.narrative,keyDecision:!!st.keyDecision,cast:st.cast||[],choices,pick,before:{flags:before.flags,ranks:before.ranks,mind:before.mind}};
   if(pick<0){result.failures.push({heading:st.heading,error:'no eligible choice'});break}
   try{choose(pick)}catch(e){if(state.index===CHAPTERS.length)result.renderLimitations.push({heading:st.heading,error:e.message});else{result.failures.push({heading:st.heading,error:e.message});break}}
   if(state.index===row.ci&&state.chapterStep===row.si){result.failures.push({heading:st.heading,error:'did not advance'});break}
   row.changes={flags:Object.fromEntries(Object.entries(state.flags||{}).filter(([k,v])=>JSON.stringify(before.flags?.[k])!==JSON.stringify(v))),ranks:Object.fromEntries(Object.entries(state.ranks||{}).filter(([k,v])=>before.ranks?.[k]!==v))};
   result.scenes.push(row);
  }
  result.routes.push({route,count:n,end:{flags:state.flags,ranks:state.ranks,index:state.index}});
 }
 return result;
})()
