const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
module.exports=async({page,root,out})=>{
 const old=await page.context().newPage(),errors=[];old.on('pageerror',e=>errors.push(e.message));
 const raw=fs.readFileSync(path.join(root,'backups/four-remaining-20261013/app.js'),'utf8').replace('/* Source: src/boot-2.js */','globalThis.OLD155={initial:initial136,normalize:normalize136,allowed:allowed136,bulk:x=>bulk140=x};\n/* Source: src/boot-2.js */');
 await old.route('**/app.js',r=>r.fulfill({contentType:'text/javascript',body:raw}));await old.goto(pathToFileURL(path.join(root,'index.html')).href);
 const packs=await old.evaluate(()=>{const packs=[],prior=save,remember=V52_ARCHIVES.rememberEnding;save=()=>{};V52_ARCHIVES.rememberEnding=()=>{};OLD155.bulk(true);try{for(const route of ['direct','ning']){state=OLD155.initial();state.intro=true;state.view='story';let n=0;while(state.index<26){OLD155.normalize();const st=CHAPTERS[state.index].steps[state.chapterStep];if(st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow))state.flags.v78LowSelected=['cao2','zhao2','lin2','ye2','du2'];if(state.index===24&&[0,3,10].includes(state.chapterStep))packs.push({route,pack:V52_ARCHIVES.pack()});let pick=st.choices.findIndex(OLD155.allowed);if(st.choices.some(c=>c.v74ShaoThenZhang))pick=st.choices.findIndex(c=>route==='ning'?c.v74ShaoThenZhang:c.effects?.flags?.v44NewEmpress==='zhangyuanzhao');choose(pick);if(++n>600)throw Error('Old route loop');}packs.push({route,pack:V52_ARCHIVES.pack()});}}finally{save=prior;V52_ARCHIVES.rememberEnding=remember;OLD155.bulk(false);}return packs;});await old.close();assert.deepEqual(errors,[]);
 const report={pass:false,oldArchives:[],newArchives:[]};
 for(const {route,pack} of packs)for(const schema of [140,139]){
  const result=await page.evaluate(({pack,schema})=>{const p=JSON.parse(JSON.stringify(pack));p.state.runtimeSchema=schema;V52_ARCHIVES.restore(p,false);F155.normalize();return {index:state.index,step:state.chapterStep,heading:CHAPTERS[state.index]?.steps?.[state.chapterStep]?.heading||'',newBranch:!!state.flags.v155SevereArcChosen,departure:!!state.flags.v81PrinceOpenEnding,notice:state.stateRepairNotice||'',history:state.history,stepHistory:state.stepHistory};},{pack,schema});
  assert.equal(result.index,pack.state.index);assert.equal(result.step,pack.state.chapterStep);assert.equal(result.heading,pack.heading);assert.equal(result.newBranch,false);assert.equal(result.departure,!!pack.state.flags.v81PrinceOpenEnding);assert.ok(!result.notice.includes('不一致'));assert.deepEqual(result.history,pack.state.history);assert.deepEqual(result.stepHistory,pack.state.stepHistory);report.oldArchives.push({route,schema,index:result.index,step:result.step,heading:result.heading,preserved:true});
 }
 for(const route of ['direct','ning']){
  await page.evaluate(route=>TEST140.jump(24,0,route,'preset'),route);
  for(let i=0;i<4;i++){
   const packed=await page.evaluate(()=>V52_ARCHIVES.pack());assert.equal(packed.sceneId,'scene-155-prince-'+(i+1));
   const result=await page.evaluate(pack=>{state=F155.initial();F155.prepare(state);V52_ARCHIVES.restore(pack,false);F155.normalize();const st=CHAPTERS[state.index].steps[state.chapterStep];const data={id:SceneHistory151.position(state).sceneId,heading:st.heading,count:CHAPTERS[24].steps.filter(s=>s.v155SeverePrince).length};choose(0);return data;},packed);
   assert.equal(result.id,packed.sceneId);assert.equal(result.heading,packed.heading);assert.equal(result.count,4);report.newArchives.push({route,id:result.id,preserved:true});
  }
  assert.equal(await page.evaluate(()=>state.flags.v81PrinceOpenEnding),true);
 }
 report.pass=true;fs.writeFileSync(path.join(out,'严教新链与旧档兼容.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({pass:true,oldArchives:report.oldArchives.length,newArchives:report.newArchives.length}));
};
