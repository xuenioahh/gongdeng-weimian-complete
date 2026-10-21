const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
module.exports=async({page,out,continuationsOnly=false})=>{
 await page.exposeFunction('sealProgress155',p=>{fs.writeFileSync(path.join(out,'大封验收进度.json'),JSON.stringify(p));console.log(JSON.stringify(p))});
 const report=await page.evaluate(async(continuationsOnly)=>{
  const keys=['cao2','zhao2','lin2','ye2','du2','su2'],clone=x=>JSON.parse(JSON.stringify(x)),report={pass:false,sets:0,combinations:0,failures:[],capTransitions:0,continuations:0,rows:[]};
  const priorSave=save,api=V52_ARCHIVES,oldRemember=api.rememberEnding;save=()=>{};api.rememberEnding=()=>{};F155.bulk(true);
  const step=()=>{F155.normalize();return CHAPTERS[state.index]?.steps[state.chapterStep];};
  const next=()=>{const st=step();choose(st.choices.findIndex(F155.allowed));};
  function reach(predicate){let n=0;while(!predicate(step())){next();if(++n>600||state.index>=26)throw Error('Cannot reach seal stage');}}
  const projection=()=>JSON.stringify({ranks:state.ranks,flags:state.flags,bond:state.bond,trust:state.trust,stepHistory:state.stepHistory,stepDecisions:state.stepDecisions,stepResults:state.stepResults,events:state.events151});
  const caps=globalThis.V63_RANK_CAPS;
  try{
   state=F155.initial();state.intro=true;state.view='story';reach(st=>st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow));const enrollment=clone(state);
   for(let mask=1;mask<64;mask++){
    const selected=keys.filter((_,i)=>mask&(1<<i));if(selected.length<2||selected.length>5)continue;
    for(let initialRank=0;initialRank<3;initialRank++){
     state=clone(enrollment);state.flags.v78LowSelected=selected;choose(0);choose(initialRank);reach(st=>String(st.heading).startsWith('大封 1/8'));
     const seed=clone(state);seed.events151={};seed.sceneChoices151={};seed.history=[];seed.chronicle=[];seed.chapterSnapshots=[];
     let setFailures=0;
     for(const choices of (continuationsOnly?[0,255]:Array.from({length:256},(_,i)=>i))){
      const picks=Array.from({length:8},(_,i)=>(choices>>i)&1),row={selected,initialRank,choices,pass:false};
      try{
       state=clone(seed);F155.prepare(state);
       for(const pick of picks){
        const before=Object.fromEntries(Object.keys(caps).map(rank=>[rank,v63RankCount(rank,state)]));choose(pick);
        for(const [rank,cap] of Object.entries(caps))if(v63RankCount(rank,state)>Math.max(cap,before[rank]))throw Error('Rank cap grew past '+rank);report.capTransitions++;
       }
       const sequential=projection();state=clone(seed);F155.prepare(state);F155.seals(picks,state.index,state.chapterStep);
       if(projection()!==sequential)throw Error('Combined seal differs');
       for(const k of keys.filter(k=>!selected.includes(k)))if(F155.person(k).admitted)throw Error('Unselected consort promoted '+k);
       // Every mask checks all seal effects. Both extreme policies continue both routes
       // for every roster/rank seed; the separate late matrix enumerates later axes.
       const after=clone(state);
       for(const route of (choices===0||choices===255?['direct','ning']:[])){
        state=clone(after);let count=0;
        while(state.index<26){const st=step();let pick=st.choices.findIndex(F155.allowed);if(st.choices.some(c=>c.v74ShaoThenZhang))pick=st.choices.findIndex(c=>F155.allowed(c)&&(route==='ning'?c.v74ShaoThenZhang:c.effects?.flags?.v44NewEmpress==='zhangyuanzhao'));if(pick<0)throw Error('No legal continuation '+route+' '+state.index+':'+state.chapterStep);choose(pick);if(++count>500)throw Error('Continuation loop');}
        if(!state.flags.v82FinaleComplete)throw Error('Ending absent');report.continuations++;
       }
       row.pass=true;
      }catch(error){row.error=error.message;report.failures.push(row);setFailures++;}
      report.combinations++;
     }
     report.sets++;report.rows.push({selected,initialRank,combinations:256,failures:setFailures});await sealProgress155({phase:'seal-cross',sets:report.sets,combinations:report.combinations,failures:report.failures.length});
    }
   }
   report.pass=report.failures.length===0;
  }finally{save=priorSave;api.rememberEnding=oldRemember;F155.bulk(false);}
  return report;
 },continuationsOnly);
 fs.writeFileSync(path.join(out,continuationsOnly?'大封新链衔接复验.json':'八项大封全组合.json'),JSON.stringify(report,null,2));assert.deepEqual(report.failures,[]);assert.equal(report.combinations,continuationsOnly?336:43008);console.log(JSON.stringify({pass:report.pass,sets:report.sets,combinations:report.combinations,capTransitions:report.capTransitions,continuations:report.continuations}));
};
