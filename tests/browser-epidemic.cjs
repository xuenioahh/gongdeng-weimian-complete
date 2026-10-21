const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require('/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'audit/疫情篇专项重写');
const before=JSON.parse(fs.readFileSync(path.join(out,'runtime-before.json')));
const report={structures:0,states:0,scenes:[],branches:[],errors:[]};
const serialize=v=>JSON.parse(JSON.stringify(v));
function engine(st){const a={...st};delete a.text;delete a.evaluated;for(const k of ['__v141HeWangRain','__v141SecondBatchTable','__v141NeighborReturns','__v140MutualChoice','__v140SharedDays','__v140RomanceTouch'])delete a[k];return a;}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});page.on('dialog',d=>d.accept());
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.waitForTimeout(600);
  const after=[];
  for(const c of before.chapters){
   await page.evaluate(({ci,route})=>TEST140.jump(ci,0,route,'preset'),{ci:c.index,route:c.route});
   const a=await page.evaluate(()=>{
    const ser=v=>JSON.parse(JSON.stringify(v,(_k,x)=>typeof x==='function'?x.toString():x));
    const c=CHAPTERS[state.index];return {index:state.index,title:c.title,date:c.date,place:c.place,flags:ser(state.flags),ranks:ser(state.ranks),people:Object.fromEntries(Object.keys(PEOPLE).map(k=>[k,v138Person(k)])),steps:c.steps.map(st=>({...ser(st),evaluated:typeof st.text==='function'?st.text(ser(state)):st.text}))};
   });
   a.route=c.route;after.push(a);
   const expectedPeople=serialize(c.people);
   // HIS-026: the old baseline kept a returned envoy inside 承露馆.
   // Normalize only this verified residence/status correction; retain every
   // other person's identity, title, admission and all engine/state checks.
   if(c.flags?.v56DailaFate==='return')Object.assign(expectedPeople.daila,{status:'离京归国',home:'珂兰',active:false});
   if(c.flags?.v56DailaFate==='hold')Object.assign(expectedPeople.daila,{status:'暂留承露馆',home:'承露馆'});
   for(const key of ['title','date','place','flags','ranks'])assert.deepEqual(a[key],c[key],`${c.route} ${c.title} ${key}`);
   assert.deepEqual(a.people,expectedPeople,`${c.route} ${c.title} people`);
   assert.equal(a.steps.length,c.steps.length);
   for(let i=0;i<c.steps.length;i++){assert.deepEqual(engine(a.steps[i]),engine(c.steps[i]),`${c.title} ${i} engine`);report.structures++;}
   report.states++;
   if([16,17,18].includes(c.index)){
    for(let si=0;si<a.steps.length;si++){
     await page.evaluate(si=>{state.chapterStep=si;state.view='story';render()},si);
     await page.locator('.environment-quiet-pending').waitFor({state:'hidden',timeout:10000});
     for(const width of [1440,390]){
      await page.setViewportSize({width,height:900});
      const surface=await page.evaluate(()=>{const c=document.querySelector('.chapter'),r=c.getBoundingClientRect();return {heading:document.querySelector('.scene-title').innerText,text:document.querySelector('.prose').innerText,width:innerWidth,scroll:document.documentElement.scrollWidth,height:c.clientHeight,content:c.scrollHeight,buttons:[...document.querySelectorAll('[data-choice]')].map(b=>({bound:typeof b.onclick==='function',inside:b.getBoundingClientRect().bottom<=r.bottom+2})),images:[...document.querySelectorAll('.moment-figure[data-scene-asset]')].map(e=>({after:e.dataset.afterParagraph,actual:e.previousElementSibling?.dataset.voiceLine}))}});
      assert.ok(surface.scroll<=surface.width+1,'horizontal overflow');assert.ok(surface.content<=surface.height+2,'clipped prose');assert.ok(surface.buttons.length&&surface.buttons.every(x=>x.bound&&x.inside),'choices');assert.ok(surface.images.every(x=>x.after===x.actual),'art anchors');
      assert.equal(surface.heading,a.steps[si].heading);report.scenes.push({route:c.route,chapter:c.index+1,scene:si+1,width,text:surface.text});
      if(c.route==='direct'&&c.index===16&&[0,2,17,20].includes(si)&&width===1440)await page.screenshot({path:path.join(out,`第17章_${si+1}.png`),fullPage:true});
     }
    }
    await page.setViewportSize({width:1440,height:900});
   }
  }
  fs.writeFileSync(path.join(out,'runtime-after.json'),JSON.stringify({chapters:after},null,2));
  console.log('structure and two-route chapter states passed',report.structures);
  // Exercise every policy/physician choice through the actual DOM, including the resulting state.
  for(const heading of ['张元照要的不是药方','三皇子的太医'])for(let pick=0;pick<3;pick++){
   const si=after.find(c=>c.index===16&&c.route==='direct').steps.findIndex(s=>s.heading===heading);
   await page.evaluate(({si})=>TEST140.jump(16,si,'direct','preset'),{si});
   await page.locator('.environment-quiet-pending').waitFor({state:'hidden',timeout:10000});
   await page.locator(`[data-choice="${pick}"]`).click();
   const data=await page.evaluate(()=>({si:state.chapterStep,flags:{...state.flags},history:state.stepHistory.slice()}));
   assert.equal(data.si,si+1);assert.equal(data.history[si],pick);
   const key=heading==='三皇子的太医'?'v47PrincePhysician':'v46EpidemicPolicy';assert.equal(data.flags[key],(heading==='三皇子的太医'?['split','kept','moved']:['full','record','old'])[pick]);
   if(heading==='三皇子的太医'){
    await page.evaluate(()=>{state.chapterStep=13;render()});
    const txt=await page.locator('.prose').innerText();assert.ok(txt.includes(['留着的医官','原来的安排','仍有医士'][pick]));
   }
   report.branches.push({heading,pick,state:data.flags[key]});
  }
  // Continuous chapter traversal; deaths and merit must still be applied by existing choices.
  await page.evaluate(()=>TEST140.jump(16,0,'direct','preset'));
  for(let si=0;si<22;si++){
   await page.locator('.environment-quiet-pending').waitFor({state:'hidden',timeout:10000});
   await page.locator('[data-choice]:not(:disabled)').first().click();
  }
  const end=await page.evaluate(()=>({index:state.index,gu:state.ranks.gu,flags:state.flags}));assert.equal(end.index,17);assert.equal(end.gu,'故皇后');assert.ok(end.flags.guDead&&end.flags.v46EpidemicEnded&&end.flags.v70XuSuspiciousDeath);report.continuous=true;
  await page.evaluate(()=>{state.index=16;state.chapterStep=20;render()});
  const ledger=await page.evaluate(()=>({text:document.querySelector('.prose').innerText,children:(state.flags.v46ChildVictims||[]).map(k=>CHILDREN[k]?.order||CHILDREN[k]?.name).filter(Boolean),victim:PEOPLE[state.flags.v46LowVictim]?.name}));
  for(const name of ledger.children)assert.ok(ledger.text.includes(name),'missing child in epidemic ledger: '+name);
  if(ledger.victim)assert.ok(ledger.text.includes(ledger.victim),'missing low consort');
  report.deathLedger=ledger;

  await page.evaluate(()=>TEST140.jump(16,20,'direct','preset'));
  const snap=()=>page.evaluate(()=>({index:state.index,step:state.chapterStep,history:state.stepHistory.slice(),flags:{...state.flags},ranks:{...state.ranks}}));
  const saved=await snap();await page.locator('#v52-archives').click();await page.locator('[data-save-slot="2"]').click();await page.locator('#modal .close').click();await page.locator('[data-choice]:not(:disabled)').first().click();await page.locator('#v52-archives').click();await page.locator('[data-load-slot="2"]').click();assert.deepEqual(await snap(),saved);
  await page.reload();await page.locator('.chapter').waitFor();assert.deepEqual(await snap(),saved);assert.equal((await page.locator('.prose').innerText()).split('西夹道石阶扫净').length-1,1);report.saveLoad=true;
  assert.deepEqual(report.errors,[]);report.passed=true;
 }finally{fs.writeFileSync(path.join(out,'功能核查.json'),JSON.stringify(report,null,2));await browser.close();}
 console.log(JSON.stringify({passed:report.passed,structures:report.structures,states:report.states,surfaces:report.scenes.length,branches:report.branches.length,continuous:report.continuous,saveLoad:report.saveLoad,errors:report.errors}));
})().catch(e=>{console.error(e);process.exitCode=1});
