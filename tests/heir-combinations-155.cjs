const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
module.exports=async({page,out})=>{
 await page.exposeFunction('heirProgress155',progress=>{fs.writeFileSync(path.join(out,'皇嗣验收进度.json'),JSON.stringify(progress));console.log(JSON.stringify(progress))});
 const report=await page.evaluate(async()=>{
  const keys=['cao2','zhao2','lin2','ye2','du2','su2'],report={pass:false,rosterOrders:0,pregnancies:0,deathDisplays:0,yearbookComparisons:0,mothers:new Set(),sexPairs:new Set(),cases:[],failures:[],scope:'All 2–5-person roster sets, all click orders and three initial-rank modes; all four year-3 preferences and every available two-round maternity choice. Actual born states are checked; all four dynamic-heir death masks are separately marked as saved-state compatibility fixtures.'};
  const clone=x=>JSON.parse(JSON.stringify(x)),oldSave=save,api=V52_ARCHIVES,remember=api.rememberEnding;
  save=()=>{};api.rememberEnding=()=>{};F155.bulk(true);
  const current=()=>{F155.normalize();return CHAPTERS[state.index]?.steps?.[state.chapterStep];};
  const next=()=>{const st=current();choose(st.choices.findIndex(F155.allowed));};
  const reach=predicate=>{let n=0;while(!predicate(current())){next();if(++n>600||state.index>=26)throw Error('Cannot reach model stage');}};
  const permutations=a=>a.length<=1?[a]:a.flatMap((x,i)=>permutations(a.filter((_,j)=>j!==i)).map(p=>[x,...p]));
  const semantic=()=>JSON.stringify({index:state.index,chapterStep:state.chapterStep,ranks:state.ranks,flags:state.flags,bond:state.bond,trust:state.trust,mind:state.mind,stepHistory:state.stepHistory,stepResults:state.stepResults,stepDecisions:state.stepDecisions,events:state.events151});
  try{
   state=F155.initial();state.intro=true;state.view='story';reach(st=>st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow));const enrollment=clone(state);
   for(let mask=1;mask<64;mask++){
    const selected=keys.filter((_,i)=>mask&(1<<i));if(selected.length<2||selected.length>5)continue;
    for(let rank=0;rank<3;rank++){
     let rankSeed;
     for(const order of permutations(selected)){
      state=clone(enrollment);state.flags.v78LowSelected=order;F155.prepare(state);choose(0);choose(rank);
      if(JSON.stringify(state.flags.lowConsorts)!==JSON.stringify(selected))throw Error('Click order changed roster');
      for(const k of selected){const expected=rank===0?'常在':rank===1&&k==='zhao2'?'常在':'答应';if(state.ranks[k]!==expected)throw Error('Wrong initial rank '+k);}
      if(!rankSeed)rankSeed=clone(state);else if(JSON.stringify(F155.snapshot())!==JSON.stringify({mind:rankSeed.mind,ranks:rankSeed.ranks,bond:rankSeed.bond,trust:rankSeed.trust,flags:rankSeed.flags}))throw Error('Order changed initial state');
      report.rosterOrders++;
     }
     state=clone(rankSeed);reach(st=>st.choices.some(c=>c.effects?.flags?.year3Favor));const favorSeed=clone(state),favorChoices=current().choices;
     for(let favor=0;favor<favorChoices.length;favor++){
      state=clone(favorSeed);choose(favor);reach(st=>st.choices.some(c=>c.v40Heir?.round===1));const firstSeed=clone(state),firstOptions=current().choices.map((c,i)=>({i,c})).filter(({c})=>F155.allowed(c));
      for(const first of firstOptions){
       state=clone(firstSeed);choose(first.i);const secondSeed=clone(state),secondOptions=current().choices.map((c,i)=>({i,c})).filter(({c})=>F155.allowed(c));
       for(const second of secondOptions){
        state=clone(secondSeed);choose(second.i);const afterSequential=semantic();
        // Every actual pair is compared with the new consolidated UI engine.
        state=clone(firstSeed);F155.prepare(state);F155.yearbook([first.i,second.i],state.index,state.chapterStep);if(semantic()!==afterSequential)throw Error('Yearbook differs from separate choices');report.yearbookComparisons++;
        reach(st=>state.index===7&&state.chapterStep===3);
        const heirs=clone(state.flags.extraHeirs||{}),children=F155.children(),row={selected,rank,favor,first:first.c.v40Heir?.key||'skip',second:second.c.v40Heir?.key||'skip',sex:[heirs[1]?.gender||'-',heirs[2]?.gender||'-'].join(''),pass:true};
        try{
         const names=children.map(c=>c.name);if(new Set(names).size!==names.length)throw Error('Duplicate names');
         for(const round of [1,2]){
          const heir=heirs[round],child=children.find(c=>c.key==='extraHeir'+round);
          if(heir?.skipped){if(child)throw Error('Skipped heir present');continue;}
          if(!heir?.born||!child)throw Error('Birth missing '+round);
          if(child.mother!==heir.mother)throw Error('Mother mismatch');report.mothers.add(heir.mother);
          if(keys.includes(heir.mother)&&!selected.includes(heir.mother))throw Error('Unselected mother conceived');
         }
         if(!heirs[1]?.skipped&&!heirs[2]?.skipped&&heirs[1].mother===heirs[2].mother)throw Error('Pregnant mother reused');
         report.sexPairs.add(row.sex);
         const saved=clone(state);
         for(let deaths=0;deaths<4;deaths++){
          const fixture=clone(saved);fixture.flags.v46ChildVictims=[1,2].filter(r=>deaths&(1<<(r-1))).map(r=>'extraHeir'+r);const list=F155.children(fixture);
          for(const round of [1,2]){const child=list.find(c=>c.key==='extraHeir'+round);if(child&&child.dead!==Boolean(deaths&(1<<(round-1))))throw Error('Death status mismatch');}
          report.deathDisplays++;
         }
        }catch(error){row.pass=false;row.error=error.message;report.failures.push(row);}
        report.cases.push(row);report.pregnancies++;
       }
      }
     }
    }
    await heirProgress155({phase:'heir-cross',rosterOrders:report.rosterOrders,pregnancies:report.pregnancies,deathDisplays:report.deathDisplays,failures:report.failures.length});
   }
   report.pass=report.failures.length===0;
  }finally{save=oldSave;api.rememberEnding=remember;F155.bulk(false);}
  report.mothers=[...report.mothers];report.sexPairs=[...report.sexPairs];return report;
 });
 fs.writeFileSync(path.join(out,'皇嗣与留牌全组合.json'),JSON.stringify(report,null,2));assert.deepEqual(report.failures,[]);assert.equal(report.rosterOrders,3690);assert.equal(report.yearbookComparisons,report.pregnancies);assert.deepEqual(['FF','FM','MF','MM'].filter(pair=>!report.sexPairs.includes(pair)),[]);console.log(JSON.stringify({pass:report.pass,rosterOrders:report.rosterOrders,pregnancies:report.pregnancies,deathDisplays:report.deathDisplays,yearbookComparisons:report.yearbookComparisons,mothers:report.mothers,sexPairs:report.sexPairs}));
};
