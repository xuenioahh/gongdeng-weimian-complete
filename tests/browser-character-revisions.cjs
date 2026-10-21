const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'audit/人物提升_2026-10-11');
const url=pathToFileURL(path.join(root,'index.html')).href;
const plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
async function motherBranches(browser,route,report){
 for(const leave of [true,false]){
  const context=await browser.newContext({reducedMotion:'reduce'}),page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));await page.goto(url);await page.waitForTimeout(1200);
  await page.evaluate(async route=>{const ci=CHAPTERS.findIndex(c=>c.title==='西华门外'),si=TEST140.scenes(ci,route).findIndex(s=>s.heading==='三月初十 · 她这一次先问女儿要不要她');await TEST140.jump(ci,si,route,'preset')},route);
  let pick=await page.evaluate(leave=>CHAPTERS[state.index].steps[state.chapterStep].choices.findIndex(c=>c.effects?.flags?.v74ZhouLeavesWithDaughter===leave),leave);
  assert.ok(pick>=0,'mother decision missing');
  let compatibilityInjected=false;
  if(await page.locator(`[data-choice="${pick}"]`).isDisabled()){
   assert.equal(leave,false);
   await page.evaluate(()=>{state.flags.v69PrincessFate='convent';render()});compatibilityInjected=true;
   pick=await page.evaluate(()=>CHAPTERS[state.index].steps[state.chapterStep].choices.findIndex(c=>c.effects?.flags?.v74ZhouStayedPunished===true));
  }
  assert.ok(!(await page.locator(`[data-choice="${pick}"]`).isDisabled()));
  await page.locator(`[data-choice="${pick}"]`).evaluate(b=>b.click());
  assert.equal(await page.evaluate(()=>Boolean(state.flags.v74ZhouLeavesWithDaughter)),leave);
  for(let n=0;n<12;n++){
   const at=await page.evaluate(()=>CHAPTERS[state.index].steps[state.chapterStep||0].heading);
   if(at==='承熙十九年冬 · 西华门还在那里')break;
   await page.locator('[data-choice]:not([disabled])').first().evaluate(b=>b.click());
  }
  assert.equal(await page.locator('.scene-title').innerText(),'承熙十九年冬 · 西华门还在那里');
  const text=await page.locator('.prose').innerText();
  assert.ok(!text.includes('周清漪的牌位'),text);
  assert.ok(leave?/周清漪(?:已经)?随二公主.*封邑/.test(text):text.includes('周清漪仍住绮春宫'),text);
  report.branches.push({route,motherLeaves:leave,compatibilityInjected,continuousFromMotherChoice:true,alivePlaceCorrect:true});
  await context.close();
 }
}
async function main(){
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const report={pass:false,scenes:[],branches:[],errors:[],biographies:[]};
 try{
  fs.mkdirSync(out,{recursive:true});
  if(process.argv[2]==='mother'){
   for(const route of ['direct','ning'])await motherBranches(browser,route,report);
   assert.deepEqual(report.errors,[]);report.pass=true;console.log(JSON.stringify(report));return report;
  }
  if(process.argv[2]==='recall'){
   for(const route of ['direct','ning']){
    const context=await browser.newContext({reducedMotion:'reduce'}),page=await context.newPage();
    page.on('pageerror',e=>report.errors.push(e.message));await page.goto(url);await page.waitForTimeout(1200);
    for(const [chapter,heading,id,phrase] of [['凤仪宫最后一冬','十月二十三，凤仪宫灯灭','gu-rest','八月我答应过的小宴'],['万家灯火','承熙二十二年冬至后第三夜 · 养心殿没有熄灯','emperor-copy','顺谦抄册时嫌我袖子挡光']]){
     await page.evaluate(async({chapter,heading,route})=>{const ci=CHAPTERS.findIndex(c=>c.title===chapter),si=TEST140.scenes(ci,route).findIndex(s=>s.heading===heading);await TEST140.jump(ci,si,route,'preset')},{chapter,heading,route});
     await page.locator('.v149-quiet-pending').waitFor({state:'hidden',timeout:12000});
     assert.ok((await page.locator('.prose').innerText()).includes(phrase),route+' linked memory');
     const world=await page.evaluate(id=>{for(const e of Object.values(state.events151||{}))if(e.revision153?.scenes.includes(id))delete e.revision153;return JSON.stringify({flags:state.flags,ranks:state.ranks,children:state.children})},id);
     await page.evaluate(()=>render());
     assert.ok(!(await page.locator('.prose').innerText()).includes(phrase),route+' unread memory appeared');
     assert.equal(await page.evaluate(()=>JSON.stringify({flags:state.flags,ranks:state.ranks,children:state.children})),world);
     report.branches.push({route,chapter,linkedMemory:true,oldArchiveNoInventedMemory:true,stateUnchanged:true});
    }
    await context.close();
   }
   assert.deepEqual(report.errors,[]);report.pass=true;console.log(JSON.stringify(report));return report;
  }
  const baseline=path.join(out,'baseline.html');
  fs.writeFileSync(baseline,`<!doctype html><meta charset="utf-8"><base href="${pathToFileURL(root+path.sep).href}"><link rel="stylesheet" href="styles.css"><div id="app"></div><dialog id="modal"></dialog><script src="${pathToFileURL(path.join(root,'backups/人物提升_2026-10-11/app.js')).href}"></script>`);
  const metadataContext=await browser.newContext({reducedMotion:'reduce'}),metadataPage=await metadataContext.newPage();
  await metadataPage.goto(url);await metadataPage.waitForTimeout(1200);
  const rows=await metadataPage.evaluate(()=>CharacterRevision153.rows());
  const chapterOrder=await metadataPage.evaluate(()=>CHAPTERS.map(c=>c.title));
  rows.sort((a,b)=>chapterOrder.indexOf(a.chapter)-chapterOrder.indexOf(b.chapter));
  fs.writeFileSync(path.join(out,'场景修订索引.json'),JSON.stringify(rows,null,2));
  await metadataContext.close();
  for(const route of ['direct','ning']){
   const oldContext=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'}),newContext=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
   const oldPage=await oldContext.newPage(),page=await newContext.newPage();
   page.on('pageerror',e=>report.errors.push(e.message));oldPage.on('pageerror',e=>report.errors.push('baseline: '+e.message));
   await oldPage.goto(pathToFileURL(baseline).href);await page.goto(url);await page.waitForTimeout(1200);
   const signature=p=>p.evaluate(()=>JSON.stringify(CHAPTERS.map(c=>({title:c.title,steps:c.steps.map(s=>({heading:s.heading,choices:s.choices,cast:s.cast,narrative:s.narrative,fx:s.fx}))})),(_,v)=>typeof v==='function'?String(v):v));
   assert.equal(await signature(page),await signature(oldPage),'initial scene/choice structure');
   const capture=async(p,row)=>{
    const exists=await p.evaluate(async({row,route})=>{
     const ci=CHAPTERS.findIndex(c=>c.title===row.chapter),si=TEST140.scenes(ci,route).findIndex(s=>s.heading===row.scene);
     if(si<0)return false;
     if(state.index!==ci||window.__characterRoute!==route||state.chapterStep>si){await TEST140.jump(ci,si,route,'preset');window.__characterRoute=route;}
     else{
      let count=0;
      while(state.chapterStep<si){
       const button=[...document.querySelectorAll('[data-choice]')].find(b=>!b.disabled);
       if(!button||++count>60)throw Error('Unable to advance within '+row.chapter);
       const prior=state.chapterStep;choose(Number(button.dataset.choice));
       if(state.chapterStep===prior)throw Error('Choice did not advance '+row.scene);
      }
     }
     return true;
    },{row,route});
    if(!exists)return null;
    await p.locator('.v149-quiet-pending').waitFor({state:'hidden',timeout:12000});
    const before=await p.evaluate(()=>({text:document.querySelector('.prose').innerText,id:SceneHistory151.position(state).sceneId,world:{flags:state.flags,ranks:state.ranks,trust:state.trust,bond:state.bond,mind:state.mind,children:state.children}}));
    if(p===page){
     await p.setViewportSize({width:390,height:844});
     assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),row.id+' revised scene mobile overflow');
     await p.setViewportSize({width:1440,height:900});
    }
    await p.locator('[data-choice]:not([disabled])').first().evaluate(b=>b.click());
    const after=await p.evaluate(id=>({event:state.events151?.[id],world:{flags:state.flags,ranks:state.ranks,trust:state.trust,bond:state.bond,mind:state.mind,children:state.children}}),before.id);
    return {...before,after};
   };
   for(const row of rows){
    const old=await capture(oldPage,row),fresh=await capture(page,row);
    assert.equal(Boolean(fresh),Boolean(old),row.id+' reachability');
    if(!fresh){report.scenes.push({route,...row,unavailable:true});continue;}
    assert.deepEqual(fresh.world,old.world,row.id+' display altered state');
    assert.deepEqual(fresh.after.world,old.after.world,row.id+' settlement altered state');
    assert.ok(fresh.after.event?.revision153?.scenes.includes(row.id),row.id+' missing real read record');
    assert.notEqual(plain(fresh.text),plain(old.text),row.id+' did not reach displayed prose');
    if(row.id==='baopu-sleeve')assert.doesNotMatch(fresh.text,/袖口后来藏过刀|调查时|行刺之意/,'pre-assassination spoiler');
    await page.setViewportSize({width:390,height:844});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),row.id+' overflow');
    await page.setViewportSize({width:1440,height:900});
    report.scenes.push({route,...row,before:old.text,after:fresh.text,mobile:true,event:fresh.after.event});
    console.log(route,row.id);
   }
   // Test all three actual summons choices and read their subsequent scene.
   for(const [pick,flag,expected] of [[0,'respected','没有另传一张不写事由的牌'],[1,'official','陛下若想留人说话，另问就是'],[2,'cold','那一点不快却没有因差事办完就算说开']]){
    await page.evaluate(async({route,pick})=>{const ci=CHAPTERS.findIndex(c=>c.title==='长夜未央'),si=TEST140.scenes(ci,route).findIndex(s=>s.heading.includes('第一次有人把传召退回来'));await TEST140.jump(ci,si,route,'preset');choose(pick);}, {route,pick});
    await page.locator('.v149-quiet-pending').waitFor({state:'hidden',timeout:12000});
    assert.equal(await page.evaluate(()=>state.flags.v47DrunkSummons),flag);
    assert.ok((await page.locator('.prose').innerText()).includes(expected),route+' '+flag);
    report.branches.push({route,choice:pick,flag,followup:true});
   }
   // The two investigation routes must retain their own delivery chain.
   for(const investigation of ['threeDays','falseOrder']){
    await page.evaluate(async({route,investigation})=>{const ci=CHAPTERS.findIndex(c=>c.title==='听雨轩有喜'),si=TEST140.scenes(ci,route).findIndex(s=>s.heading.includes('阿芙还得选'));await TEST140.jump(ci,si,route,'preset');state.flags.fangInvestigation=investigation;render()}, {route,investigation});
    const txt=await page.locator('.prose').innerText();
    if(investigation==='threeDays'){assert.ok(!txt.includes('那道假口谕最先'));assert.ok(txt.includes('核过方子'));}
    else assert.ok(txt.includes('那道假口谕最先'));
    report.branches.push({route,investigation,deliveryChain:true});
   }
   // A daughter refusing her mother cannot receive the agreeing-daughter addition.
   for(const fate of ['estate','convent']){
    await page.evaluate(async({route,fate})=>{const ci=CHAPTERS.findIndex(c=>c.title==='西华门外'),si=TEST140.scenes(ci,route).findIndex(s=>s.heading==='三月初十 · 她这一次先问女儿要不要她');await TEST140.jump(ci,si,route,'preset');state.flags.v69PrincessFate=fate;render()}, {route,fate});
    assert.equal((await page.locator('.prose').innerText()).includes('装箱单分成两张'),fate==='estate');
    report.branches.push({route,daughter:fate,packingGate:true});
   }
   await motherBranches(browser,route,report);
   await page.evaluate(async route=>{await TEST140.jump(CHAPTERS.length,0,route,'preset')},route);
   const keys=['gu','fang','afu','zhangyuanzhao','shen','hanzhang','baopu','zhou','emperor','ning'];
   const expected={gu:'冰酪融软',fang:'旧份晚食',afu:'私箱与家信',zhangyuanzhao:'补欠休',shen:'这壶',hanzhang:'不因对手是皇帝便让棋',baopu:'未接受含章',zhou:'花器',emperor:'冰得吸气',ning:'松子糖'};
   for(const key of keys){
    await page.evaluate(key=>modal(key),key);
    const text=await page.locator('.history-biography138 p').innerText();
    if(key==='shen')assert.ok(text.includes('不加糖的那一壶'));
    else assert.ok(text.includes(expected[key]),route+' biography '+key);
    if(key==='gu')assert.ok(text.indexOf('冰酪融软')<text.indexOf('顾明宜薨'),'Gu daily memory placed after death');
    if(key==='shen'&&text.includes('被赐死'))assert.ok(text.indexOf('不加糖的那一壶')<text.indexOf('被赐死'),'Shen old life placed after death');
    report.biographies.push({route,key,text});await page.locator('#modal').evaluate(e=>e.close());
   }
   const revisions=await page.evaluate(()=>JSON.stringify(Object.values(state.events151||{}).map(e=>e.revision153).filter(Boolean)));
   await page.locator('#v52-archives').click();await page.locator('[data-save-slot="1"]').click();await page.locator('#modal .close').click();
   await page.reload();await page.waitForTimeout(1000);
   assert.equal(await page.evaluate(()=>JSON.stringify(Object.values(state.events151||{}).map(e=>e.revision153).filter(Boolean))),revisions);
   report.branches.push({route,newRevisionSaveReload:true});
   // Old records omit the optional revision field. Read-only views never backfill it.
   await page.evaluate(()=>{for(const e of Object.values(state.events151||{}))delete e.revision153;window.__oldRevisionState=JSON.stringify(state)});
   await page.evaluate(()=>modal('gu'));
   assert.ok(!(await page.locator('.history-biography138 p').innerText()).includes('冰酪融软'));
   await page.locator('#modal').evaluate(e=>e.close());
   assert.equal(await page.evaluate(()=>JSON.stringify(state)),await page.evaluate(()=>window.__oldRevisionState));
   await page.locator('#v52-archives').click();await page.locator('[data-save-slot="1"]').click();await page.locator('#modal .close').click();
   await page.reload();await page.waitForTimeout(1000);
   assert.ok(await page.evaluate(()=>Object.values(state.events151||{}).every(e=>!e.revision153)));
   report.branches.push({route,oldArchiveNoBackfill:true,biographyReadOnly:true});
   await oldContext.close();await newContext.close();
  }
  assert.deepEqual(report.errors,[]);report.pass=true;
 }finally{fs.writeFileSync(path.join(out,process.argv[2]==='recall'?'回忆前情门控验收.json':process.argv[2]==='mother'?'母女去留验收.json':'人物专项验收.json'),JSON.stringify(report,null,2));await browser.close()}
 console.log(JSON.stringify({pass:report.pass,scenes:report.scenes.length,branches:report.branches.length,biographies:report.biographies.length,errors:report.errors}));
 return report;
}
module.exports={main};if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1});
