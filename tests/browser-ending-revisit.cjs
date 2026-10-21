const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require('/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'audit/结局回访修复');
const quick=process.argv.includes('--quick');
const report={quick,cases:[],paths:[],errors:[],natural:[],layouts:[],pass:false};
const cases=[];for(const route of ['direct','ning'])for(const open of [false,true])for(const fate of ['death','fief','religion'])cases.push({route,open,fate});
const key=c=>[c.route,c.open?'shungong':'shunqian',c.fate].join('_');
const expose=`globalThis.ENDTEST149={initial:initial136,prepare:prepare139,allowed:allowed136,bulk:x=>bulk140=x,beats:finalMontageBeats147,acts:FINAL_MEMORIES147,body:endingFinale146,stop:()=>{stopFinaleReveal146();stopFinalMontage147()},get playing(){return montagePlayer147!==null}};\n`;
async function simulate(page,c){return page.evaluate(c=>{
 const previous=save;save=()=>{};ENDTEST149.bulk(true);
 try{
  state=ENDTEST149.initial();state.intro=true;state.view='story';let count=0;
  while(state.index<CHAPTERS.length){
   if(c.open&&state.index===25)state.flags.v81PrinceOpenEnding=true; // compatible pre-existing far-fief save state
   ENDTEST149.prepare(state);const ch=CHAPTERS[state.index],st=ch.steps[state.chapterStep];
   if(st.v95ManualRoster||st.choices.some(x=>x.v78ConfirmLow))state.flags.v78LowSelected=['cao2','zhao2','lin2','ye2','du2'];
   let pick=st.choices.findIndex(ENDTEST149.allowed);
   if(st.choices.some(x=>x.v74ShaoThenZhang))pick=st.choices.findIndex(x=>c.route==='ning'?x.v74ShaoThenZhang:x.effects?.flags?.v44NewEmpress==='zhangyuanzhao');
   if(st.choices.some(x=>x.v81SevereEducation))pick=st.choices.findIndex(x=>!!x.v81SevereEducation===c.open&&ENDTEST149.allowed(x));
   if(st.choices.some(x=>x.effects?.flags?.v75ShenFate)){
    // Existing legacy religion choice uses this precondition (also used by the
    // pre-existing montage test); do not change that story guard in this fix.
    if(c.fate==='religion')state.flags.v60DataBoundary=true;
    pick=st.choices.findIndex(x=>x.effects?.flags?.v75ShenFate===c.fate&&ENDTEST149.allowed(x));
   }
   if(pick<0)throw Error('No allowed choice '+st.heading);
   choose(pick);if(++count>650)throw Error('loop');
  }
  const box=document.createElement('div');box.innerHTML=ENDTEST149.body();
  return {flags:JSON.parse(JSON.stringify(state.flags)),ranks:JSON.parse(JSON.stringify(state.ranks)),trust:JSON.parse(JSON.stringify(state.trust)),bond:JSON.parse(JSON.stringify(state.bond)),mind:state.mind,history:JSON.parse(JSON.stringify(state.history)),chronicle:JSON.parse(JSON.stringify(state.chronicle)),memories:JSON.parse(JSON.stringify(state.finalMemories147)),beats:ENDTEST149.beats(),acts:ENDTEST149.acts,body:box.querySelector('.finale-prose')?.textContent,scenes:count};
 }finally{save=previous;ENDTEST149.bulk(false)}
},c)}
async function layout(page,label){
 const a=await page.evaluate(()=>{const root=document.querySelector('.final-montage,.finale-menu,.finale-146'),rect=root?.getBoundingClientRect(),controls=root?.querySelector('.memory-controls')?.getBoundingClientRect(),captions=root?.querySelector('.memory-captions')?.getBoundingClientRect();return {w:innerWidth,sw:document.documentElement.scrollWidth,h:innerHeight,root:rect?{top:rect.top,bottom:rect.bottom}:null,controls:controls?{top:controls.top,bottom:controls.bottom}:null,captions:captions?{top:captions.top,bottom:captions.bottom}:null,buttons:[...document.querySelectorAll('.memory-controls button,.finale-menu button,.ending-review-bar button')].map(b=>{const r=b.getBoundingClientRect();return {name:b.textContent,x:r.x,right:r.right,y:r.y,bottom:r.bottom,bound:typeof b.onclick==='function'}})}});
 assert.ok(a.sw<=a.w+1,label+' horizontal overflow');assert.ok(a.buttons.every(b=>b.bound&&b.x>=-1&&b.right<=a.w+1),label+' buttons');
 if(a.controls){assert.ok(a.controls.bottom<=a.h+1,label+' controls below viewport');assert.ok(a.captions.bottom<=a.controls.top+1,label+' captions overlap buttons')}
 report.layouts.push({label,...a});return a;
}
async function clickAll(page,expected){
 const ids=[];await page.locator('#memory-auto').click();
 while(await page.locator('.final-montage').count()){
  ids.push(await page.locator('.final-montage').getAttribute('data-beat'));await page.locator('#memory-next').click();if(ids.length>45)throw Error('manual loop');
 }
 assert.deepEqual(ids,expected);await page.locator('.finale-menu').waitFor();
}
async function nativeWatch(page,label){
 if(quick){await clickAll(page,await page.evaluate(()=>ENDTEST149.beats().map(x=>x.id)));return}

 const expected=await page.evaluate(()=>ENDTEST149.beats().map(x=>x.id)),seen=[],poems=[];const start=Date.now();
 while(await page.locator('.final-montage').count()){
  const frame=await page.evaluate(()=>({id:document.querySelector('.final-montage')?.dataset.beat,poem:document.querySelector('.memory-poem')?.textContent}));
  if(frame.id&&!seen.includes(frame.id)){seen.push(frame.id);console.log(label+' '+frame.id)}
  if(frame.poem&&!poems.includes(frame.poem))poems.push(frame.poem);
  if(Date.now()-start>115000)throw Error('native playback stalled');await page.waitForTimeout(220);
 }
 assert.deepEqual(seen,expected);assert.deepEqual(poems,await page.evaluate(()=>ENDTEST149.acts.map(x=>x.poem)));await page.locator('.finale-menu').waitFor();report.natural.push({label,beats:seen,poems,milliseconds:Date.now()-start});
}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const boundedClose=x=>Promise.race([x.close(),new Promise(r=>setTimeout(r,3000))]);
 let context,oldContext;
 try{
  fs.mkdirSync(out,{recursive:true});
  // Freeze the original ending prose, poems, quotes and outcomes before the fix.
  oldContext=await browser.newContext({reducedMotion:'reduce'});const old=await oldContext.newPage();
  const frozenApp=fs.readFileSync(path.join(root,'app.js'),'utf8');
  let navigationBefore=frozenApp;
  const units=['src/core/save.js','src/compat/archives-adapters-4.js','src/core/choice-engine.js','src/boot-2.js','src/ui/app.js','src/ui/bindings.js','src/ui/cover-view.js','src/ui/finale-reveal.js','src/ui/final-montage.js','src/core/jump.js','src/core/finale-review.js'];
  for(const file of units){
   const current='\n/* Source: '+file+' */\n'+fs.readFileSync(path.join(root,file),'utf8')+'\n';
   assert.ok(navigationBefore.includes(current),'navigation source changed during capture: '+file);
   const before=file==='src/core/finale-review.js'?'':'\n/* Source: '+file+' */\n'+fs.readFileSync(path.join(root,'backups/finale-20261010',file),'utf8')+'\n';
   navigationBefore=navigationBefore.replace(current,before);
  }
  fs.writeFileSync(path.join(out,'baseline-app.js'),navigationBefore);
  const original=navigationBefore.replace('/* Source: src/boot-2.js */',expose+'/* Source: src/boot-2.js */');
  await old.route('**/app.js',r=>r.fulfill({body:original,contentType:'text/javascript'}));
  await old.goto(pathToFileURL(path.join(root,'index.html')).href);await old.waitForTimeout(500);
  const originalVerse=await old.locator('.opening-verse').textContent();const baseline=[];
  for(const c of cases){baseline.push({key:key(c),data:await simulate(old,c)});console.log('baseline '+key(c))}
  fs.writeFileSync(path.join(out,'结局内容与状态基线.json'),JSON.stringify(baseline,null,2));await boundedClose(oldContext);
  context=await browser.newContext({viewport:{width:1440,height:900}});const page=await context.newPage();
  const body=frozenApp.replace('/* Source: src/boot-2.js */',expose+'/* Source: src/boot-2.js */');
  await page.route('**/app.js',r=>r.fulfill({body,contentType:'text/javascript'}));page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});page.on('dialog',d=>d.accept());
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.waitForTimeout(500);
  assert.equal(await page.locator('.opening-verse').textContent(),originalVerse);assert.equal(await page.locator('[data-ending-action="menu"]').count(),0);report.paths.push({path:'未完成结局 → 回访入口',result:'保持锁定'});
  // Heir alternative also covers legacy far-fief saves; current protected
  // chapter structure does not reinsert that old conditional arc. Guards stay unchanged.
  for(const c of cases){
   const data=await simulate(page,c);assert.deepEqual(data,baseline.find(x=>x.key===key(c)).data,key(c)+' literary/state changed');
   assert.equal(data.flags.v75ShenFate,c.fate);assert.equal(!!data.flags.v81PrinceOpenEnding,c.open);assert.equal(!!data.flags.v74ShaoThenZhang,c.route==='ning');
   await page.evaluate(()=>{save();render()});await page.locator('#finale-show-all').click();
   assert.match(await page.locator('.finale-prose').innerText(),c.open?/杨顺恭即位/:/杨顺谦即位/);
   await page.locator('#finale-memory-start').click();const ids=data.beats.map(x=>x.id);await clickAll(page,ids);
   await layout(page,key(c)+' end menu');
   const autosave=await page.evaluate(()=>JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives)).slots.auto);
   await page.locator('[data-ending-action="read"]').click();await page.locator('.finale-146').waitFor();
   assert.equal(await page.locator('.finale-prose').textContent(),data.body);assert.equal(await page.locator('[data-choice]').count(),0);
   await page.locator('.ending-review-bar [data-ending-action="menu"]').click();
   await page.locator('.finale-menu [data-view="people"]').click();await page.locator('.people138').waitFor();
   const flip=page.locator('.people138 [data-porcelain-key="gu"]');await flip.click();assert.equal(await flip.getAttribute('aria-pressed'),'true');await flip.click();assert.equal(await flip.getAttribute('aria-pressed'),'false');await page.locator('[data-person="gu"]').click();await page.locator('#modal[open]').waitFor();await page.locator('#close-modal138').click();assert.equal(await page.locator('#modal[open]').count(),0);
   await page.locator('.ending-review-bar [data-ending-action="menu"]').click();
   await page.locator('.finale-menu [data-ending-action="directory"]').click();await page.locator('main.chronicle').waitFor();
   assert.equal(await page.evaluate(()=>FinaleReview149.active),false);
   await page.locator(`[data-ending-key="${key(c)}"]`).click();await page.locator('.finale-menu').waitFor();
   await page.locator('.finale-menu [data-ending-action="read"]').click();assert.equal(await page.locator('.finale-prose').textContent(),data.body);
   await page.locator('.ending-review-bar [data-ending-action="menu"]').click();await page.locator('.finale-menu [data-ending-action="cover"]').click();await page.locator('.palace-opening').waitFor();
   assert.equal(await page.evaluate(()=>FinaleReview149.active),false);
   assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives)).slots.auto),autosave,'review overwrote auto');
   await page.locator('.opening-secondary [data-ending-action="menu"]').click();await page.locator('.finale-menu').waitFor();
   await page.locator('#finale-memory-start').click();assert.equal(await page.locator('.final-montage').getAttribute('data-beat'),'first-lamp');
   await page.locator('#memory-skip').click();await page.locator('.finale-menu').waitFor();await page.locator('.ending-review-bar [data-ending-action="return"]').click();
   report.cases.push({case:key(c),unchanged:true,beats:ids.length,read:true,porcelain:true,directory:true,home:true,reenter:true,autoProtected:true});console.log('route pass '+key(c));
  }
  assert.equal(await page.evaluate(()=>V52_ARCHIVES.endings().length),12);assert.equal(await page.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives)).endings).length),12);
  // Two uninterrupted, natural-speed viewings, with the existing beat durations.
  await page.evaluate(()=>TEST140.jump(25,0,'direct','preset'));for(let i=0;i<7;i++)await page.locator('[data-choice]:not(:disabled)').first().click();
  await page.locator('#finale-show-all').click();await page.locator('.final-montage').waitFor({timeout:10000});await nativeWatch(page,'首次自然播放');
  report.paths.push({path:'正式终章 → 结局正文 → 走马灯 → 全剧终',result:quick?'通过，逐幕点击':'通过，自然计时'});
  const formal=await page.evaluate(()=>JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives)).slots.auto);
  await page.locator('#finale-memory-start').click();await nativeWatch(page,'重温自然播放');
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives)).slots.auto),formal);report.paths.push({path:'全剧终 → 重温走马灯 → 全剧终',result:quick?'通过，逐幕重播且自动存档不变':'通过，完整自然播放且自动存档不变'});
  await page.locator('.ending-review-bar [data-ending-action="return"]').click();
  // Save immediately before final choice, load it, and finish again with real clicks.
  await page.evaluate(()=>TEST140.jump(25,6,'ning','preset'));
  await page.locator('#v52-archives').click();await page.locator('[data-save-slot="1"]').click();await page.locator('#modal .close').click();
  await page.locator('[data-choice]:not(:disabled)').first().click();await page.locator('#finale-show-all').click();await page.locator('#finale-memory-start').click();await page.locator('#memory-skip').click();
  await page.locator('#v52-archives').click();await page.locator('[data-load-slot="1"]').click();assert.equal(await page.evaluate(()=>state.index),25);await page.locator('[data-choice]:not(:disabled)').first().click();await page.locator('#finale-show-all').click();await page.locator('#finale-memory-start').click();await page.locator('#memory-skip').click();await page.locator('.finale-menu').waitFor();report.paths.push({path:'读档 → 重新完成结局',result:'通过'});
  // An ongoing game can visit unlocked endings without changing its state or save.
  await page.locator('#restart').click();await page.locator('#opening-skip').click();await page.locator('#enter-story').click();await page.locator('.chapter').waitFor();await page.locator('[data-choice]:not(:disabled)').first().click();
  const saved=await page.evaluate(()=>V52_ARCHIVES.pack());const autoBefore=await page.evaluate(()=>localStorage.getItem(GAME_CONFIG.storage.archives));
  await page.locator('header [data-ending-action="menu"]').click();await page.locator('#finale-memory-start').click();await page.locator('#memory-auto').click();await page.locator('#memory-sound').click();assert.equal(await page.locator('#memory-sound').getAttribute('aria-pressed'),'true');
  await page.locator('#memory-next').click();await page.locator('#memory-exit').click();await page.locator('.chapter').waitFor();
  assert.equal(await page.evaluate(()=>ENDTEST149.playing),false);assert.equal(await page.locator('.final-montage').count(),0);assert.deepEqual(await page.evaluate(()=>V52_ARCHIVES.pack().state),saved.state);assert.equal(await page.evaluate(()=>localStorage.getItem(GAME_CONFIG.storage.archives)),autoBefore);
  await page.waitForTimeout(4300);assert.equal(await page.locator('.final-montage,.finale-menu').count(),0);report.paths.push({path:'播放中 → 退出 → 原进度',result:'通过，音频/动画停止、无延迟回跳、存档不变'});
  await page.locator('header [data-ending-action="menu"]').click();await page.locator('#finale-memory-start').click();assert.equal(await page.locator('.final-montage').getAttribute('data-beat'),'first-lamp');assert.equal(await page.locator('#memory-sound').getAttribute('aria-pressed'),'false');await page.keyboard.press('Escape');await page.locator('.chapter').waitFor();report.paths.push({path:'退出 → 再次进入 → Esc退出',result:'通过，从第一幕重播且配乐不叠加'});
  await page.locator('header [data-ending-action="menu"]').click();await page.locator('#finale-memory-start').click();await page.reload();await page.locator('.chapter').waitFor();assert.deepEqual(await page.evaluate(()=>V52_ARCHIVES.pack().state),saved.state);assert.equal(await page.locator('.final-montage').count(),0);report.paths.push({path:'回顾中刷新 → 原正式进度',result:'通过'});
  // Manual saves/export during a visit contain the formal game, never the review.
  await page.locator('header [data-ending-action="menu"]').click();await page.locator('.finale-menu [data-ending-action="read"]').click();assert.deepEqual(await page.evaluate(()=>V52_ARCHIVES.pack().state),saved.state);await page.locator('#v52-archives').click();await page.locator('[data-save-slot="2"]').click();await page.locator('#modal .close').click();assert.deepEqual(await page.evaluate(()=>V52_ARCHIVES.getData().slots['2'].state),saved.state);
  // Explicit loading while reviewing ends the visit and preserves a real backup.
  await page.locator('#v52-archives').click();await page.locator('[data-load-slot="1"]').click();assert.equal(await page.evaluate(()=>FinaleReview149.active),false);assert.deepEqual(await page.evaluate(()=>V52_ARCHIVES.getData().slots.backup.state),saved.state);report.paths.push({path:'回顾中保存/导出打包/读档',result:'保存与导出使用原进度，读档前备份为原进度'});
  // Phone portrait, small phone and landscape: click every final action, then exit.
  await page.evaluate(()=>{choose(0)});await page.locator('#finale-show-all').click();await page.locator('#finale-memory-start').click();await page.locator('#memory-skip').click();
  for(const size of [{width:390,height:844},{width:320,height:568},{width:667,height:375}]){
   await page.setViewportSize(size);await layout(page,'menu '+size.width);await page.screenshot({path:path.join(out,`收卷_${size.width}.png`),fullPage:true});
   await page.locator('#finale-memory-start').click();await layout(page,'montage '+size.width);await page.screenshot({path:path.join(out,`走马灯_${size.width}.png`)});
   await page.locator('#memory-exit').click();await page.locator('.finale-menu').waitFor();await page.locator('.finale-menu [data-ending-action="read"]').click();assert.equal(await page.locator('.finale-line[hidden]').count(),0);await page.locator('.ending-review-bar [data-ending-action="menu"]').click();await page.locator('.finale-menu [data-view="people"]').click();await page.locator('.ending-review-bar [data-ending-action="menu"]').click();await page.locator('.finale-menu [data-ending-action="directory"]').click();await page.locator('header [data-ending-action="menu"]').click();await page.locator('.finale-menu [data-ending-action="cover"]').click();await page.locator('.opening-secondary [data-ending-action="menu"]').click();
  }
  report.paths.push({path:'手机完成/重播/正文/瓷谱/目录/首页/回访',result:'390×844、320×568、667×375按钮实点通过'});
  // Complete a full montage by pressing next on the phone, preserving every beat.
  await page.setViewportSize({width:390,height:844});await page.locator('#finale-memory-start').click();await clickAll(page,await page.evaluate(()=>ENDTEST149.beats().map(x=>x.id)));await page.locator('.finale-menu').waitFor();report.paths.push({path:'手机端完整结局',result:'所有幕逐一点击，正常进入收卷菜单'});
  assert.deepEqual(report.errors,[]);report.pass=true;
 }catch(e){report.failure=e.stack;throw e}finally{
  fs.writeFileSync(path.join(out,quick?'补充回归.json':'功能核查.json'),JSON.stringify(report,null,2));
  if(context)await boundedClose(context);await boundedClose(browser);
 }
 console.log(JSON.stringify({pass:report.pass,cases:report.cases.length,paths:report.paths.length,natural:report.natural.length,errors:report.errors}));
})().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
