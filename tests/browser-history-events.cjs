const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url'),{chromium}=require('/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'audit/历史Prompt总审计_2026-10-11');
(async()=>{const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}),report={pass:false,checks:[],errors:[]};try{
 const p=await b.newPage({reducedMotion:'reduce'});p.on('pageerror',e=>report.errors.push(e.message));p.on('dialog',d=>d.accept());
 await p.goto(pathToFileURL(path.join(root,'index.html')).href);
 const ids=await p.evaluate(()=>{SceneHistory151.bind();return CHAPTERS.flatMap(ch=>ch.steps.map(st=>({id:st.sceneId,heading:st.heading}))) });
 assert.ok(ids.every(x=>x.id));assert.equal(new Set(ids.map(x=>x.id)).size,ids.length);report.checks.push({stableIds:ids.length});
 await p.evaluate(()=>TEST140.jump(16,2,'direct','preset'));await p.locator('[data-choice="1"]').click();
 const event=await p.evaluate(()=>Object.values(state.events151).find(e=>e.heading==='张元照要的不是药方'));
 assert.equal(event.pick,1);assert.match(event.command,/皇后总领/);assert.ok(!event.command.includes('御前临时牌'));assert.ok(event.actors.gu.title.includes('皇后'));report.checks.push({settledEvent:event});
 await p.locator('#v52-archives').click();await p.locator('[data-save-slot="5"]').click();await p.locator('#modal .close').click();
 const archive=await p.evaluate(()=>JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives))),pack=archive.slots['5'];assert.ok(pack.sceneId);assert.ok(pack.state.events151[event.id]);
 await p.reload();assert.deepEqual(await p.evaluate(id=>state.events151[id],event.id),event);report.checks.push({eventSaveReload:true,sceneId:pack.sceneId});
 // Legacy packs without new fields remain valid, and new IDs locate their scene
 // even if the redundant numeric position has been changed in the pack.
 for(const mode of ['legacy','id']){
  await p.evaluate(({pack,mode})=>{const a=JSON.parse(JSON.stringify(pack));if(mode==='legacy'){delete a.sceneId;delete a.chapterId;delete a.state.events151;delete a.state.sceneChoices151;}else a.state.chapterStep=0;const bank=JSON.parse(localStorage.getItem(GAME_CONFIG.storage.archives));bank.slots['5']=a;localStorage.setItem(GAME_CONFIG.storage.archives,JSON.stringify(bank));},{pack,mode});
  await p.reload();await p.locator('#v52-archives').click();await p.locator('[data-load-slot="5"]').click();assert.equal(await p.evaluate(()=>state.chapterStep),pack.state.chapterStep);report.checks.push({mode,load:true});
 }
 await p.evaluate(()=>TEST140.jump(26,0,'direct','preset'));const late=await p.evaluate(()=>({count:Object.keys(state.events151).length,events:Object.values(state.events151).filter(e=>e.chapterIndex===22)}));assert.ok(late.count>=390);report.checks.push({wholeRouteEvents:late.count});
 await p.locator('[data-view="chronicle"]').first().click();assert.ok(await p.locator('.v151-private').count());const facts=await p.locator('.chronicle').innerText();assert.ok(facts.includes('自请归珂兰'));report.checks.push({chronicleUsesSettledFacts:true,privateChoicesSeparate:true});
 const size=await p.evaluate(()=>new Blob([localStorage.getItem(GAME_CONFIG.storage.archives)]).size);assert.ok(size<4500000,'archive approached browser storage quota');report.checks.push({archiveBytes:size});
 assert.deepEqual(report.errors,[]);report.pass=true;
}finally{fs.writeFileSync(path.join(out,'事件模型与稳定ID验收.json'),JSON.stringify(report,null,2));await b.close()}
console.log(JSON.stringify({pass:report.pass,checks:report.checks.length,errors:report.errors}));})().catch(e=>{console.error(e);process.exit(1)});
