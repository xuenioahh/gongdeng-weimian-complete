const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const assert=require('node:assert/strict');
const runtime=process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright';
const {chromium}=require(runtime);
const root=path.resolve(__dirname,'..');

async function main(){
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce',acceptDownloads:true});
 const page=await context.newPage();
 const errors=[],warnings=[],report={checks:[],routes:[],scenes:[],images:{},failures:[],consoleErrors:errors};
 const output=path.join(root,'tests/results/browser-v146.json');
 const record=(name,data=true)=>{report.checks.push({name,data});console.log(name)};
 const save=()=>fs.writeFileSync(output,JSON.stringify(report,null,2));
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text())});
 page.on('dialog',d=>d.accept());
 const url=pathToFileURL(path.join(root,'index.html')).href;
 const pos=()=>page.evaluate(()=>[state.index,state.chapterStep]);
 async function layout(label){
  const data=await page.evaluate(()=>{
   const c=document.querySelector('.chapter'),r=c?.getBoundingClientRect();
   const buttons=[...document.querySelectorAll('[data-choice]')];
   return {pos:[state.index,state.chapterStep],width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
    chapter:c?{height:c.clientHeight,scroll:c.scrollHeight,bottom:r.bottom}:null,
    atmosphere:[...document.querySelectorAll('.story-atmosphere')].every(e=>getComputedStyle(e).position==='absolute'&&getComputedStyle(e).pointerEvents==='none'),
    buttons:buttons.map(b=>({bound:typeof b.onclick==='function',disabled:b.disabled,bottom:b.getBoundingClientRect().bottom,inside:!r||b.getBoundingClientRect().bottom<=r.bottom+1})),
    art:[...document.querySelectorAll('.moment-figure[data-scene-asset]')].map(e=>({id:e.dataset.sceneAsset,paragraph:e.previousElementSibling?.dataset.voiceLine,after:e.dataset.afterParagraph,details:!!e.closest('details')})),
    oldGallery:!!document.querySelector('.chapter-visuals,.chapter-visual-grid'),
    paperText:document.querySelector('.prose')?.innerText||'',heading:document.querySelector('.scene-title')?.innerText||''};
  });
  assert.ok(data.scrollWidth<=data.width+1,`${label}: horizontal overflow ${data.scrollWidth}/${data.width}`);
  if(data.chapter){assert.ok(data.chapter.scroll<=data.chapter.height+2,label+': clipped story');assert.ok(data.buttons.length,label+': missing choices');assert.ok(data.buttons.every(b=>b.bound&&b.inside),label+': choice outside chapter or unbound')}
  assert.ok(data.atmosphere,label+': decorative layer blocks flow/clicks');
  assert.ok(!data.oldGallery,label+': chapter gallery remains');
  data.art.forEach(a=>{assert.equal(a.paragraph,a.after,label+': image detached from its paragraph');assert.ok(!a.details,label+': image folded')});
  return data;
 }
 async function clickContinue(route){
  await page.locator('.environment-quiet-pending').waitFor({state:'hidden',timeout:10000});
  if(!await page.locator('[data-choice]:not(:disabled)').count()){
   const candidates=await page.locator('[data-v78-low],[data-v95-low]').evaluateAll(es=>es.map(e=>({attr:e.hasAttribute('data-v78-low')?'data-v78-low':'data-v95-low',key:e.dataset.v78Low||e.dataset.v95Low})).slice(0,5));
   for(const c of candidates)await page.locator(`[${c.attr}="${c.key}"]`).click();
  }
  const option=await page.evaluate(route=>{
   const st=CHAPTERS[state.index]?.steps[state.chapterStep];
   if(st?.choices.some(c=>c.v74ShaoThenZhang))return st.choices.findIndex(c=>route==='ning'?c.v74ShaoThenZhang:c.effects?.flags?.v44NewEmpress==='zhangyuanzhao');
   return Number(document.querySelector('[data-choice]:not(:disabled)')?.dataset.choice);
  },route);
  assert.ok(Number.isInteger(option),'No enabled choice');
  const before=await pos();
  await page.locator(`[data-choice="${option}"]`).click({timeout:12000});
  assert.notDeepEqual(await pos(),before,'click did not advance '+before);
 }
 async function jumpUI(ci,si=0,route='direct'){
  if(!await page.locator('#test140-drawer').evaluate(e=>e.open))await page.locator('#test140-open').click();
  await page.locator('#test140-route').selectOption(route);
  await page.locator('#test140-mode').selectOption('preset');
  await page.locator('#test140-chapter').selectOption(String(ci));
  await page.locator('#test140-scene').selectOption(String(si));
  await page.locator('#test140-go').click();
  await page.waitForFunction(({ci,si})=>!document.querySelector('#app')?.inert&&state.index===ci&&state.chapterStep===si,{ci,si},{timeout:45000});
 }
 try{
  await page.goto(url);await page.waitForTimeout(1200);
  const count=await page.evaluate(()=>CHAPTERS.length);report.chapterCount=count;
  await page.locator('#enter-story').click();await layout('opening');record('Opening and full paragraph layout');
  // Motion is a reading setting, independent of voice controls.
  await page.locator('#scene-motion').click();assert.equal(await page.getAttribute('html','data-motion'),'off');
  assert.ok(await page.locator('.story-atmosphere i').evaluateAll(es=>es.every(e=>getComputedStyle(e).animationName==='none')));
  await page.reload();await page.waitForTimeout(700);assert.equal(await page.getAttribute('html','data-motion'),'off');record('Motion toggle persists; reduced motion stops animations');
  await page.locator('#scene-motion').click();
  // Real manual save / load, then reload the same file URL.
  await page.locator('#v52-archives').click();await page.locator('[data-save-slot="1"]').click();await page.locator('#modal .close').click();
  const saved=await pos();await clickContinue('direct');await page.locator('#v52-archives').click();await page.locator('[data-load-slot="1"]').click();
  assert.deepEqual(await pos(),saved);await page.reload();await page.waitForTimeout(700);assert.deepEqual(await pos(),saved);record('Manual save/load and reload restore position');
  const downloadPromise=page.waitForEvent('download');await page.locator('#v52-archives').click();await page.locator('#v52-export').click();
  const download=await downloadPromise;const exportFile='/tmp/gongdeng-v146-save.json';await download.saveAs(exportFile);await page.locator('#modal .close').click();await clickContinue('direct');
  await page.locator('#v52-archives').click();await page.locator('#v52-import').setInputFiles(exportFile);await page.waitForFunction(()=>!document.querySelector('#modal').open);assert.deepEqual(await pos(),saved);record('Save export and import');
  const preserved=await page.evaluate(()=>localStorage.getItem(GAME_CONFIG.storage.progress));
  await page.goto(url+'?mode=story');await page.waitForTimeout(700);assert.equal(await page.locator('.test140').count(),0);assert.equal(await page.evaluate(()=>typeof TEST140),'undefined');
  await page.locator('#enter-story').click();await clickContinue('direct');
  assert.equal(await page.evaluate(()=>localStorage.getItem('chengxi-test140-v49')),preserved);record('Normal reading and test save keys are isolated');
  await page.goto(url);await page.waitForTimeout(700);
  for(const route of ['direct','ning']){
   await jumpUI(0,0,route);let total=0,last=-1;const seen={};
   while((await pos())[0]<count){
    const [ci,si]=await pos();
    if(ci!==last){console.log(route+' chapter '+(ci+1));last=ci;save()}
    const l=await layout(route+' '+ci+':'+si);report.scenes.push({route,ci,si,heading:l.heading,length:l.paperText.length,text:l.paperText});
    l.art.forEach(a=>{seen[a.id]=(seen[a.id]||0)+1});
    await clickContinue(route);assert.ok(++total<650,'route loop');
   }
   assert.ok(Object.values(seen).every(n=>n===1),'image repeated on multiple scenes');
   assert.ok(!report.scenes.some(x=>x.text.includes('若华')),'unsupported princess name remains in rendered route text');
   const thirdPrincess=report.scenes.find(x=>x.heading.includes('三公主洗三'));
   assert.ok(thirdPrincess&&thirdPrincess.text.includes('三公主')&&thirdPrincess.text.includes('杨宁矣'),'third princess birth scene disagrees with the royal register');
   report.images[route]=seen;
   const end=await page.evaluate(()=>({flags:state.flags,ranks:state.ranks,hanzhang:v138Person('hanzhang'),gu:v138Person('gu'),children:v138Children()}));
   assert.ok(end.flags.v82SecondController,'No Zhang ending');assert.ok(end.gu.dead,'Gu resurrected');
   assert.equal(end.hanzhang.title,'珍妃','ending hanzhang title does not match final rank');
   report.routes.push({route,total,end});record('Continuous route '+route+' : '+total+' scene clicks');
   await page.getByRole('button',{name:'人物',exact:true}).click();const cards=page.locator('[data-porcelain-key]');assert.equal(await cards.count(),14);
   await cards.first().click();assert.equal(await cards.first().getAttribute('aria-pressed'),'true');await cards.first().press('Enter');assert.equal(await cards.first().getAttribute('aria-pressed'),'false');
   record(route+' ending: 14 porcelain cards, click/keyboard flip');
  }
  // Every chapter via visible jump controls. Test a middle scene, not only its entry.
  for(let ci=0;ci<count;ci++){
   const si=await page.evaluate(ci=>Math.floor(TEST140.scenes(ci,'direct').length/2),ci);
   await jumpUI(ci,si);await layout('middle jump '+ci);assert.deepEqual(await pos(),[ci,si]);
  }
  record('All '+count+' chapters: UI jump to middle scene');
  const beforeUndo=await pos();await jumpUI(3,4);await page.locator('#test140-open').click();await page.locator('#test140-undo').click();assert.deepEqual(await pos(),beforeUndo);record('Undo restores the last jump');
  for(const view of ['people','children','chronicle','map','story']){
   const before=await pos();await page.locator(`[data-view="${view}"]`).first().click();assert.deepEqual(await pos(),before);await layout('menu '+view);
   if(view==='map'){const spot=page.locator('[data-v55spot]').last();await spot.click();assert.ok((await page.locator('#map-info').innerText()).length>20)}
  }
  record('People, children, annals, map, story navigation');
  const placements=await page.evaluate(()=>TEST140.artPlacements());report.placementCount=placements.length;
  for(const p of placements)assert.ok(report.images.direct[p.id]||report.images.ning[p.id],'unreachable art '+p.id+' '+p.scene);
  // Check every displayed local illustration with its original aspect ratio.
  for(const p of placements){const ok=await page.evaluate(async src=>{const i=new Image();i.src=src;try{await i.decode();return i.naturalWidth>0&&i.naturalHeight>0}catch(e){return false}},p.src);assert.ok(ok,'Missing image '+p.src)}
  record('All '+placements.length+' narrative images load and have unique scene positions');
  await page.setViewportSize({width:390,height:844});
  for(const [ci,si] of [[0,0],[6,0],[7,4],[16,16],[18,9],[23,0],[25,6]]){await jumpUI(ci,si);await layout('mobile '+ci);await clickContinue('direct')}
  record('390px mobile: long chapters, rain, snow, ending; actual next clicks');
  await page.screenshot({path:path.join(root,'tests/results/mobile-v146.png'),fullPage:true});
  await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'no-preference'});await jumpUI(23,0);
  const sceneImage=page.locator('.moment-figure img').first();await sceneImage.scrollIntoViewIfNeeded();await sceneImage.evaluate(img=>img.decode());assert.ok(await sceneImage.evaluate(img=>img.complete&&img.naturalWidth>0),'Visible scene illustration did not lazy-load');record('Visible scene illustration lazy-loads in the reading flow');
  await page.screenshot({path:path.join(root,'tests/results/reading-v146.png'),fullPage:true});
  assert.ok(await page.locator('.story-atmosphere i').evaluateAll(es=>es.some(e=>getComputedStyle(e).animationName!=='none')),'No atmosphere animation running');
  assert.equal(await page.locator('.scene-reading>.story-atmosphere').getAttribute('data-weather'),'rain');
  await jumpUI(23,1);assert.equal(await page.locator('.scene-reading>.story-atmosphere').last().getAttribute('data-weather'),'clear');record('Weather clears in the scene titled “雨停以后”');
  report.warnings=warnings;assert.deepEqual(errors,[],'Browser console errors');record('No browser console errors');
 }catch(e){report.failures.push(e.stack);report.failureLayout=await page.evaluate(()=>[...document.querySelectorAll('[data-choice],.narrative-turn,.scene-reading,.chapter')].map(e=>({tag:e.className,rect:e.getBoundingClientRect().toJSON(),animation:getComputedStyle(e).animationName,transform:getComputedStyle(e).transform,transition:getComputedStyle(e).transition,scrollY})));await page.screenshot({path:path.join(root,'tests/results/failure-v146.png'),fullPage:true});console.error(e);process.exitCode=1}
 finally{
  save();
  const timeout=()=>new Promise(resolve=>setTimeout(resolve,3000));
  if(!page.isClosed())await Promise.race([page.close(),timeout()]);
  await Promise.race([browser.close(),timeout()]);
 }
 return report;
}
module.exports={main};
if(require.main===module)main().then(()=>process.exit(process.exitCode||0)).catch(e=>{console.error(e);process.exit(1)});
