const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require('/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'audit/结局回访修复');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const report={mode:'story',errors:[],layouts:[],pass:false};let context;
 try{
  context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('dialog',d=>d.accept());
  const body=fs.readFileSync(path.join(root,'app.js'),'utf8').replace('/* Source: src/boot-2.js */','globalThis.P149={initial:initial136,prepare:prepare139,allowed:allowed136,bulk:x=>bulk140=x,beats:finalMontageBeats147};\n/* Source: src/boot-2.js */');
  await page.route('**/app.js',r=>r.fulfill({body,contentType:'text/javascript'}));await page.goto(pathToFileURL(path.join(root,'index.html')).href+'?mode=story');await page.waitForTimeout(500);
  assert.equal(await page.evaluate(()=>GAME_CONFIG.testMode),false);assert.equal(await page.locator('#test140-drawer').count(),0);assert.equal(await page.locator('[data-ending-action="menu"]').count(),0);
  await page.evaluate(()=>{const old=save;save=()=>{};P149.bulk(true);try{state=P149.initial();state.intro=true;while(state.index<25){P149.prepare(state);const st=CHAPTERS[state.index].steps[state.chapterStep];if(st.v95ManualRoster||st.choices.some(c=>c.v78ConfirmLow))state.flags.v78LowSelected=['cao2','zhao2','lin2','ye2','du2'];choose(st.choices.findIndex(P149.allowed));}}finally{save=old;P149.bulk(false);save();render()}});
  for(let i=0;i<7;i++){await page.locator('.environment-quiet-pending').waitFor({state:'hidden',timeout:10000});await page.locator('[data-choice]:not(:disabled)').first().click();}
  await page.locator('#finale-memory-start').click();await page.locator('#memory-auto').click();
  const expected=await page.evaluate(()=>P149.beats().map(b=>b.id)),seen=[];
  while(await page.locator('.final-montage').count()){
   seen.push(await page.locator('.final-montage').getAttribute('data-beat'));
   for(const size of [{width:390,height:844},{width:320,height:568},{width:667,height:375}]){
    await page.setViewportSize(size);await page.waitForTimeout(25);
    const a=await page.evaluate(()=>{const stage=document.querySelector('.memory-stage').getBoundingClientRect(),cap=document.querySelector('.memory-captions').getBoundingClientRect(),c=document.querySelector('.memory-controls').getBoundingClientRect();return {beat:document.querySelector('.final-montage').dataset.beat,width:innerWidth,scroll:document.documentElement.scrollWidth,top:stage.top,capTop:cap.top,capBottom:cap.bottom,controlTop:c.top,controlBottom:c.bottom,height:innerHeight}});
    assert.ok(a.scroll<=a.width+1);assert.ok(a.capTop>=a.top-1,'subtitle above stage '+a.beat);assert.ok(a.capBottom<=a.controlTop+1);assert.ok(a.controlBottom<=a.height+1);report.layouts.push(a);
    if(a.beat==='zhou-question'&&size.width===390)await page.screenshot({path:path.join(out,'正式阅读_诗句_390.png')});
   }
   await page.locator('#memory-next').click();
  }
  assert.deepEqual(seen,expected);await page.locator('.finale-menu').waitFor();await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'正式阅读_收卷_390.png'),fullPage:true});
  const auto=await page.evaluate(()=>JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives)).slots.auto);
  await page.locator('.finale-menu [data-view="people"]').click();await page.locator('.ending-back,.ending-review-bar [data-ending-action="menu"]').first().click();await page.locator('.finale-menu').waitFor();
  await page.locator('.finale-menu [data-ending-action="directory"]').click();const key=await page.locator('[data-ending-key]').first().getAttribute('data-ending-key');await page.locator(`[data-ending-key="${key}"]`).click();await page.locator('.finale-menu [data-ending-action="read"]').click();await page.locator('.ending-review-bar [data-ending-action="menu"]').click();await page.locator('.finale-menu [data-ending-action="cover"]').click();await page.locator('.palace-opening').waitFor();
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives)).slots.auto),auto);await page.reload();assert.equal(await page.locator('.finale-menu').count(),1);assert.equal(await page.evaluate(()=>V52_ARCHIVES.endings().length),1);
  assert.equal(await page.evaluate(()=>localStorage.getItem('gongdeng-test140-v52-archives')),null);assert.deepEqual(report.errors,[]);report.pass=true;
 }catch(e){report.failure=e.stack;throw e}finally{fs.writeFileSync(path.join(out,'正式阅读核查.json'),JSON.stringify(report,null,2));if(context)await Promise.race([context.close(),new Promise(r=>setTimeout(r,3000))]);await Promise.race([browser.close(),new Promise(r=>setTimeout(r,3000))]);}
 console.log(JSON.stringify({pass:report.pass,mode:report.mode,subtitleChecks:report.layouts.length,errors:report.errors}));
})().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
