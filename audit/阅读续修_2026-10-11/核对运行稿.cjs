const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require('/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..');
const mode=process.argv[2]||'before';
async function main(){
 const edits=JSON.parse(fs.readFileSync(path.join(__dirname,'修改清单.json'),'utf8'));
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const errors=[],rows=[];
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);
  const signature=await page.evaluate(()=>JSON.stringify(CHAPTERS.map(c=>({title:c.title,steps:c.steps.map(s=>({heading:s.heading,choices:s.choices,narrative:s.narrative,cast:s.cast,fx:s.fx}))})),(_,v)=>typeof v==='function'?String(v):v));
  const cases=[...new Map(edits.map(e=>[e.chapter+'|'+e.scene,e])).values()];
  for(const route of ['direct','ning'])for(const c of cases){
   const found=await page.evaluate(async({route,c})=>{
    const si=TEST140.scenes(c.chapter-1,route).findIndex(s=>s.heading===c.scene);
    if(si<0)return false;
    if(window.__readingRoute!==route||state.index!==c.chapter-1){await TEST140.jump(c.chapter-1,si,route,'preset');window.__readingRoute=route;}
    else{state.chapterStep=si;render();}
    return true;
   },{route,c});
   if(!found){rows.push({route,chapter:c.chapter,scene:c.scene,unavailable:true});continue;}
   await page.locator('.v149-quiet-pending').waitFor({state:'hidden',timeout:10000});
   const data=await page.evaluate(()=>({state:JSON.stringify(state),text:document.querySelector('.prose').innerText,paragraphs:[...document.querySelectorAll('.prose .v52-paragraph')].map(p=>p.textContent.replace(/^声/,''))}));
   await page.setViewportSize({width:390,height:844});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'mobile overflow '+c.scene);
   await page.setViewportSize({width:1440,height:900});
   rows.push({route,chapter:c.chapter,scene:c.scene,...data,mobile:true});
   console.log(route,c.chapter,c.scene);
  }
  // Preserve the actual ending text on both routes as well as its source files.
  const endings=[];
  for(const route of ['direct','ning']){
   await page.evaluate(async route=>{const ci=CHAPTERS.findIndex(c=>c.title==='万家灯火');await TEST140.jump(ci,0,route,'preset')},route);
   const all=await page.evaluate(()=>CHAPTERS[state.index].steps.map((s,i)=>{state.chapterStep=i;render();return {heading:s.heading,text:document.querySelector('.prose')?.innerText||''}}));
   endings.push({route,scenes:all});
  }
  assert.deepEqual(errors,[]);
  const result={signature,rows,endings,errors};
  fs.writeFileSync(path.join(__dirname,mode+'.json'),JSON.stringify(result,null,2));
  if(mode==='after'){
   const before=JSON.parse(fs.readFileSync(path.join(__dirname,'before.json'),'utf8'));
   assert.equal(signature,before.signature,'scene or choice structure changed');
   assert.deepEqual(endings,before.endings,'ending prose changed');
   const checks=edits.map(e=>({chapter:e.chapter,scene:e.scene,from:e.from,to:e.to,routes:[]}));
   for(const row of rows.filter(r=>!r.unavailable)){
    const old=before.rows.find(r=>r.route===row.route&&r.chapter===row.chapter&&r.scene===row.scene);
    let expected=old.paragraphs.slice();
    for(const [i,e] of edits.entries())if(e.chapter===row.chapter&&e.scene===row.scene){
     const hits=expected.filter(p=>p.includes(e.from)).length;
     checks[i].routes.push({route:row.route,hits});
     if(hits)expected=expected.map(p=>p.split(e.from).join(e.to));
    }
    assert.deepEqual(row.paragraphs,expected,'final displayed draft differs '+row.route+' '+row.scene);
   }
   assert.ok(checks.every(e=>e.routes.some(r=>r.hits>0)),'an edit never reached the displayed text');
   fs.writeFileSync(path.join(__dirname,'验收.json'),JSON.stringify({pass:true,edits:checks.length,scenes:cases.length,visibleScenes:rows.filter(r=>!r.unavailable).length,unavailable:rows.filter(r=>r.unavailable),structureUnchanged:true,endingUnchanged:true,mobile:true,errors,checks},null,2));
  }
  console.log(JSON.stringify({mode,visibleScenes:rows.filter(r=>!r.unavailable).length,errors}));
 }finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
