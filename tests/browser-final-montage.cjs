const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'tests/results');
const report={checks:[],routes:[],errors:[],screenshots:[]};
const record=(name,value=true)=>{report.checks.push({name,value});console.log(name)};
const write=()=>fs.writeFileSync(path.join(out,'final-montage-v147.json'),JSON.stringify(report,null,2));
async function main(){
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));page.on('dialog',d=>d.accept());
  const body=fs.readFileSync(path.join(root,'app.js'),'utf8').replace('/* Source: src/boot-2.js */','globalThis.M147={acts:FINAL_MEMORIES147,scenes:finalMemoryScenes147,beats:finalMontageBeats147,initial:initial136,prepare:prepare139,bulk:x=>bulk140=x,allowed:allowed136,val:val136,result:result136,culture:typeof CULTURE_LIFE_SCENES===\"undefined\"?[]:CULTURE_LIFE_SCENES};\n/* Source: src/boot-2.js */');
  await page.route('**/app.js',r=>r.fulfill({contentType:'text/javascript',body}));
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);
  const before=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/final-montage-before147.json'),'utf8'));
  for(const route of ['direct','ning']){
   const data=await page.evaluate(route=>{
    const prior=save;save=()=>{};M147.bulk(true);const scenes=[];let culturalParagraphs=0;
    try{
     state=M147.initial();state.intro=true;state.view='story';M147.prepare(state);
     while(state.index<CHAPTERS.length){
      M147.prepare(state);const c=CHAPTERS[state.index],s=c.steps[state.chapterStep];
      if(s.v95ManualRoster||s.choices.some(x=>x.v78ConfirmLow))state.flags.v78LowSelected=['cao2','zhao2','lin2','ye2','du2'];
      const pick=s.choices.some(x=>x.v74ShaoThenZhang)?s.choices.findIndex(x=>route==='ning'?x.v74ShaoThenZhang:x.effects?.flags?.v44NewEmpress==='zhangyuanzhao'):s.choices.findIndex(M147.allowed);
      const strip=x=>String(x??'').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' '),text=M147.val(s.text,[]);
      // Preserve the separate culture update made concurrently in this shared
      // workspace; normalize only its explicitly registered added paragraphs.
      const added=M147.culture.filter(e=>e.chapter===c.title&&e.scene===s.heading).flatMap(e=>M147.val(e.add,[])).map(strip);
      const actual=(Array.isArray(text)?text:[text]).map(strip);culturalParagraphs+=actual.filter(p=>added.includes(p)).length;
      scenes.push({heading:s.heading,text:actual.filter(p=>!added.includes(p)),choices:s.choices.map(x=>({label:strip(M147.val(x.label,'')),result:M147.result(x)}))});
      choose(pick);if(scenes.length>650)throw Error('loop');
     }
     return {scenes,culturalParagraphs,memories:M147.scenes(),beats:M147.beats(),end:JSON.parse(JSON.stringify(state))};
    }finally{save=prior;M147.bulk(false)}
   },route);
   const old=before.routes.find(x=>x.route===route);
   // The later user-approved readability edit changes this one scene's prose.
   // Keep the historical fixture intact and accept only that explicit change.
   const rules148=text=>text.flatMap(p=>p.startsWith('第一张写旧物复验至少两处')?[
    '第一张：旧物要复查，至少找两拨人分开查一遍。原来经手的人，不能自己查自己。',
    '第二张：药送到病人手里之前，最后是谁接过、谁送过去的，都要写下姓名。不能只写“有人替班”。',
    '第三张：妃嫔牵涉案子，也不能一查就把照顾她的人全换掉。没有发现危险，就让她熟悉的宫人和太医继续照护。'
   ]:p.startsWith('含章把“本人供述”旁边添了“问询时在场者”')?['含章又添了一条：问话的时候，谁在场，也得记下来。和妃把旧建议放在后面：有人主动说自己病了、要求看太医，先让人看病，不能先拿来问罪。']:[p]);
   const expected=old.scenes.map(x=>({heading:x.heading,text:x.heading==='第八日 · 三张新规贴上墙'?rules148(x.text):x.text,choices:x.choices.map(z=>({label:z.label,result:z.result}))}));
   // This fixture predates the completed epidemic, romance, neighbor and birth
   // tasks. Verify their prose changes explicitly, while preserving ALL choice
   // and terminal-state comparisons below.
   const epidemicSource=fs.readFileSync(path.join(root,'src/data/epidemic-rewrite.js'),'utf8');
   const changedHeadings=new Set([...epidemicSource.matchAll(/\bE\('([^']+)'/g)].map(m=>m[1]));
   for(const match of epidemicSource.matchAll(/\bput\('[^']+','([^']+)'/g))changedHeadings.add(match[1]);
   for(const heading of ['十月十九 · 榻边那个“误”字','“臣妾不是从哪个州府来的”','承熙三年七月 · 一场骤雨，低位宫里各忙各的','承熙六年五月 · 玉牒又添一笔','五月初八 · 三个新人把夜膳送错到景阳宫','正月十六 · 新封号叫错的第一天','九月十五，永和宫那声“元照”被孩子听见了','同夜 · 他睡着以后'])changedHeadings.add(heading);
   const romanceSource=fs.readFileSync(path.join(root,'src/compat/v140-zhang-shen-romance-line.js'),'utf8');
   const romanceNeedle=romanceSource.match(/appendText\(step\(vacancy,'([^']+)'/);
   if(romanceNeedle)for(const scene of data.scenes)if(scene.heading.includes(romanceNeedle[1]))changedHeadings.add(scene.heading);
   assert.equal(data.scenes.length,expected.length);
   const approvedProse=[];
   data.scenes.forEach((scene,i)=>{
    const prior=expected[i];assert.equal(scene.heading,prior.heading);
    assert.deepEqual(scene.choices,prior.choices,scene.heading+' choices or results changed');
    if(JSON.stringify(scene.text)!==JSON.stringify(prior.text)){
     assert.ok(changedHeadings.has(scene.heading),'unregistered prose change: '+scene.heading);
     approvedProse.push({heading:scene.heading,before:prior.text,after:scene.text});
    }
   });
   fs.writeFileSync(path.join(root,'audit/历史Prompt总审计_2026-10-11',`走马灯旧基线已批准差异_${route}.json`),JSON.stringify(approvedProse,null,2));
   for(const key of ['flags','ranks','bond','trust','mind','history','chronicle','chapterSnapshots'])assert.deepEqual(data.end[key],old.end[key],route+' old state '+key);
   assert.equal(data.memories.length,7);assert.ok(data.memories.every(a=>a.scenes.length>=1));
   const total=data.memories.reduce((n,a)=>n+a.scenes.length,0);assert.equal(total,19);
   assert.ok(data.memories[6].scenes[0].quote.includes('病死'));
   report.routes.push({route,scenes:data.scenes.length,concurrentCultureParagraphs:data.culturalParagraphs,memories:data.memories,beats:data.beats.length,duration:data.beats.reduce((n,b)=>n+b.duration,0)});
   record(route+': approved prose changes registered; choices, outcomes and terminal state preserved; 19 exact memories');
  }
  // Unvisited scenes and captured absences never acquire invented excerpts.
  const missing=await page.evaluate(()=>{const prior=state.history[0];delete state.history[0];const absent=M147.scenes()[0].scenes.some(s=>s.id==='gu-cup');state.history[0]=prior;state.finalMemories147['gu-cup']=null;const captured=M147.scenes()[0].scenes.some(s=>s.id==='gu-cup');delete state.finalMemories147;return {absent,captured,legacy:M147.scenes().map(a=>a.scenes.length)}});
  assert.equal(missing.absent,false);assert.equal(missing.captured,false);assert.deepEqual(missing.legacy,[3,2,3,3,3,2,3]);record('unvisited / unavailable excerpts excluded; legacy saves verified');
  const mismatch=await page.evaluate(()=>{const fate=state.flags.v75ShenFate;state.flags.v75ShenFate='fief';const shown=M147.scenes()[6].scenes.some(s=>s.id==='shen-farewell');state.flags.v75ShenFate=fate;return shown});assert.equal(mismatch,false);record('inconsistent history / current fate excluded');
  // Use the game's real choice engine to execute each of Shen's three fates.
  for(const pick of [0,1,2]){
   await page.evaluate(async()=>{const si=TEST140.scenes(23,'direct').findIndex(s=>s.heading.includes('雪落永和宫'));await TEST140.jump(23,si,'direct','preset')});
   // The existing chapter marks this step narrative, showing only Continue.
   // Its three legacy choice results remain in the official engine. Exercise
   // them here without changing that earlier chapter or its UI.
   if(pick===2)await page.evaluate(()=>{state.flags.v60DataBoundary=true}); // canonical legacy-save precondition
   assert.equal(await page.evaluate(pick=>M147.allowed(CHAPTERS[state.index].steps[state.chapterStep].choices[pick]),pick),true);
   await page.evaluate(pick=>choose(pick),pick);
   await page.evaluate(()=>{
    const prior=save;save=()=>{};M147.bulk(true);
    try{while(state.index<CHAPTERS.length){M147.prepare(state);const st=CHAPTERS[state.index].steps[state.chapterStep];choose(st.choices.findIndex(M147.allowed));}state.view='people';}
    finally{save=prior;M147.bulk(false);render();}
   });
   const quote=await page.evaluate(()=>M147.scenes()[6].scenes[0].quote);
   assert.equal(quote,['元照，别把我写成病死。','喝完再换，别守着一种味道。','来。只喝茶，不带折子。'][pick]);record('Shen selected farewell '+pick,quote);
  }
  // Enter from the actual last chapter and click all seven scenes as a player.
  await page.evaluate(()=>TEST140.jump(25,0,'direct','preset'));
  assert.equal(await page.locator('.final-montage').count(),0);
  for(let i=0;i<7;i++)await page.locator('[data-choice]:not(:disabled)').first().click();
  await page.locator('.finale-146').waitFor();
  assert.equal(await page.locator('.final-montage').count(),0);
  await page.locator('#finale-show-all').click();
  assert.equal(await page.locator('.finale-line[hidden]').count(),0);
  await page.locator('#finale-memory-start').click();
  await page.locator('.final-montage').waitFor();
  await page.waitForTimeout(3900);
  await page.locator('#memory-auto').click();
  const paused=await page.evaluate(()=>({...state.finalMontage147}));
  await page.waitForTimeout(350);assert.equal(await page.evaluate(()=>state.finalMontage147.elapsed),paused.elapsed);
  await page.locator('#v52-archives').click();
  await page.locator('[data-save-slot="1"]').click();
  await page.evaluate(()=>document.querySelector('dialog[open]')?.close());
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives)).slots['1'].state.finalMontage147);
  assert.equal(saved.beat,paused.beat);assert.equal(saved.elapsed,paused.elapsed);
  await page.locator('#memory-next').click();assert.notEqual(await page.evaluate(()=>state.finalMontage147.beat),saved.beat);
  await page.locator('#v52-archives').click();await page.locator('[data-load-slot="1"]').click();
  await page.evaluate(()=>document.querySelector('dialog[open]')?.close());
  assert.equal(await page.evaluate(()=>state.finalMontage147.beat),saved.beat);
  await page.reload();assert.equal(await page.evaluate(()=>state.finalMontage147.beat),saved.beat);
  assert.equal(await page.evaluate(()=>state.finalMontage147.paused),true);record('pause, manual save/load, reload retain live montage position');
  const screenshot=async name=>{await page.waitForTimeout(1400);await page.screenshot({path:path.join(out,name)});report.screenshots.push(name)};
  await screenshot('montage-desktop-v147.png');
  await page.locator('[data-view="chronicle"]').first().click();assert.equal(await page.locator('.final-montage').count(),0);
  await page.locator('[data-view="story"]').first().click();assert.equal(await page.locator('.final-montage').count(),1);record('existing chronicle navigation and return resume playback');
  for(const size of [{width:390,height:844},{width:320,height:568},{width:667,height:375},{width:1440,height:900}]){
   await page.setViewportSize(size);await page.waitForTimeout(150);
   const layout=await page.evaluate(()=>{const r=document.querySelector('.final-montage').getBoundingClientRect(),c=document.querySelector('.memory-controls').getBoundingClientRect(),cap=document.querySelector('.memory-captions').getBoundingClientRect(),pics=document.querySelector('.memory-pictures').getBoundingClientRect();return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,top:r.top,bottom:r.bottom,controlsBottom:c.bottom,captionsBottom:cap.bottom,picturesBottom:pics.bottom,captionsTop:cap.top,stageHeight:document.querySelector('.memory-stage').clientHeight}});
   assert.ok(layout.scrollWidth<=size.width+1);assert.ok(layout.controlsBottom<=size.height+1);assert.ok(layout.captionsBottom<layout.controlsBottom);assert.ok(layout.stageHeight>130);
   record('layout '+size.width+'×'+size.height,layout);
   if(size.width===390)await screenshot('montage-mobile-v147.png');
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.memory-still').waitFor();assert.equal(await page.locator('.memory-still').count(),1);await page.emulateMedia({reducedMotion:'no-preference'});
  const keyBeat=await page.evaluate(()=>state.finalMontage147.beat);await page.locator('.memory-stage').focus();await page.keyboard.press('Space');assert.equal(await page.evaluate(()=>state.finalMontage147.beat),keyBeat+1);record('keyboard Space advances one memory');
  await page.locator('#memory-auto').click();await page.locator('#memory-sound').click();assert.equal(await page.locator('#memory-sound').getAttribute('aria-pressed'),'true');await page.locator('#memory-sound').click();
  await page.locator('#v52-archives').click();await page.waitForTimeout(100);
  const modalElapsed=await page.evaluate(()=>state.finalMontage147.elapsed);await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>state.finalMontage147.elapsed),modalElapsed);
  await page.evaluate(()=>document.querySelector('dialog[open]')?.close());await page.waitForTimeout(160);assert.ok(await page.evaluate(()=>state.finalMontage147.elapsed)>modalElapsed);record('enabled audio toggles; open save dialog freezes active playback');
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))});
  const hidden=await page.evaluate(()=>state.finalMontage147.elapsed);await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>state.finalMontage147.elapsed),hidden);
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'))});record('reduced motion and hidden-tab pause');
  await page.locator('#memory-skip').click();assert.equal(await page.evaluate(()=>state.finalMontage147.status),'complete');
  await page.reload();assert.equal(await page.locator('.final-montage').count(),0);await page.waitForTimeout(4200);assert.equal(await page.locator('.final-montage').count(),0);record('skip finishes existing ending; reload cannot loop');
  // A complete natural-speed viewing, with native timers and all dissolves.
  if(process.argv.includes('--mobile-watch'))await page.setViewportSize({width:390,height:844});
  await page.locator('#finale-memory-start').click();
  const expected=await page.evaluate(()=>M147.beats().map(b=>b.id)),seen=[];
  const started=Date.now();let frames=0;
  while(await page.locator('.final-montage').count()){
   const frame=await page.evaluate(()=>({id:document.querySelector('.final-montage')?.dataset.beat,layers:document.querySelectorAll('.memory-picture').length,status:state.finalMontage147.status}));
   if(frame.id&&!seen.includes(frame.id)){seen.push(frame.id);console.log('viewing '+frame.id);}
   frames=Math.max(frames,frame.layers);
   const tender=process.argv.includes('--mobile-watch')?'montage-tender-mobile-v147.png':'montage-tender-v147.png',heading=process.argv.includes('--mobile-watch')?'montage-title-mobile-v147.png':'montage-title-v147.png';
   if(frame.id==='shen-everyday'&&!report.screenshots.includes(tender)){await page.waitForTimeout(900);await screenshot(tender)}
   if(frame.id==='title'&&!report.screenshots.includes(heading)){await page.waitForTimeout(1500);await screenshot(heading)}
   if(Date.now()-started>110000)throw Error('natural playback stalled');
   await page.waitForTimeout(230);
  }
  assert.deepEqual(seen,expected);assert.ok(frames>=2);assert.ok(Date.now()-started>=84000);assert.equal(await page.evaluate(()=>state.finalMontage147.status),'complete');record('natural-speed complete ending experience',{seen,milliseconds:Date.now()-started,crossfadeLayers:frames});
  // Failed assets and unavailable audio must still leave usable light/text.
  await page.route('**/assets/**',r=>r.abort());await page.evaluate(()=>{window.AudioContext=undefined;window.webkitAudioContext=undefined});
  await page.locator('#finale-memory-start').click();await page.locator('#memory-auto').click();await page.locator('#memory-next').click();await page.waitForTimeout(2400);
  assert.ok((await page.locator('.memory-quote').textContent()).length>0);assert.equal(await page.locator('.memory-lantern').isVisible(),true);
  await page.locator('#memory-sound').click();assert.equal(await page.locator('#memory-sound').isDisabled(),true);
  for(let i=0;i<40&&await page.locator('.final-montage').count();i++)await page.locator('#memory-next').click();
  assert.equal(await page.evaluate(()=>state.finalMontage147.status),'complete');record('all images missing / audio unavailable: continues and finishes');
  assert.deepEqual(report.errors,[]);report.pass=true;write();console.log('FINAL MONTAGE PASS');
 }catch(e){report.failure=e.stack;write();throw e}finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
