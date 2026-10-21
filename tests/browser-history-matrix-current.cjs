const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require('/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'audit/四项收尾_2026-10-13');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const report={pass:false,branches:[],rosters:[],errors:[],limitations:['Each branch starts from a reachable default-route prefix, then uses actual engine choices to the ending. It does not enumerate all cross-branch combinations.','Roster sets use canonical order; other click orders and every child sex/death combination remain outside this matrix.']};
 try{
  const p=await b.newPage({reducedMotion:'reduce'});p.on('pageerror',e=>report.errors.push(e.message));
  const body=fs.readFileSync(path.join(root,'app.js'),'utf8').replace('/* Source: src/boot-2.js */','globalThis.M151={initial:initial136,prepare:prepare139,bulk:x=>bulk140=x,allowed:allowed136,val:val136,known:known138,biography:historyBiography138};\n/* Source: src/boot-2.js */');
  await p.route('**/app.js',r=>r.fulfill({contentType:'text/javascript',body}));
  await p.goto(pathToFileURL(path.join(root,'index.html')).href);
  await p.exposeFunction('matrixProgress155',progress=>{fs.writeFileSync(path.join(out,'单项与初封进度.json'),JSON.stringify(progress));console.log(JSON.stringify(progress))});
  const result=await p.evaluate(async()=>{
   const branches=[],rosters=[],failures=[],copy=x=>JSON.parse(JSON.stringify(x));
   const oldSave=save;save=()=>{};M151.bulk(true);
   const pickFor=route=>{
    const st=CHAPTERS[state.index]?.steps?.[state.chapterStep];
    if(!st)return -1;
    if(st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow))state.flags.v78LowSelected=state.flags.v78LowSelected?.length?state.flags.v78LowSelected:['cao2','zhao2','lin2','ye2','du2'];
    if(st.choices.some(c=>c.v74ShaoThenZhang))return st.choices.findIndex(c=>M151.allowed(c)&&(route==='ning'?c.v74ShaoThenZhang:c.effects?.flags?.v44NewEmpress==='zhangyuanzhao'));
    return st.choices.findIndex(M151.allowed);
   };
   const next=route=>{M151.prepare(state);const before=state.index+':'+state.chapterStep,pick=pickFor(route);if(pick<0)throw Error('No reachable choice '+before);choose(pick);if(before===state.index+':'+state.chapterStep)throw Error('Stalled '+before)};
   const finish=route=>{let count=0;while(state.index<26){if(++count>600)throw Error('More than 600 remaining scenes');next(route)}return count};
   try{
    for(const route of ['direct','ning']){
     const targets=[];state=M151.initial();state.intro=true;state.view='story';M151.prepare(state);
     let n=0;
     while(state.index<26){
      M151.prepare(state);const st=CHAPTERS[state.index].steps[state.chapterStep];
      if(st.choices.length>1)targets.push({state:copy(state),ci:state.index,si:state.chapterStep,title:CHAPTERS[state.index].title,heading:st.heading,choices:st.choices.map((c,i)=>({i,label:M151.val(c.label,''),allowed:M151.allowed(c)}))});
      next(route);if(++n>600)throw Error('Baseline did not finish');
     }
     for(const target of targets)for(const option of target.choices.filter(c=>c.allowed)){
      state=copy(target.state);M151.prepare(state);
      const row={route,chapter:target.ci+1,scene:target.si+1,heading:target.heading,pick:option.i,label:option.label};
      try{
       choose(option.i);row.after={index:state.index,step:state.chapterStep,ranks:copy(state.ranks)};
       if(state.index===target.ci&&state.chapterStep===target.si)throw Error('Target choice did not advance');
       row.remaining=finish(route);row.ending=state.index;row.fates={shen:state.flags.v75ShenFate,shunwang:state.flags.shunwangFinalFate,daila:state.flags.v56DailaFate,lu:state.flags.v69HiddenPrinceFinal,zhouLeaves:state.flags.v74ZhouLeavesWithDaughter};
       if(!state.flags.v82FinaleComplete)throw Error('Reached index 26 without finale flag');
       for(const key of M151.known())M151.biography(key,state);
       row.pass=true;
      }catch(e){row.pass=false;row.error=e.message;failures.push(row)}branches.push(row);
      if(branches.length%32===0){await matrixProgress155({phase:'branches',completed:branches.length,failures:failures.length});await new Promise(resolve=>setTimeout(resolve,0));}
     }
    }
    // Every unordered 2–5-person set and all three initial-rank modes.
    const keys=['cao2','zhao2','lin2','ye2','du2','su2'];
    state=M151.initial();state.intro=true;state.view='story';M151.prepare(state);
    while(!(state.index===5&&CHAPTERS[5].steps[state.chapterStep].v95ManualRoster))next('direct');
    const selection=copy(state);
    for(let mask=1;mask<64;mask++){
     const selected=keys.filter((k,i)=>mask&(1<<i));if(selected.length<2||selected.length>5)continue;
     for(let rankMode=0;rankMode<3;rankMode++){
      state=copy(selection);state.flags.v78LowSelected=selected.slice();M151.prepare(state);choose(0);choose(rankMode);
      const row={selected,rankMode,ranks:copy(state.ranks)};
      try{
       if(JSON.stringify(state.flags.lowConsorts)!==JSON.stringify(selected))throw Error('Enrollment differs from selection');
       for(const k of selected){const expected=rankMode===0?'常在':rankMode===1&&k==='zhao2'?'常在':'答应';if(state.ranks[k]!==expected)throw Error(k+' expected '+expected+' got '+state.ranks[k]);}
       for(const k of keys.filter(k=>!selected.includes(k)))if(v138Person(k).admitted)throw Error(k+' unselected but admitted');
       row.remaining=finish('direct');row.ending=state.index;row.pass=true;
      }catch(e){row.pass=false;row.error=e.message;failures.push(row)}rosters.push(row);
      if(rosters.length%16===0){await matrixProgress155({phase:'rosters',completed:rosters.length,failures:failures.length});await new Promise(resolve=>setTimeout(resolve,0));}
     }
    }
   }finally{M151.bulk(false);save=oldSave;}
   return {branches,rosters,failures};
  });
  Object.assign(report,result);assert.deepEqual(result.failures,[]);assert.deepEqual(report.errors,[]);report.pass=true;
 }finally{fs.writeFileSync(path.join(out,'当前单项与初封矩阵.json'),JSON.stringify(report,null,2));await b.close();}
 console.log(JSON.stringify({pass:report.pass,branches:report.branches.length,rosters:report.rosters.length,errors:report.errors}));
})().catch(e=>{console.error(e);process.exit(1)});
