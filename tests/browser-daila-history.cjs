const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');const {chromium}=require('/Users/zhangzhuoru/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'audit/历史Prompt总审计_2026-10-11');
(async()=>{const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}),report={pass:false,cases:[],errors:[]};try{
 const p=await b.newPage({reducedMotion:'reduce'});p.on('pageerror',e=>report.errors.push(e.message));
 const body=fs.readFileSync(path.join(root,'app.js'),'utf8').replace('/* Source: src/compat/palace-adapters-2.js */','globalThis.historyAtlasResidents151=atlasResidents148;\n/* Source: src/compat/palace-adapters-2.js */');
 await p.route('**/app.js',r=>r.fulfill({contentType:'text/javascript',body}));await p.goto(pathToFileURL(path.join(root,'index.html')).href);
 for(const route of ['direct','ning'])for(let pick=0;pick<3;pick++){
  await p.evaluate(async route=>{const ci=22,si=TEST140.scenes(ci,route).findIndex(s=>s.heading.includes('黛拉自己选那扇门'));await TEST140.jump(ci,si,route,'preset')},route);
  await p.locator('[data-choice="'+pick+'"]').click();
  const data=await p.evaluate(()=>{const person=v138Person('daila');state.view='map';render();return {person,fate:state.flags.v56DailaFate,residents:historyAtlasResidents151('承露馆').current,mapLocations:V55_MAP_SPOTS.length}});
  assert.equal(data.fate,['return','stay','hold'][pick]);assert.equal(data.person.home,pick===0?'珂兰':'承露馆');assert.equal(data.person.active,pick!==0);assert.equal(data.residents.includes('黛拉'),pick!==0);
  if(pick===2)assert.equal(data.person.status,'暂留承露馆');
  await p.evaluate(()=>{state.view='story';render()});
  await p.locator('#v52-archives').click();await p.locator('[data-save-slot="4"]').click();await p.locator('#modal .close').click();await p.reload();
  assert.deepEqual(await p.evaluate(()=>v138Person('daila')),data.person);report.cases.push({route,pick,...data,saveReload:true});
 }
 assert.deepEqual(report.errors,[]);report.pass=true;
}finally{fs.writeFileSync(path.join(out,'黛拉归国与居所验收.json'),JSON.stringify(report,null,2));await b.close()}
 console.log(JSON.stringify({pass:report.pass,cases:report.cases.length,errors:report.errors}));})().catch(e=>{console.error(e);process.exit(1)});
